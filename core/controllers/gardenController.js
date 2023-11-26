const { getAllGarden, getGardenById, getLastTemperature, getLastHumidity, getLastMoisture, getLastLight } = require('../services/gardenServices');

const displayAllGardens = async (req, res) => {
    const listGarden = await getAllGarden();
    return res.status(200).json(listGarden);
    // return res.render('displayAllGardens.ejs', { listGarden: listGarden });
}

const viewGarden = async (req, res) => {
    const garden_id = req.params.garden_id;
    const garden = await getGardenById(garden_id);
    const lastTemp = await getLastTemperature(garden_id);
    const lastHumi = await getLastHumidity(garden_id);
    const lastMois = await getLastMoisture(garden_id);
    const lastLight = await getLastLight(garden_id);
    return res.status(200).json({
        garden: garden,
        data: {
            lastTemp: lastTemp,
            lastHumi: lastHumi,
            lastMois: lastMois,
            lastLight: lastLight
        }

    });
    // return res.render('viewGarden.ejs', {
    //     garden: garden,
    //     data: {
    //         lastTemp: lastTemp,
    //         lastHumi: lastHumi,
    //         lastMois: lastMois,
    //         lastLight: lastLight
    //     }
    // });
}



const getDeviceStatus = async () => {

}

module.exports = {
    displayAllGardens,
    viewGarden,
    getDeviceStatus,
}