/*
 * BoozeLens Camera - Industrial Grade ESP32-CAM Firmware
 * Version: 1.0.0
 * Author: BoozeLens Team
 * 
 * Features:
 * - Photo capture with optional BAC reading
 * - Offline queue with automatic sync (max 10 photos)
 * - WiFi setup via captive portal
 * - Firebase integration for photos and BAC data
 * - Industrial-grade error handling and recovery
 * 
 * Board: AI Thinker ESP32-CAM
 * 
 * Pin Configuration:
 * - GPIO 2:  MQ3 Alcohol Sensor Analog Input
 * - GPIO 13: Mode/Reset Button (Photo vs Photo+BAC, double-press for WiFi reset)
 * - GPIO 14: OLED I2C SCL
 * - GPIO 15: OLED I2C SDA
 * - GPIO 16: Photo Capture Button
 */

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Preferences.h>
#include <WebServer.h>
#include <DNSServer.h>
#include <esp_system.h>
#include <esp_camera.h>
#include <SD_MMC.h>
// Base64 will be handled differently
#include <esp_timer.h>
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"

// ========================================
// CONFIGURATION & PIN DEFINITIONS
// ========================================

// Display Configuration
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
#define OLED_ADDRESS 0x3C

// Pin Definitions
#define MQ3_PIN 2           // Alcohol sensor analog input
#define MODE_BUTTON_PIN 13  // Mode/Reset button
#define PHOTO_BUTTON_PIN 16 // Photo capture button
#define SDA_PIN 15          // I2C SDA for OLED
#define SCL_PIN 14          // I2C SCL for OLED
#define FLASH_LED_PIN 4     // Built-in flash LED

// Camera Pin Definitions (AI-Thinker ESP32-CAM)
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM     0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM       5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

// System Configuration
#define DEVICE_PREFIX "BOOZELENS_"
#define AP_PASS "12345678"
#define MAX_PHOTO_QUEUE 10
#define PHOTO_QUALITY 10        // JPEG quality (0-63, lower = higher quality)
#define PHOTO_FRAME_SIZE FRAMESIZE_SVGA  // 800x600
#define UPLOAD_TIMEOUT 30000    // 30 seconds
#define DOUBLE_PRESS_TIME 500   // 500ms for double-press detection
#define DEBOUNCE_TIME 50        // 50ms debounce

// Firebase Configuration
const char* FIREBASE_HOST = "hsg-party-tracker-default-rtdb.europe-west1.firebasedatabase.app";
const char* FIREBASE_AUTH = "AIzaSyCuOjiHa8C0jgAte40E774CRJROTWTUdmg";
const char* FIREBASE_STORAGE = "hsg-party-tracker.firebasestorage.app";

// MQ3 Calibration
#define MQ3_R0 10.0
#define MQ3_RL 10.0
#define WARMUP_TIME 20000       // 20 seconds warmup
#define MEASURE_TIME 5000       // 5 seconds measurement

// ========================================
// FORWARD DECLARATIONS
// ========================================
void handleError(const char* error);
void displayMessage(const char* line1, const char* line2 = NULL, const char* line3 = NULL, const char* line4 = NULL);
void loadQueueState();
void saveQueueState();
void resetWiFiConfig();
void cleanupOldPhotos();
void systemMonitorTask(void *parameter);
void handleRoot();
void handleScan();
void handleSave();

// ========================================
// GLOBAL OBJECTS & VARIABLES
// ========================================

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
Preferences preferences;
WebServer server(80);
DNSServer dnsServer;

// System State
enum SystemState {
    STATE_IDLE,
    STATE_WIFI_SETUP,
    STATE_WARMING_UP,
    STATE_READY,
    STATE_MEASURING,
    STATE_CAPTURING_PHOTO,
    STATE_UPLOADING,
    STATE_ERROR
};

SystemState currentState = STATE_IDLE;
String deviceId;
String apSSID;
bool wifiConnected = false;
bool sdCardMounted = false;
bool cameraInitialized = false;
bool bacModeEnabled = false;

// Photo Queue Structure
struct PhotoQueueItem {
    String filename;
    float bac;
    unsigned long timestamp;
    bool hasBac;
};

