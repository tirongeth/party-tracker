/*
 * ESP32-S3 Master - BoozeLens Brain
 * Controls everything, uses ESP32-CAM just for photos
 */

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <HardwareSerial.h>

// OLED Configuration (adjust pins as needed for your S3)
#define SDA_PIN 8
#define SCL_PIN 9
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// Serial2 for ESP32-CAM communication
HardwareSerial CamSerial(2);

// Button pins (adjust for your S3)
#define PHOTO_BUTTON 0
#define MODE_BUTTON 1

// MQ3 sensor
#define MQ3_PIN 4

bool bacMode = false;

void setup() {
    Serial.begin(115200);
    
    // Initialize Serial2 for ESP32-CAM (TX=17, RX=16)
    CamSerial.begin(115200, SERIAL_8N1, 16, 17);
    
    // Initialize I2C and OLED
    Wire.begin(SDA_PIN, SCL_PIN);
    if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        Serial.println("OLED init failed!");
    }
    
    // Initialize buttons
    pinMode(PHOTO_BUTTON, INPUT_PULLUP);
    pinMode(MODE_BUTTON, INPUT_PULLUP);
    pinMode(MQ3_PIN, INPUT);
    
    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SSD1306_WHITE);
    display.setCursor(0,0);
    display.println("BoozeLens S3+CAM");
    display.println("Waiting for camera...");
    display.display();
    
    // Wait for camera ready signal
    waitForCamera();
}

void loop() {
    // Check buttons
    if (digitalRead(PHOTO_BUTTON) == LOW) {
        delay(50); // debounce
        if (digitalRead(PHOTO_BUTTON) == LOW) {
            takePhoto();
            while(digitalRead(PHOTO_BUTTON) == LOW); // wait for release
        }
    }
    
    if (digitalRead(MODE_BUTTON) == LOW) {
        delay(50);
        if (digitalRead(MODE_BUTTON) == LOW) {
            bacMode = !bacMode;
            updateDisplay();
            while(digitalRead(MODE_BUTTON) == LOW);
        }
    }
}

void waitForCamera() {
    // Send init command to camera
    CamSerial.println("INIT");
    
    unsigned long timeout = millis() + 5000;
    while (millis() < timeout) {
        if (CamSerial.available()) {
            String response = CamSerial.readStringUntil('\n');
            if (response == "READY") {
                display.clearDisplay();
                display.setCursor(0,0);
                display.println("Camera Ready!");
                display.display();
                delay(1000);
                updateDisplay();
                return;
            }
        }
    }
    
    display.clearDisplay();
    display.setCursor(0,0);
    display.println("Camera timeout!");
    display.display();
}

void takePhoto() {
    display.clearDisplay();
    display.setCursor(0,0);
    display.println("Taking photo...");
    display.display();
    
    float bac = 0;
    if (bacMode) {
        // Take BAC reading
        bac = readBAC();
        display.print("BAC: ");
        display.print(bac, 3);
        display.println("%");
        display.display();
    }
    
    // Request photo from camera
    CamSerial.println("PHOTO");
    
    // Wait for response
    unsigned long timeout = millis() + 3000;
    while (millis() < timeout) {
        if (CamSerial.available()) {
            String response = CamSerial.readStringUntil('\n');
            if (response.startsWith("SIZE:")) {
                int photoSize = response.substring(5).toInt();
                display.println("Photo captured!");
                display.print("Size: ");
                display.print(photoSize / 1024);
                display.println(" KB");
                display.display();
                
                // Here you would receive the actual photo data
                // For now, just acknowledge
                delay(2000);
                updateDisplay();
                return;
            }
        }
    }
    
    display.println("Photo failed!");
    display.display();
    delay(2000);
    updateDisplay();
}

float readBAC() {
    // Simple BAC calculation
    int sensorValue = analogRead(MQ3_PIN);
    float voltage = sensorValue * (3.3 / 4095.0);
    float bac = voltage * 0.1; // Simplified - needs calibration
    return bac;
}

void updateDisplay() {
    display.clearDisplay();
    display.setCursor(0,0);
    display.println("BoozeLens Ready");
    display.println("");
    display.print("Mode: ");
    display.println(bacMode ? "Photo + BAC" : "Photo Only");
    display.println("");
    display.println("Press button to");
    display.println("take photo");
    display.display();
}