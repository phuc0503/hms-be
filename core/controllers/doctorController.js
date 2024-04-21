const Doctor = require('../models/doctor');

const doctorInstance = new Doctor();

const getAllDoctor = async (req, res) => {
    try {
        const doctorArray = await doctorInstance.getAllDoctor();
        return res.status(200).json(doctorArray);
    } catch (error) {
        return res.send("Cannot get doctor!").status(400);
    }
}

module.exports = {
    getAllDoctor
}