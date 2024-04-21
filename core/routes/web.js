const express = require("express");
const router = express.Router();
const { getAllStaff } = require("../controllers/staffController");
const {
  getAllPatient,
  getPatientById,
  getMedicalRecord,
} = require("../controllers/patientController");
const { getAllDoctor, getDoctorById, createDoctor } = require("../controllers/doctorController");
const { getAllNurse, getNurseById, createNurse } = require("../controllers/nurseController");
const { getAllSupportStaff, getSupportStaffById, createSupportStaff } = require("../controllers/supportstaffController");
const initWebRoutes = (app) => {
  //staf
  router.get("/api/v1/staff", getAllStaff);

  //doctor
  router.get("/api/v1/staff/doctor", getAllDoctor);
  router.get("/api/v1/staff/doctor/:doctor_id", getDoctorById);
  router.post("/api/v1/staff/doctor/create", createDoctor);

  //nurse
  router.get("/api/v1/staff/nurse", getAllNurse);
  router.get("/api/v1/staff/nurse/:nurse_id", getNurseById);
  // router.post("/api/v1/staff/nurse/create", createNurse);

  //support staffford
  router.get("/api/v1/staff/supportStaff", getAllSupportStaff);
  router.get("/api/v1/staff/supportStaff/:supportstaff_id", getSupportStaffById);

  //patient
  router.get("/api/v1/patient", getAllPatient);
  router.get("/api/v1/patient/:patient_id", getPatientById);
  router.get("/api/v1/patient/:patient_id/medicalRecord", getMedicalRecord);
  return app.use("/", router);
};
module.exports = initWebRoutes;