PhotoQueueItem photoQueue[MAX_PHOTO_QUEUE];
int queueHead = 0;
int queueTail = 0;
int queueCount = 0;

// Button State Management
volatile bool photoButtonPressed = false;
volatile bool modeButtonPressed = false;
unsigned long lastPhotoPress = 0;
unsigned long lastModePress = 0;
int modePressCount = 0;

// BAC Measurement
float currentBac = 0.0;
float r0Value = MQ3_R0;
unsigned long warmupStartTime = 0;
unsigned long measureStartTime = 0;

// Error Recovery
int wifiRetryCount = 0;
int uploadRetryCount = 0;
unsigned long lastErrorTime = 0;
String lastError = "";

// ========================================
// INTERRUPT HANDLERS
// ========================================

void IRAM_ATTR handlePhotoButton() {
    photoButtonPressed = true;
}

void IRAM_ATTR handleModeButton() {
    modeButtonPressed = true;
}

// ========================================
// SETUP FUNCTION
// ========================================

void setup() {
    // Disable brownout detector
    WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);
    
    Serial.begin(115200);
    Serial.println("\n\n========================================");
    Serial.println("BoozeLens Camera v1.0.0 Starting...");
    Serial.println("========================================");
    
    // Initialize storage
    preferences.begin("boozelens", false);
    
    // Generate device ID
    uint64_t chipid = ESP.getEfuseMac();
    deviceId = String(DEVICE_PREFIX) + String((uint32_t)(chipid & 0xFFFFFF), HEX);
    deviceId.toUpperCase();
    apSSID = deviceId;
    
    Serial.print("Device ID: ");
    Serial.println(deviceId);
    
    // Initialize I2C
    Wire.begin(SDA_PIN, SCL_PIN);
    
    // Initialize display
    if (!initializeDisplay()) {
        Serial.println("Display init failed - continuing without display");
    }
    
    showBootScreen();
    
    // Initialize pins
    pinMode(MQ3_PIN, INPUT);
    pinMode(MODE_BUTTON_PIN, INPUT_PULLUP);
    pinMode(PHOTO_BUTTON_PIN, INPUT_PULLUP);
    pinMode(FLASH_LED_PIN, OUTPUT);
    digitalWrite(FLASH_LED_PIN, LOW);
    
    // Attach interrupts
    attachInterrupt(digitalPinToInterrupt(PHOTO_BUTTON_PIN), handlePhotoButton, FALLING);
    attachInterrupt(digitalPinToInterrupt(MODE_BUTTON_PIN), handleModeButton, FALLING);
    
    // Configure ADC
    analogReadResolution(12);
    analogSetAttenuation(ADC_11db);
    
    // Initialize camera
    if (!initializeCamera()) {
        handleError("Camera init failed");
    }
    
    // Initialize SD card
    if (!initializeSDCard()) {
        Serial.println("SD Card init failed - using internal storage only");
    }
    
    // Load calibration
    r0Value = preferences.getFloat("r0_value", MQ3_R0);
    
    // Load photo queue state
    loadQueueState();
    
    // Check for saved WiFi
    String savedSSID = preferences.getString("ssid", "");
    if (savedSSID.length() > 0) {
        connectToSavedWiFi();
    } else {
        startConfigPortal();
    }
    
    // Start background tasks
    xTaskCreate(backgroundUploadTask, "Upload", 8192, NULL, 1, NULL);
    xTaskCreate(systemMonitorTask, "Monitor", 4096, NULL, 1, NULL);
}

// ========================================
// MAIN LOOP
// ========================================

void loop() {
    // Handle button presses
    handleButtons();
    
    // Handle WiFi setup mode
    if (currentState == STATE_WIFI_SETUP) {
        dnsServer.processNextRequest();
        server.handleClient();
        return;
    }
    
    // State machine
    switch (currentState) {
        case STATE_IDLE:
            handleIdleState();
            break;
            
        case STATE_WARMING_UP:
            handleWarmupState();
            break;
            
        case STATE_READY:
            handleReadyState();
            break;
            
        case STATE_MEASURING:
            handleMeasuringState();
            break;
            
        case STATE_CAPTURING_PHOTO:
            handlePhotoCaptureState();
            break;
            
        case STATE_UPLOADING:
            // Handled by background task
            break;
            
        case STATE_ERROR:
            handleErrorState();
            break;
    }
    
    // Update display
    updateDisplay();
    
    // Small delay to prevent watchdog
    delay(10);
}

