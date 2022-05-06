const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const auth_creds_sch = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    vid: {type: String, required: true},
}, {timestamps: true});

const user_auth = mongoose.model('UAC', auth_creds_sch);
module.exports = user_auth;