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
    getDoctorPatients,
    createDoctor,
    updateDoctor
} = require("../controllers/doctorController");

const {
    getAllNurse,
    getNurseById,
    createNurse,
    updateNurse
} = require("../controllers/nurseController");

const {
    getAllSupportStaff,
    getSupportStaffById,
    createSupportStaff
} = require("../controllers/supportStaffController");

const initWebRoutes = (app) => {
    //staff
    router.get("/api/v1/staff", getAllStaff);

    //doctor
    router.get("/api/v1/staff/doctor", getAllDoctor);
    router.get("/api/v1/staff/doctor/:doctor_id", getDoctorById);
    router.get("/api/v1/staff/doctor/:doctor_id/patients", getDoctorPatients);
    router.post("/api/v1/staff/doctor/create", createDoctor);
    router.put("/api/v1/staff/doctor/:doctor_id/update", updateDoctor);


    //nurse
    router.get("/api/v1/staff/nurse", getAllNurse);
    router.get("/api/v1/staff/nurse/:nurse_id", getNurseById);
    router.post("/api/v1/staff/nurse/create", createNurse);
    // router.put("api/v1/staff/nurse/update/:nurse_id", updateNurse);

    //support staff
    router.get("/api/v1/staff/supportStaff", getAllSupportStaff);
    router.get("/api/v1/staff/supportStaff/:supportStaff_id", getSupportStaffById);
    router.post("/api/v1/staff/supportStaff/create", createSupportStaff);

    //patient
    router.get("/api/v1/patient", getAllPatient);
    router.get("/api/v1/patient/:patient_id", getPatientById);
    router.get("/api/v1/patient/:patient_id/medicalRecord", getMedicalRecord);
    router.post("/api/v1/patient/create", createPatient);
  
    return app.use("/", router);
};
module.exports = initWebRoutes;