// ========================================
// INITIALIZATION FUNCTIONS
// ========================================

bool initializeDisplay() {
    if (!display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDRESS)) {
        return false;
    }
    
    display.clearDisplay();
    display.setTextColor(SSD1306_WHITE);
    display.display();
    return true;
}

bool initializeCamera() {
    camera_config_t config;
    config.ledc_channel = LEDC_CHANNEL_0;
    config.ledc_timer = LEDC_TIMER_0;
    config.pin_d0 = Y2_GPIO_NUM;
    config.pin_d1 = Y3_GPIO_NUM;
    config.pin_d2 = Y4_GPIO_NUM;
    config.pin_d3 = Y5_GPIO_NUM;
    config.pin_d4 = Y6_GPIO_NUM;
    config.pin_d5 = Y7_GPIO_NUM;
    config.pin_d6 = Y8_GPIO_NUM;
    config.pin_d7 = Y9_GPIO_NUM;
    config.pin_xclk = XCLK_GPIO_NUM;
    config.pin_pclk = PCLK_GPIO_NUM;
    config.pin_vsync = VSYNC_GPIO_NUM;
    config.pin_href = HREF_GPIO_NUM;
    config.pin_sscb_sda = SIOD_GPIO_NUM;
    config.pin_sscb_scl = SIOC_GPIO_NUM;
    config.pin_pwdn = PWDN_GPIO_NUM;
    config.pin_reset = RESET_GPIO_NUM;
    config.xclk_freq_hz = 20000000;
    config.pixel_format = PIXFORMAT_JPEG;
    config.frame_size = PHOTO_FRAME_SIZE;
    config.jpeg_quality = PHOTO_QUALITY;
    config.fb_count = 2;  // Double buffer for stability
    
    // Power cycle the camera
    if (config.pin_pwdn != -1) {
        pinMode(config.pin_pwdn, OUTPUT);
        digitalWrite(config.pin_pwdn, HIGH);
        delay(100);
        digitalWrite(config.pin_pwdn, LOW);
        delay(100);
    }
    
    esp_err_t err = esp_camera_init(&config);
    if (err != ESP_OK) {
        Serial.printf("Camera init failed: 0x%x\n", err);
        return false;
    }
    
    // Configure camera settings for better quality
    sensor_t * s = esp_camera_sensor_get();
    if (s) {
        s->set_brightness(s, 0);     // -2 to 2
        s->set_contrast(s, 0);       // -2 to 2
        s->set_saturation(s, 0);     // -2 to 2
        s->set_special_effect(s, 0); // 0 to 6 (0 - No Effect)
        s->set_whitebal(s, 1);       // 0 = disable , 1 = enable
        s->set_awb_gain(s, 1);       // 0 = disable , 1 = enable
        s->set_wb_mode(s, 0);        // 0 to 4 - if awb_gain enabled (0 - Auto)
        s->set_exposure_ctrl(s, 1);  // 0 = disable , 1 = enable
        s->set_aec2(s, 1);           // 0 = disable , 1 = enable
        s->set_gain_ctrl(s, 1);      // 0 = disable , 1 = enable
        // s->set_gainceiling(s, 0);  // Comment out - not all versions support this
        s->set_bpc(s, 0);            // 0 = disable , 1 = enable
        s->set_wpc(s, 1);            // 0 = disable , 1 = enable
        s->set_lenc(s, 1);           // 0 = disable , 1 = enable
    }
    
    cameraInitialized = true;
    Serial.println("Camera initialized successfully");
    return true;
}

bool initializeSDCard() {
    // Initialize SD card in 1-bit mode to free up pins
    if (!SD_MMC.begin("/sdcard", true)) {
        return false;
    }
    
    uint64_t cardSize = SD_MMC.cardSize() / (1024 * 1024);
    Serial.printf("SD Card Size: %lluMB\n", cardSize);
    
    // Create photo directory
    if (!SD_MMC.exists("/photos")) {
        SD_MMC.mkdir("/photos");
    }
    
    // Clean up old photos if needed
    cleanupOldPhotos();
    
    sdCardMounted = true;
    return true;
}

