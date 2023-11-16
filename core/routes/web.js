const express = require('express');
const router = express.Router();
const { displayAllGardens, viewGarden, displayDataTable } = require('../controllers/gardenController');

const initWebRoutes = (app) => {
    router.get('/api/v1/garden', displayAllGardens);
    router.get('/api/v1/data-table', displayDataTable);
    router.get('/api/v1/garden/:gardenId', viewGarden);

    return app.use('/', router);
}

module.exports = initWebRoutes;