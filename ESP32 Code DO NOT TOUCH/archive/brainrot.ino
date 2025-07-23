#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// Display settings
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 32
#define OLED_RESET -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Pin definitions
#define MQ3_PIN 4       // GPIO4 for MQ3 analog output
#define SWITCH_PIN 13   // GPIO13 for switch input
#define SDA_PIN 8      //  
#define SCL_PIN 18      //

// MQ3 calibration values (adjust after testing)
#define MQ3_R0 10.0     // Sensor resistance in clean air
#define MQ3_RL 10.0     // Load resistance on board (usually 10k)

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
  DISPLAYING_RESULT
};

State currentState = OFF;
unsigned long stateStartTime = 0;
float bacReading = 0.0;

void setup() {
  Serial.begin(115200);
  
  // Initialize I2C with ESP32 pins
  Wire.begin(SDA_PIN, SCL_PIN);
  
  // Initialize pins
  pinMode(SWITCH_PIN, INPUT_PULLUP);  // Using internal pullup
  pinMode(MQ3_PIN, INPUT);
  
  // Configure ADC for better accuracy
  analogReadResolution(12);  // 12-bit resolution (0-4095)
  analogSetAttenuation(ADC_11db);  // Full scale 0-3.3V
  
  // Initialize display
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 allocation failed"));
    for(;;);
  }
  
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.display();
  
  Serial.println("ESP32 Breathalyzer initialized");
}

void loop() {
  // Check switch state
  bool switchOn = (digitalRead(SWITCH_PIN) == LOW);  // Active low with pullup
  
  // State machine
  switch(currentState) {
    case OFF:
      if(switchOn) {
        currentState = WARMING_UP;
        stateStartTime = millis();
        displayWarmup();
      } else {
        displayOff();
      }
      break;
      
    case WARMING_UP:
      if(!switchOn) {
        currentState = OFF;
      } else if(millis() - stateStartTime >= WARMUP_TIME) {
        currentState = READY;
        displayReady();
      } else {
        updateWarmupDisplay();
      }
      break;
      
    case READY:
      if(!switchOn) {
        currentState = OFF;
      } else {
        displayReady();
        // Wait for breath detection (significant change in sensor reading)
        if(detectBreath()) {
          currentState = MEASURING;
          stateStartTime = millis();
          bacReading = 0.0;
        }
      }
      break;
      
    case MEASURING:
      if(!switchOn) {
        currentState = OFF;
      } else if(millis() - stateStartTime >= MEASURE_TIME) {
        currentState = DISPLAYING_RESULT;
        stateStartTime = millis();
      } else {
        float currentReading = calculateBAC();
        if(currentReading > bacReading) {
          bacReading = currentReading;  // Keep highest reading
        }
        displayMeasuring();
      }
      break;
      
    case DISPLAYING_RESULT:
      if(!switchOn) {
        currentState = OFF;
      } else if(millis() - stateStartTime >= DISPLAY_TIME) {
        currentState = READY;
        displayReady();
      } else {
        displayResult();
      }
      break;
  }
  
  delay(50);  // Small delay for stability
}

bool detectBreath() {
  static int baseline = analogRead(MQ3_PIN);
  int currentReading = analogRead(MQ3_PIN);
  
  // Update baseline slowly
  baseline = (baseline * 9 + currentReading) / 10;
  
  // Detect significant increase (adjusted for ESP32's 12-bit ADC)
  return (currentReading > baseline + 100);  // Adjust threshold as needed
}

float calculateBAC() {
  // Read sensor value (12-bit on ESP32: 0-4095)
  int sensorValue = analogRead(MQ3_PIN);
  
  // Convert to voltage (3.3V reference on ESP32)
  float voltage = sensorValue * (3.3 / 4095.0);
  
  // Adjust voltage for 5V sensor on 3.3V ADC
  // MQ3 outputs 0-5V, but ESP32 ADC max is 3.3V
  // So we're reading proportionally less
  voltage = voltage * (5.0 / 3.3);
  
  // Calculate RS (sensor resistance)
  float RS = ((5.0 * MQ3_RL) / voltage) - MQ3_RL;
  
  // Calculate ratio
  float ratio = RS / MQ3_R0;
  
  // Convert to BAC (‰)
  // This is a simplified formula - real breathalyzers use complex calibration
  float bac = 0.0;
  if(ratio < 1.0) {
    bac = (1.0 - ratio) * 3.0;  // Max ~3‰
  }
  
  // Debug output
  Serial.print("ADC: ");
  Serial.print(sensorValue);
  Serial.print(" Voltage: ");
  Serial.print(voltage);
  Serial.print(" BAC: ");
  Serial.println(bac);
  
  return bac;
}

void displayOff() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(30, 12);
  display.print("SWITCH ON");
  display.display();
}

void displayWarmup() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(25, 0);
  display.print("WARMING UP");
  display.display();
}

void updateWarmupDisplay() {
  int timeLeft = (WARMUP_TIME - (millis() - stateStartTime)) / 1000;
  
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(25, 0);
  display.print("WARMING UP");
  
  // Progress bar
  int progress = map(millis() - stateStartTime, 0, WARMUP_TIME, 0, 100);
  display.drawRect(14, 15, 100, 8, SSD1306_WHITE);
  display.fillRect(16, 17, progress - 4, 4, SSD1306_WHITE);
  
  display.setCursor(50, 24);
  display.print(timeLeft);
  display.print("s");
  display.display();
}

void displayReady() {
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(30, 0);
  display.print("READY");
  display.setTextSize(1);
  display.setCursor(15, 20);
  display.print("Blow steadily");
  display.display();
}

void displayMeasuring() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setCursor(25, 0);
  display.print("MEASURING");
  
  // Animated dots
  int dots = (millis() / 500) % 4;
  display.setCursor(40, 12);
  for(int i = 0; i < dots; i++) {
    display.print(".");
  }
  
  display.setCursor(20, 24);
  display.print("Keep blowing");
  display.display();
}

void displayResult() {
  display.clearDisplay();
  
  // Show BAC value
  display.setTextSize(2);
  display.setCursor(10, 0);
  display.print(bacReading, 2);
  display.setTextSize(1);
  display.print(" ");
  display.write(137);  // Per mille symbol
  
  // Show interpretation
  display.setTextSize(1);
  display.setCursor(10, 20);
  
  if(bacReading < 0.2) {
    display.print("SAFE TO DRIVE");
  } else if(bacReading < 0.5) {
    display.print("CAUTION");
  } else if(bacReading < 0.8) {
    display.print("DO NOT DRIVE");
  } else {
    display.print("INTOXICATED");
  }
  
  display.display();
}