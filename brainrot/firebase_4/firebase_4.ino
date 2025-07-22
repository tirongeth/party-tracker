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

// Display settings
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
#define SCREEN_ADDRESS 0x3C  // Try 0x3D if display doesn't work
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Pin definitions
#define MQ3_PIN 4       // GPIO4 for MQ3 analog output
#define SWITCH_PIN 13   // GPIO13 for switch input
#define SDA_PIN 8      // GPIO21 for I2C SDA
#define SCL_PIN 18      // GPIO22 for I2C SCL
#define LED_PIN 2       // Built-in LED for status

// Access Point settings for WiFi setup
const char* AP_SSID_PREFIX = "HSG_Breath_";
const char* AP_PASS = "12345678";

// Firebase configuration
const char* firebaseHost = "hsg-party-tracker-default-rtdb.europe-west1.firebasedatabase.app";
const char* firebaseAuth = "AIzaSyCuOjiHa8C0jgAte40E774CRJROTWTUdmg";

// Device configuration
String deviceId;
String apSSID;
String userName = "Anonymous";
String userEmail = "";

// MQ3 calibration values
#define MQ3_R0 10.0
#define MQ3_RL 10.0

// Timing constants
#define WARMUP_TIME 20000      // 20 seconds warmup
#define MEASURE_TIME 5000      // 5 seconds measurement
#define LONG_PRESS_TIME 3000   // 3 seconds for factory reset
#define TRIPLE_CLICK_TIME 1000 // 1 second window for triple click

// System states
enum State {
  OFF,
  WIFI_SETUP,
  WARMING_UP,
  READY,
  MEASURING,
  DISPLAYING_RESULT,
  FACTORY_RESET
};

State currentState = OFF;
unsigned long stateStartTime = 0;
float bacReading = 0.0;
bool wifiConnected = false;
bool displayWorking = false;
unsigned long lastActivity = 0;

// Button handling
unsigned long buttonPressStart = 0;
bool buttonPressed = false;
int clickCount = 0;
unsigned long lastClickTime = 0;

// Preferences for storing settings
Preferences preferences;

// Web server for configuration
WebServer server(80);
DNSServer dnsServer;
const byte DNS_PORT = 53;

