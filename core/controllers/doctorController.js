const Doctor = require('../models/doctor');
const { toDepartment } = require('../public/department');
const doctorInstance = new Doctor();

const getAllDoctor = async (req, res) => {
    let doctorArray;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    if (req.query.department) {
        const department = toDepartment(parseInt(req.query.department));
        doctorArray = await doctorInstance.getByDepartment(department, limit, page);
    } else {
        doctorArray = await doctorInstance.getAll(limit, page);
    }
    if (doctorArray) {
        return res.status(200).json(doctorArray);
    } else {
        return res.send("Cannot get doctor!").status(400);
    }
}

const getDoctorById = async (req, res) => {
    const doctor_id = req.params.doctor_id;
    const doctorData = await doctorInstance.getById(doctor_id);

    if (doctorData) {
        return res.status(200).json(doctorData);
    } else {
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
    const department = req.body.department;
    const result = await doctorInstance.create(firstName, lastName, age, dateOfBirth, gender, phoneNumber, salary, department);

    if (result) {
        return res.send("Doctor created!").status(200);
    } else {
        return res.send("Cannot create doctor!").status(400);
    }
}

const getDoctorPatients = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const doctor_id = req.params.doctor_id;
    const patientArray = await doctorInstance.getPatientsList
        (doctor_id, limit, page);

    if (patientArray) {
        return res.status(200).json(patientArray);
    } else {
        return res.send("Cannot get patients!").status(400);
    }
}

const updateDoctor = async (req, res) => {
    const doctor_id = req.params.doctor_id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;
    const dateOfBirth = req.body.dateOfBirth;
    const department = req.body.department;
    const salary = req.body.salary;
    const absence = req.body.absence;
    const result = await doctorInstance.update(doctor_id, firstName, lastName, age, gender, phoneNumber, dateOfBirth, department, salary, absence);

    if (result) {
        return res.send("Update successfully").status(200);
    } else {
        return res.send("Cannot update doctor!").status(400);
    }
}

const deleteDoctor = async (req, res) => {
    const doctor_id = req.params.doctor_id;
    const result = await doctorInstance.delete(doctor_id);

    if (result) {
        return res.send("Delete successfully").status(200);
    } else {
        return res.send("Cannot delete doctor!").status(400);
    }
}

const countDoctorByDepartment = async (req, res) => {
    const result = await doctorInstance.countByDepartment();

    if (result) {
        return res.status(200).json(result);
    } else {
        return res.send("Cannot count doctor").status(400);
    }
}

module.exports = {
    getAllDoctor,
    getDoctorById,
    createDoctor,
    getDoctorPatients,
    updateDoctor,
    deleteDoctor,
    countDoctorByDepartment
}