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
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Pin definitions
#define MQ3_PIN 4       // GPIO4 for MQ3 analog output
#define SWITCH_PIN 13   // GPIO13 for switch input
#define SDA_PIN 8      // GPIO21 for I2C SDA
#define SCL_PIN 18      // GPIO22 for I2C SCL
#define LED_PIN 2       // Built-in LED for status

// Access Point settings for WiFi setup
const char* AP_SSID_PREFIX = "HSG_Breath_";
const char* AP_PASS = "12345678";  // Min 8 characters

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
#define CALIBRATION_SAMPLE_TIMES 50
#define CALIBRATION_SAMPLE_INTERVAL 20

// Timing constants
#define WARMUP_TIME 20000  // 20 seconds warmup
#define MEASURE_TIME 5000  // 5 seconds measurement
#define DISPLAY_TIMEOUT 30000  // 30 seconds display timeout

// System states
enum State {
  OFF,
  WIFI_SETUP,
  WARMING_UP,
  READY,
  MEASURING,
  DISPLAYING_RESULT,
  CALIBRATING
};

State currentState = OFF;
unsigned long stateStartTime = 0;
float bacReading = 0.0;
bool wifiConnected = false;
bool readingTaken = false;
unsigned long lastActivity = 0;
float r0Value = MQ3_R0;  // Calibration value

// Preferences for storing settings
Preferences preferences;

// Web server for configuration
WebServer server(80);
DNSServer dnsServer;
const byte DNS_PORT = 53;

// Double-click detection
unsigned long lastSwitchPress = 0;
int switchPressCount = 0;
#define DOUBLE_CLICK_TIME 500

// Configuration HTML page
const char configPage[] PROGMEM = R"=====(
<!DOCTYPE html>
<html>
<head>
    <title>HSG Breathalyzer Setup</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            font-family: -apple-system, Arial, sans-serif;
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
            backdrop-filter: blur(10px);
        }
        h1 {
            text-align: center;
            color: #00ff88;
            margin-bottom: 10px;
        }
        .device-id {
            text-align: center;
            font-size: 2em;
            font-weight: bold;
            color: #00ff88;
            background: rgba(0,255,136,0.1);
            padding: 15px;
            border-radius: 15px;
            margin: 20px 0;
            font-family: monospace;
            letter-spacing: 0.1em;
        }
        .info {
            background: rgba(0,255,136,0.1);
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: center;
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
            box-sizing: border-box;
        }
        input:focus {
            outline: none;
            border-color: #00d4ff;
            box-shadow: 0 0 10px rgba(0,212,255,0.3);
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
            transition: all 0.3s ease;
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(0,255,136,0.4);
        }
        button:active {
            transform: translateY(0);
        }
        .error {
            color: #ff4444;
            text-align: center;
            margin: 10px 0;
            padding: 10px;
            background: rgba(255,68,68,0.1);
            border-radius: 10px;
            display: none;
        }
        .success {
            color: #00ff88;
            text-align: center;
            margin: 10px 0;
            padding: 10px;
            background: rgba(0,255,136,0.1);
            border-radius: 10px;
        }
        .step {
            margin: 20px 0;
            padding: 20px;
            background: rgba(255,255,255,0.05);
            border-radius: 15px;
        }
        .step h3 {
            color: #00d4ff;
            margin-top: 0;
        }
        .loading {
            display: none;
            text-align: center;
            margin: 20px 0;
        }
        .spinner {
            border: 3px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top: 3px solid #00ff88;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .networks {
            max-height: 200px;
            overflow-y: auto;
            margin: 10px 0;
        }
        .network-item {
            padding: 10px;
            margin: 5px 0;
            background: rgba(255,255,255,0.05);
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .network-item:hover {
            background: rgba(255,255,255,0.1);
            transform: translateX(5px);
        }
        .signal-strength {
            font-size: 0.8em;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🍺 HSG Breathalyzer Setup</h1>
        
        <div class="device-id">
            DEVICE ID: <span id="deviceId">%DEVICE_ID%</span>
        </div>
        
        <div class="info">
            <p>Save this Device ID to pair with the HSG Party Tracker app!</p>
        </div>
        
        <div id="error" class="error"></div>
        
        <form id="setupForm" action="/save" method="POST">
            <div class="step">
                <h3>1. Connect to WiFi</h3>
                <div id="networkList" class="networks">
                    <div style="text-align: center; opacity: 0.7;">Scanning for networks...</div>
                </div>
                <input type="text" name="ssid" id="ssid" placeholder="WiFi Network Name" required>
                <input type="password" name="pass" id="pass" placeholder="WiFi Password" required>
                <button type="button" onclick="scanNetworks()">🔄 Refresh Networks</button>
            </div>
            
            <div class="step">
                <h3>2. Your Information (Optional)</h3>
                <input type="text" name="name" placeholder="Your Name">
                <input type="email" name="email" placeholder="Your Email">
            </div>
            
            <button type="submit">Save and Connect</button>
        </form>
        
        <div id="loading" class="loading">
            <div class="spinner"></div>
            <p>Connecting to WiFi...</p>
        </div>
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
                    const networkList = document.getElementById('networkList');
                    if (data.networks.length === 0) {
                        networkList.innerHTML = '<div style="text-align: center; opacity: 0.7;">No networks found</div>';
                    } else {
                        networkList.innerHTML = data.networks.map(network => 
                            `<div class="network-item" onclick="selectNetwork('${network.ssid}')">
                                <span>${network.ssid}</span>
                                <span class="signal-strength">${network.rssi} dBm</span>
                            </div>`
                        ).join('');
                    }
                })
                .catch(err => {
                    console.error('Scan failed:', err);
                });
        }
        
        document.getElementById('setupForm').onsubmit = function(e) {
            e.preventDefault();
            document.getElementById('loading').style.display = 'block';
            document.getElementById('setupForm').style.display = 'none';
            
            const formData = new FormData(e.target);
            fetch('/save', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                document.getElementById('loading').innerHTML = data;
            })
            .catch(err => {
                document.getElementById('error').textContent = 'Setup failed: ' + err;
                document.getElementById('error').style.display = 'block';
                document.getElementById('loading').style.display = 'none';
                document.getElementById('setupForm').style.display = 'block';
            });
        };
        
        // Initial network scan
        setTimeout(scanNetworks, 1000);
    </script>