// Simple HTML page for setup
const char configPage[] PROGMEM = R"=====(
<!DOCTYPE html>
<html>
<head>
    <title>HSG Breathalyzer Setup</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #1a1a2e;
            color: white;
            padding: 20px;
            margin: 0;
        }
        .container {
            max-width: 400px;
            margin: 0 auto;
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 20px;
        }
        h1 {
            text-align: center;
            color: #00ff88;
        }
        .device-id {
            text-align: center;
            font-size: 1.5em;
            font-weight: bold;
            color: #00ff88;
            background: rgba(0,255,136,0.1);
            padding: 15px;
            border-radius: 15px;
            margin: 20px 0;
            font-family: monospace;
        }
        input {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 1px solid #00ff88;
            border-radius: 10px;
            background: rgba(255,255,255,0.1);
            color: white;
            font-size: 16px;
            box-sizing: border-box;
        }
        button {
            width: 100%;
            padding: 15px;
            margin: 20px 0;
            border: none;
            border-radius: 10px;
            background: linear-gradient(45deg, #00ff88, #00d4ff);
            color: black;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
        }
        button:hover {
            opacity: 0.9;
        }
        .info {
            background: rgba(0,255,136,0.1);
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: center;
        }
        .error {
            color: #ff4444;
            text-align: center;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>HSG Breathalyzer Setup</h1>
        
        <div class="device-id">
            Device ID: %DEVICE_ID%
        </div>
        
        <div class="info">
            <p>Save this Device ID to pair with the app!</p>
        </div>
        
        <form action="/save" method="POST">
            <h3>1. WiFi Settings</h3>
            <input type="text" name="ssid" placeholder="WiFi Network Name" required>
            <input type="password" name="pass" placeholder="WiFi Password" required>
            
            <h3>2. User Info (Optional)</h3>
            <input type="text" name="name" placeholder="Your Name">
            <input type="email" name="email" placeholder="Your Email">
            
            <button type="submit">Save & Connect</button>
        </form>
        
        <div style="text-align: center; margin-top: 20px;">
            <button onclick="location.href='/reset'" style="background: #ff4444;">Factory Reset</button>
        </div>
    </div>
</body>
</html>
)=====";

void setup() {
  Serial.begin(115200);
  delay(100);
  Serial.println("\n\n========================================");
  Serial.println("HSG Breathalyzer Starting...");
  Serial.println("========================================");
  
  // Initialize button
  pinMode(SWITCH_PIN, INPUT_PULLUP);
  
  // Initialize LED if available
  if (LED_PIN >= 0) {
    pinMode(LED_PIN, OUTPUT);
    digitalWrite(LED_PIN, LOW);
  }
  
  // Initialize MQ3 sensor
  pinMode(MQ3_PIN, INPUT);
  
  // Generate unique device ID
  uint64_t chipid = ESP.getEfuseMac();
  deviceId = "HSG_" + String((uint32_t)chipid, HEX);
  deviceId.toUpperCase();
  apSSID = String(AP_SSID_PREFIX) + String((uint32_t)chipid, HEX);
  
  Serial.print("Device ID: ");
  Serial.println(deviceId);
  
  // Initialize I2C with retry
  Wire.begin(SDA_PIN, SCL_PIN);
  delay(100);
  
  // Initialize display with better error handling
  displayWorking = initDisplay();
  
  if (!displayWorking) {
    Serial.println("Display not working - continuing without display");
    // Continue operation without display
  }
  
  // Show startup screen
  showStartupScreen();
  
  // Initialize preferences
  preferences.begin("breathalyzer", false);
  
  // Check for factory reset request (hold button during boot)
  if (digitalRead(SWITCH_PIN) == LOW) {
    unsigned long startPress = millis();
    showMessage("Hold for reset...", "", 2);
    
    while (digitalRead(SWITCH_PIN) == LOW && (millis() - startPress < 5000)) {
      int progress = map(millis() - startPress, 0, 5000, 0, 100);
      showProgress("Factory Reset", progress);
      delay(50);
    }
    
    if (millis() - startPress >= 5000) {
      performFactoryReset();
      return;
    }
  }
  
  // Check if WiFi credentials are saved
  String savedSSID = preferences.getString("ssid", "");
  
  if (savedSSID.length() > 0) {
    connectToSavedWiFi();
  } else {
    Serial.println("No saved WiFi - entering setup mode");
    enterSetupMode();
  }
  
  lastActivity = millis();
}

void loop() {
  // Handle button input
  handleButton();
  
  // Handle different states
  switch(currentState) {
    case WIFI_SETUP:
      handleSetupMode();
      break;
      
    case OFF:
      handleOffState();
      break;
      
    case WARMING_UP:
      handleWarmupState();
      break;
      
    case READY:
      handleReadyState();
      break;
      
    case MEASURING:
      handleMeasuringState();
      break;
      
    case DISPLAYING_RESULT:
      handleResultState();
      break;
      
    case FACTORY_RESET:
      performFactoryReset();
      break;
  }
  
  // Check WiFi connection
  if (currentState != WIFI_SETUP && currentState != OFF) {
    checkWiFiConnection();
  }
  
  delay(10);
}

// Initialize display with better error handling
bool initDisplay() {
  Serial.println("Initializing display...");
  
  // Try primary address
  if (display.begin(SSD1306_SWITCHCAPVCC, SCREEN_ADDRESS)) {
    Serial.println("Display initialized at 0x3C");
    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SSD1306_WHITE);
    display.display();
    return true;
  }
  
  // Try alternate address
  if (display.begin(SSD1306_SWITCHCAPVCC, 0x3D)) {
    Serial.println("Display initialized at 0x3D");
    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SSD1306_WHITE);
    display.display();
    return true;
  }
  
  Serial.println("Display initialization failed!");
  return false;
}

