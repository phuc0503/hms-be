const Appointment = require('../models/appointment');
const { toDepartment } = require('../public/department');
const appointmentInstance = new Appointment();

const getAllAppointment = async (req, res) => {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const currentPage = parseInt(req.query.currentPage) || 1;
    let appointments;
    if (req.query.department) {
        const department = toDepartment(parseInt(req.query.department));
        appointments = await appointmentInstance.getByDepartment(department, pageSize, currentPage);
    } else {
        appointments = await appointmentInstance.getAll(pageSize, currentPage);
    }

    if (appointments.success === true) {
        return res.status(200).json(appointments.message);
    } else {
        return res.status(400).send("Cannot get appointment! ERROR: " + appointments.message);
    }
}

const getAppointmentById = async (req, res) => {
    const appointment_id = req.params.appointment_id;
    const appointment = await appointmentInstance.getById(appointment_id);

    if (appointment.success === true) {
        return res.status(200).json(appointment.message);
    } else {
        return res.status(400).send("Cannot get appointment! ERROR: " + appointment.message);
    }
}

const createAppointment = async (req, res) => {
    const patientID = req.body.patientID;
    const doctorID = req.body.doctorID;
    const result = req.body.result;
    const appointmentTime = req.body.appointmentTime;
    const roomID = req.body.roomID;
    const appointment = await appointmentInstance.create(patientID, doctorID, result, appointmentTime, roomID);

    if (appointment.success === true) {
        return res.status(200).send("Create successfully");
    } else {
        return res.status(400).send("Cannot create appointment. ERROR: " + appointment.message);
    }
}

const updateAppointment = async (req, res) => {
    const appointment_id = req.params.appointment_id;
    const patientID = req.body.patientID;
    const doctorID = req.body.doctorID;
    const result = req.body.result;
    const appointmentTime = req.body.appointmentTime;
    const roomID = req.body.roomID;
    const appointment = await appointmentInstance.update(appointment_id, patientID, doctorID, result, appointmentTime, roomID);

    if (appointment.success === true) {
        return res.status(200).send("Update successfully");
    } else {
        return res.status(400).send("Cannot update appointment. ERROR: " + appointment.message);
    }
}

const deleteAppointment = async (req, res) => {
    const appointment_id = req.params.appointment_id;
    const result = await appointmentInstance.delete(appointment_id);

    if (result.success === true) {
        return res.status(200).send("Delete successfully");
    } else {
        return res.status(400).send("Cannot delete appointment. ERROR: " + result.message);
    }
}

const countAppointmentByDepartment = async (req, res) => {
    const result = await appointmentInstance.countByDepartment();

    if (result.success === true) {
        return res.status(200).json(result.message);
    } else {
        return res.status(400).send("Cannot count appointment. ERROR: " + result.message);
    }
}

module.exports = {
    getAllAppointment,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    countAppointmentByDepartment
}