</body>
</html>
)=====";

const char successPage[] PROGMEM = R"=====(
<div class="success">
    <h2>✅ Setup Complete!</h2>
    <p><strong>Device ID: %DEVICE_ID%</strong></p>
    <p>Your breathalyzer is configured and will restart.</p>
    <p>Use the Device ID above to pair with the app.</p>
    <p style="margin-top: 20px;">The device will now connect to your WiFi network.</p>
</div>
)=====";

const char failPage[] PROGMEM = R"=====(
<div class="error">
    <h2>❌ Connection Failed</h2>
    <p>Could not connect to the WiFi network.</p>
    <p>Please check your password and try again.</p>
    <button onclick="location.reload()">Try Again</button>
</div>
)=====";

void setup() {
  Serial.begin(115200);
  Serial.println("\n\nHSG Breathalyzer Starting...");
  
  // Initialize LED
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  
  // Generate unique device ID
  uint64_t chipid = ESP.getEfuseMac();
  deviceId = "HSG_" + String((uint32_t)chipid, HEX);
  deviceId.toUpperCase();
  apSSID = String(AP_SSID_PREFIX) + String((uint32_t)chipid, HEX);
  
  Serial.print("Device ID: ");
  Serial.println(deviceId);
  
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
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("HSG Breathalyzer");
  display.println("Initializing...");
  display.display();
  
  // Initialize preferences
  preferences.begin("breathalyzer", false);
  
  // Load calibration value
  r0Value = preferences.getFloat("r0_value", MQ3_R0);
  
  // Check if WiFi credentials are saved
  String savedSSID = preferences.getString("ssid", "");
  
  if (savedSSID.length() > 0) {
    // Try to connect with saved credentials
    connectToSavedWiFi();
  } else {
    // No saved credentials, start setup mode
    Serial.println("No saved WiFi credentials, starting setup mode");
    currentState = WIFI_SETUP;
    startConfigPortal();
  }
  
  lastActivity = millis();
}

