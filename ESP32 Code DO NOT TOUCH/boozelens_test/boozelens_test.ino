/*
 * BoozeLens Hardware Test
 * Simple test to verify ESP32-CAM and OLED are working
 */

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// Pin Configuration - EXACTLY as you wired
#define SDA_PIN 15
#define SCL_PIN 14

// OLED Configuration
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void setup() {
    Serial.begin(115200);
    delay(1000); // Give time for serial
    
    Serial.println("\n\n=== BoozeLens Hardware Test ===");
    Serial.println("Starting...");
    
    // Initialize I2C with your pins
    Wire.begin(SDA_PIN, SCL_PIN);
    Serial.println("I2C initialized on pins SDA=15, SCL=14");
    
    // Scan for I2C devices
    Serial.println("Scanning for I2C devices...");
    byte error, address;
    int nDevices = 0;
    
    for(address = 1; address < 127; address++) {
        Wire.beginTransmission(address);
        error = Wire.endTransmission();
        
        if (error == 0) {
            Serial.print("I2C device found at address 0x");
            if (address < 16) Serial.print("0");
            Serial.print(address, HEX);
            Serial.println(" !");
            nDevices++;
        }
    }
    
    if (nDevices == 0) {
        Serial.println("No I2C devices found. Check wiring!");
        Serial.println("SDA should be on GPIO 15");
        Serial.println("SCL should be on GPIO 14");
        Serial.println("OLED needs 3.3V and GND");
    } else {
        Serial.println("Found " + String(nDevices) + " I2C device(s)");
    }
    
    // Try to initialize display
    Serial.println("\nTrying to initialize OLED...");
    if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        Serial.println("SSD1306 allocation failed!");
        Serial.println("Check:");
        Serial.println("- OLED VCC to 3.3V (NOT 5V!)");
        Serial.println("- OLED GND to GND");
        Serial.println("- OLED SDA to GPIO 15");
        Serial.println("- OLED SCL to GPIO 14");
    } else {
        Serial.println("OLED initialized successfully!");
        
        // Show test pattern
        display.clearDisplay();
        display.setTextSize(1);
        display.setTextColor(SSD1306_WHITE);
        display.setCursor(0,0);
        display.println("BoozeLens Test");
        display.println("OLED Working!");
        display.println("");
        display.print("ESP32-CAM Test");
        display.display();
    }
    
    // Test other pins
    pinMode(2, INPUT);   // MQ3
    pinMode(13, INPUT_PULLUP); // Mode button  
    pinMode(16, INPUT_PULLUP); // Photo button
    
    Serial.println("\nPin states:");
    Serial.print("MQ3 (GPIO2): ");
    Serial.println(analogRead(2));
    Serial.print("Mode Button (GPIO13): ");
    Serial.println(digitalRead(13));
    Serial.print("Photo Button (GPIO16): ");
    Serial.println(digitalRead(16));
}

void loop() {
    // Print button states
    static unsigned long lastPrint = 0;
    if (millis() - lastPrint > 1000) {
        lastPrint = millis();
        
        Serial.println("\n--- Status ---");
        Serial.print("Mode Button: ");
        Serial.println(digitalRead(13) ? "HIGH" : "LOW");
        Serial.print("Photo Button: ");
        Serial.println(digitalRead(16) ? "HIGH" : "LOW");
        Serial.print("MQ3 Raw: ");
        Serial.println(analogRead(2));
        
        // Update display
        display.clearDisplay();
        display.setCursor(0,0);
        display.println("BoozeLens Test");
        display.println("");
        display.print("Mode Btn: ");
        display.println(digitalRead(13) ? "HIGH" : "LOW");
        display.print("Photo Btn: ");
        display.println(digitalRead(16) ? "HIGH" : "LOW");
        display.print("MQ3: ");
        display.println(analogRead(2));
        display.print("Time: ");
        display.println(millis()/1000);
        display.display();
    }
}

/*
 * Troubleshooting Power Issues:
 * 
 * 1. ESP32-CAM not turning on:
 *    - Check 5V goes to 5V pin (NOT 3.3V pin)
 *    - Check GND connection
 *    - Try powering ONLY the ESP32-CAM first
 *    - Remove all other connections
 * 
 * 2. OLED not turning on:
 *    - MUST use 3.3V (NOT 5V) - 5V will damage it!
 *    - Check I2C connections (SDA=15, SCL=14)
 *    - Try different I2C address (0x3C or 0x3D)
 * 
 * 3. Common issues:
 *    - Breadboard power rails not connected
 *    - Bad jumper wires
 *    - ESP32-CAM pins not making good contact
 *    - Power supply issue (try USB power first)
 */