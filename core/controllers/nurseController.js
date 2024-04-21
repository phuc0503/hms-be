const Nurse = require('../models/nurse');

const nurseInstance = new Nurse();

const getAllNurse = async (req, res) => {
    try {
        const nurseArray = await nurseInstance.getAllNurse();
        return res.status(200).json(nurseArray);
    } catch (error) {
        return res.send("Cannot get nurse!").status(400);
    }
}

const getNurseById = async (req, res) => {
    try {
        const nurse_id = req.params.nurse_id;
        const nurseData = await nurseInstance.getNurseById(nurse_id);
        return res.status(200).json(nurseData);
    } catch (error) {
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
        console.log(result);
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