const SupportStaff = require('../models/supportstaff');

const supportStaffInstance = new SupportStaff();

const getAllSupportStaff = async (req, res) => {
    try {
        const supportStaffArray = await supportStaffInstance.getAllSupportStaff();
        return res.status(200).json(supportStaffArray);
    } catch (error) {
        return res.send("Cannot get SupportStaff!").status(400);
    }
}

const getSupportStaffById = async (req, res) => {
    try {
        const supportStaff_id = req.params.supportStaff_id;
        const supportStaffData = await supportStaffInstance.getDoctorById(supportStaff_id);
        return res.status(200).json(supportStaffData);
    } catch (error) {
        return res.send("Cannot get SupportStaff!").status(400);
    }
}

const createSupportStaff = async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const dateOfBirth = req.body.dateOfBirth;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;
    const salary = req.body.salary;
    const specialty = req.body.specialty;
    const result = await supportStaffInstance.createSupportStaff(firstName, lastName, age, dateOfBirth, gender, phoneNumber, salary, specialty);
    if (result) {
        console.log(result);
        return res.send("SupportStaff created!").status(200);
    } else {
        return res.send("Cannot create SupportStaff!").status(400);
    }
}

module.exports = {
    getAllSupportStaff,
    getSupportStaffById,
    createSupportStaff
}