const Nurse = require('../models/nurse');

const nurseInstance = new Nurse();

const getAllNurse = async (req, res) => {
    const nurseArray = await nurseInstance.getAllNurse();

    if (nurseArray) {
        return res.status(200).json(nurseArray);
    } else {
        return res.send("Cannot get nurse!").status(400);
    }
}

const getNurseById = async (req, res) => {
    const nurse_id = req.params.nurse_id;
    const nurseData = await nurseInstance.getNurseById(nurse_id);

    if (nurseData) {
        return res.status(200).json(nurseData);
    } else {
        return res.send("Cannot get nurse!").status(400);
    }
}

const createNurse = async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const dateOfBirth = req.body.dateOfBirth;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;
    const salary = req.body.salary;
    const specialty = req.body.specialty;
    const result = await nurseInstance.createNurse(firstName, lastName, age, dateOfBirth, gender, phoneNumber, salary, specialty);
    if (result) {
        return res.send("Nurse created!").status(200);
    } else {
        return res.send("Cannot create nurse!").status(400);
    }
}

// nho sua ten doctor -> nurse
module.exports = {
    getAllNurse,
    getNurseById,
    createNurse
}