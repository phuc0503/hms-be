const Drug = require('../models/drug');
const drugInstance = new Drug();

const getAllDrug = async (req, res) => {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const currentPage = parseInt(req.query.currentPage) || 1;
    const result = await drugInstance.getAll(pageSize, currentPage);

    if (result.success === true) {
        return res.status(200).json(result.message);
    } else {
        return res.status(400).send("Cannot get drug! ERROR: " + result.message);
    }
}

const getDrugById = async (req, res) => {
    const drug_id = req.params.drug_id;
    const result = await drugInstance.getById(drug_id);

    if (result.success === true) {
        return res.status(200).json(result.message);
    } else {
        return res.status(400).send("Cannot get drug! ERROR: " + result.message);
    }
}

const createDrug = async (req, res) => {
    const name = req.body.name;
    const cost = parseInt(req.body.cost);
    const type = req.body.type == 'drug' ? req.body.type : 'drug';
    const expiryDate = req.body.expiryDate;
    const quantity = parseInt(req.body.quantity);
    const result = await drugInstance.create(name, cost, type, expiryDate, quantity);

    if (result.success === true) {
        return res.status(200).send("Create successfully");
    } else {
        return res.status(400).send("Cannot create drug. ERROR: " + result.message);
    }
}

const updateDrug = async (req, res) => {
    const drug_id = req.params.drug_id;
    const name = req.body.name;
    const cost = parseInt(req.body.cost);
    const type = req.body.type == 'drug' ? req.body.type : 'drug';
    const expiryDate = req.body.expiryDate;
    const quantity = parseInt(req.body.quantity);
    const result = await drugInstance.update(drug_id, name, cost, type, expiryDate, quantity);

    if (result.success === true) {
        return res.status(200).send("Update successfully");
    } else {
        return res.status(400).send("Cannot update drug. ERROR: " + result.message);
    }
}

const deleteDrug = async (req, res) => {
    const drug_id = req.params.drug_id;
    const result = await drugInstance.delete(drug_id);

    if (result.success === true) {
        return res.status(200).send("Delete successfully");
    } else {
        return res.status(400).send("Cannot delete drug. ERROR: " + result.message);
    }
}

module.exports = {
    getAllDrug,
    getDrugById,
    createDrug,
    updateDrug,
    deleteDrug
}