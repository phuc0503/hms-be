const Doctor = require('../models/doctor');
const { toDepartment } = require('../public/department');
const doctorInstance = new Doctor();

const getAllDoctor = async (req, res) => {
    let doctorArray;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const currentPage = parseInt(req.query.currentPage) || 1;
    if (req.query.department) {
        const department = toDepartment(parseInt(req.query.department));
        doctorArray = await doctorInstance.getByDepartment(department, pageSize, currentPage);
    } else {
        doctorArray = await doctorInstance.getAll(pageSize, currentPage);
    }
    if (doctorArray.success === true) {
        return res.status(200).json(doctorArray.message);
    } else {
        return res.status(400).send("Cannot get doctor. ERROR: " + doctorArray.message);
    }
}

const getDoctorById = async (req, res) => {
    const doctor_id = req.params.doctor_id;
    const doctorData = await doctorInstance.getById(doctor_id);

    if (doctorData.success === true) {
        return res.status(200).json(doctorData.message);
    } else {
        return res.status(400).send("Cannot get doctor. ERROR: " + doctorData.message);
    }
}

const createDoctor = async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const dateOfBirth = req.body.dateOfBirth;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;
    const salary = req.body.salary;
    const department = req.body.department;
    const result = await doctorInstance.create(firstName, lastName, dateOfBirth, gender, phoneNumber, salary, department);

    if (result.success === true) {
        return res.status(200).send("Create successfully");
    } else {
        return res.status(400).send("Cannot create doctor. ERROR: " + result.message);
    }
}

const getDoctorPatients = async (req, res) => {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const currentPage = parseInt(req.query.currentPage) || 1;
    const doctor_id = req.params.doctor_id;
    const patientArray = await doctorInstance.getPatientsList
        (doctor_id, pageSize, currentPage);

    if (patientArray.success === true) {
        return res.status(200).json(patientArray.message);
    } else {
        return res.status(400).send("Cannot get patients list. ERROR: " + patientArray.message);
    }
}

const updateDoctor = async (req, res) => {
    const doctor_id = req.params.doctor_id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;
    const dateOfBirth = req.body.dateOfBirth;
    const department = req.body.department;
    const salary = req.body.salary;
    const absence = req.body.absence;
    const result = await doctorInstance.update(doctor_id, firstName, lastName, gender, phoneNumber, dateOfBirth, department, salary, absence);

    if (result.success === true) {
        return res.status(200).send("Update successfully");
    } else {
        return res.status(400).send("Cannot update doctor. ERROR: " + result.message);
    }
}

const deleteDoctor = async (req, res) => {
    const doctor_id = req.params.doctor_id;
    const result = await doctorInstance.delete(doctor_id);

    if (result.success === true) {
        return res.status(200).send("Delete successfully");
    } else {
        return res.status(400).send("Cannot delete doctor. ERROR: " + result.message);
    }
}

const countDoctorByDepartment = async (req, res) => {
    const result = await doctorInstance.countByDepartment();

    if (result.success === true) {
        return res.status(200).json(result.message);
    } else {
        return res.status(400).send("Cannot count doctor. ERROR: " + result.message);
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