#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Preferences.h>
#include <WebServer.h>
#include <DNSServer.h>

// Display settings
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Pin definitions
#define MQ3_PIN 4       // GPIO4 for MQ3 analog output
#define SWITCH_PIN 13   // GPIO13 for switch input
#define SDA_PIN 8       // GPIO8 for I2C SDA
#define SCL_PIN 18      // GPIO18 for I2C SCL

// Access Point settings for WiFi setup
const char* AP_SSID = "HSG_Breathalyzer_Setup";
const char* AP_PASS = "12345678";  // Min 8 characters

// Firebase configuration
const char* firebaseHost = "hsg-party-tracker-default-rtdb.europe-west1.firebasedatabase.app";
const char* firebaseAuth = "AIzaSyCuOjiHa8C0jgAte40E774CRJROTWTUdmg";

// Device configuration
String deviceId;
String userName = "Anonymous";
String userEmail = "";
String registrationCode = "";

// MQ3 calibration
#define MQ3_R0 10.0
#define MQ3_RL 10.0

// Timing constants
#define WARMUP_TIME 15000
#define MEASURE_TIME 5000
#define DISPLAY_TIME 10000

// System states
enum State {
  OFF,
  WIFI_SETUP,
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

// Preferences for storing WiFi credentials
Preferences preferences;

// Web server for configuration
WebServer server(80);
DNSServer dnsServer;
const byte DNS_PORT = 53;

// Configuration HTML page
const char* configPage = R"(
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
        input, select {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 1px solid #00ff88;
            border-radius: 10px;
            background: rgba(255,255,255,0.1);
            color: white;
            font-size: 16px;
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
        <h1>🍺 HSG Breathalyzer Setup</h1>
        
        <div class="info">
            <p><strong>Device ID:</strong> <span id="deviceId">%DEVICE_ID%</span></p>
            <p>Save this ID to link your device to your account!</p>
        </div>
        
        <form action="/save" method="POST">
            <h3>1. Connect to WiFi</h3>
            <input type="text" name="ssid" placeholder="WiFi Network Name" required>
            <input type="password" name="pass" placeholder="WiFi Password" required>
            
            <h3>2. Your Information</h3>
            <input type="text" name="name" placeholder="Your Name" required>
            <input type="email" name="email" placeholder="Your Email" required>
            
            <h3>3. Registration Code (Optional)</h3>
            <input type="text" name="code" placeholder="Party/Group Code">
            <p style="font-size: 12px; opacity: 0.7;">Enter a code to join a specific party group</p>
            
            <button type="submit">Save & Connect</button>
        </form>
        
        <p style="text-align: center; opacity: 0.7; font-size: 14px;">
            After saving, the device will restart and connect to your WiFi
        </p>
    </div>
</body>
</html>
)";

const char* successPage = R"(
<!DOCTYPE html>
<html>
<head>
    <title>Success!</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #1a1a2e;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .success {
            background: rgba(0,255,136,0.2);
            padding: 30px;
            border-radius: 20px;
            max-width: 400px;
            margin: 50px auto;
        }
        h1 { color: #00ff88; }
    </style>
</head>
<body>
    <div class="success">
        <h1>✅ Setup Complete!</h1>
        <p>Your breathalyzer is now configured.</p>
        <p>The device will restart and connect to your WiFi.</p>
        <p><strong>Your Device ID:</strong> %DEVICE_ID%</p>
        <p>You can now close this page.</p>
    </div>
</body>
</html>
)";

void setup() {
  Serial.begin(115200);
  
  // Generate unique device ID
  uint64_t chipid = ESP.getEfuseMac();
  deviceId = "HSG_" + String((uint32_t)(chipid >> 32), HEX) + String((uint32_t)chipid, HEX);
  
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
  
  // Initialize preferences
  preferences.begin("breathalyzer", false);
  
  // Check if WiFi credentials are saved
  if (preferences.getString("ssid", "") != "") {
    // Try to connect with saved credentials
    connectToSavedWiFi();
  } else {
    // No saved credentials, start setup mode
    currentState = WIFI_SETUP;
    startConfigPortal();
  }
}

