const Staff = require('../models/staff');

const staffInstance = new Staff();

// const getAllStaff = async (req, res) => {
//     try {
//         let limit = parseInt(req.query.limit) || 10
//         let next = req.query.next
//         let prev = req.query.prev

//         const staffArray = await staffInstance.getAllStaff(limit, next, prev);
//         return res.status(200).json(staffArray);
//     } catch (error) {
//         return res.send("Cannot get staff!").status(400);
//     }
// }

const getAllStaff = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        const staffArray = await staffInstance.getAllStaff(limit, page);
        return res.status(200).json(staffArray);
    } catch (error) {
        return res.send("Cannot get staff!").status(400);
    }
}

module.exports = {
    getAllStaff
}