void loop() {
  // Handle switch input with debouncing
  static bool lastSwitchState = HIGH;
  static unsigned long lastDebounceTime = 0;
  bool currentSwitchState = digitalRead(SWITCH_PIN);
  
  if (currentSwitchState != lastSwitchState) {
    lastDebounceTime = millis();
  }
  
  if ((millis() - lastDebounceTime) > 50) {  // 50ms debounce
    if (currentSwitchState == LOW && lastSwitchState == HIGH) {
      handleSwitchPress();
    }
  }
  
  lastSwitchState = currentSwitchState;
  bool switchOn = (currentSwitchState == LOW);
  
  // Handle WiFi setup mode
  if (currentState == WIFI_SETUP) {
    dnsServer.processNextRequest();
    server.handleClient();
    displaySetupMode();
    
    // Blink LED in setup mode
    digitalWrite(LED_PIN, (millis() / 500) % 2);
    
    return;
  }
  
  // Normal operation
  switch(currentState) {
    case OFF:
      if(switchOn) {
        currentState = WARMING_UP;
        stateStartTime = millis();
        lastActivity = millis();
        readingTaken = false;
      }
      displayOff();
      
      // Auto-off after timeout
      if (millis() - lastActivity > DISPLAY_TIMEOUT) {
        display.clearDisplay();
        display.display();
      }
      break;
      
    case WARMING_UP:
      if(!switchOn) {
        currentState = OFF;
        lastActivity = millis();
      } else if(millis() - stateStartTime >= WARMUP_TIME) {
        currentState = READY;
        playReadyTone();
      }
      displayWarmup();
      break;
      
    case READY:
      if(!switchOn) {
        currentState = OFF;
        lastActivity = millis();
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
        lastActivity = millis();
      } else if(millis() - stateStartTime >= MEASURE_TIME) {
        currentState = DISPLAYING_RESULT;
        stateStartTime = millis();
        readingTaken = true;
        sendToFirebase();
        playResultTone();
      } else {
        float currentReading = calculateBAC();
        if(currentReading > bacReading) {
          bacReading = currentReading;
        }
      }
      displayMeasuring();
      break;
      
    case DISPLAYING_RESULT:
      if(!switchOn) {
        currentState = OFF;
        lastActivity = millis();
      }
      displayResult();
      break;
      
    case CALIBRATING:
      performCalibration();
      break;
  }
  
  // Reconnect WiFi if needed
  if (wifiConnected && WiFi.status() != WL_CONNECTED && currentState != OFF && currentState != WIFI_SETUP) {
    WiFi.reconnect();
    wifiConnected = false;
  }
  
  delay(10);
}

void handleSwitchPress() {
  unsigned long currentTime = millis();
  
  // Double-click detection
  if (currentTime - lastSwitchPress < DOUBLE_CLICK_TIME) {
    switchPressCount++;
    
    if (switchPressCount >= 2) {
      // Double click detected - enter setup mode
      Serial.println("Double-click detected - entering setup mode");
      currentState = WIFI_SETUP;
      startConfigPortal();
      switchPressCount = 0;
    }
  } else {
    switchPressCount = 1;
  }
  
  lastSwitchPress = currentTime;
}

void startConfigPortal() {
  Serial.println("Starting configuration portal...");
  
  // Stop any existing WiFi connection
  WiFi.disconnect(true);
  delay(100);
  
  // Start Access Point
  WiFi.mode(WIFI_AP);
  WiFi.softAP(apSSID.c_str(), AP_PASS);
  
  IPAddress IP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(IP);
  Serial.print("AP SSID: ");
  Serial.println(apSSID);
  
  // Start DNS server (captive portal)
  dnsServer.start(DNS_PORT, "*", IP);
  
  // Setup web server routes
  server.on("/", handleRoot);
  server.on("/save", HTTP_POST, handleSave);
  server.on("/scan", HTTP_GET, handleScan);
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

void handleScan() {
  String json = "{\"networks\":[";
  int n = WiFi.scanNetworks();
  
  for (int i = 0; i < n; i++) {
    if (i > 0) json += ",";
    json += "{";
    json += "\"ssid\":\"" + WiFi.SSID(i) + "\",";
    json += "\"rssi\":" + String(WiFi.RSSI(i));
    json += "}";
  }
  
  json += "]}";
  server.send(200, "application/json", json);
}

void handleSave() {
  String ssid = server.arg("ssid");
  String pass = server.arg("pass");
  String name = server.arg("name");
  String email = server.arg("email");
  
  Serial.println("Saving configuration...");
  Serial.print("SSID: ");
  Serial.println(ssid);
  
  // Save to preferences
  preferences.putString("ssid", ssid);
  preferences.putString("pass", pass);
  preferences.putString("name", name);
  preferences.putString("email", email);
  
  // Try to connect
  WiFi.begin(ssid.c_str(), pass.c_str());
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(500);
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    // Success
    String html = String(successPage);
    html.replace("%DEVICE_ID%", deviceId);
    server.send(200, "text/html", html);
    
    delay(3000);
    stopConfigPortal();
    ESP.restart();
  } else {
    // Failed
    server.send(200, "text/html", failPage);
    WiFi.disconnect();
  }
}

