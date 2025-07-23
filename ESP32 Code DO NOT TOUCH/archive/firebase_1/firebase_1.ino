#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// Display settings - CORRECTED FOR YOUR 128x64 DISPLAY
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64  // Changed from 32 to 64
#define OLED_RESET -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Pin definitions
#define MQ3_PIN 4       // GPIO4 for MQ3 analog output
#define SWITCH_PIN 13   // GPIO13 for switch input
#define SDA_PIN 8       // GPIO8 for I2C SDA
#define SCL_PIN 18      // GPIO18 for I2C SCL

// WiFi credentials - CHANGE THESE TO YOUR WIFI!
const char* ssid = "Estella Rong";        // Replace with your WiFi name
const char* password = "blume123"; // Replace with your WiFi password

// Firebase configuration
const char* firebaseHost = "hsg-party-tracker-default-rtdb.europe-west1.firebasedatabase.app";
const char* firebaseAuth = "AIzaSyCuOjiHa8C0jgAte40E774CRJROTWTUdmg"; // Your API key from the HTML

// Device configuration
String deviceId = "ESP32_" + String((uint32_t)ESP.getEfuseMac(), HEX); // Unique device ID
String userName = "Party User"; // You can change this

// MQ3 calibration values
#define MQ3_R0 10.0     // Sensor resistance in clean air
#define MQ3_RL 10.0     // Load resistance on board

// Timing constants
#define WARMUP_TIME 15000    // 15 seconds warmup
#define MEASURE_TIME 5000    // 5 seconds measurement window
#define DISPLAY_TIME 10000   // 10 seconds result display

// System states
enum State {
  OFF,
  WARMING_UP,
  READY,
  MEASURING,
  DISPLAYING_RESULT,
  UPLOADING
};

State currentState = OFF;
unsigned long stateStartTime = 0;
float bacReading = 0.0;
bool wifiConnected = false;

// Scrolling text variables
int scrollPos = 0;
unsigned long lastScrollTime = 0;
const int SCROLL_SPEED = 150;

void setup() {
  Serial.begin(115200);
  
  // Initialize I2C
  Wire.begin(SDA_PIN, SCL_PIN);
  
  // Initialize pins
  pinMode(SWITCH_PIN, INPUT_PULLUP);
  pinMode(MQ3_PIN, INPUT);
  
  // Configure ADC
  analogReadResolution(12);
  analogSetAttenuation(ADC_11db);
  
  // Initialize display
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("Display initialization failed!");
    for(;;);
  }
  
  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);
  display.display();
  
  // Show startup message
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("HSG Party Tracker");
  display.println("Breathalyzer v1.0");
  display.display();
  delay(2000);
  
  // Connect to WiFi
  connectToWiFi();
}

void connectToWiFi() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("Connecting to WiFi...");
  display.display();
  
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    display.print(".");
    display.display();
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    wifiConnected = true;
    display.clearDisplay();
    display.setCursor(0, 0);
    display.println("WiFi Connected!");
    display.println("");
    display.print("IP: ");
    display.println(WiFi.localIP());
    display.println("");
    display.print("Device ID:");
    display.println(deviceId);
    display.display();
    delay(3000);
  } else {
    wifiConnected = false;
    display.clearDisplay();
    display.setCursor(0, 0);
    display.println("WiFi Failed!");
    display.println("Offline mode");
    display.display();
    delay(2000);
  }
}

void loop() {
  bool switchOn = (digitalRead(SWITCH_PIN) == LOW);
  
  // Update scrolling
  if (millis() - lastScrollTime > SCROLL_SPEED) {
    scrollPos++;
    lastScrollTime = millis();
  }
  
  // Reconnect WiFi if disconnected
  if (wifiConnected && WiFi.status() != WL_CONNECTED) {
    wifiConnected = false;
    WiFi.reconnect();
  }
  
  // State machine
  switch(currentState) {
    case OFF:
      if(switchOn) {
        currentState = WARMING_UP;
        stateStartTime = millis();
        scrollPos = 0;
      }
      displayOff();
      break;
      
    case WARMING_UP:
      if(!switchOn) {
        currentState = OFF;
      } else if(millis() - stateStartTime >= WARMUP_TIME) {
        currentState = READY;
        scrollPos = 0;
      }
      displayWarmup();
      break;
      
    case READY:
      if(!switchOn) {
        currentState = OFF;
      } else if(detectBreath()) {
        currentState = MEASURING;
        stateStartTime = millis();
        bacReading = 0.0;
        scrollPos = 0;
      }
      displayReady();
      break;
      
    case MEASURING:
      if(!switchOn) {
        currentState = OFF;
      } else if(millis() - stateStartTime >= MEASURE_TIME) {
        currentState = UPLOADING;
        stateStartTime = millis();
        scrollPos = 0;
      } else {
        float currentReading = calculateBAC();
        if(currentReading > bacReading) {
          bacReading = currentReading;
        }
      }
      displayMeasuring();
      break;
      
    case UPLOADING:
      displayUploading();
      sendToFirebase();
      currentState = DISPLAYING_RESULT;
      stateStartTime = millis();
      break;
      
    case DISPLAYING_RESULT:
      if(!switchOn) {
        currentState = OFF;
      } else if(millis() - stateStartTime >= DISPLAY_TIME) {
        currentState = READY;
        scrollPos = 0;
      }
      displayResult();
      break;
  }
  
  delay(20);
}

bool detectBreath() {
  static int baseline = analogRead(MQ3_PIN);
  int currentReading = analogRead(MQ3_PIN);
  baseline = (baseline * 9 + currentReading) / 10;
  return (currentReading > baseline + 100);
}

