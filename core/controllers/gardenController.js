const { getTempData, getHumiData, getMoisData, getLightData } = require('../services/sensorDataServices');
const { getAllGarden, getGardenById, getDataByGardenId } = require('../services/gardenServices');

const displayAllGardens = async (req, res) => {
    const listGarden = await getAllGarden();
    // console.log('------------------------');
    // console.log(listGarden);
    // console.log('------------------------');
    return res.status(200).json(listGarden);
    // return res.render('displayAllGardens.ejs', { listGarden: listGarden });
}

const viewGarden = async (req, res) => {
    const gardenId = req.params.gardenId;
    const garden = await getGardenById(gardenId);
    const data = await getDataByGardenId(gardenId);
    return res.status(200).json({
        garden: garden,
        data: data
    });
    // return res.render('viewGarden.ejs', { garden: garden });
}

const displayDataTable = async (req, res) => {
    const humiData = await getHumiData();
    const tempData = await getTempData();
    const moisData = await getMoisData();
    const lightData = await getLightData();
    // console.log('------------------------');
    // console.log(tempData);
    // console.log('------------------------');
    // return res.render('displayDataTables.ejs', {
    //     tempData: tempData,
    //     humiData: humiData,
    //     soilData: soilData,
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
    displayAllGardens,
    viewGarden,
    displayDataTable,
}