void loop() {
  bool switchOn = (digitalRead(SWITCH_PIN) == LOW);
  
  // Handle WiFi setup mode
  if (currentState == WIFI_SETUP) {
    dnsServer.processNextRequest();
    server.handleClient();
    displaySetupMode();
    
    // Check if user wants to exit setup (hold switch for 5 seconds)
    static unsigned long holdStart = 0;
    if (switchOn && holdStart == 0) {
      holdStart = millis();
    } else if (!switchOn) {
      holdStart = 0;
    } else if (millis() - holdStart > 5000) {
      // Exit setup mode and try saved credentials
      stopConfigPortal();
      ESP.restart();
    }
    
    return;
  }
  
  // Normal operation
  switch(currentState) {
    case OFF:
      if(switchOn) {
        // Check for setup mode trigger (double flip)
        static unsigned long lastFlip = 0;
        if (millis() - lastFlip < 1000) {
          // Double flip detected - enter setup mode
          currentState = WIFI_SETUP;
          startConfigPortal();
          return;
        }
        lastFlip = millis();
        
        currentState = WARMING_UP;
        stateStartTime = millis();
      }
      displayOff();
      break;
      
    case WARMING_UP:
      if(!switchOn) {
        currentState = OFF;
      } else if(millis() - stateStartTime >= WARMUP_TIME) {
        currentState = READY;
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
      }
      displayReady();
      break;
      
    case MEASURING:
      if(!switchOn) {
        currentState = OFF;
      } else if(millis() - stateStartTime >= MEASURE_TIME) {
        currentState = UPLOADING;
        stateStartTime = millis();
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
      }
      displayResult();
      break;
  }
  
  delay(20);
}

void startConfigPortal() {
  Serial.println("Starting configuration portal...");
  
  // Start Access Point
  WiFi.mode(WIFI_AP);
  WiFi.softAP(AP_SSID, AP_PASS);
  
  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(IP);
  
  // Start DNS server (captive portal)
  dnsServer.start(DNS_PORT, "*", IP);
  
  // Setup web server routes
  server.on("/", handleRoot);
  server.on("/save", HTTP_POST, handleSave);
  server.onNotFound(handleRoot);
  
  server.begin();
  Serial.println("Configuration portal started");
}

void stopConfigPortal() {
  server.stop();
  dnsServer.stop();
  WiFi.softAPdisconnect(true);
  WiFi.mode(WIFI_STA);
}

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
  String code = server.arg("code");
  
  // Save to preferences
  preferences.putString("ssid", ssid);
  preferences.putString("pass", pass);
  preferences.putString("name", name);
  preferences.putString("email", email);
  preferences.putString("code", code);
  
  // Update global variables
  userName = name;
  userEmail = email;
  registrationCode = code;
  
  // Send success page
  String html = String(successPage);
  html.replace("%DEVICE_ID%", deviceId);
  server.send(200, "text/html", html);
  
  // Register device with Firebase
  registerDevice();
  
  delay(2000);
  ESP.restart();
}

void connectToSavedWiFi() {
  String ssid = preferences.getString("ssid", "");
  String pass = preferences.getString("pass", "");
  userName = preferences.getString("name", "Anonymous");
  userEmail = preferences.getString("email", "");
  registrationCode = preferences.getString("code", "");
  
  if (ssid == "") {
    currentState = WIFI_SETUP;
    startConfigPortal();
    return;
  }
  
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("Connecting to WiFi...");
  display.println(ssid);
  display.display();
  
  WiFi.begin(ssid.c_str(), pass.c_str());
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(500);
    display.print(".");
    display.display();
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    wifiConnected = true;
    display.clearDisplay();
    display.setCursor(0, 0);
    display.println("Connected!");
    display.println("");
    display.print("IP: ");
    display.println(WiFi.localIP());
    display.println("");
    display.print("User: ");
    display.println(userName);
    display.display();
    delay(2000);
  } else {
    wifiConnected = false;
    display.clearDisplay();
    display.setCursor(0, 0);
    display.println("WiFi Failed!");
    display.println("");
    display.println("Double-flip switch");
    display.println("to enter setup mode");
    display.display();
    delay(3000);
  }
}

