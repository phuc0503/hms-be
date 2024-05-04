const Resource = require('../models/resource');

const resourceInstance = new Resource();

const getAllResources = async (req, res) => {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const currentPage = parseInt(req.query.currentPage) || 1;

    const result = await resourceInstance.getAll(pageSize, currentPage);

    if (result.success === true) {
        return res.status(200).json(result.message);
    } else {
        return res.status(400).send("Cannot get resource! ERROR: " + result.message);
    }
}

module.exports = {
    getAllResources
}