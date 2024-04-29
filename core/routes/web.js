const express = require("express");
const router = express.Router();
const { getAllStaff } = require("../controllers/staffController");

const {
    getAllPatient,
    getPatientById,
    getMedicalRecord,
    createPatient,
    updatePatient
} = require("../controllers/patientController");

const {
    getAllDoctor,
    getDoctorById,
    getDoctorPatients,
    createDoctor,
    updateDoctor,
    deleteDoctor
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
    createSupportStaff,
    updateSupportStaff
} = require("../controllers/supportStaffController");
const { deleteToken } = require("firebase/messaging");
const { deleteDoc } = require("firebase/firestore");

const initWebRoutes = (app) => {
    //staff
    router.get("/api/v1/staff", getAllStaff);

    //doctor
    router.get("/api/v1/staff/doctors", getAllDoctor);
    router.get("/api/v1/staff/doctors/:doctor_id", getDoctorById);
    router.get("/api/v1/staff/doctors/:doctor_id/patients", getDoctorPatients);
    router.post("/api/v1/staff/doctors", createDoctor);
    router.put("/api/v1/staff/doctors/:doctor_id", updateDoctor);
    router.delete("/api/v1/staff/doctors/:doctor_id", deleteDoctor);

    //nurse
    router.get("/api/v1/staff/nurses", getAllNurse);
    router.get("/api/v1/staff/nurses/:nurse_id", getNurseById);
    router.post("/api/v1/staff/nurses", createNurse);
    router.put("api/v1/staff/nurses/:nurse_id", updateNurse);

    //support staff
    router.get("/api/v1/staff/supportStaff", getAllSupportStaff);
    router.get("/api/v1/staff/supportStaff/:supportStaff_id", getSupportStaffById);
    router.post("/api/v1/staff/supportStaff", createSupportStaff);
    router.put("/api/v1/staff/supportStaff/:supportStaff_id", updateSupportStaff);

    //patient
    router.get("/api/v1/patients", getAllPatient);
    router.get("/api/v1/patients/:patient_id", getPatientById);
    router.get("/api/v1/patients/:patient_id/medicalRecords", getMedicalRecord);
    router.post("/api/v1/patients", createPatient);
    router.put("/api/v1/patients/:patient_id", updatePatient);

    return app.use("/", router);
};
module.exports = initWebRoutes;