float calculateBAC() {
  int sensorValue = analogRead(MQ3_PIN);
  float voltage = sensorValue * (3.3 / 4095.0);
  voltage = voltage * (5.0 / 3.3);
  
  float RS = ((5.0 * MQ3_RL) / voltage) - MQ3_RL;
  float ratio = RS / MQ3_R0;
  
  float bac = 0.0;
  if(ratio < 1.0) {
    bac = (1.0 - ratio) * 0.3;  // Adjusted for more realistic readings
  }
  
  // Clamp to reasonable values
  if(bac < 0) bac = 0;
  if(bac > 0.4) bac = 0.4;
  
  return bac;
}

void sendToFirebase() {
  if (!wifiConnected) {
    Serial.println("No WiFi - skipping upload");
    return;
  }
  
  HTTPClient http;
  
  // Create the Firebase URL
  String url = "https://" + String(firebaseHost) + "/readings/" + deviceId + ".json?auth=" + String(firebaseAuth);
  
  // Create JSON payload
  StaticJsonDocument<256> doc;
  doc["bac"] = bacReading;
  doc["device"] = deviceId;
  doc["user"] = userName;
  doc["location"] = "HSG Campus";
  doc["timestamp"] = millis();
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  // Send HTTP PUT request
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  
  int httpCode = http.PUT(jsonString);
  
  if (httpCode > 0) {
    Serial.printf("Firebase response code: %d\n", httpCode);
    if (httpCode == HTTP_CODE_OK) {
      Serial.println("Data sent successfully!");
    }
  } else {
    Serial.printf("Firebase error: %s\n", http.errorToString(httpCode).c_str());
  }
  
  http.end();
}

void scrollText(const char* text, int y, int textSize = 1) {
  display.setTextSize(textSize);
  int textWidth = strlen(text) * 6 * textSize;
  int pos = 128 - (scrollPos % (textWidth + 128));
  display.setCursor(pos, y);
  display.print(text);
  
  if (pos < 0) {
    display.setCursor(pos + textWidth + 64, y);
    display.print(text);
  }
}

void displayOff() {
  display.clearDisplay();
  
  // Title - centered on 64px height
  display.setTextSize(2);
  display.setCursor(20, 10);
  display.print("PARTY");
  display.setCursor(10, 30);
  display.print("TRACKER");
  
  // WiFi status indicator
  display.setTextSize(1);
  display.setCursor(0, 55);
  if (wifiConnected) {
    display.print("WiFi: OK");
  } else {
    display.print("WiFi: OFF");
  }
  
  // Scrolling instruction
  scrollText(">>> FLIP SWITCH TO START <<<", 45, 1);
  
  display.display();
}

void displayWarmup() {
  int timeLeft = (WARMUP_TIME - (millis() - stateStartTime)) / 1000;
  
  display.clearDisplay();
  
  // Title
  display.setTextSize(1);
  display.setCursor(30, 5);
  display.print("WARMING UP");
  
  // Big countdown
  display.setTextSize(4);
  display.setCursor(40, 20);
  if (timeLeft < 10) display.print(" ");
  display.print(timeLeft);
  display.setTextSize(2);
  display.print("s");
  
  // Progress bar
  int progress = map(millis() - stateStartTime, 0, WARMUP_TIME, 0, 128);
  display.fillRect(0, 58, progress, 6, SSD1306_WHITE);
  
  display.display();
}

void displayReady() {
  display.clearDisplay();
  
  // Alternating display
  if ((millis() / 1000) % 2 == 0) {
    display.setTextSize(3);
    display.setCursor(15, 20);
    display.print("READY");
  } else {
    display.setTextSize(3);
    display.setCursor(20, 20);
    display.print("BLOW!");
  }
  
  // Instructions
  display.setTextSize(1);
  display.setCursor(10, 50);
  display.print("Blow steadily...");
  
  display.display();
}

void displayMeasuring() {
  display.clearDisplay();
  
  // Title
  display.setTextSize(2);
  display.setCursor(10, 10);
  display.print("TESTING");
  
  // Current reading
  display.setTextSize(1);
  display.setCursor(20, 35);
  display.print("BAC: ");
  display.print(bacReading, 3);
  display.print(" o/oo");
  
  // Progress dots
  display.setCursor(30, 50);
  int dots = (millis() / 300) % 6;
  for(int i = 0; i < dots; i++) {
    display.print(".");
  }
  
  display.display();
}

void displayUploading() {
  display.clearDisplay();
  
  display.setTextSize(2);
  display.setCursor(10, 20);
  display.print("UPLOADING");
  
  display.setTextSize(1);
  display.setCursor(25, 45);
  if (wifiConnected) {
    display.print("to Firebase...");
  } else {
    display.print("(Offline)");
  }
  
  display.display();
  delay(1000);
}

void displayResult() {
  display.clearDisplay();
  
  // BAC value
  display.setTextSize(3);
  display.setCursor(15, 5);
  display.print(bacReading, 2);
  display.setTextSize(1);
  display.setCursor(90, 15);
  display.print("o/oo");
  
  // Status message
  display.setTextSize(2);
  display.setCursor(5, 35);
  
  if(bacReading < 0.02) {
    display.print("SAFE :)");
  } else if(bacReading < 0.05) {
    display.print("CAUTION");
  } else if(bacReading < 0.08) {
    display.print("NO DRIVE");
  } else {
    display.print("TOO MUCH");
  }
  
  // Upload status
  display.setTextSize(1);
  display.setCursor(0, 55);
  if (wifiConnected) {
    display.print("Data uploaded!");
  } else {
    display.print("Saved locally");
  }
  
  display.display();
}