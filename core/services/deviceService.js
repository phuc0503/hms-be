const supabase = require('../config/supabaseClient');

const getAllDeviceByGardenId = async (garden_id) => {
    const { data, error } = await supabase
        .from('devices')
        .select()
        .eq('garden_id', garden_id)
        .order('device_id')
    // console.log(data);
    if (error) {
        return error;
    }
    return data;
}

const updateDeviceStatus = async (device_id, status) => {
    const { error } = await supabase
        .from('devices')
        .update({ status: status })
        .eq('device_id', device_id)
}

const getDeviceSchedule = async (device_id) => {
    const { data, error } = await supabase
        .from('device_schedule')
        .select()
        .eq('device_id', device_id)
    if (error) {
        return error;
    }
    return data
}

const updateDeviceSchedule = async (device_id, time_on, time_off, notification, repeat) => {
    const { error } = await supabase
        .from('device_schedule')
        .upsert({
            device_id: device_id,
            time_on: time_on,
            time_off: time_off,
            notification: notification,
            repeat: repeat
        })
        .eq('device_id', device_id)
}

module.exports = {
    updateDeviceStatus,
    getAllDeviceByGardenId,
    getDeviceSchedule,
    updateDeviceSchedule,
}