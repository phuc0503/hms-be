const MaintenanceSchedule = require('../models/maintenanceSchedule');

const maintenanceInstance = new MaintenanceSchedule();

const getAllMaintenanceSchedule = async (req, res) => {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const currentPage = parseInt(req.query.currentPage) || 1;
    const maintenanceSchedule = await maintenanceInstance.getAll(pageSize, currentPage);

    if (maintenanceSchedule.success === true) {
        return res.status(200).json(maintenanceSchedule.message);
    } else {
        return res.status(400).send("Cannot get maintenance schedule! ERROR: " + maintenanceSchedule.message);
    }
}

const getMaintenanceScheduleById = async (req, res) => {
    const maintenance_id = req.params.maintenance_id;
    const maintenanceSchedule = await maintenanceInstance.getById(maintenance_id);

    if (maintenanceSchedule.success === true) {
        return res.status(200).json(maintenanceSchedule.message);
    } else {
        return res.status(400).send("Cannot get maintenance schedule! ERROR: " + maintenanceSchedule.message);
    }
}

const createMaintenanceSchedule = async (req, res) => {
    const equipmentID = req.body.equipmentID;
    const maintenanceDate = req.body.maintenanceDate;
    const maintenance = await maintenanceInstance.create(equipmentID, maintenanceDate);

    if (maintenance.success === true) {
        return res.status(200).send("Create successfully");
    } else {
        return res.status(400).send("Cannot create maintenance. ERROR: " + maintenance.message);
    }
}

const updateMaintenanceSchedule = async (req, res) => {
    const maintenance_id = req.params.maintenance_id;
    const equipmentID = req.body.equipmentID;
    const maintenanceDate = req.body.maintenanceDate;
    const maintenance = await maintenanceInstance.update(maintenance_id, equipmentID, maintenanceDate);

    if (maintenance.success === true) {
        return res.status(200).send("Update successfully");
    } else {
        return res.status(400).send("Cannot update maintenance. ERROR: " + maintenance.message);
    }
}

const deleteMaintenanceSchedule = async (req, res) => {
    const maintenance_id = req.params.maintenance_id;
    const result = await maintenanceInstance.delete(maintenance_id);

    if (result.success === true) {
        return res.status(200).send("Delete successfully");
    } else {
        return res.status(400).send("Cannot delete maintenance. ERROR: " + result.message);
    }
}

module.exports = {
    getAllMaintenanceSchedule,
    getMaintenanceScheduleById,
    createMaintenanceSchedule,
    updateMaintenanceSchedule,
    deleteMaintenanceSchedule
}
