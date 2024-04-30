const Appointment = require('../models/appointment');

const appointmentInstance = new Appointment();

const getAllAppointment = async (req, res) => {
    const appointmentArray = await appointmentInstance.getAllAppointment();

    if (appointmentArray) {
        return res.status(200).json(appointmentArray);
    } else {
        return res.send("Cannot get appointment!").status(400);
    }
}

const getAppointmentById = async (req, res) => {
    const appointment_id = req.params.appointment_id;
    const appointmentData = await appointmentInstance.getAppointmentById(appointment_id);

    if (appointmentData) {
        return res.status(200).json(appointmentData);
    } else {
        return res.send("Cannot get appointment!").status(400);
    }
}

const createAppointment = async (req, res) => {
    const patientID = req.body.patientID;
    const doctorID = req.body.doctorID;
    const result = req.body.result;
    const appointmentTime = req.body.appointmentTime;
    const roomID = req.body.roomID;
    const appointment = await appointmentInstance.createAppointment(patientID, doctorID, result, appointmentTime, roomID);

    if (appointment) {
        return res.send("Appointment created").status(200);
    } else {
        return res.send("Cannot create appointment").status(400);
    }
}

const updateAppointment = async (req, res) => {
    const appointment_id = req.params.appointment_id;
    const patientID = req.body.patientID;
    const doctorID = req.body.doctorID;
    const result = req.body.result;
    const appointmentTime = req.body.appointmentTime;
    const roomID = req.body.roomID;
    const appointment = await appointmentInstance.updateAppointment(appointment_id, patientID, doctorID, result, appointmentTime, roomID);

    if (appointment) {
        return res.send("Update successfully").status(200);
    } else {
        return res.send("Cannot update appointment!").status(400);
    }
}

const deleteAppointment = async (req, res) => {
    const appointment_id = req.params.appointment_id;
    const result = await appointmentInstance.deleteAppointment(appointment_id);

    if (result) {
        return res.send("Delete succesfully").status(200);
    } else {
        return res.send("Cannot delete appointment!").status(400);
    }
}

module.exports = {
    getAllAppointment,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment
}
