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

module.exports = {
  getAllPatient,
};
