const Staff = require('../models/staff');

const staffInstance = new Staff();

const getAllStaff = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        const staffArray = await staffInstance.getAll(limit, page);
        return res.status(200).json(staffArray);
    } catch (error) {
        return res.send("Cannot get staff!").status(400);
    }
}

module.exports = {
    getAllStaff
}