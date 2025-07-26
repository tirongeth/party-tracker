/*
 * Simple OLED Test for ESP32-CAM
 * Using GPIO 8 (SDA) and GPIO 18 (SCL)
 */

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1

// Use GPIO 8 and 18 as requested
#define SDA_PIN 8
#define SCL_PIN 18

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void setup() {
    Serial.begin(115200);
    delay(1000);
    Serial.println("\nOLED Test Starting...");
    
    // Initialize I2C
    Wire.begin(SDA_PIN, SCL_PIN);
    Serial.println("I2C initialized: SDA=8, SCL=18");
    
    // Scan for I2C devices
    Serial.println("\nScanning I2C bus...");
    byte count = 0;
    for(byte i = 1; i < 127; i++) {
        Wire.beginTransmission(i);
        if (Wire.endTransmission() == 0) {
            Serial.print("Found device at 0x");
            if(i < 16) Serial.print("0");
            Serial.println(i, HEX);
            count++;
        }
    }
    Serial.print("Found ");
    Serial.print(count);
    Serial.println(" devices\n");
    
    // Try to initialize display
    Serial.println("Initializing OLED...");
    if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        Serial.println("0x3C failed, trying 0x3D...");
        if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3D)) {
            Serial.println("SSD1306 allocation failed");
            while(1); // Stop here
        }
    }
    
    Serial.println("OLED initialized!");
    
    // Clear and show test pattern
    display.clearDisplay();
    display.setTextSize(2);
    display.setTextColor(SSD1306_WHITE);
    display.setCursor(20, 0);
    display.println("OLED OK!");
    
    display.setTextSize(1);
    display.setCursor(0, 25);
    display.println("ESP32-CAM Test");
    display.setCursor(0, 40);
    display.print("SDA: GPIO ");
    display.println(SDA_PIN);
    display.setCursor(0, 50);
    display.print("SCL: GPIO ");
    display.println(SCL_PIN);
    
    display.display();
}

void loop() {
    static int counter = 0;
    
    // Update display every second
    display.fillRect(70, 25, 58, 10, SSD1306_BLACK);
    display.setCursor(70, 25);
    display.print("Cnt: ");
    display.print(counter++);
    display.display();
    
    delay(1000);
}