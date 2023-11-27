const supabase = require('../config/supabaseClient');

const getHumiData = async (garden_id) => {
    const { data, error } = await supabase
        .from('humidity_data')
        .select('measure_at, sensor_id, value, unit, sensors!inner()')
        .eq('sensors.garden_id', garden_id)
        .like('sensor_id', '%humi%')
    if (error) {
        return error;
    }
    return data;
};

const getTempData = async (garden_id) => {
    const { data, error } = await supabase
        .from('temperature_data')
        .select('measure_at, sensor_id, value, unit, sensors!inner()')
        .eq('sensors.garden_id', garden_id)
        .like('sensor_id', '%temp%')
    if (error) {
        return error;
    }
    return data;
};

const getMoisData = async (garden_id) => {
    const { data, error } = await supabase
        .from('moisture_data')
        .select('measure_at, sensor_id, value, unit, sensors!inner()')
        .eq('sensors.garden_id', garden_id)
        .like('sensor_id', '%mois%')
    if (error) {
        return error;
    }
    return data;
};

const getLightData = async (garden_id) => {
    const { data, error } = await supabase
        .from('light_data')
        .select('measure_at, sensor_id, value, unit, sensors!inner()')
        .eq('sensors.garden_id', garden_id)
        .like('sensor_id', '%light%')
    if (error) {
        return error;
    }
    return data;
};

const insertToHumidityTable = async (data) => {
    const { error } = await supabase
        .from('humidity_data')
        .insert({
            measure_at: new Date().toLocaleString(),
            sensor_id: data.sensors[0].sensor_id,
            value: data.sensors[0].sensor_value,
            unit: data.sensors[0].sensor_unit
        })
    if (error) {
        return error;
    }
    return 1;
};

const insertToTemperatureTable = async (data) => {
    const { error } = await supabase
        .from('temperature_data')
        .insert({
            measure_at: new Date().toLocaleString(),
            sensor_id: data.sensors[0].sensor_id,
            value: data.sensors[0].sensor_value,
            unit: data.sensors[0].sensor_unit
        })
    if (error) {
        return error;
    }
    return 1;
};

const insertToMoistureTable = async (data) => {
    const { error } = await supabase
        .from('moisture_data')
        .insert({
            measure_at: new Date().toLocaleString(),
            sensor_id: data.sensors[0].sensor_id,
            value: data.sensors[0].sensor_value,
            unit: data.sensors[0].sensor_unit
        })
    if (error) {
        return error;
    }
    return 1;
};

const insertToLightTable = async (data) => {
    const { error } = await supabase
        .from('light_data')
        .insert({
            measure_at: new Date().toLocaleString(),
            sensor_id: data.sensors[0].sensor_id,
            value: data.sensors[0].sensor_value,
            unit: data.sensors[0].sensor_unit
        })
    if (error) {
        return error;
    }
    return 1;
};

module.exports = {
    getHumiData,
    getTempData,
    getMoisData,
    getLightData,
    insertToTemperatureTable,
    insertToHumidityTable,
    insertToMoistureTable,
    insertToLightTable,
}