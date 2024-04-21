const Patient = require("../models/patient");

const patientInstance = new Patient();

const getAllPatient = async (req, res) => {
  try {
    const patientArray = await patientInstance.getAllPatient();
    return res.status(200).json(patientArray);
  } catch (error) {
    return res.send("Cannot get patient!").status(400);
  }
};

const getPatientById = async (req, res) => {
  try {
    const patient_id = req.params.patient_id;
    const patient = await patientInstance.getPatientById(patient_id);
    return res.status(200).json(patient);
  } catch (error) {
    return res.send("Cannot get patient!").status(400);
  }
};

module.exports = {
  getAllPatient,
  getPatientById,
};
