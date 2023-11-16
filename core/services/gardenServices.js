const db = require('../models/index');

const getAllGarden = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const listGarden = db.Garden.findAll({
                raw: true
            });
            resolve(listGarden);
        } catch (e) {
            reject(e);
        }
    });
};

const getGardenById = (gardenId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const garden = db.Garden.findOne({
                where: { gardenId: gardenId },
                raw: true
            });
            resolve(garden);
        } catch (e) {
            reject(e);
        }
    });
};

const getSensorByGardenId = (gardenId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sensor = db.Sensor.findAll({
                attributes: ['sensorId'],
                where: {
                    gardenId: gardenId
                },
                raw: true
            });
            resolve(sensor);
        } catch (e) {
            reject(e);
        }
    });
}

const getDataByGardenId = (gardenId) => {
    // const id = [sensor[0].sensorId, sensor[1].sensorId, sensor[2].sensorId, sensor[3].sensorId];
    return new Promise(async (resolve, reject) => {
        try {
            const sensor = await getSensorByGardenId(gardenId);

            const humi = await db.HumiData.findOne({
                where: {
                    sensorId: sensor[0].sensorId,
                },
                order: [['measureAt', 'DESC']],
                raw: true
            });

            const temp = await db.TempData.findOne({
                where: {
                    sensorId: sensor[3].sensorId,
                },
                order: [['measureAt', 'DESC']],
                raw: true
            });

            const mois = await db.MoisData.findOne({
                where: {
                    sensorId: sensor[2].sensorId,
                },
                order: [['measureAt', 'DESC']],
                raw: true
            });

            const light = await db.LightData.findOne({
                where: {
                    sensorId: sensor[1].sensorId,
                },
                order: [['measureAt', 'DESC']],
                raw: true
            });
            resolve({
                humi: humi,
                temp: temp,
                mois: mois,
                light: light
            })
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    getAllGarden,
    getGardenById,
    getDataByGardenId
}