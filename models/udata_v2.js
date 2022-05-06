const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const auth_creds_sch = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    vid: {type: String, required: true},
    acid: {type: String, required: true},
    did: {type: Array},
    vow: {type: Array, required: true},
    mfa_tkn: {type: Object, required: true},
    acc_auth_methods_arr: {type: Object, required: true},
    acc_rcvry_methods_arr: {type: Object, required: true},
    rcvry_codes_arr: {type: Array, required: true},
    activity_log_arr: {type: Array, required: true},
    contact_emails_arr: {type: Array, required: true},
    contact_phone_numbers_arr: {type: Array, required: true},
}, {timestamps: true});

const user_auth = mongoose.model('UAC_v2', auth_creds_sch);
module.exports = user_auth;