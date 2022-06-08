const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const relay_station_atlas = new Schema({
    relay_station_id: {type: String, required: true},
    relay_station_name: {type: String, required: true},
    dock_array: {type: Array, required: true},
    user_access_array: {type: Array, required: true},
    activity_logs: {type: Array, required: true},
}, {timestamps: true});

const relay_station_model = mongoose.model('relay_station_atlas', relay_station_atlas);
module.exports = relay_station_model;