// Button handling with multiple click detection
void handleButton() {
  bool currentState = digitalRead(SWITCH_PIN);
  
  // Button pressed
  if (currentState == LOW && !buttonPressed) {
    buttonPressed = true;
    buttonPressStart = millis();
    
    // Check for multiple clicks
    if (millis() - lastClickTime < 500) {
      clickCount++;
    } else {
      clickCount = 1;
    }
    lastClickTime = millis();
  }
  
  // Button released
  if (currentState == HIGH && buttonPressed) {
    buttonPressed = false;
    unsigned long pressDuration = millis() - buttonPressStart;
    
    // Long press for factory reset
    if (pressDuration >= LONG_PRESS_TIME) {
      currentState = FACTORY_RESET;
      return;
    }
  }
  
  // Check for triple click (setup mode)
  if (clickCount >= 3 && millis() - lastClickTime < TRIPLE_CLICK_TIME) {
    Serial.println("Triple click detected - entering setup mode");
    enterSetupMode();
    clickCount = 0;
  }
  
  // Reset click count after timeout
  if (millis() - lastClickTime > TRIPLE_CLICK_TIME) {
    clickCount = 0;
  }
}

// State handlers
void handleOffState() {
  if (digitalRead(SWITCH_PIN) == LOW) {
    currentState = WARMING_UP;
    stateStartTime = millis();
    lastActivity = millis();
  }
  
  showIdleScreen();
}

void handleWarmupState() {
  if (digitalRead(SWITCH_PIN) == HIGH) {
    currentState = OFF;
    return;
  }
  
  int timeLeft = (WARMUP_TIME - (millis() - stateStartTime)) / 1000;
  
  if (timeLeft <= 0) {
    currentState = READY;
    playReadyTone();
  } else {
    showWarmupScreen(timeLeft);
  }
}

void handleReadyState() {
  if (digitalRead(SWITCH_PIN) == HIGH) {
    currentState = OFF;
    return;
  }
  
  if (detectBreath()) {
    currentState = MEASURING;
    stateStartTime = millis();
    bacReading = 0.0;
  }
  
  showReadyScreen();
}

void handleMeasuringState() {
  if (digitalRead(SWITCH_PIN) == HIGH) {
    currentState = OFF;
    return;
  }
  
  float currentReading = calculateBAC();
  if (currentReading > bacReading) {
    bacReading = currentReading;
  }
  
  int progress = map(millis() - stateStartTime, 0, MEASURE_TIME, 0, 100);
  showMeasuringScreen(progress);
  
  if (millis() - stateStartTime >= MEASURE_TIME) {
    currentState = DISPLAYING_RESULT;
    stateStartTime = millis();
    sendToFirebase();
    playResultTone();
  }
}

void handleResultState() {
  showResultScreen();
  
  if (digitalRead(SWITCH_PIN) == HIGH) {
    currentState = OFF;
  }
}

void handleSetupMode() {
  dnsServer.processNextRequest();
  server.handleClient();
  
  // Blink LED in setup mode
  if (LED_PIN >= 0) {
    digitalWrite(LED_PIN, (millis() / 500) % 2);
  }
  
  showSetupScreen();
}

// Enter setup mode
void enterSetupMode() {
  currentState = WIFI_SETUP;
  
  // Disconnect any existing connection
  WiFi.disconnect(true);
  delay(100);
  
  // Start Access Point
  WiFi.mode(WIFI_AP);
  WiFi.softAP(apSSID.c_str(), AP_PASS);
  
  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP Started. SSID: ");
  Serial.println(apSSID);
  Serial.print("IP: ");
  Serial.println(IP);
  
  // Start DNS server
  dnsServer.start(DNS_PORT, "*", IP);
  
  // Setup web server
  server.on("/", handleRoot);
  server.on("/save", HTTP_POST, handleSave);
  server.on("/reset", HTTP_GET, handleWebReset);
  server.onNotFound(handleRoot);
  
  server.begin();
}

// Web handlers
void handleRoot() {
  String html = String(configPage);
  html.replace("%DEVICE_ID%", deviceId);
  server.send(200, "text/html", html);
}

void handleSave() {
  String ssid = server.arg("ssid");
  String pass = server.arg("pass");
  String name = server.arg("name");
  String email = server.arg("email");
  
  // Save to preferences
  preferences.putString("ssid", ssid);
  preferences.putString("pass", pass);
  preferences.putString("name", name);
  preferences.putString("email", email);
  
  server.send(200, "text/html", "<h1>Settings saved! Device will restart...</h1>");
  
  delay(2000);
  ESP.restart();
}

void handleWebReset() {
  server.send(200, "text/html", "<h1>Factory reset initiated...</h1>");
  delay(1000);
  performFactoryReset();
}

