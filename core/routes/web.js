const express = require("express");
const router = express.Router();

const { getAllStaff } = require("../controllers/staffController");

const { getAllResources } = require("../controllers/resourceController");

const {
    getAllPatient,
    getPatientById,
    getMedicalRecords,
    createPatient,
    updatePatient,
    deletePatient,
    countPatientByDepartment,
} = require("../controllers/patientController");

const {
    getAllDoctor,
    getDoctorById,
    getDoctorPatients,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    countDoctorByDepartment
} = require("../controllers/doctorController");

const {
    getAllNurse,
    getNurseById,
    createNurse,
    updateNurse,
    deleteNurse,
} = require("../controllers/nurseController");

const {
    getAllSupportStaff,
    getSupportStaffById,
    createSupportStaff,
    updateSupportStaff,
    deleteSupportStaff,
} = require("../controllers/supportStaffController");

const {
    getAllAppointment,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    countAppointmentByDepartment
} = require("../controllers/appointmentController");

const {
    getAllEquipment,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment
} = require('../controllers/equipmentController');

const {
    getAllDrug,
    getDrugById,
    createDrug,
    updateDrug,
    deleteDrug
} = require('../controllers/drugController');

const {
    getAllMaintenanceSchedule,
    getMaintenanceScheduleById,
    createMaintenanceSchedule,
    updateMaintenanceSchedule,
    deleteMaintenanceSchedule
} = require('../controllers/maintenanceScheduleController');
const { count } = require("firebase/firestore");

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
    router.get("/api/v1/staff/doctors/departments/statistics", countDoctorByDepartment);

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
    router.get("/api/v1/patients/:patient_id/medicalRecords", getMedicalRecords);
    router.post("/api/v1/patients", createPatient);
    router.put("/api/v1/patients/:patient_id", updatePatient);
    router.delete("/api/v1/patients/:patient_id", deletePatient);
    router.get("/api/v1/patients/departments/statistics", countPatientByDepartment);

    //appointment
    router.get("/api/v1/appointments", getAllAppointment);
    router.get("/api/v1/appointments/:appointment_id", getAppointmentById);
    router.post("/api/v1/appointments", createAppointment);
    router.put("/api/v1/appointments/:appointment_id", updateAppointment);
    router.delete("/api/v1/appointments/:appointment_id", deleteAppointment);
    router.get("/api/v1/appointments/departments/statistics", countAppointmentByDepartment);

    //resource
    router.get("/api/v1/resources", getAllResources);

    //equipment
    router.get("/api/v1/resources/equipment", getAllEquipment);
    router.get("/api/v1/resources/equipment/:equipment_id", getEquipmentById);
    router.post("/api/v1/resources/equipment", createEquipment);
    router.put("/api/v1/resources/equipment/:equipment_id", updateEquipment);
    router.delete("/api/v1/resources/equipment/:equipment_id", deleteEquipment);

    //drug
    router.get("/api/v1/resources/drugs", getAllDrug);
    router.post("/api/v1/resources/drugs", createDrug);
    router.get("/api/v1/resources/drugs/:drug_id", getDrugById);
    router.put("/api/v1/resources/drugs/:drug_id", updateDrug);
    router.delete("/api/v1/resources/drugs/:drug_id", deleteDrug);

    //maintenance schedule
    router.get("/api/v1/maintenance", getAllMaintenanceSchedule);
    router.post("/api/v1/maintenance", createMaintenanceSchedule);
    router.get("/api/v1/maintenance/:maintenance_id", getMaintenanceScheduleById);
    router.put("/api/v1/maintenance/:maintenance_id", updateMaintenanceSchedule);
    router.delete("/api/v1/maintenance/:maintenance_id", deleteMaintenanceSchedule);

    return app.use("/", router);
};
module.exports = initWebRoutes;
