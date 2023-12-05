const express = require('express');
const router = express.Router();
const { viewSignUpPage, createUser, handleLogin, handleLogout } = require('../controllers/userController');
const { displayAllGardens, viewGarden } = require('../controllers/gardenController');
const { displayDataTable } = require('../controllers/sensorDataController');
const { viewDevice, viewDeviceSchedule, putDeviceSchedule, changeDeviceStatus } = require('../controllers/deviceController');

const initWebRoutes = (app) => {
    //user APIs
    router.post('/api/v1/login', handleLogin);
    router.post('/api/v1/signup', createUser);
    router.post('/api/v1/logout', handleLogout);
    //Garden APIs
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