// Connect to saved WiFi
void connectToSavedWiFi() {
  String ssid = preferences.getString("ssid", "");
  String pass = preferences.getString("pass", "");
  userName = preferences.getString("name", "Anonymous");
  userEmail = preferences.getString("email", "");
  
  if (ssid.length() == 0) {
    enterSetupMode();
    return;
  }
  
  showMessage("Connecting to", ssid, 1);
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid.c_str(), pass.c_str());
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(500);
    Serial.print(".");
    showProgress("Connecting WiFi", (attempts * 100) / 30);
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    wifiConnected = true;
    Serial.println("\nWiFi Connected!");
    showMessage("WiFi Connected!", WiFi.localIP().toString(), 1);
    delay(2000);
  } else {
    wifiConnected = false;
    showMessage("WiFi Failed!", "Triple-click for setup", 2);
    delay(3000);
  }
  
  currentState = OFF;
}

// Factory reset
void performFactoryReset() {
  showMessage("FACTORY RESET", "Please wait...", 2);
  
  // Clear all preferences
  preferences.clear();
  preferences.end();
  
  // Clear WiFi settings
  WiFi.disconnect(true);
  
  delay(2000);
  showMessage("Reset Complete", "Restarting...", 1);
  delay(2000);
  
  ESP.restart();
}

// Sensor functions
bool detectBreath() {
  static float baseline = 0;
  static bool baselineSet = false;
  
  if (!baselineSet) {
    baseline = analogRead(MQ3_PIN);
    baselineSet = true;
  }
  
  float current = analogRead(MQ3_PIN);
  baseline = baseline * 0.95 + current * 0.05;
  
  return (current > baseline * 1.1);
}

float calculateBAC() {
  int sensorValue = analogRead(MQ3_PIN);
  float voltage = sensorValue * (3.3 / 4095.0);
  
  float RS = ((3.3 * MQ3_RL) / voltage) - MQ3_RL;
  float ratio = RS / MQ3_R0;
  
  float bac = 0.0;
  if (ratio < 1.0) {
    bac = pow(10, ((log10(ratio) - log10(0.4)) / -0.5)) * 0.001;
  }
  
  if (bac < 0) bac = 0;
  if (bac > 0.5) bac = 0.5;
  
  return bac;
}

// Send data to Firebase
void sendToFirebase() {
  if (!wifiConnected || WiFi.status() != WL_CONNECTED) {
    Serial.println("No WiFi - data not sent");
    return;
  }
  
  HTTPClient http;
  String url = "https://" + String(firebaseHost) + "/readings/" + deviceId + ".json?auth=" + String(firebaseAuth);
  
  StaticJsonDocument<512> doc;
  doc["bac"] = bacReading;
  doc["device"] = deviceId;
  doc["user"] = userName;
  doc["email"] = userEmail;
  doc["timestamp"] = millis();
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  
  int httpCode = http.PUT(jsonString);
  Serial.printf("Firebase response: %d\n", httpCode);
  
  http.end();
}

// Display functions
void showMessage(String line1, String line2, int textSize) {
  if (!displayWorking) return;
  
  display.clearDisplay();
  display.setTextSize(textSize);
  
  // Center line 1
  int16_t x1, y1;
  uint16_t w1, h1;
  display.getTextBounds(line1, 0, 0, &x1, &y1, &w1, &h1);
  display.setCursor((SCREEN_WIDTH - w1) / 2, 10);
  display.print(line1);
  
  // Center line 2
  if (line2.length() > 0) {
    display.getTextBounds(line2, 0, 0, &x1, &y1, &w1, &h1);
    display.setCursor((SCREEN_WIDTH - w1) / 2, 35);
    display.print(line2);
  }
  
  display.display();
}

