const express = require("express");
const router = express.Router();
const { getAllStaff } = require("../controllers/staffController");

const {
    getAllPatient,
    getPatientById,
    getMedicalRecord,
    createPatient,
    updatePatient,
    deletePatient
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
    updateNurse,
    deleteNurse
} = require("../controllers/nurseController");

const {
    getAllSupportStaff,
    getSupportStaffById,
    createSupportStaff,
    updateSupportStaff,
    deleteSupportStaff
} = require("../controllers/supportStaffController");

const {
    getAllAppointment,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment
} = require("../controllers/appointmentController");

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
    router.delete("/api/v1/staff/nurses/:nurse_id", deleteNurse);

    //support staff
    router.get("/api/v1/staff/supportStaff", getAllSupportStaff);
    router.get("/api/v1/staff/supportStaff/:supportStaff_id", getSupportStaffById);
    router.post("/api/v1/staff/supportStaff", createSupportStaff);
    router.put("/api/v1/staff/supportStaff/:supportStaff_id", updateSupportStaff);
    router.delete("/api/v1/staff/supportStaff/:supportStaff_id", deleteSupportStaff);

    //patient
    router.get("/api/v1/patients", getAllPatient);
    router.get("/api/v1/patients/:patient_id", getPatientById);
    router.get("/api/v1/patients/:patient_id/medicalRecords", getMedicalRecord);
    router.post("/api/v1/patients", createPatient);
    router.put("/api/v1/patients/:patient_id", updatePatient);
    router.delete("/api/v1/patients/:patient_id", deletePatient);

    //appointment
    router.get("/api/v1/appointments", getAllAppointment);
    router.get("/api/v1/appointments/:appointment_id", getAppointmentById);
    router.post("/api/v1/appointments", createAppointment);
    router.put("/api/v1/appointments/:appointment_id", updateAppointment);
    router.delete("/api/v1/appointments/:appointment_id", deleteAppointment);

    return app.use("/", router);
};
module.exports = initWebRoutes;