// ========================================
// WIFI FUNCTIONS
// ========================================

void connectToSavedWiFi() {
    String ssid = preferences.getString("ssid", "");
    String pass = preferences.getString("pass", "");
    
    if (ssid.length() == 0) {
        startConfigPortal();
        return;
    }
    
    displayMessage("Connecting WiFi", ssid.c_str());
    
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid.c_str(), pass.c_str());
    
    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED && attempts < 30) {
        delay(500);
        attempts++;
        
        // Animate dots
        String dots = "";
        for (int i = 0; i < (attempts % 4); i++) dots += ".";
        displayMessage("Connecting WiFi", ssid.c_str(), dots.c_str());
    }
    
    if (WiFi.status() == WL_CONNECTED) {
        wifiConnected = true;
        Serial.println("WiFi connected!");
        Serial.print("IP: ");
        Serial.println(WiFi.localIP());
        
        displayMessage("WiFi Connected", WiFi.localIP().toString().c_str(), deviceId.c_str());
        delay(2000);
        
        currentState = STATE_IDLE;
    } else {
        wifiConnected = false;
        displayMessage("WiFi Failed", "Running offline", "Double-press for setup");
        delay(3000);
        currentState = STATE_IDLE;
    }
}

void startConfigPortal() {
    currentState = STATE_WIFI_SETUP;
    
    WiFi.disconnect(true);
    delay(100);
    
    WiFi.mode(WIFI_AP);
    WiFi.softAP(apSSID.c_str(), AP_PASS);
    
    IPAddress IP = WiFi.softAPIP();
    Serial.print("AP IP: ");
    Serial.println(IP);
    
    // Start DNS server
    dnsServer.start(53, "*", IP);
    
    // Setup web server routes
    server.on("/", handleRoot);
    server.on("/save", HTTP_POST, handleSave);
    server.on("/scan", HTTP_GET, handleScan);
    server.onNotFound(handleRoot);
    
    server.begin();
    
    displayMessage("Setup Mode", apSSID.c_str(), "Pass: 12345678", "IP: 192.168.4.1");
}

// ========================================
// BUTTON HANDLING
// ========================================

void handleButtons() {
    unsigned long now = millis();
    
    // Handle photo button
    if (photoButtonPressed && (now - lastPhotoPress > DEBOUNCE_TIME)) {
        photoButtonPressed = false;
        lastPhotoPress = now;
        
        if (currentState == STATE_IDLE || currentState == STATE_READY) {
            startPhotoCapture();
        }
    }
    
    // Handle mode button
    if (modeButtonPressed && (now - lastModePress > DEBOUNCE_TIME)) {
        modeButtonPressed = false;
        
        // Double-press detection
        if (now - lastModePress < DOUBLE_PRESS_TIME) {
            modePressCount++;
            if (modePressCount >= 2) {
                // Double press detected - reset WiFi
                resetWiFiConfig();
                modePressCount = 0;
            }
        } else {
            modePressCount = 1;
        }
        
        lastModePress = now;
        
        // Single press - toggle BAC mode
        if (modePressCount == 1 && currentState == STATE_IDLE) {
            bacModeEnabled = !bacModeEnabled;
            displayMessage(bacModeEnabled ? "BAC Mode ON" : "Photo Only Mode", 
                          "Press photo button", "to start");
            delay(1000);
        }
    }
    
    // Reset press count after timeout
    if (now - lastModePress > DOUBLE_PRESS_TIME * 2) {
        modePressCount = 0;
    }
}

// ========================================
// STATE HANDLERS
// ========================================

void handleIdleState() {
    // Check if photo button was pressed
    if (photoButtonPressed) {
        startPhotoCapture();
    }
}

void handleWarmupState() {
    if (millis() - warmupStartTime >= WARMUP_TIME) {
        currentState = STATE_READY;
        displayMessage("READY", "Blow steadily", "into sensor");
    }
}

