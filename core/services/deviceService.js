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

module.exports = {
    updateDeviceStatus,
    getAllDeviceByGardenId,
}