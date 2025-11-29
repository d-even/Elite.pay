#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <SPI.h>
#include <MFRC522.h>

// NFC pins
#define MFRC_SS 21
#define MFRC_RST 22

// WiFi AP
const char* AP_SSID = "ESP32-Scanner";
const char* AP_PASS = "scan12345";

// WiFi Router (STA)
const char* STA_SSID = "Deven";
const char* STA_PASS = "India070";

// Web Server
WebServer server(80);

// RFID reader
MFRC522 mfrc522(MFRC_SS, MFRC_RST);

// State machine
enum UiState { STATE_IDLE, STATE_SCANNING, STATE_DONE };
UiState state = STATE_IDLE;

volatile bool startRequested = false;
unsigned long scannedAtMs = 0;

String lastCardUid = "";

// --------------------------------------------------
// Simple HTML pages
// --------------------------------------------------

const char INDEX_HTML[] PROGMEM = R"HTML(
<!DOCTYPE html>
<html>
  <body style="font-family:Arial;">
    <h1>ESP32 NFC Scanner</h1>
    <a href="/start">Start Scan</a><br><br>
    <a href="/status">Check Status</a><br><br>
    <a href="/info">Device Info</a><br><br>
  </body>
</html>
)HTML";

// --------------------------------------------------
// Helpers
// --------------------------------------------------

String statusString() {
  if (state == STATE_IDLE) return "Idle";
  if (state == STATE_SCANNING) return "Scanning... Tap card";
  if (state == STATE_DONE) return "Card scanned: " + lastCardUid;
  return "Unknown";
}

// --------------------------------------------------
// Route Handlers
// --------------------------------------------------

void handleRoot() {
  server.send_P(200, "text/html", INDEX_HTML);
}

void handleStart() {
  startRequested = true;
  state = STATE_SCANNING;
  lastCardUid = "";
  server.send(200, "text/plain", "Scanning started");
}

void handleStatus() {
  server.send(200, "text/plain", statusString());
}

void handleInfo() {
  String page;
  page += "<h2>ESP32 Network Info</h2>";
  page += "AP IP: " + WiFi.softAPIP().toString() + "<br>";
  if (WiFi.status() == WL_CONNECTED)
    page += "STA IP: " + WiFi.localIP().toString() + "<br>";
  else
    page += "STA NOT CONNECTED<br>";

  server.send(200, "text/html", page);
}

// --------------------------------------------------
// SETUP
// --------------------------------------------------

void setup() {
  Serial.begin(115200);
  delay(200);

  WiFi.mode(WIFI_AP_STA);

  // Start AP
  WiFi.softAP(AP_SSID, AP_PASS);
  Serial.println("\n[AP MODE]");
  Serial.print("SSID: "); Serial.println(AP_SSID);
  Serial.print("AP IP: "); Serial.println(WiFi.softAPIP());

  // Connect STA
  Serial.println("\nConnecting to router...");
  WiFi.begin(STA_SSID, STA_PASS);

  unsigned long startTry = millis();
 while (WiFi.status() != WL_CONNECTED && millis() - startTry < 10000) {
  Serial.print(".");
  Serial.print(" Status:");
  Serial.println(WiFi.status());
  delay(500);
}

  Serial.println();

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("[STA CONNECTED]");
    Serial.print("IP: "); Serial.println(WiFi.localIP());
  } else {
    Serial.println("[STA FAILED]");
  }

  // Routes
  server.on("/", handleRoot);
  server.on("/start", handleStart);
  server.on("/status", handleStatus);
  server.on("/info", handleInfo);
  server.begin();

  // NFC init
  SPI.begin();
  mfrc522.PCD_Init();
  Serial.println("NFC Ready");
}

// --------------------------------------------------
// LOOP
// --------------------------------------------------

void loop() {
  server.handleClient();

  if (state == STATE_SCANNING) {
    if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {

      // Read UID
      lastCardUid = "";
      for (byte i = 0; i < mfrc522.uid.size; i++) {
        if (mfrc522.uid.uidByte[i] < 0x10) lastCardUid += "0";
        lastCardUid += String(mfrc522.uid.uidByte[i], HEX);
      }

      Serial.print("UID Scanned: ");
      Serial.println(lastCardUid);

      state = STATE_DONE;
      scannedAtMs = millis();

      mfrc522.PICC_HaltA();
      mfrc522.PCD_StopCrypto1();
    }
  }

  if (state == STATE_DONE) {
    if (millis() - scannedAtMs > 3000) {
      state = STATE_IDLE;
    }
  }
}