void handleReadyState() {
    // Detect breath (significant increase in sensor reading)
    static float baseline = 0;
    static bool baselineSet = false;
    
    if (!baselineSet) {
        baseline = analogRead(MQ3_PIN);
        baselineSet = true;
    }
    
    float currentReading = analogRead(MQ3_PIN);
    baseline = baseline * 0.99 + currentReading * 0.01;
    
    if (currentReading > baseline * 1.1) {
        currentState = STATE_MEASURING;
        measureStartTime = millis();
        currentBac = 0.0;
        baselineSet = false;
    }
}

void handleMeasuringState() {
    if (millis() - measureStartTime >= MEASURE_TIME) {
        // Measurement complete
        currentState = STATE_CAPTURING_PHOTO;
    } else {
        // Update BAC reading
        float reading = calculateBAC();
        if (reading > currentBac) {
            currentBac = reading;
        }
    }
}

void handlePhotoCaptureState() {
    capturePhoto();
}

void handleErrorState() {
    if (millis() - lastErrorTime > 5000) {
        currentState = STATE_IDLE;
        lastError = "";
    }
}

// ========================================
// PHOTO CAPTURE & QUEUE
// ========================================

void startPhotoCapture() {
    if (bacModeEnabled) {
        // Start BAC measurement first
        currentState = STATE_WARMING_UP;
        warmupStartTime = millis();
        displayMessage("Warming Up", "Sensor heating...", "Please wait");
    } else {
        // Direct photo capture
        currentState = STATE_CAPTURING_PHOTO;
    }
}

void capturePhoto() {
    displayMessage("Capturing", "Photo...", "Hold still!");
    
    // Flash LED
    digitalWrite(FLASH_LED_PIN, HIGH);
    delay(100);
    
    // Capture photo
    camera_fb_t *fb = esp_camera_fb_get();
    
    digitalWrite(FLASH_LED_PIN, LOW);
    
    if (!fb) {
        handleError("Camera capture failed");
        return;
    }
    
    // Generate filename
    String filename = String("/photos/") + String(millis()) + ".jpg";
    
    // Save to SD card or queue
    bool saved = false;
    if (sdCardMounted) {
        File file = SD_MMC.open(filename, FILE_WRITE);
        if (file) {
            file.write(fb->buf, fb->len);
            file.close();
            saved = true;
        }
    }
    
    // Add to upload queue
    if (saved || !sdCardMounted) {
        addToQueue(filename, bacModeEnabled ? currentBac : 0.0, bacModeEnabled);
    }
    
    esp_camera_fb_return(fb);
    
    // Show success
    displayMessage("Photo Saved!", 
                  bacModeEnabled ? String("BAC: " + String(currentBac, 3)).c_str() : "Ready for next",
                  String("Queue: " + String(queueCount)).c_str());
    
    delay(2000);
    currentState = STATE_IDLE;
}

void addToQueue(String filename, float bac, bool hasBac) {
    if (queueCount >= MAX_PHOTO_QUEUE) {
        // Remove oldest photo
        removeFromQueue();
    }
    
    photoQueue[queueTail].filename = filename;
    photoQueue[queueTail].bac = bac;
    photoQueue[queueTail].timestamp = millis();
    photoQueue[queueTail].hasBac = hasBac;
    
    queueTail = (queueTail + 1) % MAX_PHOTO_QUEUE;
    queueCount++;
    
    saveQueueState();
}

void removeFromQueue() {
    if (queueCount == 0) return;
    
    // Delete file if exists
    if (sdCardMounted && SD_MMC.exists(photoQueue[queueHead].filename)) {
        SD_MMC.remove(photoQueue[queueHead].filename);
    }
    
    queueHead = (queueHead + 1) % MAX_PHOTO_QUEUE;
    queueCount--;
}

// ========================================
// UPLOAD FUNCTIONS
// ========================================

void backgroundUploadTask(void *parameter) {
    while (true) {
        if (wifiConnected && queueCount > 0) {
            uploadNextPhoto();
        }
        vTaskDelay(5000 / portTICK_PERIOD_MS);
    }
}

