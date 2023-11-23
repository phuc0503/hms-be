const { updateDeviceStatus } = require('../services/deviceService');

const changeDeviceStatus = async (req, res) => {
    let device_id = req.body.id;
    let status = req.body.status;
    updateDeviceStatus(device_id, status);
    return res.send("Update status succeed!").status(200)
}

module.exports = {
    changeDeviceStatus,
}