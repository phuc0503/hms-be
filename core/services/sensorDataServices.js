const supabase = require('../config/supabaseClient');

const getHumiData = async () => {
    const { data, error } = await supabase
        .from('humidity_data')
        .select()
    if (error) {
        return error;
    }
    return data;
};

const getTempData = async () => {
    const { data, error } = await supabase
        .from('temperature_data')
        .select()
    if (error) {
        return error;
    }
    return data;
};

const getMoisData = async () => {
    const { data, error } = await supabase
        .from('moisture_data')
        .select()
    if (error) {
        return error;
    }
    return data;
};

const getLightData = async () => {
    const { data, error } = await supabase
        .from('light_data')
        .select()
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
            sensor_id: data.sensors.sensor_id,
            value: data.sensors.sensor_value,
            unit: data.sensors.sensor_unit
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
            sensor_id: data.sensors.sensor_id,
            value: data.sensors.sensor_value,
            unit: data.sensors.sensor_unit
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
            sensor_id: data.sensors.sensor_id,
            value: data.sensors.sensor_value,
            unit: data.sensors.sensor_unit
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
            sensor_id: data.sensors.sensor_id,
            value: data.sensors.sensor_value,
            unit: data.sensors.sensor_unit
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