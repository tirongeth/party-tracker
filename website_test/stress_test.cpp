#include <Wire.h>
#include <Arduino.h>


const int PWM_PIN = D5;


void setup() {

    pinMode(PWM_PIN, OUTPUT);
    analogWriteFreq(2000);

}

void loop() {
    analogWrite(PWM_PIN, 1023);
    delay(20000);
    analogWrite(PWM_PIN, 0);
    delay(2000);
}