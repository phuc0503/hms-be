const express = require("express");
const router = express.Router();
const { getAllStaff } = require("../controllers/staffController");
const { getAllPatient } = require("../controllers/patientController");

const initWebRoutes = (app) => {
  router.get("/api/v1/get-all-staffs", getAllStaff);
  router.get("/api/v1/get-all-patients", getAllPatient);
  return app.use("/", router);
};

module.exports = initWebRoutes;
