require("dotenv").config();
const mqtt = require("mqtt");

var mqttClient;
var mqttHost = process.env.MQTT_HOST;
var mqttPort = process.env.MQTT_PORT;
const protocol = "mqtt";

// Change this to point to your MQTT broker or DNS name
// const username = "phucle";
// const password = "aio_ypjm65RZyBGwvGMygJoWFeaYVOlx";

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
  });

  // Received Message
  mqttClient.on("message", (topic, message, packet) => {
    console.log(
      "Received Message: " + message.toString() + "\nOn topic: " + topic
    );
  });
}

function publishMessage(topic, message) {
  console.log(`Sending Topic: ${topic}, Message: ${message}`);
  mqttClient.publish(topic, message, {
    qos: 0,
    retain: false,
  });
}

connectToBroker();

const deviceTopic = ['feeds/DeviceGarden1', 'feeds/DeviceGarden2'];
const pubDeviceStatus = (garden_id, device_id, status) => {

  let numeric = garden_id.match(/\d+/)[0];
  let numericValue = parseInt(numeric, 10);

  topic = deviceTopic[numericValue - 1]
  message = JSON.stringify({
    "station_id": garden_id,
    "Device id": device_id,
    "Device_value": status ? 1 : 0
  })

  publishMessage(topic, message);
};


module.exports = {
  pubDeviceStatus
}