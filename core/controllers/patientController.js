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

const getMedicalRecord = async (req, res) => {
  try {
    const patient_id = req.params.patient_id;
    const patient = await patientInstance.getMedicalRecord(patient_id);
    return res.status(200).json(patient);
  } catch (error) {
    return res.send("Cannot get patient!").status(400);
  }
};

const createPatient = async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const age = req.body.age;
  const dateOfBirth = req.body.dateOfBirth;
  const gender = req.body.gender;
  const phoneNumber = req.body.phoneNumber;
  const healthInsurance = req.body.healthInsurance;
  const doctorResponbility = req.body.doctorResponbility;
  const result = await patientInstance.createPatient(
    firstName,
    lastName,
    age,
    dateOfBirth,
    gender,
    phoneNumber,
    healthInsurance,
    doctorResponbility
  );
  if (result) {
    return res.send("Patient created!").status(200);
  } else {
    return res.send("Cannot create patient!").status(400);
  }
};

module.exports = {
  getAllPatient,
  getPatientById,
  getMedicalRecord,
  createPatient,
};
