const Nurse = require('../models/nurse');

const nurseInstance = new Nurse();

const getAllNurse = async (req, res) => {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const currentPage = parseInt(req.query.currentPage) || 1;
    const nurseArray = await nurseInstance.getAll(pageSize, currentPage);

    if (nurseArray.success === true) {
        return res.status(200).json(nurseArray.message);
    } else {
        return res.status(400).send("Cannot get nurse. ERROR: " + nurseArray.message);
    }
}

const getNurseById = async (req, res) => {
    const nurse_id = req.params.nurse_id;
    const nurseData = await nurseInstance.getById(nurse_id);

    if (nurseData.success === true) {
        return res.status(200).json(nurseData.message);
    } else {
        return res.status(400).send("Cannot get nurse. ERROR: " + nurseData.message);
    }
}

const createNurse = async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dateOfBirth = req.body.dateOfBirth;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;
    const salary = req.body.salary;
    const absence = req.body.absence;
    const result = await nurseInstance.create(firstName, lastName, dateOfBirth, gender, phoneNumber, salary, absence);

    if (result.success === true) {
        return res.status(200).send("Create successfully");
    } else {
        return res.status(400).send("Cannot create nurse. ERROR: " + result.message);
    }
}

const updateNurse = async (req, res) => {
    const nurse_id = req.params.nurse_id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;
    const dateOfBirth = req.body.dateOfBirth;
    const salary = req.body.salary;
    const absence = req.body.absence;
    const result = await nurseInstance.update(nurse_id, firstName, lastName, gender, phoneNumber, dateOfBirth, salary, absence);

    if (result.success === true) {
        return res.status(200).send("Update successfully");
    } else {
        return res.status(400).send("Cannot update nurse. ERROR: " + result.message);
    }
}

const deleteNurse = async (req, res) => {
    const nurse_id = req.params.nurse_id;
    const result = await nurseInstance.delete(nurse_id);

    if (result.success === true) {
        return res.status(200).send("Delete successfully");
    } else {
        return res.status(400).send("Cannot delete nurse. ERROR: " + result.message);
    }
}

module.exports = {
    getAllNurse,
    getNurseById,
    createNurse,
    updateNurse,
    deleteNurse
}