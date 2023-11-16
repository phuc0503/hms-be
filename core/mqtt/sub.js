require("dotenv").config();
const mqtt = require("mqtt");
const db = require('../models/index');

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

      if (insertToHumiData(message) && insertToTempData(message) && insertToMoisData(message) && insertToLightData(message)) {
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

const insertToHumiData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.HumiData.create({
        sensorId: data.sensors[0].sensor_id,
        value: data.sensors[0].sensor_value,
        unit: data.sensors[0].sensor_unit
      });

      resolve(1);
    } catch (e) {
      reject(e);
    }
  })
};

const insertToTempData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.TempData.create({
        sensorId: data.sensors[1].sensor_id,
        value: data.sensors[1].sensor_value,
        unit: data.sensors[1].sensor_unit
      });

      resolve(1);
    } catch (e) {
      reject(e);
    }
  })
};

const insertToMoisData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.MoisData.create({
        sensorId: data.sensors[2].sensor_id,
        value: data.sensors[2].sensor_value,
        unit: data.sensors[2].sensor_unit
      });

      resolve(1);
    } catch (e) {
      reject(e);
    }
  })
};

const insertToLightData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.LightData.create({
        sensorId: data.sensors[3].sensor_id,
        value: data.sensors[3].sensor_value,
        unit: data.sensors[3].sensor_unit
      });

      resolve(1);
    } catch (e) {
      reject(e);
    }
  })
};

connectToBroker();
subscribeToTopic(`feeds/Temp`);
