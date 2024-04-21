const express = require("express");
const router = express.Router();
const { getAllStaff } = require("../controllers/staffController");
const {
  getAllPatient,
  getPatientById,
} = require("../controllers/patientController");

const initWebRoutes = (app) => {
  router.get("/api/v1/get-all-staffs", getAllStaff);
  router.get("/api/v1/patient", getAllPatient);
  router.get("/api/v1/patient/:patient_id", getPatientById);
  return app.use("/", router);
};

module.exports = initWebRoutes;
