const Patient = require("../models/patient");
const { toDepartment } = require("../public/department");
const patientInstance = new Patient();

const getAllPatient = async (req, res) => {
  let patientArray;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const currentPage = parseInt(req.query.currentPage) || 1;
  if (req.query.department) {
    const department = toDepartment(parseInt(req.query.department));
    patientArray = await patientInstance.getByDepartment(
      department,
      pageSize,
      currentPage
    );
  } else {
    patientArray = await patientInstance.getAll(pageSize, currentPage);
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
    const patient = await patientInstance.getById(patient_id);
    return res.status(200).json(patient);
  } catch (error) {
    return res.send("Cannot get patient!").status(400);
  }
};

const getMedicalRecords = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const currentPage = parseInt(req.query.currentPage) || 1;
    const patient_id = req.params.patient_id;
    const patient = await patientInstance.getMedicalRecords(
      patient_id,
      pageSize,
      currentPage
    );
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
  const doctorResponsibility = req.body.doctorResponsibility;
  const result = await patientInstance.create(
    firstName,
    lastName,
    age,
    dateOfBirth,
    gender,
    phoneNumber,
    healthInsurance,
    department,
    doctorResponsibility
  );
  if (result) {
    console.log(result);
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
  const doctorResponsibility = req.body.doctorResponsibility;

  const result = await patientInstance.update(
    patient_id,
    firstName,
    lastName,
    age,
    gender,
    phoneNumber,
    dateOfBirth,
    healthInsurance,
    department,
    doctorResponsibility
  );

  if (result) {
    console.log(result);
    return res.send("Update successfully").status(200);
  } else {
    return res.send("Cannot update patient!").status(400);
  }
};

const deletePatient = async (req, res) => {
  const patient_id = req.params.patient_id;
  const result = await patientInstance.delete(patient_id);

  if (result) {
    return res.send("Delete successfully").status(200);
  } else {
    return res.send("Cannot delete patient!").status(400);
  }
};

const countPatientByDepartment = async (req, res) => {
  const result = await patientInstance.countByDepartment();

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
