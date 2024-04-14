const express = require('express');
const router = express.Router();
const { getAllStaff } = require('../controllers/staffController');

const initWebRoutes = (app) => {
    router.get('/api/v1/get-all-staffs', getAllStaff);
    return app.use('/', router);
}

module.exports = initWebRoutes;