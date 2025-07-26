/*
 * ESP32-CAM Slave - Camera Module Only
 * Receives commands from ESP32-S3 via Serial
 */

#include "esp_camera.h"
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"

// Camera pins
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

#define FLASH_LED 4

void setup() {
    WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);
    
    Serial.begin(115200);
    pinMode(FLASH_LED, OUTPUT);
    
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
    config.frame_size = FRAMESIZE_VGA;
    config.jpeg_quality = 10;
    config.fb_count = 1;
    
    esp_err_t err = esp_camera_init(&config);
    if (err != ESP_OK) {
        Serial.printf("Camera init failed: 0x%x\n", err);
        return;
    }
    
    // Signal ready
    delay(1000);
    Serial.println("READY");
}

void loop() {
    // Check for commands
    if (Serial.available()) {
        String command = Serial.readStringUntil('\n');
        command.trim();
        
        if (command == "INIT") {
            Serial.println("READY");
        }
        else if (command == "PHOTO") {
            takePhoto();
        }
        else if (command == "STATUS") {
            Serial.println("OK");
        }
    }
}

void takePhoto() {
    // Flash LED
    digitalWrite(FLASH_LED, HIGH);
    delay(50);
    
    // Capture photo
    camera_fb_t *fb = esp_camera_fb_get();
    digitalWrite(FLASH_LED, LOW);
    
    if (!fb) {
        Serial.println("ERROR:CAPTURE_FAILED");
        return;
    }
    
    // Send size first
    Serial.print("SIZE:");
    Serial.println(fb->len);
    
    // In a real implementation, you would send the actual image data
    // For now, just send confirmation
    // You could send it in chunks like:
    // Serial.write(fb->buf, fb->len);
    
    esp_camera_fb_return(fb);
}

/*
 * For actual photo transfer, you might want to:
 * 1. Send photo in small chunks (e.g., 1024 bytes at a time)
 * 2. Add checksum for each chunk
 * 3. Allow retransmission of failed chunks
 * 4. Or use base64 encoding for text-based transfer
 */