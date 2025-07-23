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

// Configuration HTML page - Improved styling and mobile responsiveness
const char configPage[] PROGMEM = R"=====(
<!DOCTYPE html>
<html>
<head>
    <title>HSG Breathalyzer Setup</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
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
            -webkit-backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        h1 {
            text-align: center;
            font-size: 24px;
            color: #00ff88;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .device-id {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            color: #00ff88;
            background: rgba(0, 255, 136, 0.15);
            padding: 15px;
            border-radius: 12px;
            margin: 20px 0;
            font-family: 'Courier New', monospace;
            letter-spacing: 1px;
            border: 1px solid rgba(0, 255, 136, 0.3);
        }
        
        .info {
            background: rgba(0, 212, 255, 0.1);
            padding: 15px;
            border-radius: 12px;
            margin: 20px 0;
            text-align: center;
            font-size: 14px;
            border: 1px solid rgba(0, 212, 255, 0.2);
        }
        
        input, select {
            width: 100%;
            padding: 14px 16px;
            margin: 8px 0;
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.05);
            color: #ffffff;
            font-size: 16px;
            transition: all 0.3s ease;
            -webkit-appearance: none;
        }
        
        input:focus {
            outline: none;
            border-color: #00ff88;
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.15);
        }
        
        input::placeholder {
            color: rgba(255, 255, 255, 0.5);
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
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(0, 255, 136, 0.4);
        }
        
        button:active {
            transform: translateY(0);
        }
        
        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        .error {
            color: #ff6b6b;
            text-align: center;
            margin: 15px 0;
            padding: 12px;
            background: rgba(255, 107, 107, 0.1);
            border-radius: 8px;
            border: 1px solid rgba(255, 107, 107, 0.3);
            display: none;
            font-size: 14px;
        }
        
        .success {
            color: #00ff88;
            text-align: center;
            margin: 20px 0;
            padding: 20px;
            background: rgba(0, 255, 136, 0.1);
            border-radius: 12px;
            border: 1px solid rgba(0, 255, 136, 0.3);
        }
        
        .step {
            margin: 25px 0;
            padding: 20px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .step h3 {
            color: #00d4ff;
            margin: 0 0 15px 0;
            font-size: 18px;
            font-weight: 600;
        }
        
        .loading {
            display: none;
            text-align: center;
            margin: 30px 0;
        }
        
        .spinner {
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            border-top: 3px solid #00ff88;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .networks {
            max-height: 200px;
            overflow-y: auto;
            margin: 12px 0;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.02);
        }
        
        .network-item {
            padding: 12px 16px;
            margin: 0;
            background: transparent;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .network-item:last-child {
            border-bottom: none;
        }
        
        .network-item:hover {
            background: rgba(255, 255, 255, 0.05);
            padding-left: 20px;
        }
        
        .network-item:active {
            background: rgba(0, 255, 136, 0.1);
        }
        
        .signal-strength {
            font-size: 12px;
            opacity: 0.6;
            font-weight: 500;
        }
        
        .scan-button {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            color: #ffffff;
            font-size: 14px;
            padding: 10px;
            margin: 10px 0;
        }
        
        .scan-button:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: none;
            box-shadow: none;
        }
        
        @media (max-width: 380px) {
            .container { padding: 20px; }
            h1 { font-size: 20px; }
            .device-id { font-size: 16px; }
            input, button { font-size: 14px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🍺 HSG Breathalyzer Setup</h1>
        
        <div class="device-id">
            DEVICE ID: <strong>%DEVICE_ID%</strong>
        </div>
        
        <div class="info">
            ℹ️ Save this Device ID to pair with the HSG Party Tracker app!
        </div>
        
        <div id="error" class="error"></div>
        
        <form id="setupForm" action="/save" method="POST">
            <div class="step">
                <h3>📶 WiFi Connection</h3>
                <div id="networkList" class="networks">
                    <div style="text-align: center; padding: 20px; opacity: 0.6;">
                        Scanning for networks...
                    </div>
                </div>
                <input type="text" name="ssid" id="ssid" placeholder="WiFi Network Name" required>
                <input type="password" name="pass" id="pass" placeholder="WiFi Password" required>
                <button type="button" class="scan-button" onclick="scanNetworks()">🔄 Scan Networks</button>
            </div>
            
            <div class="step">
                <h3>👤 User Information (Optional)</h3>
                <input type="text" name="name" placeholder="Your Name">
                <input type="email" name="email" placeholder="your.email@hsg.ch">
            </div>
            
            <button type="submit">💾 Save and Connect</button>
        </form>
        
        <div id="loading" class="loading">
            <div class="spinner"></div>
            <p style="margin-top: 20px; opacity: 0.8;">Connecting to WiFi...</p>
        </div>
    </div>
    
    <script>
        function selectNetwork(ssid) {
            document.getElementById('ssid').value = ssid;
            document.getElementById('pass').focus();
            // Visual feedback
            document.querySelectorAll('.network-item').forEach(item => {
                item.style.background = 'transparent';
            });
            event.currentTarget.style.background = 'rgba(0, 255, 136, 0.1)';
        }
        
        function scanNetworks() {
            const btn = event.target;
            btn.disabled = true;
            btn.textContent = '⏳ Scanning...';
            document.getElementById('networkList').innerHTML = '<div style="text-align: center; padding: 20px;"><div class="spinner" style="width: 30px; height: 30px; margin: 0 auto;"></div></div>';
            
            fetch('/scan')
                .then(response => response.json())
                .then(data => {
                    const networkList = document.getElementById('networkList');
                    if (data.networks.length === 0) {
                        networkList.innerHTML = '<div style="text-align: center; padding: 20px; opacity: 0.6;">No networks found</div>';
                    } else {
                        networkList.innerHTML = data.networks.map(network => 
                            `<div class="network-item" onclick="selectNetwork('${network.ssid}')">
                                <span>${network.ssid}</span>
                                <span class="signal-strength">${network.rssi} dBm</span>
                            </div>`
                        ).join('');
                    }
                    btn.disabled = false;
                    btn.textContent = '🔄 Scan Networks';
                })
                .catch(err => {
                    console.error('Scan failed:', err);
                    btn.disabled = false;
                    btn.textContent = '🔄 Scan Networks';
                    document.getElementById('networkList').innerHTML = '<div style="text-align: center; padding: 20px; color: #ff6b6b;">Scan failed</div>';
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
                document.getElementById('error').textContent = '❌ Setup failed: ' + err;
                document.getElementById('error').style.display = 'block';
                document.getElementById('loading').style.display = 'none';
                document.getElementById('setupForm').style.display = 'block';
            });
        };
        
        // Initial network scan after a short delay
        setTimeout(scanNetworks, 500);
    </script>
</body>
</html>
)=====";

const char successPage[] PROGMEM = R"=====(
<div class="success">
    <h2 style="color: #00ff88; margin-bottom: 15px;">✅ Setup Complete!</h2>
    <p style="font-size: 18px; margin: 10px 0;"><strong>Device ID: %DEVICE_ID%</strong></p>
    <p style="margin: 15px 0; opacity: 0.9;">Your breathalyzer is configured and will restart.</p>
    <p style="margin: 15px 0; opacity: 0.9;">Use the Device ID above to pair with the app.</p>
    <p style="margin-top: 25px; font-size: 14px; opacity: 0.7;">The device will now connect to your WiFi network...</p>
</div>
)=====";

