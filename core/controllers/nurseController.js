const Nurse = require('../models/nurse');

const nurseInstance = new Nurse();

const getAllNurse = async (req, res) => {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const currentPage = parseInt(req.query.currentPage) || 1;
    const nurseArray = await nurseInstance.getAll(pageSize, currentPage);

    if (nurseArray) {
        return res.status(200).json(nurseArray);
    } else {
        return res.send("Cannot get nurse!").status(400);
    }
}

const getNurseById = async (req, res) => {
    const nurse_id = req.params.nurse_id;
    const nurseData = await nurseInstance.getById(nurse_id);

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
    const absence = req.body.absence;
    const result = await nurseInstance.create(firstName, lastName, age, dateOfBirth, gender, phoneNumber, salary, absence);
    if (result) {
        return res.send("Nurse created!").status(200);
    } else {
        return res.send("Cannot create nurse!").status(400);
    }
}

const updateNurse = async (req, res) => {
    const nurse_id = req.params.nurse_id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;
    const dateOfBirth = req.body.dateOfBirth;
    const salary = req.body.salary;
    const absence = req.body.absence;

    const json = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        gender: gender,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
        salary: salary,
        absence: absence
    }

    console.log(json);

    const result = await nurseInstance.update(nurse_id, firstName, lastName, age, gender, phoneNumber, dateOfBirth, salary, absence);

    if (result) {
        return res.send("Update successfully").status(200);
    } else {
        return res.send("Cannot update nurse!").status(400);
    }
}

const deleteNurse = async (req, res) => {
    const nurse_id = req.params.nurse_id;
    const result = await nurseInstance.delete(nurse_id);

    if (result) {
        return res.send("Delete successfully").status(200);
    } else {
        return res.send("Cannot delete nurse!").status(400);
    }
}

module.exports = {
    getAllNurse,
    getNurseById,
    createNurse,
    updateNurse,
    deleteNurse
}