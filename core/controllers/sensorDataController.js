const { getTempData, getHumiData, getMoisData, getLightData } = require('../services/sensorDataServices');

const displayDataTable = async (req, res) => {
    const garden_id = req.params.garden_id;

    const humiData = await getHumiData(garden_id);
    const tempData = await getTempData(garden_id);
    const moisData = await getMoisData(garden_id);
    const lightData = await getLightData(garden_id);
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