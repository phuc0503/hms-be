const express = require("express");
const router = express.Router();
const { getAllStaff } = require("../controllers/staffController");
const {
  getAllPatient,
  getPatientById,
} = require("../controllers/patientController");
const { getAllDoctor } = require("../controllers/doctorController");
const initWebRoutes = (app) => {
    //staf
    router.get("/api/v1/staff", getAllStaff);

    //doctor
    router.get("/api/v1/staff/doctor", getAllDoctor);

    //nurse

    //support staff

    //patient
    router.get("/api/v1/patient", getAllPatient);
    router.get("/api/v1/patient/:patient_id", getPatientById);
    return app.use("/", router);
};
module.exports = initWebRoutes;
