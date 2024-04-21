const express = require("express");
const router = express.Router();
const { getAllStaff } = require("../controllers/staffController");
const { getAllPatient } = require("../controllers/patientController");
const { getAllDoctor } = require("../controllers/doctorController");
const initWebRoutes = (app) => {
    //staf
    router.get("/api/v1/staff", getAllStaff);

    //doctor
    router.get("/api/v1/staff/doctor", getAllDoctor);

    //nurse

    //support staff

    //patient
    router.get("/api/v1/get-all-patients", getAllPatient);
    return app.use("/", router);
};

module.exports = initWebRoutes;
