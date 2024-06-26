const Patient = require("../models/patient");
const { toDepartment } = require("../public/department");
const patientInstance = new Patient();

const getAllPatient = async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 10;
  const currentPage = parseInt(req.query.currentPage) || 1;
  const sortBy = req.query.sortBy || 'name';
  const sortOrder = req.query.sortOrder || 'asc';
  const gender = req.query.gender || null;
  const healthInsurance = req.query.healthInsurance || null;
  const name = req.query.name || null;
  const patientArray = await patientInstance.getAll(pageSize, currentPage, sortBy, sortOrder, gender, healthInsurance, name);

  if (patientArray.success === true) {
    return res.status(200).json(patientArray.message);
  } else {
    return res.status(400).send("Cannot get patient. ERROR: " + patientArray.message);
  }
};

const getPatientById = async (req, res) => {
  const patient_id = req.params.patient_id;
  const patient = await patientInstance.getById(patient_id);

  if (patient.success === true) {
    return res.status(200).json(patient.message);
  } else {
    return res.status(400).send("Cannot get patient. ERROR: " + patient.message);
  }
};

const getMedicalRecords = async (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 10;
  const currentPage = parseInt(req.query.currentPage) || 1;
  const patient_id = req.params.patient_id;
  const patient = await patientInstance.getMedicalRecords(
    patient_id,
    pageSize,
    currentPage
  );

  if (patient.success === true) {
    return res.status(200).json(patient.message);
  } else {
    return res.status(400).send("Cannot get medical records. ERROR: " + patient.message);
  }
};

const createPatient = async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dateOfBirth = req.body.dateOfBirth;
  const gender = req.body.gender;
  const phoneNumber = req.body.phoneNumber;
  const healthInsurance = req.body.healthInsurance;
  const result = await patientInstance.create(
    firstName,
    lastName,
    dateOfBirth,
    gender,
    phoneNumber,
    healthInsurance,
  );
  if (result.success === true) {
    return res.status(200).send("Create successfully");
  } else {
    return res.status(400).send("Cannot create patient. ERROR: " + result.message);
  }
};

const updatePatient = async (req, res) => {
  const patient_id = req.params.patient_id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dateOfBirth = req.body.dateOfBirth;
  const gender = req.body.gender;
  const phoneNumber = req.body.phoneNumber;
  const healthInsurance = req.body.healthInsurance;

  const result = await patientInstance.update(
    patient_id,
    firstName,
    lastName,
    gender,
    phoneNumber,
    dateOfBirth,
    healthInsurance
  );

  if (result.success === true) {
    return res.status(200).send("Update successfully");
  } else {
    return res.status(400).send("Cannot update patient. ERROR: " + result.message);
  }
};

const deletePatient = async (req, res) => {
  const patient_id = req.params.patient_id;
  const result = await patientInstance.delete(patient_id);

  if (result.success === true) {
    return res.status(200).send("Delete successfully");
  } else {
    return res.status(400).send("Cannot delete patient. ERROR: " + result.message);
  }
};

module.exports = {
  getAllPatient,
  getPatientById,
  getMedicalRecords,
  createPatient,
  updatePatient,
  deletePatient
};
