const Patient = require("../models/patient");
const { toDepartment } = require("../public/department");
const patientInstance = new Patient();

const getAllPatient = async (req, res) => {
  let patientArray;
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  if (req.query.department) {
    const department = toDepartment(parseInt(req.query.department));
    patientArray = await patientInstance.getPatientByDepartment(department, limit, page);
  } else {
    patientArray = await patientInstance.getAllPatient(limit, page)
  }

  if (patientArray) {
    return res.status(200).json(patientArray);
  } else {
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

const getMedicalRecords = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const patient_id = req.params.patient_id;
    const patient = await patientInstance.getMedicalRecords(patient_id, limit, page);
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
  const department = req.body.department;
  const doctorResponbility = req.body.doctorResponbility;
  const result = await patientInstance.createPatient(
    firstName,
    lastName,
    age,
    dateOfBirth,
    gender,
    phoneNumber,
    healthInsurance,
    department,
    doctorResponbility
  );
  if (result) {
    return res.send("Patient created!").status(200);
  } else {
    return res.send("Cannot create patient!").status(400);
  }
};

const updatePatient = async (req, res) => {
  const patient_id = req.params.patient_id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const age = req.body.age;
  const dateOfBirth = req.body.dateOfBirth;
  const gender = req.body.gender;
  const phoneNumber = req.body.phoneNumber;
  const healthInsurance = req.body.healthInsurance;
  const department = req.body.department;
  const doctorResponbility = req.body.doctorResponbility;

  const result = await patientInstance.updatePatient(
    patient_id,
    firstName,
    lastName,
    age,
    gender,
    phoneNumber,
    dateOfBirth,
    healthInsurance,
    department,
    doctorResponbility
  );

  if (result) {
    return res.send("Update successfully").status(200);
  } else {
    return res.send("Cannot update patient!").status(400);
  }
};

const deletePatient = async (req, res) => {
  const patient_id = req.params.patient_id;
  const result = await patientInstance.deletePatient(patient_id);

  if (result) {
    return res.send("Delete successfully").status(200);
  } else {
    return res.send("Cannot delete patient!").status(400);
  }
};

const countPatientByDepartment = async (req, res) => {
  const result = await patientInstance.countPatientByDepartment();

  if (result) {
    return res.status(200).json(result);
  } else {
    return res.send("Cannot count patient").status(400);
  }
};

module.exports = {
  getAllPatient,
  getPatientById,
  getMedicalRecords,
  createPatient,
  updatePatient,
  deletePatient,
  countPatientByDepartment,
};
