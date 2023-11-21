const express = require('express');
const router = express.Router();
const { displayAllGardens, viewGarden } = require('../controllers/gardenController');
const { displayDataTable } = require('../controllers/sensorDataController');

const initWebRoutes = (app) => {
    router.get('/api/v1/garden', displayAllGardens);
    router.get('/api/v1/data-table', displayDataTable);
    router.get('/api/v1/garden/:garden_id', viewGarden);

    return app.use('/', router);
}

module.exports = initWebRoutes;