const { getTempData, getHumiData, getMoisData, getLightData } = require('../services/sensorDataServices');

const displayDataTable = async (req, res) => {
    const humiData = await getHumiData();
    const tempData = await getTempData();
    const moisData = await getMoisData();
    const lightData = await getLightData();
    // return res.render('displayDataTables.ejs', {
    //     tempData: tempData,
    //     humiData: humiData,
    //     moisData: moisData,
    //     lightData: lightData
    // });
    return res.status(200).json({
        humiData: humiData,
        tempData: tempData,
        moisData: moisData,
        lightData: lightData
    });
}

module.exports = {
    displayDataTable,
}