void showProgress(String title, int percent) {
  if (!displayWorking) return;
  
  display.clearDisplay();
  display.setTextSize(1);
  
  // Title
  int16_t x1, y1;
  uint16_t w1, h1;
  display.getTextBounds(title, 0, 0, &x1, &y1, &w1, &h1);
  display.setCursor((SCREEN_WIDTH - w1) / 2, 10);
  display.print(title);
  
  // Progress bar
  display.drawRect(10, 30, 108, 10, SSD1306_WHITE);
  display.fillRect(12, 32, (percent * 104) / 100, 6, SSD1306_WHITE);
  
  // Percentage
  String pct = String(percent) + "%";
  display.getTextBounds(pct, 0, 0, &x1, &y1, &w1, &h1);
  display.setCursor((SCREEN_WIDTH - w1) / 2, 45);
  display.print(pct);
  
  display.display();
}

void showStartupScreen() {
  showMessage("HSG Breathalyzer", "Version 2.0", 1);
  delay(1000);
  showMessage("Device ID:", deviceId, 1);
  delay(2000);
}

void showIdleScreen() {
  if (!displayWorking) return;
  
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("HSG Breathalyzer");
  display.println("");
  display.print("ID: ");
  display.println(deviceId);
  display.println("");
  display.println("Press to start");
  display.println("");
  display.print(wifiConnected ? "WiFi: OK" : "WiFi: OFF");
  display.setCursor(75, 56);
  display.print("3x=Setup");
  display.display();
}

void showSetupScreen() {
  if (!displayWorking) return;
  
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("== SETUP MODE ==");
  display.println("");
  display.println("Connect to WiFi:");
  display.println(apSSID);
  display.println("");
  display.println("Password:");
  display.println(AP_PASS);
  display.println("");
  display.print("Open: 192.168.4.1");
  display.display();
}

void showWarmupScreen(int seconds) {
  showMessage("WARMING UP", String(seconds) + " seconds", 2);
}

void showReadyScreen() {
  if ((millis() / 500) % 2) {
    showMessage("READY", "BLOW NOW!", 2);
  } else {
    showMessage("", "BLOW NOW!", 2);
  }
}

void showMeasuringScreen(int progress) {
  if (!displayWorking) return;
  
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(10, 5);
  display.print("MEASURING");
  
  display.setTextSize(1);
  display.setCursor(30, 30);
  display.print("BAC: ");
  display.print(bacReading, 3);
  
  // Progress bar
  display.drawRect(10, 45, 108, 8, SSD1306_WHITE);
  display.fillRect(12, 47, (progress * 104) / 100, 4, SSD1306_WHITE);
  
  display.display();
}

void showResultScreen() {
  if (!displayWorking) return;
  
  display.clearDisplay();
  
  // BAC value
  display.setTextSize(3);
  display.setCursor(20, 5);
  display.print(bacReading, 2);
  
  display.setTextSize(1);
  display.setCursor(85, 15);
  display.print("o/oo");
  
  // Status
  display.setTextSize(2);
  display.setCursor(10, 35);
  
  if (bacReading < 0.02) {
    display.print("SAFE");
  } else if (bacReading < 0.05) {
    display.print("CAUTION");
  } else if (bacReading < 0.08) {
    display.print("NO DRIVE");
  } else {
    display.print("DANGER!");
  }
  
  display.setTextSize(1);
  display.setCursor(0, 55);
  display.print(wifiConnected ? "Uploaded" : "Offline");
  
  display.display();
}

// Check WiFi connection
void checkWiFiConnection() {
  static unsigned long lastCheck = 0;
  
  if (millis() - lastCheck > 10000) {  // Check every 10 seconds
    lastCheck = millis();
    
    if (WiFi.status() != WL_CONNECTED) {
      wifiConnected = false;
      WiFi.reconnect();
    } else {
      wifiConnected = true;
    }
  }
}

// LED feedback
void setLED(bool state) {
  if (LED_PIN >= 0) {
    digitalWrite(LED_PIN, state);
  }
}

void playReadyTone() {
  for(int i = 0; i < 3; i++) {
    setLED(true);
    delay(100);
    setLED(false);
    delay(100);
  }
}

void playResultTone() {
  if (bacReading < 0.02) {
    // Safe
    setLED(true);
    delay(500);
    setLED(false);
  } else if (bacReading < 0.08) {
    // Caution
    for(int i = 0; i < 2; i++) {
      setLED(true);
      delay(200);
      setLED(false);
      delay(200);
    }
  } else {
    // Danger
    for(int i = 0; i < 5; i++) {
      setLED(true);
      delay(100);
      setLED(false);
      delay(100);
    }
  }
}