const char failPage[] PROGMEM = R"=====(
<div class="error" style="display: block;">
    <h2 style="margin-bottom: 15px;">❌ Connection Failed</h2>
    <p style="margin: 10px 0;">Could not connect to the WiFi network.</p>
    <p style="margin: 10px 0;">Please check your password and try again.</p>
    <button onclick="location.reload()" style="margin-top: 20px;">Try Again</button>
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
  showSplashScreen();
  
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
  drawCenteredText("Connecting to", 0, 1);
  drawCenteredText(ssid.substring(0, 21).c_str(), 16, 1);
  display.display();
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid.c_str(), pass.c_str());
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(500);
    Serial.print(".");
    
    // Animate progress bar
    display.fillRect(10, 40, (108 * attempts) / 30, 8, SSD1306_WHITE);
    display.display();
    
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    wifiConnected = true;
    Serial.println("\nConnected!");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
    
    display.clearDisplay();
    drawCenteredText("Connected!", 0, 2);
    display.setTextSize(1);
    drawCenteredText(WiFi.localIP().toString().c_str(), 24, 1);
    drawCenteredText("Device ID:", 36, 1);
    drawCenteredText(deviceId.c_str(), 48, 1);
    display.display();
    
    digitalWrite(LED_PIN, HIGH);
    delay(2000);
    digitalWrite(LED_PIN, LOW);
  } else {
    wifiConnected = false;
    Serial.println("\nWiFi connection failed!");
    
    display.clearDisplay();
    drawCenteredText("WiFi Failed!", 0, 2);
    display.setTextSize(1);
    drawCenteredText("Double-click switch", 20, 1);
    drawCenteredText("for setup mode", 32, 1);
    drawCenteredText("Or use offline", 52, 1);
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
  drawCenteredText("CALIBRATION", 0, 2);
  display.setTextSize(1);
  drawCenteredText("Ensure clean air", 20, 1);
  display.display();
  
  float sum = 0;
  for(int i = 0; i < CALIBRATION_SAMPLE_TIMES; i++) {
    int sensorValue = analogRead(MQ3_PIN);
    float voltage = sensorValue * (3.3 / 4095.0);
    float RS = ((3.3 * MQ3_RL) / voltage) - MQ3_RL;
    sum += RS;
    delay(CALIBRATION_SAMPLE_INTERVAL);
    
    // Show progress bar
    display.fillRect(10, 40, (108 * i) / CALIBRATION_SAMPLE_TIMES, 8, SSD1306_WHITE);
    display.setCursor(10, 52);
    display.print("Progress: ");
    display.print((i * 100) / CALIBRATION_SAMPLE_TIMES);
    display.print("%");
    display.display();
  }
  
  r0Value = sum / CALIBRATION_SAMPLE_TIMES;
  
  // Save calibration value
  preferences.putFloat("r0_value", r0Value);
  
  display.clearDisplay();
  drawCenteredText("Complete!", 0, 2);
  display.setTextSize(1);
  display.setCursor(10, 25);
  display.print("R0 = ");
  display.print(r0Value, 1);
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

// Display helper functions
void drawCenteredText(const char* text, int y, int size) {
  display.setTextSize(size);
  int16_t x1, y1;
  uint16_t w, h;
  display.getTextBounds(text, 0, 0, &x1, &y1, &w, &h);
  display.setCursor((SCREEN_WIDTH - w) / 2, y);
  display.print(text);
}

void showSplashScreen() {
  display.clearDisplay();
  drawCenteredText("HSG", 5, 3);
  drawCenteredText("Breathalyzer", 35, 1);
  drawCenteredText("v2.0", 50, 1);
  display.display();
  delay(2000);
}

// Display functions
void displaySetupMode() {
  display.clearDisplay();
  
  // Header
  display.fillRect(0, 0, SCREEN_WIDTH, 16, SSD1306_WHITE);
  display.setTextColor(SSD1306_BLACK);
  drawCenteredText("SETUP MODE", 4, 1);
  display.setTextColor(SSD1306_WHITE);
  
  // WiFi info
  display.setTextSize(1);
  display.setCursor(0, 20);
  display.print("WiFi: ");
  display.println(apSSID);
  display.print("Pass: ");
  display.println(AP_PASS);
  
  // Connection info
  display.drawLine(0, 40, SCREEN_WIDTH, 40, SSD1306_WHITE);
  display.setCursor(0, 44);
  display.println("Connect & open:");
  display.setTextSize(1);
  drawCenteredText("192.168.4.1", 54, 1);
  
  display.display();
}

void displayOff() {
  display.clearDisplay();
  
  // Logo/Title
  drawCenteredText("HSG", 0, 2);
  display.drawLine(20, 18, 108, 18, SSD1306_WHITE);
  
  // Device ID with border
  display.setTextSize(1);
  display.drawRect(10, 22, 108, 20, SSD1306_WHITE);
  drawCenteredText("Device ID", 24, 1);
  drawCenteredText(deviceId.c_str(), 32, 1);
  
  // Status bar
  display.setCursor(0, 48);
  if (readingTaken) {
    display.print("Last: ");
    display.print(bacReading, 3);
    display.print("\x80");  // Per mille symbol
  } else {
    display.print("Press to start");
  }
  
  // Bottom status
  display.drawLine(0, 56, SCREEN_WIDTH, 56, SSD1306_WHITE);
  display.setCursor(0, 57);
  display.setTextSize(1);
  
  if (wifiConnected) {
    display.print("\x90");  // WiFi symbol
    display.print(" OK");
  } else {
    display.print("Offline");
  }
  
  display.setCursor(88, 57);
  display.print("2x=Setup");
  
  display.display();
}

void displayWarmup() {
  int timeLeft = (WARMUP_TIME - (millis() - stateStartTime)) / 1000;
  
  display.clearDisplay();
  
  // Header
  drawCenteredText("WARMING UP", 0, 1);
  
  // Large countdown
  char timeStr[3];
  sprintf(timeStr, "%02d", timeLeft);
  drawCenteredText(timeStr, 20, 3);
  
  // Progress bar with border
  display.drawRect(9, 50, 110, 10, SSD1306_WHITE);
  int progress = map(millis() - stateStartTime, 0, WARMUP_TIME, 0, 108);
  display.fillRect(10, 51, progress, 8, SSD1306_WHITE);
  
  display.display();
}

void displayReady() {
  display.clearDisplay();
  
  // Animated ready message
  if ((millis() / 400) % 2 == 0) {
    display.fillRect(0, 12, SCREEN_WIDTH, 32, SSD1306_WHITE);
    display.setTextColor(SSD1306_BLACK);
    drawCenteredText("READY", 20, 3);
    display.setTextColor(SSD1306_WHITE);
  } else {
    drawCenteredText("BLOW!", 20, 3);
  }
  
  // Instructions
  display.setTextSize(1);
  drawCenteredText("Blow steadily for 5 sec", 52, 1);
  
  display.display();
}

void displayMeasuring() {
  display.clearDisplay();
  
  // Header
  drawCenteredText("MEASURING", 0, 1);
  
  // BAC Value with box
  display.drawRect(20, 18, 88, 25, SSD1306_WHITE);
  display.setTextSize(2);
  display.setCursor(30, 23);
  display.print(bacReading, 3);
  display.setTextSize(1);
  display.print("\x80");
  
  // Progress bar
  int progress = map(millis() - stateStartTime, 0, MEASURE_TIME, 0, 108);
  display.drawRect(9, 48, 110, 8, SSD1306_WHITE);
  display.fillRect(10, 49, progress, 6, SSD1306_WHITE);
  
  // Animation
  display.setCursor(10, 58);
  int dots = ((millis() - stateStartTime) / 200) % 6;
  display.print("Analyzing");
  for(int i = 0; i < dots; i++) {
    display.print(".");
  }
  
  display.display();
}

void displayResult() {
  display.clearDisplay();
  
  // Result box
  display.fillRect(0, 0, SCREEN_WIDTH, 40, SSD1306_WHITE);
  display.setTextColor(SSD1306_BLACK);
  
  // BAC value
  display.setTextSize(2);
  display.setCursor(20, 5);
  display.print(bacReading, 3);
  display.setTextSize(1);
  display.print(" \x80");  // Per mille
  
  // Status message
  display.setCursor(20, 24);
  if(bacReading < 0.02) {
    display.print("SAFE");
  } else if(bacReading < 0.05) {
    display.print("CAUTION");
  } else if(bacReading < 0.08) {
    display.print("NO DRIVE!");
  } else {
    display.print("DANGER!");
  }
  
  display.setTextColor(SSD1306_WHITE);
  
  // Bottom info
  display.setCursor(0, 44);
  if (wifiConnected) {
    display.print("\x91 Uploaded to cloud");
  } else {
    display.print("\x92 Saved locally");
  }
  
  display.setCursor(0, 54);
  display.print("Remove to reset");
  
  display.display();
}

void displayUploadSuccess() {
  // Brief success indication at bottom
  display.fillRect(0, 44, SCREEN_WIDTH, 10, SSD1306_BLACK);
  display.setCursor(0, 44);
  display.print("\x91 Upload successful!");
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