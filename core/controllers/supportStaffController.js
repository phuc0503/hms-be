const SupportStaff = require('../models/supportStaff');

const supportStaffInstance = new SupportStaff();

const getAllSupportStaff = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const supportStaffArray = await supportStaffInstance.getAllSupportStaff(limit, page);

    if (supportStaffArray) {
        return res.status(200).json(supportStaffArray);
    } else {
        return res.send("Cannot get support staff!").status(400);
    }
}

const getSupportStaffById = async (req, res) => {

    const supportStaff_id = req.params.supportStaff_id;
    const supportStaffData = await supportStaffInstance.getSupportStaffById(supportStaff_id);

    if (supportStaffData) {
        return res.status(200).json(supportStaffData);
    } else {
        return res.send("Cannot get support staff!").status(400);
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
    const absence = req.body.absence;
    const result = await supportStaffInstance.createSupportStaff(firstName, lastName, age, dateOfBirth, gender, phoneNumber, salary, specialty, absence);

    if (result) {
        return res.send("Support staff created!").status(200);
    } else {
        return res.send("Cannot create support staff!").status(400);
    }
}

// const getDoctorPatients = async (req, res) => {

//     const doctor_id = req.params.doctor_id;
//     const patientArray = await doctorInstance.getDoctorPatients(doctor_id);

//     if (patientArray) {
//         return res.status(200).json(patientArray);
//     } else {
//         return res.send("Cannot get patients!").status(400);
//     }
// }

const updateSupportStaff = async (req, res) => {
    const supportStaff_id = req.params.supportStaff_id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;
    const dateOfBirth = req.body.dateOfBirth;
    const salary = req.body.salary;
    const absence = req.body.absence;

    const json = {
        id: supportStaff_id,
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

    const result = await supportStaffInstance.updateSupportStaff(supportStaff_id, firstName, lastName, age, gender, phoneNumber, dateOfBirth, salary, absence);

    if (result) {
        return res.send("Update successfully").status(200);
    } else {
        return res.send("Cannot update support staff!").status(400);
    }
}

const deleteSupportStaff = async (req, res) => {
    const supportStaff_id = req.params.supportStaff_id;
    const result = await supportStaffInstance.deleteDoctor(supportStaff_id);

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
    // getDoctorPatients,
    updateSupportStaff,
    deleteSupportStaff
}