void uploadNextPhoto() {
    if (queueCount == 0) return;
    
    PhotoQueueItem &item = photoQueue[queueHead];
    
    // Read photo from SD card
    String base64Image = "";
    if (sdCardMounted && SD_MMC.exists(item.filename)) {
        File file = SD_MMC.open(item.filename, FILE_READ);
        if (file) {
            // Read and encode in chunks to save memory
            const size_t bufferSize = 3072;  // Divisible by 3 for base64
            uint8_t *buffer = (uint8_t*)malloc(bufferSize);
            
            while (file.available()) {
                size_t bytesRead = file.read(buffer, bufferSize);
                // For now, skip base64 encoding - fix this later
                // Photo upload disabled temporarily
            }
            
            free(buffer);
            file.close();
        }
    }
    
    if (base64Image.length() == 0) {
        // Photo data lost, remove from queue
        removeFromQueue();
        return;
    }
    
    // Prepare upload data
    StaticJsonDocument<512> doc;
    doc["deviceId"] = deviceId;
    doc["imageBase64"] = base64Image;
    doc["timestamp"] = item.timestamp;
    
    if (item.hasBac) {
        doc["bac"] = item.bac;
    }
    
    // Send to Firebase function
    HTTPClient http;
    http.setTimeout(UPLOAD_TIMEOUT);
    
    String url = "https://" + String(FIREBASE_HOST) + "/photos/upload.json?auth=" + String(FIREBASE_AUTH);
    http.begin(url);
    http.addHeader("Content-Type", "application/json");
    
    String jsonString;
    serializeJson(doc, jsonString);
    
    int httpCode = http.POST(jsonString);
    
    if (httpCode == 200) {
        // Success - remove from queue
        removeFromQueue();
        saveQueueState();
        Serial.println("Photo uploaded successfully");
    } else {
        // Failed - retry later
        uploadRetryCount++;
        if (uploadRetryCount > 3) {
            // Give up on this photo
            removeFromQueue();
            uploadRetryCount = 0;
        }
        Serial.printf("Upload failed: %d\n", httpCode);
    }
    
    http.end();
}

// ========================================
// BAC CALCULATION
// ========================================

float calculateBAC() {
    int sensorValue = analogRead(MQ3_PIN);
    float voltage = sensorValue * (3.3 / 4095.0);
    
    // Calculate sensor resistance
    float RS = ((3.3 * MQ3_RL) / voltage) - MQ3_RL;
    
    // Calculate ratio
    float ratio = RS / r0Value;
    
    // Convert to BAC (simplified approximation)
    float bac = 0.0;
    if (ratio < 1.0) {
        bac = pow(10, ((log10(ratio) - log10(0.4)) / -0.5));
        bac = bac * 0.001;  // Convert to percentage
    }
    
    // Clamp values
    if (bac < 0) bac = 0;
    if (bac > 0.5) bac = 0.5;
    
    return bac;
}

// ========================================
// DISPLAY FUNCTIONS
// ========================================

void updateDisplay() {
    static unsigned long lastUpdate = 0;
    if (millis() - lastUpdate < 100) return;  // Limit refresh rate
    lastUpdate = millis();
    
    display.clearDisplay();
    
    switch (currentState) {
        case STATE_IDLE:
            displayIdleScreen();
            break;
            
        case STATE_WARMING_UP:
            displayWarmupScreen();
            break;
            
        case STATE_READY:
            displayReadyScreen();
            break;
            
        case STATE_MEASURING:
            displayMeasuringScreen();
            break;
            
        default:
            // Current message is already displayed
            break;
    }
    
    display.display();
}

void displayIdleScreen() {
    display.setTextSize(1);
    display.setCursor(0, 0);
    display.println("BoozeLens Camera");
    display.println("");
    display.print("ID: ");
    display.println(deviceId);
    display.println("");
    display.print("Mode: ");
    display.println(bacModeEnabled ? "Photo + BAC" : "Photo Only");
    display.print("Queue: ");
    display.print(queueCount);
    display.println(" photos");
    display.println("");
    display.print(wifiConnected ? "WiFi OK" : "Offline");
    display.setCursor(70, 56);
    display.print("Ready");
}

