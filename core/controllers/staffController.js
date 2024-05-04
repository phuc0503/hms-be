const Staff = require('../models/staff');

const staffInstance = new Staff();

const getAllStaff = async (req, res) => {
    try {
        const pageSize = parseInt(req.query.pageSize) || 10;
        const currentPage = parseInt(req.query.currentPage) || 1;

        const staffArray = await staffInstance.getAll(pageSize, currentPage);
        return res.status(200).json(staffArray);
    } catch (error) {
        return res.send("Cannot get staff!").status(400);
    }
}

module.exports = {
    getAllStaff
}