const express = require("express");
const router = express.Router();
const { getAllStaff } = require("../controllers/staffController");

const {
    getAllPatient,
    getPatientById,
    getMedicalRecord,
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
    createNurse
} = require("../controllers/nurseController");

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
    // router.get("api/v1/staff/nurse/:nurse_id", getNurseById);
    // router.post("/api/v1/staff/nurse/create", createNurse);

    //support staff

    //patient
    router.get("/api/v1/patient", getAllPatient);
    router.get("/api/v1/patient/:patient_id", getPatientById);
    router.get("/api/v1/patient/:patient_id/medicalRecord", getMedicalRecord);
    return app.use("/", router);
};
module.exports = initWebRoutes;