void connectToSavedWiFi() {
  String ssid = preferences.getString("ssid", "");
  String pass = preferences.getString("pass", "");
  userName = preferences.getString("name", "Anonymous");
  userEmail = preferences.getString("email", "");
  
  if (ssid.length() == 0) {
    currentState = WIFI_SETUP;
    startConfigPortal();
    return;
  }
  
  Serial.print("Connecting to saved WiFi: ");
  Serial.println(ssid);
  
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("Connecting to WiFi...");
  display.println(ssid);
  display.display();
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid.c_str(), pass.c_str());
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(500);
    Serial.print(".");
    
    // Animate dots on display
    display.setCursor(0, 20);
    for(int i = 0; i <= attempts % 4; i++) {
      display.print(".");
    }
    display.display();
    
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    wifiConnected = true;
    Serial.println("\nConnected!");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
    
    display.clearDisplay();
    display.setCursor(0, 0);
    display.println("WiFi Connected!");
    display.println("");
    display.print("IP: ");
    display.println(WiFi.localIP());
    display.println("");
    display.println("Device ID:");
    display.println(deviceId);
    display.display();
    
    digitalWrite(LED_PIN, HIGH);
    delay(2000);
    digitalWrite(LED_PIN, LOW);
  } else {
    wifiConnected = false;
    Serial.println("\nWiFi connection failed!");
    
    display.clearDisplay();
    display.setCursor(0, 0);
    display.println("WiFi Failed!");
    display.println("");
    display.println("Double-click switch");
    display.println("to enter setup mode");
    display.println("");
    display.println("Or use offline mode");
    display.display();
    delay(3000);
  }
  
  currentState = OFF;
}

bool detectBreath() {
  static float baseline = 0;
  static bool baselineSet = false;
  
  if (!baselineSet) {
    baseline = analogRead(MQ3_PIN);
    baselineSet = true;
  }
  
  float currentReading = analogRead(MQ3_PIN);
  
  // Update baseline slowly
  baseline = baseline * 0.99 + currentReading * 0.01;
  
  // Detect significant increase
  return (currentReading > baseline * 1.1);
}

float calculateBAC() {
  int sensorValue = analogRead(MQ3_PIN);
  float voltage = sensorValue * (3.3 / 4095.0);
  
  // Calculate RS (sensor resistance)
  float RS = ((3.3 * MQ3_RL) / voltage) - MQ3_RL;
  
  // Calculate ratio RS/R0
  float ratio = RS / r0Value;
  
  // Convert to BAC using approximation
  // This is a simplified conversion - real conversion requires proper calibration
  float bac = 0.0;
  
  if (ratio < 1.0) {
    // Approximation based on MQ3 datasheet
    bac = pow(10, ((log10(ratio) - log10(0.4)) / -0.5));
    bac = bac * 0.001;  // Convert to BAC percentage
  }
  
  // Clamp values
  if (bac < 0) bac = 0;
  if (bac > 0.5) bac = 0.5;
  
  return bac;
}

void performCalibration() {
  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("Calibrating...");
  display.println("Ensure clean air");
  display.display();
  
  float sum = 0;
  for(int i = 0; i < CALIBRATION_SAMPLE_TIMES; i++) {
    int sensorValue = analogRead(MQ3_PIN);
    float voltage = sensorValue * (3.3 / 4095.0);
    float RS = ((3.3 * MQ3_RL) / voltage) - MQ3_RL;
    sum += RS;
    delay(CALIBRATION_SAMPLE_INTERVAL);
    
    // Show progress
    display.setCursor(0, 30);
    display.print("Progress: ");
    display.print((i * 100) / CALIBRATION_SAMPLE_TIMES);
    display.print("%");
    display.display();
  }
  
  r0Value = sum / CALIBRATION_SAMPLE_TIMES;
  
  // Save calibration value
  preferences.putFloat("r0_value", r0Value);
  
  display.clearDisplay();
  display.setCursor(0, 0);
  display.println("Calibration Complete!");
  display.print("R0 = ");
  display.println(r0Value);
  display.display();
  
  delay(2000);
  currentState = OFF;
}

