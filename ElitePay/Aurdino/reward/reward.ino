
#include <WiFi.h>
#include <WebServer.h>
#include <HTTPClient.h>


const char* ssid = "TP-Link_FC46";
const char* password = "Parab@1968";

// Node server URL
String rewardServer = "http://192.168.0.101:3000/claim";

// ------------------ ESP32 STATUS VARIABLES ------------------
String lastStatus = "Idle";
String lastTxHash = "-";
String lastTime = "-";
bool processing = false;

WebServer server(80);

// ------------------------------------------------------------
// HTML PAGE (served by ESP32)
// ------------------------------------------------------------
String getHTML() {
  String html = R"====(
    <html>
    <head>
      <title>ESP32 Reward Monitor</title>
      <style>
        body {
          font-family: Arial;
          background: #0c0f18;
          color: white;
          text-align: center;
          padding-top: 40px;
        }
        .card {
          margin: auto;
          width: 320px;
          padding: 20px;
          border-radius: 15px;
          background: #151a23;
          text-align: center;
        }
        .btn {
          padding: 12px 20px;
          margin-top: 20px;
          border-radius: 10px;
          font-size: 18px;
          background: #0a84ff;
          color: white;
          border: none;
        }
      </style>
    </head>
    <body>
      <h2>ESP32 Reward Status</h2>
      <div class="card">
        <p><b>Status:</b> )====" + lastStatus + R"====(</p>
        <p><b>Last Hash:</b> )====" + lastTxHash + R"====(</p>
        <p><b>Last Trigger:</b> )====" + lastTime + R"====(</p>
        <button class="btn" onclick="trigger()">Trigger Reward</button>
      </div>

      <script>
        function trigger() {
          fetch("/trigger").then(res => location.reload());
        }
      </script>
    </body>
    </html>
  )====";

  return html;
}

// ------------------------------------------------------------
// SEND REWARD TO SERVER
// ------------------------------------------------------------
void sendRewardRequest() {
  HTTPClient http;

  Serial.println("Triggering reward...");
  processing = true;
  lastStatus = "Processing...";
  lastTime = String(millis()/1000) + " sec";

  http.begin(rewardServer);
  http.addHeader("Content-Type", "application/json");

  int code = http.POST("{}");

  if (code > 0) {
    String res = http.getString();
    Serial.println(res);

    if (res.indexOf("txHash") > 0) {
      lastTxHash = res;
      lastStatus = "Reward Sent ✓";
    }
    else {
      lastStatus = "Error!";
    }
  } else {
    lastStatus = "Server Error!";
  }

  http.end();
  processing = false;
}

// ------------------------------------------------------------
// ROUTES
// ------------------------------------------------------------
void handleRoot() {
  server.send(200, "text/html", getHTML());
}

void handleTrigger() {
  sendRewardRequest();
  server.send(200, "text/plain", "OK");
}

// ------------------------------------------------------------
// SETUP
// ------------------------------------------------------------
void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  Serial.print("Connecting");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConnected to WiFi!");
  Serial.print("ESP32 IP: ");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/trigger", handleTrigger);

  server.begin();
  Serial.println("HTTP server started");
}

// ------------------------------------------------------------
void loop() {
  server.handleClient();
}
