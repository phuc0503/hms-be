const { updateDeviceStatus, getAllDeviceByGardenId } = require('../services/deviceService');

const viewDevice = async (req, res) => {
    const garden_id = req.params.garden_id;
    const listDevice = await getAllDeviceByGardenId(garden_id);
    return res.status(200).json({
        device: listDevice
    })
    // return res.render('viewDevice.ejs', { listDevice: listDevice });
}

const changeDeviceStatus = async (req, res) => {
    let device_id = req.body.id;
    let status = req.body.status;
    updateDeviceStatus(device_id, status);
    return res.send("Update status succeed!").status(200)
}

const getDeviceSchedule = async (req, res) => {
    // const listDevice = await getAllDeviceByGardenId(garden_id);
    return res.render('deviceSchedule.ejs');
}

module.exports = {
    viewDevice,
    changeDeviceStatus,
    getDeviceSchedule,
}