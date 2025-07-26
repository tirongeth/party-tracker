/*
 * ESP32-CAM + OLED Simple Test
 * Just camera and display - nothing else
 */

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include "esp_camera.h"
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"

// OLED pins - Using pins that are definitely free
#define SDA_PIN 13
#define SCL_PIN 12

// Camera pins (AI-Thinker)
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM     0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM       5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

Adafruit_SSD1306 display(128, 64, &Wire, -1);

void setup() {
    // Disable brownout
    WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);
    
    Serial.begin(115200);
    delay(1000);
    
    // Initialize I2C for OLED
    Wire.begin(SDA_PIN, SCL_PIN);
    
    // Scan for I2C devices first
    Serial.println("I2C Scanner...");
    for(byte address = 1; address < 127; address++) {
        Wire.beginTransmission(address);
        byte error = Wire.endTransmission();
        if (error == 0) {
            Serial.print("I2C device at 0x");
            Serial.println(address, HEX);
        }
    }
    
    // Initialize OLED - try both common addresses
    if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        Serial.println("Trying 0x3D...");
        if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3D)) {
            Serial.println("OLED failed!");
            // Flash LED to show failure
            pinMode(4, OUTPUT);
            while(1) {
                digitalWrite(4, HIGH);
                delay(100);
                digitalWrite(4, LOW);
                delay(100);
            }
        }
    }
    
    // Show startup message
    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SSD1306_WHITE);
    display.setCursor(0,0);
    display.println("ESP32-CAM Test");
    display.println("Initializing...");
    display.display();
    delay(1000);
    
    // Initialize camera
    camera_config_t config;
    config.ledc_channel = LEDC_CHANNEL_0;
    config.ledc_timer = LEDC_TIMER_0;
    config.pin_d0 = Y2_GPIO_NUM;
    config.pin_d1 = Y3_GPIO_NUM;
    config.pin_d2 = Y4_GPIO_NUM;
    config.pin_d3 = Y5_GPIO_NUM;
    config.pin_d4 = Y6_GPIO_NUM;
    config.pin_d5 = Y7_GPIO_NUM;
    config.pin_d6 = Y8_GPIO_NUM;
    config.pin_d7 = Y9_GPIO_NUM;
    config.pin_xclk = XCLK_GPIO_NUM;
    config.pin_pclk = PCLK_GPIO_NUM;
    config.pin_vsync = VSYNC_GPIO_NUM;
    config.pin_href = HREF_GPIO_NUM;
    config.pin_sscb_sda = SIOD_GPIO_NUM;
    config.pin_sscb_scl = SIOC_GPIO_NUM;
    config.pin_pwdn = PWDN_GPIO_NUM;
    config.pin_reset = RESET_GPIO_NUM;
    config.xclk_freq_hz = 20000000;
    config.pixel_format = PIXFORMAT_JPEG;
    config.frame_size = FRAMESIZE_QVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
    
    esp_err_t err = esp_camera_init(&config);
    if (err != ESP_OK) {
        display.clearDisplay();
        display.setCursor(0,0);
        display.println("Camera FAILED!");
        display.print("Error: 0x");
        display.println(err, HEX);
        display.display();
        return;
    }
    
    display.clearDisplay();
    display.setCursor(0,0);
    display.println("Camera OK!");
    display.println("System Ready");
    display.display();
}

void loop() {
    // Take a photo every 3 seconds
    static unsigned long lastCapture = 0;
    if (millis() - lastCapture > 3000) {
        lastCapture = millis();
        
        // Flash LED
        pinMode(4, OUTPUT);
        digitalWrite(4, HIGH);
        delay(50);
        
        camera_fb_t *fb = esp_camera_fb_get();
        digitalWrite(4, LOW);
        
        if (fb) {
            display.clearDisplay();
            display.setCursor(0,0);
            display.println("Photo taken!");
            display.print("Size: ");
            display.print(fb->len / 1024);
            display.println(" KB");
            display.print("Width: ");
            display.println(fb->width);
            display.print("Height: ");
            display.println(fb->height);
            display.display();
            
            esp_camera_fb_return(fb);
        } else {
            display.clearDisplay();
            display.setCursor(0,0);
            display.println("Capture failed!");
            display.display();
        }
    }
}