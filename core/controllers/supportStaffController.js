const SupportStaff = require('../models/supportStaff');

const supportStaffInstance = new SupportStaff();

const getAllSupportStaff = async (req, res) => {

    const supportStaffArray = await supportStaffInstance.getAllSupportStaff();

    if (supportStaffArray) {
        return res.status(200).json(supportStaffArray);
    } else {
        return res.send("Cannot get support staff!").status(400);
    }
}

const getSupportStaffById = async (req, res) => {

    const supportstaff_id = req.params.supportstaff_id;
    const supportStaffData = await supportStaffInstance.getSupportStaffById(supportstaff_id);

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
    const result = await supportStaffInstance.createSupportStaff(firstName, lastName, age, dateOfBirth, gender, phoneNumber, salary, specialty);

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
    const supportstaff_id = req.params.supportstaff_id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;
    const dateOfBirth = req.body.dateOfBirth;
    // const specialty = req.body.specialty;
    const salary = req.body.salary;

    const json = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        gender: gender,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
        // specialty: specialty,
        salary: salary
    }

    console.log(json);

    const result = await supportStaffInstanceInstance.updateSupportStaff(supportstaff_id, firstName, lastName, age, gender, phoneNumber, dateOfBirth, salary);

    if (result) {
        return res.send("Update successfully").status(200);
    } else {
        return res.send("Cannot update support staff!").status(400);
    }
}

module.exports = {
    getAllSupportStaff,
    getSupportStaffById,
    createSupportStaff,
    // getDoctorPatients,
    updateSupportStaff
}