const Equipment = require('../models/equipment');
const equipmentInstance = new Equipment();

const getAllEquipment = async (req, res) => {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const currentPage = parseInt(req.query.currentPage) || 1;
    const result = await equipmentInstance.getAll(pageSize, currentPage);

    if (result.success === true) {
        return res.status(200).json(result.message);
    } else {
        return res.status(400).send("Cannot get equipment! ERROR: " + result.message);
    }
}

const getEquipmentById = async (req, res) => {
    const equipment_id = req.params.equipment_id;
    const result = await equipmentInstance.getById(equipment_id);

    if (result.success === true) {
        return res.status(200).json(result.message);
    } else {
        return res.status(400).send("Cannot get equipment! ERROR: " + result.message);
    }
}

const createEquipment = async (req, res) => {
    const name = req.body.name;
    const cost = parseInt(req.body.cost);
    const type = req.body.type == 'equipment' ? req.body.type : 'equipment';
    const availability = req.body.availability === 'true';
    const condition = req.body.condition;
    const result = await equipmentInstance.create(name, cost, type, availability, condition);

    if (result.success === true) {
        return res.status(200).send("Create successfully");
    } else {
        return res.status(400).send("Cannot create equipment. ERROR: " + result.message);
    }
}

const updateEquipment = async (req, res) => {
    const equipment_id = req.params.equipment_id;
    const name = req.body.name;
    const cost = parseInt(req.body.cost);
    const type = req.body.type == 'equipment' ? req.body.type : 'equipment';
    const availability = req.body.availability === 'true';
    const condition = req.body.condition;
    const result = await equipmentInstance.update(equipment_id, name, cost, type, availability, condition);

    if (result.success === true) {
        return res.status(200).send("Update successfully");
    } else {
        return res.status(400).send("Cannot update equipment. ERROR: " + result.message);
    }
}

const deleteEquipment = async (req, res) => {
    const equipment_id = req.params.equipment_id;
    const result = await equipmentInstance.delete(equipment_id);

    if (result.success === true) {
        return res.status(200).send("Delete successfully");
    } else {
        return res.status(400).send("Cannot delete equipment. ERROR: " + result.message);
    }
}

module.exports = {
    getAllEquipment,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment
}