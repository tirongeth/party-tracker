// Minimal test - just blink the flash LED to show ESP32 is running
void setup() {
    // Disable brownout
    #include "soc/soc.h"
    #include "soc/rtc_cntl_reg.h"
    WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);
    
    pinMode(4, OUTPUT);  // Flash LED on GPIO4
    pinMode(33, OUTPUT); // Red LED on GPIO33 (on some boards)
}

void loop() {
    digitalWrite(4, HIGH);
    delay(100);
    digitalWrite(4, LOW);
    delay(900);
}