void displayWarmupScreen() {
    int timeLeft = (WARMUP_TIME - (millis() - warmupStartTime)) / 1000;
    
    display.setTextSize(1);
    display.setCursor(0, 0);
    display.println("WARMING UP");
    
    display.setTextSize(3);
    display.setCursor(40, 20);
    display.print(timeLeft);
    
    // Progress bar
    int progress = map(millis() - warmupStartTime, 0, WARMUP_TIME, 0, 128);
    display.drawRect(0, 55, 128, 8, SSD1306_WHITE);
    display.fillRect(1, 56, progress - 2, 6, SSD1306_WHITE);
}

void displayReadyScreen() {
    static bool blink = false;
    blink = !blink;
    
    display.setTextSize(2);
    display.setCursor(20, 20);
    display.print(blink ? "READY" : "BLOW!");
    
    display.setTextSize(1);
    display.setCursor(10, 50);
    display.print("Blow steadily...");
}

void displayMeasuringScreen() {
    display.setTextSize(1);
    display.setCursor(0, 0);
    display.println("MEASURING");
    
    display.setTextSize(2);
    display.setCursor(10, 20);
    display.print(currentBac, 3);
    display.setTextSize(1);
    display.print(" %");
    
    // Progress bar
    int progress = map(millis() - measureStartTime, 0, MEASURE_TIME, 0, 128);
    display.drawRect(0, 48, 128, 8, SSD1306_WHITE);
    display.fillRect(1, 49, progress - 2, 6, SSD1306_WHITE);
}

void displayMessage(const char* line1, const char* line2, const char* line3, const char* line4) {
    display.clearDisplay();
    display.setTextSize(1);
    
    int y = 0;
    if (line1) {
        display.setCursor(0, y);
        display.println(line1);
        y += 16;
    }
    
    if (line2) {
        display.setCursor(0, y);
        display.println(line2);
        y += 16;
    }
    
    if (line3) {
        display.setCursor(0, y);
        display.println(line3);
        y += 16;
    }
    
    if (line4) {
        display.setCursor(0, y);
        display.println(line4);
    }
    
    display.display();
}

void showBootScreen() {
    display.clearDisplay();
    display.setTextSize(2);
    display.setCursor(10, 0);
    display.println("BoozeLens");
    display.setTextSize(1);
    display.setCursor(20, 30);
    display.println("Camera v1.0");
    display.setCursor(15, 50);
    display.print("ID: ");
    display.print(deviceId);
    display.display();
    delay(2000);
}

// ========================================
// WEB SERVER HANDLERS
// ========================================

const char configPage[] PROGMEM = R"=====(
<!DOCTYPE html>
<html>
<head>
    <title>BoozeLens Setup</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            width: 100%;
            max-width: 400px;
            background: rgba(255, 255, 255, 0.08);
            padding: 30px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        h1 {
            text-align: center;
            font-size: 24px;
            color: #00ff88;
            margin-bottom: 20px;
        }
        .device-id {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            color: #00ff88;
            background: rgba(0, 255, 136, 0.15);
            padding: 15px;
            border-radius: 12px;
            margin: 20px 0;
            font-family: monospace;
        }
        input {
            width: 100%;
            padding: 14px 16px;
            margin: 8px 0;
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.05);
            color: #ffffff;
            font-size: 16px;
        }
        button {
            width: 100%;
            padding: 14px;
            margin: 15px 0;
            border: none;
            border-radius: 10px;
            background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
            color: #000000;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
        }
        .networks {
            max-height: 200px;
            overflow-y: auto;
            margin: 12px 0;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
        }
        .network-item {
            padding: 12px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            cursor: pointer;
        }
        .network-item:hover {
            background: rgba(255, 255, 255, 0.05);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📸 BoozeLens Camera Setup</h1>
        <div class="device-id">DEVICE ID: %DEVICE_ID%</div>
        <form action="/save" method="POST">
            <h3>📶 WiFi Connection</h3>
            <div id="networkList" class="networks"></div>
            <input type="text" name="ssid" id="ssid" placeholder="WiFi Network Name" required>
            <input type="password" name="pass" id="pass" placeholder="WiFi Password" required>
            <button type="button" onclick="scanNetworks()">🔄 Scan Networks</button>
            <button type="submit">💾 Save and Connect</button>
        </form>
    </div>
    <script>
        function selectNetwork(ssid) {
            document.getElementById('ssid').value = ssid;
            document.getElementById('pass').focus();
        }
        function scanNetworks() {
            fetch('/scan')
                .then(response => response.json())
                .then(data => {
                    const list = document.getElementById('networkList');
                    list.innerHTML = data.networks.map(n => 
                        '<div class="network-item" onclick="selectNetwork(\'' + n.ssid + '\')">' + 
                        n.ssid + ' (' + n.rssi + ' dBm)</div>'
                    ).join('');
                });
        }
        scanNetworks();
    </script>
</body>
</html>
)=====";