void registerDevice() {
  if (!WiFi.isConnected()) return;
  
  HTTPClient http;
  
  // Register this device under the user
  String url = "https://" + String(firebaseHost) + "/users/" + deviceId + ".json?auth=" + String(firebaseAuth);
  
  StaticJsonDocument<512> doc;
  doc["deviceId"] = deviceId;
  doc["userName"] = userName;
  doc["userEmail"] = userEmail;
  doc["registrationCode"] = registrationCode;
  doc["registeredAt"] = millis();
  doc["lastSeen"] = millis();
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  http.PUT(jsonString);
  http.end();
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
    bac = (1.0 - ratio) * 0.3;
  }
  
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
  
  // Send to readings with user info
  String url = "https://" + String(firebaseHost) + "/readings/" + deviceId + "_" + String(millis()) + ".json?auth=" + String(firebaseAuth);
  
  StaticJsonDocument<512> doc;
  doc["bac"] = bacReading;
  doc["device"] = deviceId;
  doc["user"] = userName;
  doc["email"] = userEmail;
  doc["location"] = "User Location";
  doc["registrationCode"] = registrationCode;
  doc["timestamp"] = millis();
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  
  int httpCode = http.PUT(jsonString);
  
  if (httpCode > 0) {
    Serial.printf("Firebase response: %d\n", httpCode);
  } else {
    Serial.printf("Firebase error: %s\n", http.errorToString(httpCode).c_str());
  }
  
  http.end();
  
  // Update last seen
  updateLastSeen();
}

void updateLastSeen() {
  HTTPClient http;
  String url = "https://" + String(firebaseHost) + "/users/" + deviceId + "/lastSeen.json?auth=" + String(firebaseAuth);
  
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  http.PUT(String(millis()));
  http.end();
}

void displaySetupMode() {
  display.clearDisplay();
  
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("=== SETUP MODE ===");
  display.println("");
  display.println("1. Connect phone to:");
  display.setTextSize(1);
  display.print("   ");
  display.println(AP_SSID);
  display.print("   Pass: ");
  display.println(AP_PASS);
  display.println("");
  display.println("2. Open browser");
  display.println("3. Go to 192.168.4.1");
  display.println("");
  display.setTextSize(1);
  display.print("Hold switch 5s to exit");
  
  display.display();
}

void displayOff() {
  display.clearDisplay();
  
  display.setTextSize(2);
  display.setCursor(20, 5);
  display.print("PARTY");
  display.setCursor(10, 25);
  display.print("TRACKER");
  
  // User info
  display.setTextSize(1);
  display.setCursor(0, 45);
  display.print("User: ");
  display.println(userName.substring(0, 12));
  
  // WiFi status
  display.setCursor(0, 55);
  if (wifiConnected) {
    display.print("WiFi: OK");
  } else {
    display.print("WiFi: OFF");
  }
  
  // Instructions
  display.setCursor(70, 55);
  display.print("Flip 2x=Setup");
  
  display.display();
}

void displayWarmup() {
  int timeLeft = (WARMUP_TIME - (millis() - stateStartTime)) / 1000;
  
  display.clearDisplay();
  
  display.setTextSize(1);
  display.setCursor(30, 5);
  display.print("WARMING UP");
  
  display.setTextSize(4);
  display.setCursor(40, 20);
  if (timeLeft < 10) display.print(" ");
  display.print(timeLeft);
  display.setTextSize(2);
  display.print("s");
  
  int progress = map(millis() - stateStartTime, 0, WARMUP_TIME, 0, 128);
  display.fillRect(0, 58, progress, 6, SSD1306_WHITE);
  
  display.display();
}

void displayReady() {
  display.clearDisplay();
  
  if ((millis() / 1000) % 2 == 0) {
    display.setTextSize(3);
    display.setCursor(15, 20);
    display.print("READY");
  } else {
    display.setTextSize(3);
    display.setCursor(20, 20);
    display.print("BLOW!");
  }
  
  display.setTextSize(1);
  display.setCursor(10, 50);
  display.print("Blow steadily...");
  
  display.display();
}

void displayMeasuring() {
  display.clearDisplay();
  
  display.setTextSize(2);
  display.setCursor(10, 10);
  display.print("TESTING");
  
  display.setTextSize(1);
  display.setCursor(20, 35);
  display.print("BAC: ");
  display.print(bacReading, 3);
  display.print(" o/oo");
  
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
  
  display.setTextSize(3);
  display.setCursor(15, 5);
  display.print(bacReading, 2);
  display.setTextSize(1);
  display.setCursor(90, 15);
  display.print("o/oo");
  
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
  
  display.setTextSize(1);
  display.setCursor(0, 55);
  if (wifiConnected) {
    display.print("Uploaded for: ");
    display.print(userName.substring(0, 10));
  } else {
    display.print("Saved locally");
  }
  
  display.display();
}