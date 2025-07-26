# ESP32 BoozeLens Integration Guide

## Overview
The BoozeLens is a keychain device with:
- ESP32 microcontroller
- Camera module (OV2640 or similar)
- WiFi connectivity
- Optional integration with breathalyzer for BAC readings

## Photo Upload Protocol

### 1. Authentication
The ESP32 device must be paired with a user account first. Each device has a unique ID (e.g., `HSG_abc123`).

### 2. Photo Upload Endpoint
The web app expects photo uploads in the following format:

```javascript
const photoData = {
    deviceId: "HSG_abc123",        // Device ID (required)
    imageBase64: "...",             // Base64 encoded JPEG (required)
    bac: 0.045,                     // BAC reading if user chose to test (optional)
    timestamp: 1234567890000,       // Unix timestamp in ms (optional)
    location: {                     // GPS location (optional)
        lat: 47.2455,
        lng: 9.5325
    }
};
```

### 3. Upload Methods

#### Option A: Direct Firebase Upload (Recommended)
```cpp
// ESP32 Arduino code example
#include <Firebase_ESP_Client.h>

void uploadPhoto(uint8_t* imageData, size_t imageSize, float bacReading) {
    // Convert to base64
    String base64Image = base64::encode(imageData, imageSize);
    
    // Create JSON payload
    FirebaseJson json;
    json.add("deviceId", DEVICE_ID);
    json.add("imageBase64", base64Image);
    json.add("bac", bacReading);
    json.add("timestamp", millis());
    
    // Send to Firebase Function
    Firebase.Functions.httpsCallable(&fbdo, "handleBoozeSnapUpload", json);
}
```

#### Option B: Via Server Endpoint
```cpp
// POST to your server endpoint
HTTPClient http;
http.begin("https://your-server.com/api/booze-snap/upload");
http.addHeader("Content-Type", "application/json");
http.addHeader("X-Device-ID", DEVICE_ID);
http.addHeader("X-Device-Secret", DEVICE_SECRET);

String payload = "{\"image\":\"" + base64Image + "\",\"bac\":" + bacReading + "}";
int httpCode = http.POST(payload);
```

### 4. Image Requirements
- Format: JPEG
- Max size: 2MB (recommended: 800x600 or smaller)
- The app will automatically apply retro filters

### 5. Security Considerations
1. Device must be paired with user account
2. Use HTTPS for all communications
3. Implement device-specific secrets/tokens
4. Rate limiting (max 1 photo per 30 seconds)

## Server-Side Handler

Create a Firebase Cloud Function:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.handleBoozeSnapUpload = functions.https.onCall(async (data, context) => {
    // Verify device ownership
    const deviceId = data.deviceId;
    const userId = await verifyDeviceOwnership(deviceId);
    
    if (!userId) {
        throw new functions.https.HttpsError('permission-denied', 'Device not paired');
    }
    
    // Forward to web app's photo handler
    return await handlePhotoUpload({
        ...data,
        userId: userId
    });
});
```

## ESP32 Camera Setup

### Hardware Connections (AI Thinker ESP32-CAM)
```
Camera Pin    ESP32 Pin
PWDN     ->   GPIO 32
RESET    ->   GPIO -1
XCLK     ->   GPIO 0
SIOD     ->   GPIO 26
SIOC     ->   GPIO 27
Y9       ->   GPIO 35
Y8       ->   GPIO 34
Y7       ->   GPIO 39
Y6       ->   GPIO 36
Y5       ->   GPIO 21
Y4       ->   GPIO 19
Y3       ->   GPIO 18
Y2       ->   GPIO 5
VSYNC    ->   GPIO 25
HREF     ->   GPIO 23
PCLK     ->   GPIO 22
```

### Camera Configuration
```cpp
camera_config_t config;
config.ledc_channel = LEDC_CHANNEL_0;
config.ledc_timer = LEDC_TIMER_0;
config.pin_d0 = Y2_GPIO_NUM;
// ... other pins ...
config.xclk_freq_hz = 20000000;
config.pixel_format = PIXFORMAT_JPEG;
config.frame_size = FRAMESIZE_VGA;  // 640x480
config.jpeg_quality = 12;  // 0-63, lower = higher quality
config.fb_count = 1;
```

## Testing

Use the web app's console to test uploads:
```javascript
// Simulate ESP32 upload
window.handleBoozeSnapUpload({
    deviceId: "TEST_DEVICE",
    imageBase64: "...", // Base64 JPEG data
    bac: 0.05,
    timestamp: Date.now()
});
```

## Troubleshooting

1. **Upload fails with "Device not paired"**
   - Ensure device is paired in the app first
   - Check device ID matches exactly

2. **Image appears black/corrupted**
   - Check camera initialization
   - Verify JPEG encoding
   - Test with smaller image size

3. **Upload timeouts**
   - Reduce image size
   - Check WiFi signal strength
   - Implement retry logic

## Future Enhancements
- Real-time streaming preview
- Automatic filter selection based on BAC
- Group photo mode
- Video clips support