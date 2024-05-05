const SupportStaff = require('../models/supportStaff');

const supportStaffInstance = new SupportStaff();

const getAllSupportStaff = async (req, res) => {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const currentPage = parseInt(req.query.currentPage) || 1;
    const supportStaffArray = await supportStaffInstance.getAll(pageSize, currentPage);

    if (supportStaffArray) {
        return res.status(200).json(supportStaffArray);
    } else {
        return res.send("Cannot get support staff!").status(400);
    }
}

const getSupportStaffById = async (req, res) => {

    const supportStaff_id = req.params.supportStaff_id;
    const supportStaffData = await supportStaffInstance.getById(supportStaff_id);

    if (supportStaffData) {
        return res.status(200).json(supportStaffData);
    } else {
        return res.send("Cannot get support staff!").status(400);
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

    if (result) {
        return res.send("Support staff created!").status(200);
    } else {
        return res.send("Cannot create support staff!").status(400);
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

    if (result) {
        return res.send("Update successfully").status(200);
    } else {
        return res.send("Cannot update support staff!").status(400);
    }
}

const deleteSupportStaff = async (req, res) => {
    const supportStaff_id = req.params.supportStaff_id;
    const result = await supportStaffInstance.delete(supportStaff_id);

    if (result) {
        return res.send("Delete successfully").status(200);
    } else {
        return res.send("Cannot delete support staff!").status(400);
    }
}

module.exports = {
    getAllSupportStaff,
    getSupportStaffById,
    createSupportStaff,
    updateSupportStaff,
    deleteSupportStaff
}