const supabase = require('../config/supabaseClient');

const getAllGarden = async () => {
    const { data, error } = await supabase
        .from('gardens')
        .select()
    if (error) {
        return error;
    }
    return data;
};

const getGardenById = async (garden_id) => {
    const { data, error } = await supabase
        .from('gardens')
        .select()
        .eq('garden_id', garden_id)
    if (error) {
        return error;
    }
    return data;
};

const getLastTemperature = async (garden_id) => {
    const { data, error } = await supabase
        .from('temperature_data')
        .select('measure_at, sensor_id, value, unit, sensors!inner()')
        .limit(1)
        .eq('sensors.garden_id', garden_id)
        .like('sensor_id', '%temp%')
        .order('measure_at', { ascending: false })
    if (error) {
        return error;
    }
    return data;
}

const getLastHumidity = async (garden_id) => {
    const { data, error } = await supabase
        .from('humidity_data')
        .select('measure_at, sensor_id, value, unit, sensors!inner()')
        .limit(1)
        .eq('sensors.garden_id', garden_id)
        .like('sensor_id', '%humi%')
        .order('measure_at', { ascending: false })
    if (error) {
        return error;
    }
    return data;
}

const getLastMoisture = async (garden_id) => {
    const { data, error } = await supabase
        .from('moisture_data')
        .select('measure_at, sensor_id, value, unit, sensors!inner()')
        .limit(1)
        .eq('sensors.garden_id', garden_id)
        .like('sensor_id', '%mois%')
        .order('measure_at', { ascending: false })
    if (error) {
        return error;
    }
    return data;
}

const getLastLight = async (garden_id) => {
    const { data, error } = await supabase
        .from('light_data')
        .select('measure_at, sensor_id, value, unit, sensors!inner()')
        .limit(1)
        .eq('sensors.garden_id', garden_id)
        .like('sensor_id', '%light%')
        .order('measure_at', { ascending: false })
    if (error) {
        return error;
    }
    return data;
}

module.exports = {
    getAllGarden,
    getGardenById,
    getLastTemperature,
    getLastHumidity,
    getLastMoisture,
    getLastLight,
}