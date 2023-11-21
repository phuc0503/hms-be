require("dotenv").config();
const mqtt = require("mqtt");
const supabase = require('../config/supabaseClient');
const { insertToTemperatureTable, insertToHumidityTable, insertToMoistureTable, insertToLightTable } = require('../services/sensorDataServices');

var mqttClient;
var mqttHost = process.env.MQTT_HOST;
var mqttPort = process.env.MQTT_PORT;
const protocol = "mqtt";

function connectToBroker() {
  const clientId = "client";

  // Change this to point to your MQTT broker
  const hostURL = `${protocol}://${mqttHost}:${mqttPort}`;

  const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
  };

  mqttClient = mqtt.connect(
    hostURL,
    {
      // username: username,
      // password: password
    },
    options
  );

  mqttClient.on("error", (err) => {
    console.log("Error: ", err);
    mqttClient.end();
  });

  mqttClient.on("reconnect", () => {
    console.log("Reconnecting...");
  });

  mqttClient.on("connect", () => {
    console.log("Client connected:" + clientId);
    console.log("mqttHost:" + mqttHost);
  });

  // Received Message
  mqttClient.on("message", async (topic, message, packet) => {
    try {
      message = JSON.parse(message.toString());
      console.log("Received Message on topic: " + topic);
      if (insertToTemperatureTable(message) && insertToHumidityTable(message) && insertToMoistureTable(message) && insertToLightTable(message)) {
        console.log("Data inserted into PostgreSQL successfully!");
      }
    } catch (error) {
      console.error("Error processing and storing data:", error);
    }
  });
}

function subscribeToTopic(topic) {
  console.log(`Subscribing to Topic: ${topic}`);

  mqttClient.subscribe(topic, { qos: 0 });
}

connectToBroker();
subscribeToTopic(`feeds/Temp`);
