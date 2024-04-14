const Staff = require('../models/staff');

const staffInstance = new Staff();

const getAllStaff = async (req, res) => {
    try {
        const staffArray = await staffInstance.getAllStaff();
        return res.status(200).json(staffArray);
    } catch (error) {
        return res.send("Cannot get staff!").status(400);
    }
}

module.exports = {
    getAllStaff
}