const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const dock_atlas = new Schema({
    dock_id: {type: String, required: true},
    dock_name: {type: String, required: true},
    vid_array: {type: Array, required: true},
    payload_array: {type: Array, required: true},
    user_access_array: {type: Array, required: true},
}, {timestamps: true});

const dock_model = mongoose.model('dock_atlas', dock_atlas);
module.exports = dock_model;