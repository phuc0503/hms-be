const { updateDeviceStatus, getAllDeviceByGardenId, getDeviceSchedule, updateDeviceSchedule } = require('../services/deviceService');
const { pubDeviceStatus } = require('../mqtt/pub');

const viewDevice = async (req, res) => {
    const garden_id = req.params.garden_id;
    const listDevice = await getAllDeviceByGardenId(garden_id);
    return res.status(200).json({
        device: listDevice
    })
    // return res.render('viewDevice.ejs', { listDevice: listDevice });
}

const changeDeviceStatus = async (req, res) => {
    let garden_id = req.body.garden_id;
    let device_id = req.body.id;
    let status = req.body.status;
    pubDeviceStatus(garden_id, device_id, status);
    updateDeviceStatus(device_id, status);
    return res.send("Update status succeed!").status(200)
}

const viewDeviceSchedule = async (req, res) => {
    const device_id = req.params.device_id;
    const deviceSchedule = await getDeviceSchedule(device_id);
    // return res.render('deviceSchedule.ejs');
    return res.status(200).json({
        deviceSchedule: deviceSchedule
    })
}

const putDeviceSchedule = async (req, res) => {
    const device_id = req.params.device_id;
    const time_on = req.body.time_on;
    const time_off = req.body.time_off;
    const notification = req.body.notification;
    const repeat = req.body.repeat;

    updateDeviceSchedule(device_id, time_on, time_off, notification, repeat);

    res.send("Update schedule succeed!").status(200)
}

module.exports = {
    viewDevice,
    changeDeviceStatus,
    viewDeviceSchedule,
    putDeviceSchedule,
}