const express = require('express');
const router = express.Router();
const { displayAllGardens, viewGarden } = require('../controllers/gardenController');
const { displayDataTable } = require('../controllers/sensorDataController');
const { viewDevice, viewDeviceSchedule, putDeviceSchedule, changeDeviceStatus } = require('../controllers/deviceController');

const initWebRoutes = (app) => {
    router.get('/api/v1/garden', displayAllGardens);
    router.get('/api/v1/garden/:garden_id', viewGarden);
    router.get('/api/v1/garden/:garden_id/data-table', displayDataTable);
    router.get('/api/v1/garden/:garden_id/device', viewDevice);
    router.post('/api/v1/garden/:garden_id/change-device-status', changeDeviceStatus);
    router.get('/api/v1/garden/:garden_id/device/schedule/:device_id', viewDeviceSchedule);
    router.put('/api/v1/garden/:garden_id/device/schedule/:device_id/add-schedule', putDeviceSchedule);
    return app.use('/', router);
}

module.exports = initWebRoutes;