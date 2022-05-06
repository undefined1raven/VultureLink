const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const vulture_atlas = new Schema({
    vid: {type: String, required: true},
    vn: {type: String, required: true},
    u_access_arr: {type: Array, required: true},
    local_prefs_arr: {type: Array, required: true},
    security_rules_arr: {type: Array, required: true},
    flt_logs: {type: Array, required: true},
}, {timestamps: true});

const vulture_model = mongoose.model('vulture_atlas', vulture_atlas);
module.exports = vulture_model;