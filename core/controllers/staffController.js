const Staff = require('../models/staff');

const staffInstance = new Staff();

const getAllStaff = async (req, res) => {

    const pageSize = parseInt(req.query.pageSize) || 10;
    const currentPage = parseInt(req.query.currentPage) || 1;

    const staffArray = await staffInstance.getAll(pageSize, currentPage);

    if (staffArray.success === true) {
        return res.status(200).json(staffArray.message);
    } else {
        return res.status(400).send("Cannot get staff. ERROR: " + staffArray.message);
    }
}

module.exports = {
    getAllStaff
}