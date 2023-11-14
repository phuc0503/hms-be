require("dotenv").config();
const mqtt = require("mqtt"); 
const { Client } = require("pg");
const pool = require('../config/db.js')

var mqttClient;
var mqttHost = process.env.MQTT_HOST;
var mqttPort = process.env.MQTT_PORT;
const protocol = "mqtt";

// Connect to the PostgreSQL database
pool
  .connect()
  .then(() => {
    console.log("Database Connected!");
    // console.log(Date());
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

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
    console.log("mqttHost:" + mqttHost);
  });

  // Received Message
  mqttClient.on("message", async (topic, message, packet) => {
    try {
      message = JSON.parse(message.toString());
      console.log("Received Message on topic: " + topic);

      // Insert sensor data into the PostgreSQL table
      const sensorQuery = `
      INSERT INTO sensors(sensor_id, sensor_name, value, unit, time)
      VALUES($1, $2, $3, $4, $5);
    `;

      for (const sensor of message.sensors) {
        const sensorValues = [
          sensor.sensor_id,
          sensor.sensor_name,
          sensor.sensor_value,
          sensor.sensor_unit,
          date = new Date(),
        ];
        await pool.query(sensorQuery, sensorValues);
      }
      console.log("Data inserted into PostgreSQL successfully!");
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
// subscribeToTopic(`${username}/feeds/Temp`);
subscribeToTopic(`feeds/Temp`);