void sendToFirebase() {
  if (!wifiConnected || WiFi.status() != WL_CONNECTED) {
    Serial.println("No WiFi - saving locally");
    saveReadingLocally();
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
  doc["datetime"] = getTimeString();
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  Serial.print("Sending to Firebase: ");
  Serial.println(jsonString);
  
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  
  int httpCode = http.PUT(jsonString);
  
  if (httpCode > 0) {
    Serial.printf("Firebase response: %d\n", httpCode);
    if (httpCode == 200) {
      displayUploadSuccess();
    }
  } else {
    Serial.printf("Upload error: %s\n", http.errorToString(httpCode).c_str());
    saveReadingLocally();
  }
  
  http.end();
}

void saveReadingLocally() {
  // Save the last few readings locally
  preferences.putFloat("last_bac", bacReading);
  preferences.putUInt("last_time", millis());
  
  Serial.println("Reading saved locally");
}

String getTimeString() {
  // Simple timestamp
  unsigned long ms = millis();
  unsigned long seconds = ms / 1000;
  unsigned long minutes = seconds / 60;
  unsigned long hours = minutes / 60;
  
  char timeStr[20];
  sprintf(timeStr, "%02lu:%02lu:%02lu", hours % 24, minutes % 60, seconds % 60);
  
  return String(timeStr);
}

// Display functions
void displaySetupMode() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("=== SETUP MODE ===");
  display.println("");
  display.println("Connect to WiFi:");
  display.setTextSize(1);
  display.println(apSSID);
  display.print("Pass: ");
  display.println(AP_PASS);
  display.println("");
  display.println("Then open browser:");
  display.println("192.168.4.1");
  display.display();
}

void displayOff() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.println("HSG Breathalyzer");
  display.println("");
  
  // Show device ID prominently
  display.setTextSize(1);
  display.println("Device ID:");
  display.setTextSize(2);
  display.println(deviceId);
  
  display.setTextSize(1);
  display.setCursor(0, 45);
  if (readingTaken) {
    display.print("Last: ");
    display.print(bacReading, 3);
    display.println(" o/oo");
  } else {
    display.println("Press to start");
  }
  
  // Status indicators
  display.setCursor(0, 56);
  display.print(wifiConnected ? "WiFi OK" : "Offline");
  display.setCursor(80, 56);
  display.print("2x=Setup");
  
  display.display();
}

void displayWarmup() {
  int timeLeft = (WARMUP_TIME - (millis() - stateStartTime)) / 1000;
  
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(25, 5);
  display.print("WARMING UP");
  
  // Large countdown
  display.setTextSize(4);
  display.setCursor(40, 20);
  if (timeLeft < 10) display.print(" ");
  display.print(timeLeft);
  
  // Progress bar
  int progress = map(millis() - stateStartTime, 0, WARMUP_TIME, 0, 128);
  display.fillRect(0, 58, progress, 6, SSD1306_WHITE);
  
  display.display();
}

void displayReady() {
  display.clearDisplay();
  
  // Blinking effect
  if ((millis() / 500) % 2 == 0) {
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
  display.setCursor(10, 5);
  display.print("MEASURING");
  
  // Show real-time BAC
  display.setTextSize(1);
  display.setCursor(25, 30);
  display.print("BAC: ");
  display.print(bacReading, 3);
  display.print(" o/oo");
  
  // Progress animation
  int progress = map(millis() - stateStartTime, 0, MEASURE_TIME, 0, 128);
  display.fillRect(0, 50, progress, 4, SSD1306_WHITE);
  
  // Animated dots
  display.setCursor(30, 55);
  int dots = (millis() / 300) % 6;
  for(int i = 0; i < dots; i++) {
    display.print(".");
  }
  
  display.display();
}

void displayResult() {
  display.clearDisplay();
  
  // Large BAC value
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
    display.print("DANGER!");
  }
  
  // Upload status
  display.setTextSize(1);
  display.setCursor(0, 55);
  if (wifiConnected) {
    display.print("Uploaded to cloud");
  } else {
    display.print("Saved locally");
  }
  
  display.display();
}

void displayUploadSuccess() {
  // Brief success indication
  display.fillRect(0, 55, 128, 9, SSD1306_BLACK);
  display.setCursor(0, 55);
  display.print("Upload OK!");
  display.display();
}

// Sound feedback functions
void playReadyTone() {
  // LED blink pattern for ready
  for(int i = 0; i < 3; i++) {
    digitalWrite(LED_PIN, HIGH);
    delay(100);
    digitalWrite(LED_PIN, LOW);
    delay(100);
  }
}

void playResultTone() {
  // LED pattern based on result
  if(bacReading < 0.02) {
    // Safe - single long blink
    digitalWrite(LED_PIN, HIGH);
    delay(500);
    digitalWrite(LED_PIN, LOW);
  } else if(bacReading < 0.08) {
    // Caution - double blink
    for(int i = 0; i < 2; i++) {
      digitalWrite(LED_PIN, HIGH);
      delay(200);
      digitalWrite(LED_PIN, LOW);
      delay(200);
    }
  } else {
    // Danger - rapid blinks
    for(int i = 0; i < 5; i++) {
      digitalWrite(LED_PIN, HIGH);
      delay(100);
      digitalWrite(LED_PIN, LOW);
      delay(100);
    }
  }
}