const SupportStaff = require('../models/supportStaff');

const supportStaffInstance = new SupportStaff();

const getAllSupportStaff = async (req, res) => {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const currentPage = parseInt(req.query.currentPage) || 1;
    const supportStaffArray = await supportStaffInstance.getAll(pageSize, currentPage);

    if (supportStaffArray.success === true) {
        return res.status(200).json(supportStaffArray.message);
    } else {
        return res.status(400).send("Cannot get support staff. ERROR: " + supportStaffArray.message);
    }
}

const getSupportStaffById = async (req, res) => {

    const supportStaff_id = req.params.supportStaff_id;
    const supportStaffData = await supportStaffInstance.getById(supportStaff_id);

    if (supportStaffData.success === true) {
        return res.status(200).json(supportStaffData.message);
    } else {
        return res.status(400).send("Cannot get support staff. ERROR: " + supportStaffData.message);
    }
}

const createSupportStaff = async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dateOfBirth = req.body.dateOfBirth;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;
    const salary = req.body.salary;
    const specialty = req.body.specialty;
    const absence = req.body.absence;
    const result = await supportStaffInstance.create(firstName, lastName, dateOfBirth, gender, phoneNumber, salary, specialty, absence);

    if (result.success === true) {
        return res.status(200).send("Create successfully");
    } else {
        return res.status(400).send("Cannot create support staff. ERROR: " + result.message);
    }
}

const updateSupportStaff = async (req, res) => {
    const supportStaff_id = req.params.supportStaff_id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;
    const dateOfBirth = req.body.dateOfBirth;
    const salary = req.body.salary;
    const absence = req.body.absence;

    const result = await supportStaffInstance.update(supportStaff_id, firstName, lastName, gender, phoneNumber, dateOfBirth, salary, absence);

    if (result.success === true) {
        return res.status(200).send("Update successfully");
    } else {
        return res.status(400).send("Cannot update support staff. ERROR: " + result.message);
    }
}

const deleteSupportStaff = async (req, res) => {
    const supportStaff_id = req.params.supportStaff_id;
    const result = await supportStaffInstance.delete(supportStaff_id);

    if (result.success === true) {
        return res.status(200).json(result.message);
    } else {
        return res.status(400).send("Cannot get doctor. ERROR: " + result.message);
    }
}

module.exports = {
    getAllSupportStaff,
    getSupportStaffById,
    createSupportStaff,
    updateSupportStaff,
    deleteSupportStaff
}