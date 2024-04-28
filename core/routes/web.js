const express = require("express");
const router = express.Router();
const { getAllStaff } = require("../controllers/staffController");
const {
  getAllPatient,
  getPatientById,
  getMedicalRecord,
  createPatient,
} = require("../controllers/patientController");
const {
  getAllDoctor,
  getDoctorById,
  createDoctor,
} = require("../controllers/doctorController");
const initWebRoutes = (app) => {
  //staf
  router.get("/api/v1/staff", getAllStaff);

  //doctor
  router.get("/api/v1/staff/doctor", getAllDoctor);
  router.get("/api/v1/staff/doctor/:doctor_id", getDoctorById);
  router.post("/api/v1/staff/doctor/create", createDoctor);

  //nurse

  //support staff

  //patient
  router.get("/api/v1/patient", getAllPatient);
  router.get("/api/v1/patient/:patient_id", getPatientById);
  router.get("/api/v1/patient/:patient_id/medicalRecord", getMedicalRecord);
  router.post("/api/v1/patient/create", createPatient);
  return app.use("/", router);
};
module.exports = initWebRoutes;
