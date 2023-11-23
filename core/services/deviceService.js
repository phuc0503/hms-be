const supabase = require('../config/supabaseClient');

const updateDeviceStatus = async (device_id, status) => {
    const { error } = await supabase
        .from('devices')
        .update({ status: status })
        .eq('device_id', device_id)
}

module.exports = {
    updateDeviceStatus,
}