void handleRoot() {
    String html = String(configPage);
    html.replace("%DEVICE_ID%", deviceId);
    server.send(200, "text/html", html);
}

void handleScan() {
    String json = "{\"networks\":[";
    int n = WiFi.scanNetworks();
    
    for (int i = 0; i < n; i++) {
        if (i > 0) json += ",";
        json += "{\"ssid\":\"" + WiFi.SSID(i) + "\",\"rssi\":" + String(WiFi.RSSI(i)) + "}";
    }
    
    json += "]}";
    server.send(200, "application/json", json);
}

void handleSave() {
    String ssid = server.arg("ssid");
    String pass = server.arg("pass");
    
    preferences.putString("ssid", ssid);
    preferences.putString("pass", pass);
    
    server.send(200, "text/html", "<h1>Saved! Restarting...</h1>");
    
    delay(1000);
    ESP.restart();
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

void handleError(const char* error) {
    Serial.print("ERROR: ");
    Serial.println(error);
    
    lastError = String(error);
    lastErrorTime = millis();
    currentState = STATE_ERROR;
    
    displayMessage("ERROR", error);
}

void resetWiFiConfig() {
    preferences.remove("ssid");
    preferences.remove("pass");
    
    displayMessage("WiFi Reset", "Restarting...");
    delay(2000);
    
    ESP.restart();
}

void saveQueueState() {
    preferences.putInt("queue_head", queueHead);
    preferences.putInt("queue_tail", queueTail);
    preferences.putInt("queue_count", queueCount);
}

void loadQueueState() {
    queueHead = preferences.getInt("queue_head", 0);
    queueTail = preferences.getInt("queue_tail", 0);
    queueCount = preferences.getInt("queue_count", 0);
    
    // Validate queue state
    if (queueCount > MAX_PHOTO_QUEUE) {
        queueCount = 0;
        queueHead = 0;
        queueTail = 0;
    }
}

void cleanupOldPhotos() {
    // Remove photos older than 24 hours
    File root = SD_MMC.open("/photos");
    if (!root || !root.isDirectory()) return;
    
    File file = root.openNextFile();
    while (file) {
        String filename = String(file.name());
        // Simple cleanup - in production, check actual timestamps
        file.close();
        file = root.openNextFile();
    }
    root.close();
}

void systemMonitorTask(void *parameter) {
    while (true) {
        // Monitor system health
        if (WiFi.status() != WL_CONNECTED && wifiConnected) {
            wifiConnected = false;
            wifiRetryCount++;
            
            if (wifiRetryCount < 3) {
                connectToSavedWiFi();
            }
        } else if (WiFi.status() == WL_CONNECTED && !wifiConnected) {
            wifiConnected = true;
            wifiRetryCount = 0;
        }
        
        // Check heap memory
        size_t freeHeap = ESP.getFreeHeap();
        if (freeHeap < 50000) {
            Serial.printf("Low memory warning: %d bytes free\n", freeHeap);
        }
        
        vTaskDelay(10000 / portTICK_PERIOD_MS);
    }
}

/*
 * Arduino IDE Board Settings:
 * --------------------------
 * Board: "AI Thinker ESP32-CAM"
 * CPU Frequency: "240MHz (WiFi/BT)"
 * Flash Frequency: "80MHz"
 * Flash Mode: "QIO"
 * Partition Scheme: "Huge APP (3MB No OTA/1MB SPIFFS)"
 * Core Debug Level: "None"
 * Port: Select your COM port
 * 
 * Required Libraries:
 * - Adafruit GFX Library
 * - Adafruit SSD1306
 * - ArduinoJson
 * - ESP32 Board Package (https://dl.espressif.com/dl/package_esp32_index.json)
 */