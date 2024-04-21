const Doctor = require('../models/doctor');

const doctorInstance = new Doctor();

const getAllDoctor = async (req, res) => {
    try {
        const doctorArray = await doctorInstance.getAllDoctor();
        return res.status(200).json(doctorArray);
    } catch (error) {
        return res.send("Cannot get doctor!").status(400);
    }
}

const getDoctorById = async (req, res) => {
    try {
        const doctor_id = req.params.doctor_id;
        const doctorData = await doctorInstance.getDoctorById(doctor_id);
        return res.status(200).json(doctorData);
    } catch (error) {
        return res.send("Cannot get doctor!").status(400);
    }
}

const createDoctor = async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const dateOfBirth = req.body.dateOfBirth;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;
    const salary = req.body.salary;
    const specialty = req.body.specialty;
    const result = await doctorInstance.createDoctor(firstName, lastName, age, dateOfBirth, gender, phoneNumber, salary, specialty);
    if (result) {
        console.log(result);
        return res.send("Doctor created!").status(200);
    } else {
        return res.send("Cannot create doctor!").status(400);
    }
}

module.exports = {
    getAllDoctor,
    getDoctorById,
    createDoctor
}