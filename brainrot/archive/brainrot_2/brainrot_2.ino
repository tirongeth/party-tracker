#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// Display settings - CORRECT: 128x32!
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 32
#define OLED_RESET -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// Pin definitions
#define MQ3_PIN 4       // GPIO4 for MQ3 analog output
#define SWITCH_PIN 13   // GPIO13 for switch input
#define SDA_PIN 8      // GPIO21 for I2C SDA
#define SCL_PIN 18      // GPIO22 for I2C SCL

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
  DISPLAYING_RESULT
};

State currentState = OFF;
unsigned long stateStartTime = 0;
float bacReading = 0.0;

// Scrolling text variables
int scrollPos = 0;
unsigned long lastScrollTime = 0;
const int SCROLL_SPEED = 150; // milliseconds between scroll steps

void setup() {
  Wire.begin(SDA_PIN, SCL_PIN);
  
  pinMode(SWITCH_PIN, INPUT_PULLUP);
  pinMode(MQ3_PIN, INPUT);
  
  analogReadResolution(12);
  analogSetAttenuation(ADC_11db);
  
  // Initialize display - 128x32
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    for(;;); // Don't proceed if display fails
  }
  
  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);
  display.display();
}

void loop() {
  bool switchOn = (digitalRead(SWITCH_PIN) == LOW);
  
  // Update scrolling
  if (millis() - lastScrollTime > SCROLL_SPEED) {
    scrollPos++;
    lastScrollTime = millis();
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
        currentState = DISPLAYING_RESULT;
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
    bac = (1.0 - ratio) * 3.0;
  }
  
  return bac;
}

void scrollText(const char* text, int y, int textSize = 2) {
  display.setTextSize(textSize);
  int textWidth = strlen(text) * 6 * textSize;
  int pos = 128 - (scrollPos % (textWidth + 128));
  display.setCursor(pos, y);
  display.print(text);
  
  // Print again for seamless loop
  if (pos < 0) {
    display.setCursor(pos + textWidth + 64, y);
    display.print(text);
  }
}

void displayOff() {
  display.clearDisplay();
  
  // Static title
  display.setTextSize(2);
  display.setCursor(10, 0);
  display.print("PARTY");
  
  // Scrolling instruction
  scrollText(">>> FLIP SWITCH TO START <<<", 16, 1);
  
  display.display();
}

void displayWarmup() {
  int timeLeft = (WARMUP_TIME - (millis() - stateStartTime)) / 1000;
  
  display.clearDisplay();
  
  // Big countdown
  display.setTextSize(3);
  display.setCursor(40, 4);
  if (timeLeft < 10) display.print(" ");
  display.print(timeLeft);
  display.print("s");
  
  // Progress bar at bottom
  int progress = map(millis() - stateStartTime, 0, WARMUP_TIME, 0, 128);
  display.fillRect(0, 28, progress, 4, SSD1306_WHITE);
  
  display.display();
}

void displayReady() {
  display.clearDisplay();
  
  // Alternating display
  if ((millis() / 1000) % 2 == 0) {
    // Show READY
    display.setTextSize(3);
    display.setCursor(15, 5);
    display.print("READY");
  } else {
    // Show BLOW
    display.setTextSize(3);
    display.setCursor(20, 5);
    display.print("BLOW!");
  }
  
  display.display();
}

void displayMeasuring() {
  display.clearDisplay();
  
  // Top line - static
  display.setTextSize(2);
  display.setCursor(10, 0);
  display.print("TESTING");
  
  // Animated progress dots
  display.setTextSize(2);
  display.setCursor(30, 16);
  int dots = (millis() / 300) % 6;
  for(int i = 0; i < dots; i++) {
    display.print(".");
  }
  
  display.display();
}

void displayResult() {
  display.clearDisplay();
  
  // Alternate between BAC value and message
  int phase = (millis() / 2000) % 3;
  
  if (phase == 0) {
    // Show BAC value BIG
    display.setTextSize(3);
    display.setCursor(10, 5);
    display.print(bacReading, 2);
    display.setTextSize(1);
    display.setCursor(80, 12);
    display.print("o/oo");
  } 
  else if (phase == 1) {
    // Show status
    display.setTextSize(2);
    display.setCursor(5, 8);
    
    if(bacReading < 0.2) {
      display.print("SAFE :)");
    } else if(bacReading < 0.5) {
      display.print("CAUTION");
    } else if(bacReading < 0.8) {
      display.print("NO DRIVE");
    } else {
      display.print("TOO MUCH");
    }
  }
  else {
    // Show advice
    display.setTextSize(1);
    display.setCursor(0, 8);
    
    if(bacReading < 0.2) {
      scrollText("PARTY SAFE - HAVE FUN!", 8, 1);
    } else if(bacReading < 0.5) {
      scrollText("SLOW DOWN - DRINK WATER", 8, 1);
    } else if(bacReading < 0.8) {
      scrollText("CALL A FRIEND - NO DRIVING!", 8, 1);
    } else {
      scrollText("PARTY OVER - TIME FOR WATER!", 8, 1);
    }
  }
  
  display.display();
}