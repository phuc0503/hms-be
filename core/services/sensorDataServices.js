const db = require('../models/index');

const getHumiData = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const humiData = db.HumiData.findAll({
                raw: true
            });
            resolve(humiData);
        } catch (e) {
            reject(e);
        }
    });
};

const getTempData = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const tempData = db.TempData.findAll({
                raw: true
            });
            resolve(tempData);
        } catch (e) {
            reject(e);
        }
    });
};

const getMoisData = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const moisData = db.MoisData.findAll({
                raw: true
            });
            resolve(moisData);
        } catch (e) {
            reject(e);
        }
    });
};

const getLightData = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const lightData = db.LightData.findAll({
                raw: true
            });
            resolve(lightData);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getHumiData,
    getTempData,
    getMoisData,
    getLightData,
}