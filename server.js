
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
else {
    // require('newrelic');
}

const secrets = JSON.parse(
    require('child_process').execSync('node doppler-secrets.js')
);

const express = require('express');
const app = express();
const server = require('http').Server(app);
const socketio = require('socket.io');
const io = socketio(server);
const path = require('path');
const { env, disconnect, eventNames } = require('process');
const bcrypt = require('bcrypt');
const useragent = require('express-useragent');
const cmp = require('compression');
const flash = require('express-flash');
const session = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
const uuid = require('uuid');
const UAC = require('./models/udata.js');
const UAC_v2 = require('./models/udata_v2.js');
const VULTURE_SCH = require('./models/vulture_model.js');
const DOCK_SCH = require('./models/dock_model.js');
const RELAY_STATION_SCH = require('./models/relay_station_model.js');
const fs = require('fs');
const strategy = require('passport-local').Strategy;
const crypto = require('crypto');
const forge = require('node-forge');
const { getMessaging } = require("firebase/messaging");
const limiter_src = require('limiter');
const str = require('@supercharge/strings');
const mfa_mgr = require('speakeasy');
const qrcode = require('qrcode');
const axios = require('axios');
const cookie_parser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const jwt_scrt = secrets.JWT;
const { initializeApp } = require('firebase/app');
const frb_db = require("firebase/database");
const { getDatabase, get, once, increment, remove, query, limitToLast, update, push, set, ref, onValue } = require("firebase/database");
const { ToadScheduler, SimpleIntervalJob, AsyncTask, Task } = require('toad-scheduler')
const uap = require('useragent');
const user_profile_gen_functions = require('./user_profile_gen_functions.js');
const encryptor = require('simple-encryptor')(secrets.GPE);//process.env.WEB_RELAY_ENCRYPTION_KEY
const bodyParser = require('body-parser');

user_profile_gen_functions.gen_pilot_u_access_array()
const gen_admin_u_access_array = (acid, role) => user_profile_gen_functions.gen_admin_u_access_array(acid, role);
const gen_pilot_u_access_array = (acid, role) => user_profile_gen_functions.gen_pilot_u_access_array(acid, role);
const gen_data_analyst_u_access_array = (acid, role) => user_profile_gen_functions.gen_data_analyst_u_access_array(acid, role);

let json_parser = bodyParser.json();
let vulture_ping_unix;
const sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(secrets.SEND_GRID);
const msg = {
    to: 'x', // Change to your recipient
    from: 'raven@vulture-uplink.com', // Change to your verified sender
    subject: 'Your Ionic Vulture order is delayed',
    text: "We're sorry to inform you that because of an issue regarding one of the micro nuclear reactors powering the starship Pheonix, the ship won't be able to depart to Luna with the supplies required for your delivery of the Ionic Vulture Xe¹³¹. We ensure you that our staff on the orbital shipyard is doing everything they can to solve this as soon as possible. You will receive as compensation a -1/12% (not to be confused with infinity) discount for any flight to and from Mars. Remember to report any unusual behaviour of anyone during flight to a Security Officer to prevent another Blue Flash™ incident. Fly safe and goodluck :)",

}
// sendgrid.send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })


var admin = require("firebase-admin");
var serviceAccount = require("./vulture-uplink-firebase-adminsdk-msv8g-b7d3d0a243.json");


app.use(cookie_parser());


///---MFA---///

// qrcode.toDataURL(secret.otpauth_url, (err, img_data) => {
//     // console.log(img_data)
// });


// var verified = mfa_mgr.totp.verify({
//     secret: secret.base32,
//     encoding: 'base32',
//     token: 920383
// });
// console.log(verified)

function getCryptoRandomInt(min, max) {
    var maxBytes = 6;
    var maxDec = 281474976710656;
    var randbytes = parseInt(crypto.randomBytes(maxBytes).toString('hex'), 16);
    var result = Math.floor(randbytes / maxDec * (max - min + 1) + min);
    if (result > max) {
        result = max;
    }
    return result;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //max e | min i
}




const firebaseConfig = {
    apiKey: secrets.FIREBASE,
    authDomain: "rt-tlp.firebaseapp.com",
    databaseURL: "https://rt-tlp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rt-tlp",
    storageBucket: "rt-tlp.appspot.com",
    messagingSenderId: "383716944699",
    appId: "1:383716944699:web:6258045d7d25bcfcb8a51e",
    databaseURL: "https://rt-tlp-default-rtdb.europe-west1.firebasedatabase.app/",
    credential: admin.credential.cert(serviceAccount),
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vulture-uplink-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();

function check_sio_ath(sio_payload, data) {
    if (data != null) {
        return true;
    }
    else {
        return false;
    }
}

var cmd_ping_trigger_unix = 0;

var data_transit_vulture_req_arr = [];
var data_transit_sid_arr = [];
var data_transit_un_arr = [];

var g_joystick_input_pkg;
var thrust_;
var pitch_;
var roll_;
var yaw_;
var ini_lping_time = 0;
var local_server_unix = 0;
var local_server_cs;
var adv_tele_uid_arr = [];
var adv_tele_sid_arr = [];
var command_sid_arr = [];
var last_cic_unix = 0;
var last_gnd_video_broadcaster_unix = 0;
var cic_active_status = false;
var gnd_video_broadcaster_cs = false;
var omega_board_last_unix = 0;
var last_fwd_video_broadcaster_unix = 0;
var fwd_video_broadcaster_cs = false;
var ini_ping_time = 0;

const deep_storage_link = secrets.MONGO;


mongoose.connect(deep_storage_link).then(() => console.log('Deep Storage Uplink Established')).catch(e => { console.log(`Deep Storage Link Failed | ${e}`) });


function add_vulture_to_vow(email, vn, vid) {
    UAC_v2.find({ email: email }).exec().then(r => {
        if (r.length > 0) {
            var update_temp = r[0].vow;
            r[0].vow.push({ vid: vid, vn: vn });
            UAC_v2.findOneAndUpdate({ email: email }, { vow: update_temp }, { upsert: true }, (err, doc) => { console.log('New Vulture Added to vow') });
        }
        else {
            console.log('Could not add vulture to vow [U404]');
        }
    });
}

function add_slgin_to_awol(email, obj) {
    UAC_v2.find({ email: email }).exec().then(r => {
        if (r.length > 0) {
            var update_temp = r[0].activity_log_arr;
            r[0].activity_log_arr.push(obj);
            UAC_v2.findOneAndUpdate({ email: email }, { activity_log_arr: update_temp }, { upsert: true }, (err, doc) => { });
        }
    });
}

function remove_vulture_to_vow(email, vn) {//todo
    // UAC_v2.find({ email: email }).exec().then(r => {
    //     if(r.length > 0){
    //         var update_temp = r[0].vow;
    //         r[0].vow.push({vid: uuid.v4(), vn: vn});
    //         UAC_v2.findOneAndUpdate({email: email}, {vow: update_temp}, {upsert: true}, (err, doc) => {console.log('New Vulture Added to vow')});
    //     }
    //     else{
    //         console.log('Could not add vulture to vow [U404]');
    //     }
    // });
}



function rem_ebv(arr_0, arr, arr_1, arr_2, val) {
    var ix = arr.indexOf(val);
    if (ix != -1) {
        arr_0.splice(ix, 1);
        arr.splice(ix, 1);
        arr_1.splice(ix, 1); function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min); //max e | min i
        }
        arr_2.splice(ix, 1);
    }
}

//----Authentication [beta]----//



var acnt_id;;
// initialize_passport(passport, email => UAC_v2.find({ email: email }).exec())

var vulture_id_cnd_array = [];


const scheduler = new ToadScheduler();
const task = new Task('rm_expired_tokens_frltb', () => {//Remove auth tokens from the firebase realtime db

    function rm_data_from_rtdb(path, expy) {
        get(ref(db, `${path}/`)).then(snapshot => {
            const data = snapshot.val();
            for (tkn in data) {
                if (Math.abs((Date.now()) - data[tkn].tx) > expy) {
                    remove(ref(db, `${path}/${tkn}`));
                }
            }
        });
    }

    rm_data_from_rtdb('aprvd_tids', 7200000);//2h ttl

    rm_data_from_rtdb('adv_tele_aprvd_tids', 21600000);//6h ttl 

    rm_data_from_rtdb('email_conf', 600000);//10min ttl

    rm_data_from_rtdb('password_reset', 600000);//10min ttl

    rm_data_from_rtdb('password_reset_tokens', 600000);//10min ttl

    rm_data_from_rtdb('frstp_aprvd_tids', 180000);//3min ttl

});

const rm_expired_tokens_fdb = new SimpleIntervalJob({ seconds: 5 }, task);

scheduler.addIntervalJob(rm_expired_tokens_fdb);



function add_activity_log_tdb(req, ipx, service_id, email) {//- [X315] -//
    //sf
    let agl = uap.parse(req.headers["user-agent"]);
    let os = agl.os.family;
    let os_version = agl.os.major;
    let browser = agl.toAgent().replace(agl.toVersion(), '');
    let browser_version = agl.toVersion();

    let ip = ipx.split(',')[0];

    if (process.env.NODE_ENV === 'production') {
        getipld(ip).then(ld => {
            if (os_version != 0 && os_version != '') {
                let log_obj_0 = { ip: ip, city: ld.city.name, state: ld.state.name, loc: ld.location, iso_code: ld.country.iso_code, tx: Date.now(), os: os, os_version: os_version, browser: browser, browser_version: browser_version, mobile: req.useragent.isMobile, service_id: service_id };
                add_slgin_to_awol(email, log_obj_0);
            }
            else {
                let log_obj_1 = { ip: ip, city: ld.city.name, state: ld.state.name, loc: ld.location, iso_code: ld.country.iso_code, tx: Date.now(), os: os, os_version: '', browser: browser, browser_version: browser_version, mobile: req.useragent.isMobile, service_id: service_id };
                add_slgin_to_awol(email, log_obj_1);
            }
        });
    }
}



//----Global Relay ⇄ Vulture Comm----//
io.on('connection', function (socket_l) {
    socket_l.on('vulture_handshake', payload => {
        if (payload.handshake_vid != undefined) {
            socket_l.join(payload.handshake_vid);
            const add_active_vulture_to_rtdb = ref(db, `active_vultures/${payload.handshake_vid}`);
            set(add_active_vulture_to_rtdb, {
                tx: Date.now(),
                sid: socket_l.id
            });
            io.emit('refresh_vulture_array_status_sig');
        }
    });
    socket_l.on('disconnect', () => {
        get(ref(db, `active_vultures/`)).then(snapshot => {
            const data = snapshot.val();
            if (data != null) {
                for (elm in data) {
                    if (data[elm].sid == `${socket_l.id}`) {
                        remove(ref(db, `active_vultures/${elm}`));
                        io.emit('refresh_vulture_array_status_sig');
                    }
                }
            }
        });
    });
    ////--Advanced_Telemetry F/E, Command ⇄ this ⇄ Vulture | Command Line Interface parser and relayer--////

    socket_l.on('cli_cmd_confirmation', cmd_verifiation_payload => {
        var scmd_conf_payload = cmd_verifiation_payload.split(":");
        io.emit('cmd_verification_payload', scmd_conf_payload);
    });//Vulture ⇄ this ⇄ Advanced_Telemetry F/E | Command Execution Confirmation 

    socket_l.on('command_exe', cmd_payload => {
        var scmd_payload = cmd_payload.cmd.trim().split(" ");
        for (let x = 0; x <= scmd_payload.length; x++) {
            if (scmd_payload[x] === "") {
                scmd_payload.splice(x, 1);
                x--;
            }
        }//CMD payload space separator
        //Command Parser
        if (scmd_payload[0].toUpperCase() == "RTH") {
            if (scmd_payload[1] != null) {
                if (scmd_payload[1].toUpperCase() == "-A") {
                    io.to(`${cmd_payload.vid}`).emit('parsed_cli_cmd', "RTH:1");
                }
                if (scmd_payload[1].toUpperCase() == "-D") {
                    io.to(`${cmd_payload.vid}`).emit('parsed_cli_cmd', "RTH:0");
                }
                if (scmd_payload[1].toUpperCase() != "-A" && scmd_payload[1].toUpperCase() != "-D") {
                    scmd_payload.push("2");
                    io.to(`${cmd_payload.vid}`).emit('unparsed_cli_cmd', scmd_payload);
                }
            }
            else {
                io.to(`${cmd_payload.vid}`).emit('parsed_cli_cmd', "RTH:-1");
                //io.emit('unparsed_cli_cmd', `${scmd_payload[0]}:1`);
            }
        }
        if (scmd_payload[0].toUpperCase() == "REBOOT") {
            if (scmd_payload[1] == undefined) {
                io.to(`${cmd_payload.vid}`).emit('unparsed_cli_cmd', `${scmd_payload[0]}:1`);
            }
            else {
                if (scmd_payload[1].toUpperCase() == "-1310_DISCO") {
                    io.to(`${cmd_payload.vid}`).emit('parsed_cli_cmd', "REBOOT:1");
                }
                if (scmd_payload[1].toUpperCase() != "-1310_DISCO") {
                    scmd_payload.push("2");
                    io.to(`${cmd_payload.vid}`).emit('unparsed_cli_cmd', scmd_payload);
                }
            }
        }
        if (scmd_payload[0].toUpperCase() == "PING" || scmd_payload[0].toUpperCase() == "PINGU") {
            if (scmd_payload[1] == undefined) {
                io.to(`${cmd_payload.vid}`).emit('parsed_cli_cmd', "PING:0");
            }
            if (scmd_payload[1] != undefined) {
                if (scmd_payload[1].toUpperCase() == "-L") {
                    io.to(`${cmd_payload.vid}`).emit('parsed_cli_cmd', "PING:1");
                }
                if (scmd_payload[1].toUpperCase() == "-N") {
                    io.to(`${cmd_payload.vid}`).emit('parsed_cli_cmd', "PING:2");
                }
                if (scmd_payload[1].toUpperCase() != "-L" && scmd_payload[1].toUpperCase() != "-N") {
                    scmd_payload.push("2");
                    io.to(`${cmd_payload.vid}`).emit('unparsed_cli_cmd', scmd_payload);
                }
            }

        }
        //Unidentifed Command Def Response
        if (scmd_payload[0].toUpperCase() != "RTH" && scmd_payload[0].toUpperCase() != "REBOOT" && scmd_payload[0].toUpperCase() != "PING" && scmd_payload[0].toUpperCase() != "PINGU") {
            if (local_server_cs == false) {
                io.to(`${cmd_payload.vid}`).emit('unparsed_cli_cmd', `${scmd_payload[0]}:0`);
            }

        }
    });


    socket_l.on('vulture_online_signal', (payload) => {
        console.log(payload);
        io.emit('vulture_online_signal_server_relay', "Uplink Established");
    });//Vulture ⇄ this uplink indicator

    socket_l.on('omega_controller_cs', omega_controller_cs => {
        io.emit('omega_controller_cs_rlyd', omega_controller_cs)
    });

    ////--Data flow routing demo [In-progress]--////
    socket_l.on('vulture_ownr_link', acnt_link => {
        vulture_id_cnd_array.push(acnt_link);
        acnt_id = acnt_link;
    });


    ////--Vulture ⇄ this | Telemetry Relay to: Advanced_Telemetry F/E, Command--////

    socket_l.on('sat_ops', payload => {
        io.to(`${payload.vid}`).emit('sat_ops_rebound', payload.telemetry);
    });//Origin HID [02F] | GPS Sat Ops

    socket_l.on('gps_position_pkg', (payload) => {
        io.to(`${payload.vid}`).emit('gps_position_pkg_rebound', payload.telemetry);
    });//Origin HID [02F] | GPS [longitude, latitude, altitude]

    socket_l.on('gps_nav_pkg', payload => {
        io.to(`${payload.vid}`).emit('gps_nav_pkg_rebound', payload.telemetry);
    });//Origin HID [02F] | GPS [heading, speed]

    socket_l.on('sonar_telemetry_pkg', sonar_telemetry_payload => {
        io.to(`${sonar_telemetry_payload.vid}`).emit('sonar_telemetry_pkg_rebound', sonar_telemetry_payload.telemetry);//to(`${payload.vid}`)
    });

    socket_l.on('sonar_1_rebound', function (payload) {
        io.emit('sonar_1_dist', payload.telemetry);//to(`${payload.vid}`)
    });//Origin HID [02D-0] | Front Sonar distance(cm)

    socket_l.on('sonar_2_rebound', function (payload) {
        io.to(`${payload.vid}`).emit('sonar_2_dist', payload.telemetry);
    });//Origin HID [02D-1] | Leftside Sonar distance(cm)

    socket_l.on('sonar_3_rebound', function (payload) {
        io.to(`${payload.vid}`).emit('sonar_3_dist', payload.telemetry);
    });//Origin HID [02D-2] | Rear Sonar distance(cm)

    socket_l.on('sonar_4_rebound', function (payload) {
        io.to(`${payload.vid}`).emit('sonar_4_dist', payload.telemetry);
    }); //Origin HID [02D-3] | Rightside Sonar distance(cm)

    socket_l.on('sonar_5_rebound', function (payload) {
        io.to(`${payload.vid}`).emit('sonar_5_dist', payload.telemetry);
    });//Origin HID [02D-4] | Ground Sonar distance(cm)

    socket_l.on('gyro_data_pkg', function (payload) {
        io.to(`${payload.vid}`).emit('acc_data_pkg_rebound', payload.telemetry)
    });//Origin HID [02E] | Secondary Accelerometer [acceleration, inclination, orientation, pitch, roll, x, y, z]

    socket_l.on('barometer_pkg', payload => {
        io.to(`${payload.vid}`).emit('barometer_pkg_rebound', payload.telemetry);
    });//Origin HID [02I] | Barometer [pressure(Pa), temperture(C), altitude(m)]

    socket_l.on('imu_data_pkg_broadcast', payload => {
        io.to(`${payload.vid}`).emit('imu_data_pkg_server_relay', payload.telemetry);
    });//Origin HID [02C] | IMU [temperture(C)[0], x[1], y[2], z[3], pitch[4], roll[5], accel[6], inclination[7], orientation[8], Gyro x[9], Gyro y[10], Gyro z[11], Gyro pitch[12], Gyro roll[13], Gyro yaw[14], Gyro rate[15], Gyro isCalibrated[16]]

    socket_l.on('sensor_array_es', payload => {
        io.to(`${payload.vid}`).emit('sensor_array_es_rebound', payload.telemetry);
    });//Origin Vulture | Dev purposes only | Relayed to: Advanced_Telemetry F/E


    ////--Advanced_Telemetry F/E ⇄ this ⇄ Vulture | Special Controls--////

    socket_l.on('imu_restart_signal', () => {
        io.emit('imu_restart_signal_sr');
    });//Origin Advanced_Telemetry F/E | IMU Restart Signal [demo] | Relayed to: Vulture

    socket_l.on('omega_reboot_signal', () => {
        io.emit('omega_reboot_signal_relay');
    });//Origin Advanced_Telemetry F/E | Omega Hardware Interface Board Restart Signal | Relayed to: Vulture

    socket_l.on('vulture_server_reboot', () => {
        io.emit('vulture_server_reboot_server_relay');
    });//Origin Advanced_Telemetry F/E | Local server running on Vulture Restart Signal | Relayed to: Vulture

    socket_l.on('m1_manual_thrust_lvl', (m1_thrust_lvl) => {
        io.emit('m1_manual_thrust_lvl_rebound', m1_thrust_lvl);
    });//Origin Advanced_Telemetry F/E | M1 Thrust value for manual testing | Relayed to: Vulture

    socket_l.on('m2_manual_thrust_lvl', (m2_thrust_lvl) => {
        io.emit('m2_manual_thrust_lvl_rebound', m2_thrust_lvl);
    });//Origin Advanced_Telemetry F/E | M2 Thrust value for manual testing | Relayed to: Vulture

    socket_l.on('m3_manual_thrust_lvl', (m3_thrust_lvl) => {
        io.emit('m3_manual_thrust_lvl_rebound', m3_thrust_lvl);
    });//Origin Advanced_Telemetry F/E | M3 Thrust value for manual testing | Relayed to: Vulture

    socket_l.on('m4_manual_thrust_lvl', (m4_thrust_lvl) => {
        io.emit('m4_manual_thrust_lvl_rebound', m4_thrust_lvl);
    });//Origin Advanced_Telemetry F/E | M4 Thrust value for manual testing | Relayed to: Vulture

    ////--Advanced_Telemetry F/E ⇄ this ⇄ Vulture | Autonomy Pref Sync&Transmission--////
    socket_l.on('rth_pref_arr_xw', (rth_pref_arr) => {
        io.emit('rth_pref_arr_xq', rth_pref_arr);
    });
    socket_l.on('ca_pref_arr_xw', (ca_pref_arr) => {
        io.emit('ca_pref_arr_xq', ca_pref_arr);
    });
    socket_l.on('wnav_pref_arr_xw', (wnav_pref_arr) => {
        io.emit('wnav_pref_arr_xq', wnav_pref_arr);
    });
    socket_l.on('obj_recog_pref_arr_xw', (obj_recog_pref_arr) => {
        io.emit('obj_recog_pref_arr_xq', obj_recog_pref_arr);
    });
    socket_l.on('rth_status_xw', (rth_status) => {
        io.emit('rth_status_xq', rth_status);
    });
    socket_l.on('vulture_local_autonomy_pref_broadcast', vulture_autonomy_prefs => {
        io.emit('vulture_autonomy_prefs_xf', vulture_autonomy_prefs);
    });
    socket_l.on('vulture_autonomy_prefs_req', () => {
        io.emit('vulture_autonomy_prefs_req_xq');
    });
    socket_l.on('ca_status_xw', ca_status => {
        io.emit('ca_status_xq', ca_status);
    });
    socket_l.on('vulture_local_autonomy_ca_status_broadcast', _ca_status => {
        io.emit('vulture_local_autonomy_ca_status_broadcast_xf', _ca_status);
    });
    socket_l.on('vulture_local_autonomy_rth_status_broadcast', RTH => {
        if (RTH == 0) {
            io.emit('vulture_local_autonomy_rth_status_broadcast_xf', false);
        }
        else {
            io.emit('vulture_local_autonomy_rth_status_broadcast_xf', true);
        }
    });
    socket_l.on('wnav_status_xw', wnav_status => {
        io.emit('wnav_status_xq', wnav_status);
    });
    socket_l.on('vulture_local_autonomy_wnav_status_broadcast', WNAV => {
        if (WNAV == 0) {
            io.emit('vulture_local_autonomy_wnav_status_broadcast_xf', false);
        }
        else {
            io.emit('vulture_local_autonomy_wnav_status_broadcast_xf', true);
        }
    });
    socket_l.on('obj_recog_status_xw', obj_recog_status => {
        io.emit('obj_recog_status_xq', obj_recog_status);
    });
    socket_l.on('vulture_local_autonomy_obj_recog_status_broadcast', OBJ_RECOG => {
        if (OBJ_RECOG == 0) {
            io.emit('vulture_local_autonomy_obj_recog_status_broadcast_xf', false);
        }
        else {
            io.emit('vulture_local_autonomy_obj_recog_status_broadcast_xf', true);
        }
    });
    socket_l.on('vulture_local_autonomy_rth_status_broadcast_req', () => {
        io.emit('vulture_local_autonomy_rth_status_broadcast_req_xq');
    });
    socket_l.on('vulture_local_autonomy_wnav_status_broadcast_req', () => {
        io.emit('vulture_local_autonomy_wnav_status_broadcast_req_xq');
    });
    socket_l.on('vulture_local_autonomy_ca_status_broadcast_req', () => {
        io.emit('vulture_local_autonomy_ca_status_broadcast_req_xq');
    });
    socket_l.on('vulture_local_autonomy_obj_recog_status_broadcast_req', () => {
        io.emit('vulture_local_autonomy_obj_recog_status_broadcast_req_xq');
    });
    ////--Hardware Status--////

    socket_l.on('gamma_board_hs', () => {
        omega_board_last_unix = Date.now();
    });//sets last unix for the Omega Hardware Interface Board

    socket_l.on('sensor_array_hardware_cs', payload => {
        io.to(`${payload.vid}`).emit('sensor_array_hardware_cs_server_relay', payload.telemetry);
    });//Origin Vulture | Hardware status for [IMU, axdl, sonar_1, sonar_2, sonar_3, sonar_4, sonar_5, GPS, Barometer] | Relayed to: Advanced_Telemetry F/E, Command


    ////--Ping Emitters--////

    socket_l.on('vulture_ping_echo', payload => {
        var latency = Math.round((((Date.now() - vulture_ping_unix)) * 100) / 100);
        let vulture_connection_status;
        if (Math.abs(Date.now() - vulture_ping_unix) > 3000) {
            vulture_connection_status = false;
            io.to(`${payload.vid}`).emit('vulture_connection_vitals', { latency: latency, status: vulture_connection_status });
        }
        else {
            vulture_connection_status = true;
            io.to(`${payload.vid}`).emit('vulture_connection_vitals', { latency: latency, status: vulture_connection_status });
        }
    });//Vulture ⇄ this ⇄ Advanced_Telemetry F/E, Command | Computed Latency Emitter

    socket_l.on('vulture_connection_vitals_res', vulture_connection_vitals_res_payload => {
        io.to(`${vulture_connection_vitals_res_payload.vid}`).emit('vulture_connection_vitals_res', vulture_connection_vitals_res_payload);
    });

    setInterval(function () {
        socket_l.emit('vulture_ping');
        vulture_ping_unix = Date.now();
    }, 2000);//this ⇄ Vulture 


    ////--this ⇄ Vulture | User Input Relay to Vulture [demo]--////

    socket_l.on('fe_rth_status_rqst', () => {
        io.emit('be_rth_status_rqst');
    });

    setInterval(function () {
        socket_l.emit('input_pkg_local_relay_emitter', g_joystick_input_pkg);
    }, 50);

});
//----Global Relay ⇄ Vulture Coms----//

// app.disable('x-powered-by');

app.use(useragent.express());
app.use(express.urlencoded({ extended: false }));
app.use(cmp());

app.set('views', path.join(__dirname, 'dist/views'));


//----CSP | Cache Control----//
app.use((req, res, next) => {
    // res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' https://fonts.gstatic.com 'sha256-HKUd5PpYnXidtaGPY/HUnPf7XvJnSuJMqusXttreQC0=' 'sha256-z7zcnw/4WalZqx+PrNaRnoeLz/G9WXuFqV1WCJ129sg='; img-src 'self' data: https://cdn.maptiler.com; script-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://cdn.maptiler.com; style-src 'self' 'unsafe-hashes' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.maptiler.com 'sha256-HKUd5PpYnXidtaGPY/HUnPf7XvJnSuJMqusXttreQC0=' 'sha256-z7zcnw/4WalZqx+PrNaRnoeLz/G9WXuFqV1WCJ129sg='; frame-src 'self'; worker-src 'self' https://cdn.maptiler.com blob:; connect-src https://api.maptiler.com http://localhost:3300 ws://localhost:3300 https://vulture-uplink.com/ https://vulture-uplink.herokuapp.com/ wss://vulture-uplink.com/ wss://vulture-uplink.herokuapp.com/; object-src 'none';");
    res.setHeader('X-Frame-Options', "SAMEORIGIN");
    res.setHeader('X-Content-Type-Options', "nosniff");
    res.setHeader('X-powered-by', 'antimatter');
    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('Permissions-Policy', "autoplay=(self), camera=(), geolocation=(self), microphone=(), usb=(self), interest-cohort=()");
    next();
});



async function get_snapshot_from_path(path) {
    return get(ref(db, path));
}

if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy');
    app.use((req, res, next) => {
        req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
    });//HTTPS Auto-redirect // handled by cloudflare
}



//----Authentication [beta]----//

app.post('/logout', (req, res) => {
    get_snapshot_from_path(`adv_tele_aprvd_tids/${req.cookies.at.tid}`).then(snapshot => {
        const data = snapshot.val();
        if (data != null) {
            remove(ref(db, `adv_tele_aprvd_tids/${req.cookies.at.tid}`));
        }
    });
    res.clearCookie('at');
    res.clearCookie('sat');
    res.clearCookie('adv_tele_sio_ath');
    res.clearCookie('sio_ath');

    res.clearCookie('wid');
    res.clearCookie('eor');

    res.redirect('/login');
});


// UAC_v2.find({ username: 'raven' }).exec().then(r => {
//     let acc_auth_methods_arr = { TOTP: false, security_key: false, app: false, first: null };
//     let _acc_auth_methods_arr = { TOTP: false, security_key: false, app: true, first: 'app' };
//     UAC_v2.findOneAndUpdate({ username: 'raven' }, { acc_auth_methods_arr: acc_auth_methods_arr }, { upsert: true }, (err, doc) => { });
// })

const MFA_mobile_poll_rate_limiter = new limiter_src.RateLimiter({ tokensPerInterval: 675, interval: 'hour' });
app.post('/MFA_mobile_poll', (req, res) => {
    if (rate_limiter_checker(MFA_mobile_poll_rate_limiter, res)) {
        if (req.cookies.frstp_aprvd_tid != undefined) {
            get_snapshot_from_path(`frstp_aprvd_tids/${req.cookies.frstp_aprvd_tid.tid}`).then(snapshot => {
                const data = snapshot.val();
                if (data != null) {
                    try {
                        let agl = uap.parse(req.headers["user-agent"]);
                        let os = agl.os.family;
                        let os_version = agl.os.major;

                        var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                        let ipx = ip.split(',')[0];
                        if (!data.notification_sent) {
                            getipld(ipx).then(location => {
                                try {
                                    set(ref(db, `frstp_aprvd_tids/${req.cookies.frstp_aprvd_tid.tid}`), { notification_sent: true, state: data.state, tx: data.tx, acid: data.acid });
                                } catch (e) { }
                                io.to(`${data.acid}`).emit('login_req', { iso_code: location.country.iso_code, state: location.state.name, city: location.city.name, os: os, os_version: os_version, tx: Date.now(), tid: req.cookies.frstp_aprvd_tid.tid });
                            }).catch(e => {
                                try {
                                    set(ref(db, `frstp_aprvd_tids/${req.cookies.frstp_aprvd_tid.tid}`), { notification_sent: true, state: data.state, tx: data.tx, acid: data.acid });
                                } catch (e) { }
                                io.to(`${data.acid}`).emit('login_req', { iso_code: false, state: false, city: false, os: os, os_version: os_version, tx: Date.now(), tid: req.cookies.frstp_aprvd_tid.tid });
                            });
                        }

                        UAC_v2.find({ acid: req.cookies.frstp_aprvd_tid.acid }).then(r => {
                            if (r.length > 0) {
                                const user = r[0];
                                if (data.state == true) {
                                    remove(ref(db, `frstp_aprvd_tids/${req.cookies.frstp_aprvd_tid.tid}`));
                                    setTimeout(() => {
                                        let user_acc_auth_methods_arr = user.acc_auth_methods_arr;
                                        UAC_v2.findOneAndUpdate({ acid: req.cookies.frstp_aprvd_tid.acid }, { acc_auth_methods_arr: { TOTP: user_acc_auth_methods_arr.TOTP, security_key: user_acc_auth_methods_arr.security_key, app: true, email: user_acc_auth_methods_arr.email, first: user_acc_auth_methods_arr.first } }, { upsert: true }, (err, doc) => { });
                                        if (req.cookies.redirect_id == 0) {
                                            successful_auth_post(req, res, user, false);
                                        }
                                        if (req.cookies.redirect_id == 1) {
                                            successful_security_post(req, res, user, false);
                                        }
                                        res.clearCookie('frstp_aprvd_tid');
                                        res.json({ failure_id: 'none', res_tx: Date.now(), redirect_id: req.cookies.redirect_id, result: true });
                                        res.end();
                                    }, 100);
                                }
                                if (data.state == false) {
                                    remove(ref(db, `frstp_aprvd_tids/${req.cookies.frstp_aprvd_tid.tid}`));
                                    res.clearCookie('frstp_aprvd_tid');
                                    res.json({ failure_id: 'user_denied_req', res_tx: Date.now(), result: false });
                                    res.end();
                                }
                                if (Math.abs(Date.now() - data.tx) > 180000) {
                                    res.json({ failure_id: 'request_timeout', res_tx: Date.now(), result: false });
                                    io.to(`${data.acid}`).emit('login_req_timeout_sig');
                                    remove(ref(db, `frstp_aprvd_tids/${req.cookies.frstp_aprvd_tid.tid}`));
                                }
                                else {
                                    if (data.state != true && data.state != false) {
                                        res.end();
                                    }
                                }
                            }
                            else {
                                res.json({ failure_id: 'failed_acid_fetch', res_tx: Date.now(), result: false });
                            }
                        });

                    } catch (e) { res.json({ failure_id: 'cookie TID not in RTDB', res_tx: Date.now(), result: false }); }
                }
                else {
                    res.json({ failure_id: 'cookie TID not in RTDB [RTDB returned null]', res_tx: Date.now(), result: false });
                }
            });
        }
    }
});


function successful_auth_post(req, res, user, redirect) {
    const tid = `${uuid.v4()}${uuid.v4()}`;
    const token = jwt.sign({ acid: user.acid, tid: tid }, jwt_scrt, {
        algorithm: 'HS256',
        expiresIn: 21600,//6h ttl
    });

    const add_tid_to_rtdb = ref(db, `adv_tele_aprvd_tids/${tid}`);
    set(add_tid_to_rtdb, {
        tx: Date.now(),
        acid: user.acid,
        mobile: req.useragent.isMobile
    });
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    var at_expiry_date = new Date();
    at_expiry_date.setHours(at_expiry_date.getHours() + 6);

    if (process.env.NODE_ENV === 'production') {
        add_activity_log_tdb(req, ip, 'Advanced Telemetry login', req.body.user_identifier);
        res.cookie('at', { tac: token, tid: tid, exp: at_expiry_date }, { httpOnly: true, secure: true, expires: at_expiry_date });
        res.cookie('adv_tele_sio_ath', tid, { secure: true });
        res.cookie('wid', 'advanced_telemetry', { httpOnly: true, secure: true });
        res.cookie('acid', user.acid, { secure: true });
    }
    else {
        // add_activity_log_tdb(req, ip, 'Advanced Telemetry login', req.body.user_identifier);
        res.cookie('at', { tac: token, tid: tid, exp: at_expiry_date }, { httpOnly: true, expires: at_expiry_date });
        res.cookie('adv_tele_sio_ath', tid);
        res.cookie('wid', 'advanced_telemetry', { httpOnly: true });
        res.cookie('acid', user.acid, { secure: false });
    }
    res.clearCookie('redirect_id');
    setTimeout(() => {
        if (redirect) {
            res.redirect('advanced_telemetry');
        }
    }, 50);
}


app.post('/auth_post', json_parser, (req, res) => {
    UAC_v2.find({ $or: [{ email: req.body.user_identifier }, { username: req.body.user_identifier }] }).exec().then(usr => {
        if (usr.length > 0) {
            const user = usr[0];
            bcrypt.compare(req.body.password, user.password).then(rslt => {
                if (rslt) {
                    let tid = `${uuid.v4()}${uuid.v4()}`;
                    if (user.acc_auth_methods_arr.TOTP || user.acc_auth_methods_arr.security_key || user.acc_auth_methods_arr.app) {
                        MFA_prep_and_redirect(req, res, user, 0, tid);
                    }
                    else {
                        successful_auth_post(req, res, user, false);

                        setTimeout(() => {
                            res.json({ result: true, redirect_path: '/advanced_telemetry' });
                        }, 50);
                    }
                }
                else {
                    res.json({ result: false });
                }
            });
        }
        else {
            res.json({ result: false });
        }
    });
});

function gen_rc() {
    return `${uuid.v4().split('-')[0].toUpperCase()}-${uuid.v4().split('-')[3].toUpperCase()}`;
}

const doesUserExist_limiter = new limiter_src.RateLimiter({ tokensPerInterval: 4000, interval: 'hour' });
app.post('/doesUserExist', json_parser, (req, res) => {
    if (rate_limiter_checker(doesUserExist_limiter, res)) {
        UAC_v2.findOne({ username: req.body.username }).exec().then(query_res => {
            if (query_res) {
                res.json({ isUsernameTaken: true });
            }
            else {
                res.json({ isUsernameTaken: false });
            }
        });
    }
});

app.post('/opsec_to_adv_tele', (req, res) => {
    res.clearCookie('sat');
    res.clearCookie('sio_ath');
    res.redirect('advanced_telemetry');
});


// const dock_model = new RELAY_STATION_SCH({
//     relay_station_id: uuid.v4(),
//     dock_array: [{dock_id: '21f9a158-5953-48fc-a4f1-a9af2bf4d27d'}],
//     relay_station_name: 'RS-1',
//     activity_logs: [],
//     user_access_array: [{acid: '88d9e113-520b-45d0-9370-213dc2557a40'}]
// });
// dock_model.save();

// DOCK_SCH.findOneAndUpdate({dock_id: '536413de-9134-4c61-a859-1da3a12478f7'}, {payload_array: [{type: 'Thermal Camera', id: 'PY-2F'}, {type: 'Flood Lights', id: 'PY-1Z'}]}, {upsert: true}, (err, doc) => {});
// RELAY_STATION_SCH.findOneAndUpdate({relay_station_id: 'e2b67ec5-bea9-4251-a58d-cfefd75294fd'}, {dock_array: [{dock_id: '21f9a158-5953-48fc-a4f1-a9af2bf4d27d'}]}, {upsert: true}, (err, doc) => {});


app.post('/genesis_post', (req, res) => {
    async function add_udb() {
        try {
            var es = await bcrypt.hash(req.body.password, 10);
            var eq = encryptor.encrypt(req.body.email);
            let nvid = uuid.v4();
            let nacid = uuid.v4();
            let nvn = `VULTURE-${str.random(3).toUpperCase()}${getRandomInt(100, 999)}`;
            const uacq = new UAC_v2({
                username: req.body.username,
                email: req.body.email,
                password: es,
                vid: uuid.v4(),
                acid: nacid,
                did: [],
                secca: es,
                mfa_tkn: mfa_mgr.generateSecret({ length: 40 }),
                sec_auth_methods_arr: [true, false, false],//pass | mfa | security key
                sec_rcvry_methods_arr: [],
                acc_auth_methods_arr: [true, false, false],
                acc_rcvry_methods_arr: [],
                rcvry_codes_arr: [gen_rc(), gen_rc(), gen_rc(), gen_rc(), gen_rc(), gen_rc(), gen_rc(), gen_rc()],
                vow: [{ vid: nvid, vn: nvn }],
                dock_array: [],
                contact_emails_arr: [],
                contact_phone_numbers_arr: [],
            });
            uacq.save().then((r) => console.log(`${r.vid} added to DeepStorage`))
            console.log(`${uuid.v4()} saved to UAC`);

            const vulture_sch = new VULTURE_SCH({
                vid: nvid,
                vn: nvn,
                u_access_arr: gen_admin_u_access_array(nacid, 0),
                local_prefs_arr: [],
                security_rules_arr: [],
                flt_logs: [],
            });

            vulture_sch.save().then(r => { });

        } catch (e) {
            res.redirect('genesis');
        }
        res.redirect('/login');
    }
    add_udb();
});


//----Cookies----//
// app.use(session({secret: 'wowi', cookie: {maxAge: 30000000}}));


//----Authentication [beta]----//

function auth_status(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('login');
}

//----App Routes----//
const cic_limiter = new limiter_src.RateLimiter({ tokensPerInterval: 300, interval: 'hour' });
app.get('/', (req, res) => {
    if (rate_limiter_checker(cic_limiter, res)) {
        console.log(`[00][CIC] | ${Math.round(cic_limiter.getTokensRemaining())} tokens remaining | Status Code [${res.statusCode}]`);
        if (req.useragent.isDesktop) {
            // res.render('cic.ejs');
            res.sendFile(path.join(__dirname, 'dist/index.html'));

        }
        if (req.useragent.isMobile) {
            // res.render('cic_m.ejs');
            res.sendFile(path.join(__dirname, 'dist/index.html'));
        }
    }
});

function rate_limiter_checker(rate_limiter, res) {
    rate_limiter.removeTokens(1);
    if (rate_limiter.getTokensRemaining() < 1) {
        res.writeHead(429, { 'Content-Type': 'text/plain;charset=UTF-8' });
        res.end('429 Too Many Requests');
        console.log(`No tokens remaining. Rate limiting in effect`);
    }
    else {
        return true;
    }
}

const auth_limiter = new limiter_src.RateLimiter({ tokensPerInterval: 50, interval: 'hour' });
app.get('/login', (req, res) => {
    if (rate_limiter_checker(auth_limiter, res)) {
        let rvpx = false;
        if (req.cookies.at != undefined) {
            get_snapshot_from_path(`adv_tele_aprvd_tids/${req.cookies.at.tid}`).then(snapshot => {
                const data = snapshot.val();
                if (data != null) {
                    const verf = req.cookies.at.tac;
                    console.log(`[02][Adv_tele] | ${Math.round(adv_tele_limiter.getTokensRemaining())} tokens remaining | Status Code [${res.statusCode}]`);
                    let decoded_jwt;
                    try {
                        decoded_jwt = jwt.verify(verf, jwt_scrt);
                        if (decoded_jwt.tid == req.cookies.at.tid && decoded_jwt.un == data.un) {
                            rvpx = true;
                        }
                        else {
                            res.sendFile(path.join(__dirname, 'dist/index.html'));
                        }
                    }
                    catch {
                        res.clearCookie('frstp_aprvd_tid');
                        res.sendFile(path.join(__dirname, 'dist/index.html'));
                        rvpx = false;
                    }
                    if (rvpx) {
                        res.clearCookie('frstp_aprvd_tid');
                        res.redirect('/advanced_telemetry');
                    }
                }
                else {
                    clear_all_session_cookies(res);
                    res.clearCookie('frstp_aprvd_tid');
                    res.sendFile(path.join(__dirname, 'dist/index.html'));
                }
            });
        }
        else {
            res.clearCookie('frstp_aprvd_tid');
            res.sendFile(path.join(__dirname, 'dist/index.html'));
        }
    }
});

const MFA_TOTP_rate_limiter = new limiter_src.RateLimiter({ tokensPerInterval: 30, interval: 'hour' });
app.get('/MFA_TOTP', (req, res) => {
    if (rate_limiter_checker(MFA_TOTP_rate_limiter, res)) {
        if (process.env.NODE_ENV === 'production') {
            MFA_conditional_renderer(req, res);
        }
        else {
            if (req.cookies.frstp_aprvd_tid != undefined) {
                res.sendFile(path.join(__dirname, 'dist/index.html'));
            }
            else {
                if (req.cookies.wid != undefined) {
                    res.redirect(`/${req.cookies.wid}`);
                }
                else {
                    res.redirect('login');
                }
            }
        }
    }
});


function MFA_conditional_renderer(req, res) {
    if (req.cookies.frstp_aprvd_tid != undefined) {
        get_snapshot_from_path(`frstp_aprvd_tids/${req.cookies.frstp_aprvd_tid.tid}`).then(snapshot => {
            const data = snapshot.val();
            if (data != null) {
                res.sendFile(path.join(__dirname, 'dist/index.html'));
            }
        });
    }
    else {
        if (req.cookies.wid != undefined) {
            res.redirect(`/${req.cookies.wid}`);
        }
        else {
            res.redirect('login');
        }
    }
}

const MFA_app_rate_limiter = new limiter_src.RateLimiter({ tokensPerInterval: 30, interval: 'hour' });
app.get('/MFA_app', (req, res) => {
    if (rate_limiter_checker(MFA_app_rate_limiter, res)) {
        if (process.env.NODE_ENV === 'production') {
            MFA_conditional_renderer(req, res);
        }
        else {
            if (req.cookies.frstp_aprvd_tid != undefined) {
                res.sendFile(path.join(__dirname, 'dist/index.html'));
            }
            else {
                if (req.cookies.wid != undefined) {
                    res.redirect(`/${req.cookies.wid}`);
                }
                else {
                    res.redirect('login');
                }
            }
        }
    }
});

const getipld = async (ip) => {
    try {
        const iceit = await axios.get(`https://api.geoapify.com/v1/ipinfo?ip=${ip}&apiKey=b6590d4c81774ea0a1e7547a3509acb9`);
        return data = iceit.data;
    }
    catch (e) {
        console.log(e);
    }
}

const get_rt_weather = async (long, lat) => {
    try {
        const wapi_req = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${secrets.WAPI}&q=${long},${lat}`);
        return wapi_req.data;
    } catch (e) {
        console.log(e);
    }
}
// get_rt_weather(0, 0).then(r => console.log(r.current.condition.text));


// app.get(`/security/:vid`, (req, res) => {
//     // opsec_check_ua(req, res, 'security.ejs', 'security_m.ejs', 'security_auth');
//     // res.render('security.ejs')
//     res.cookie = {req_vulture: req.params.vid}; 
//     res.redirect('/security')
// });

const security_limiter = new limiter_src.RateLimiter({ tokensPerInterval: 300, interval: 'hour' });
app.get('/security', (req, res) => {
    if (rate_limiter_checker(security_limiter, res)) {
        opsec_check_ua(req, res, 'security.ejs', 'security_m.ejs', 'security_auth');
    }
});

const adv_tele_limiter = new limiter_src.RateLimiter({ tokensPerInterval: 300, interval: 'hour' });

function clear_all_session_cookies(res) {
    res.clearCookie('at');
    res.clearCookie('sat');
    res.clearCookie('adv_tele_sio_ath');
    res.clearCookie('sio_ath');
    res.clearCookie('wid');
    res.clearCookie('eor');
}

function check_ua(req, res, red_d, red_m) {
    try {
        if (req.cookies.at != undefined && req.cookies.adv_tele_sio_ath != undefined) {
            let rvpx = false;
            get_snapshot_from_path(`adv_tele_aprvd_tids/${req.cookies.at.tid}`).then(snapshot => {
                const data = snapshot.val();
                if (data != null) {
                    const verf = req.cookies.at.tac;
                    console.log(`[02][Adv_tele] | ${Math.round(adv_tele_limiter.getTokensRemaining())} tokens remaining | Status Code [${res.statusCode}]`);
                    let decoded_jwt;
                    try {
                        decoded_jwt = jwt.verify(verf, jwt_scrt);
                        if (decoded_jwt.tid == req.cookies.at.tid && decoded_jwt.acid == data.acid) {
                            rvpx = true;
                        }
                        else {
                            res.redirect('login');
                        }
                    }
                    catch {
                        res.redirect('login');
                        rvpx = false;
                    }

                    if (rvpx) {
                        let ntid = `${uuid.v4()}${uuid.v4()}`;

                        const new_token = jwt.sign({ acid: decoded_jwt.acid, tid: ntid }, jwt_scrt, {
                            algorithm: 'HS256',
                            expiresIn: 21600,//6h TTL 
                        });

                        const add_tid_to_rtdb = ref(db, `adv_tele_aprvd_tids/${ntid}`);
                        set(add_tid_to_rtdb, {
                            tx: data.tx,
                            acid: decoded_jwt.acid,
                            mobile: req.useragent.isMobile
                        });
                        remove(ref(db, `adv_tele_aprvd_tids/${req.cookies.at.tid}`));

                        if (process.env.NODE_ENV === 'production') {
                            res.cookie('at', { tac: new_token, tid: ntid, exp: req.cookies.at.exp }, { httpOnly: true, secure: true });
                            res.cookie('adv_tele_sio_ath', ntid, { secure: true });
                            res.cookie('wid', 'advanced_telemetry', { httpOnly: true, secure: true });
                        } else {
                            res.cookie('at', { tac: new_token, tid: ntid, exp: req.cookies.at.exp }, { httpOnly: true });
                            res.cookie('adv_tele_sio_ath', ntid);
                            res.cookie('wid', 'advanced_telemetry', { httpOnly: true, secure: false });
                        }
                        if (req.useragent.isDesktop) {
                            res.sendFile(path.join(__dirname, 'dist/index.html'));
                        }
                        if (req.useragent.isMobile) {
                            res.sendFile(path.join(__dirname, 'dist/index.html'));
                        }
                    }
                    else {
                        // res.redirect('login');
                    }
                }
                else {
                    clear_all_session_cookies(res);
                    res.redirect('login');
                }
            });
        }
        else {
            clear_all_session_cookies(res);
            res.redirect('login');
        }
    }
    catch
    {
        clear_all_session_cookies(res);
        res.redirect('login');
    }
}


function check_security_auth(req, res, data) {
    if (data[req.cookies.sio_ath] != undefined) {
        if (req.cookies.sat != undefined && req.cookies.at != undefined) {
            const verf = req.cookies.sat.tac;
            console.log(`[03][Security] | ${Math.round(adv_tele_limiter.getTokensRemaining())} tokens remaining | Status Code [${res.statusCode}]`);
            try {
                jwt.verify(verf, jwt_scrt);
                return true;
            }
            catch {
                return false;
            }
        }
        else {
            return false;
        }

    }
    else {
        return false;
    }
}

function opsec_check_ua(req, res, red_d, red_m, fred) {
    try {
        get_snapshot_from_path(`aprvd_tids/${req.cookies.sat.tid}`).then(snapshot => {
            let data = snapshot.val();
            if (data != null) {//makes sure the firebase realtime db is not empty
                let jvs = false;
                if (req.cookies.sat != undefined && req.cookies.at != undefined) {//verifies the session cookies exist
                    const verf = req.cookies.sat.tac;
                    console.log(`[03][Security] | ${Math.round(adv_tele_limiter.getTokensRemaining())} tokens remaining | Status Code [${res.statusCode}]`);
                    let decoded_jwt;
                    try {
                        decoded_jwt = jwt.verify(verf, jwt_scrt);//validates the session JWT 
                        if (decoded_jwt.tid == req.cookies.sat.tid && decoded_jwt.acid == data.acid) {
                            jvs = true;
                        }
                        else {
                            res.redirect(fred);
                        }
                    }
                    catch {
                        res.redirect(fred);
                        jvs = false;
                    }

                    if (jvs) {// checks the validation of the session JWT

                        let ntid = `${uuid.v4()}${uuid.v4()}`;//generates the new security token id

                        const new_token = jwt.sign({ acid: decoded_jwt.acid, tid: ntid }, jwt_scrt, {
                            algorithm: 'HS256',
                            expiresIn: 14400,
                        });

                        const add_tid_to_rtdb = ref(db, `aprvd_tids/${ntid}`);
                        //adds the new security session token id to the rt db 
                        set(add_tid_to_rtdb, {
                            tx: Date.now(),
                            acid: decoded_jwt.acid
                        });

                        remove(ref(db, `aprvd_tids/${req.cookies.sat.tid}`));

                        if (process.env.NODE_ENV === 'production') {//sets the new security token id to the response 'tid' cookie
                            res.cookie('sat', { tac: new_token, tid: ntid }, { httpOnly: true, secure: true });
                            res.cookie('sio_ath', ntid, { secure: true });//sets the socket transport cookie to the new security token id
                            res.cookie('wid', 'security', { httpOnly: true, secure: true });
                        }
                        else {
                            res.cookie('sat', { tac: new_token, tid: ntid }, { httpOnly: true });
                            res.cookie('sio_ath', ntid);//sets the socket transport cookie to the new security token id
                            res.cookie('wid', 'security', { httpOnly: true, secure: false });
                        }
                        res.clearCookie('t_sec');//used to make sure the user passed the first step of auth
                        if (req.useragent.isDesktop) {
                            res.sendFile(path.join(__dirname, 'dist/index.html'));
                        }
                        if (req.useragent.isMobile) {
                            res.sendFile(path.join(__dirname, 'dist/index.html'));
                        }
                    }
                }
                else {
                    res.redirect(fred);
                }
            } else {
                res.redirect(fred);
            }
        });
    }
    catch
    {
        res.redirect(fred);
    }
}

function successful_security_post(req, res, user, redirect) {
    const un = user.username;
    const tid = `${uuid.v4()}${uuid.v4()}`;
    const token = jwt.sign({ acid: user.acid, tid: tid }, jwt_scrt, {
        algorithm: 'HS256',
        expiresIn: 14400,
    });

    const add_tid_to_rtdb = ref(db, `aprvd_tids/${tid}`);
    set(add_tid_to_rtdb, {
        tx: Date.now(),
        acid: user.acid
    });
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (process.env.NODE_ENV === 'production') {
        add_activity_log_tdb(req, ip, 'Security login', req.body.user_identifier);
        res.cookie('sat', { tac: token, tid: tid }, { httpOnly: true, secure: true });
        res.cookie('sio_ath', tid, { secure: true });
        res.cookie('wid', 'security', { httpOnly: true, secure: true });
    }
    else {
        // add_activity_log_tdb(req, ip, 'Security login', req.body.user_identifier);
        res.cookie('sat', { tac: token, tid: tid }, { httpOnly: true });
        res.cookie('sio_ath', tid);
        res.cookie('wid', 'security', { httpOnly: true, secure: false });
    }
    res.clearCookie('redirect_id');
    if (redirect) {
        res.redirect('security');
    }
}

app.post('/MFA_mobile_cr', (req, res) => {
    get_snapshot_from_path(`aprvd_tids/${req.cookies.sat.tid}`).then(snapshot => {
        const data = snapshot.val();
        if (data != null) {
            UAC_v2.find({ username: data.un }).exec().then(r => {
                if (r.length > 0) {
                    const user = r[0];
                    const tid = `${uuid.v4()}${uuid.v4()}`;
                    set(ref(db, `frstp_aprvd_tids/${tid}`), { notification_sent: false, state: 'pending', tx: Date.now(), acid: user.acid });
                    if (process.env.NODE_ENV === 'production') {
                        res.cookie('frstp_aprvd_tid', { tid: tid, un: user.username, acid: user.acid }, { secure: true, httpOnly: true });
                    } else {
                        res.cookie('frstp_aprvd_tid', { tid: tid, un: user.username, acid: user.acid }, { secure: false, httpOnly: true });
                    }
                    res.end();
                }
            });
        }
    });
});

function redirect_id_assessment_fn(req, res, user) {
    ///-- Retrieve Vulture Array Status --///
    let vow_status = [];
    let delta = Date.now();
    get(ref(db, 'active_vultures/')).then(active_vultures_snapshot => {
        let vow = user.vow;
        const data = active_vultures_snapshot.val();
        if (data != null) {
            for (let ix = 0; ix < vow.length; ix++) {
                if (data[vow[ix].vid] == undefined) {
                    vow_status.push({ vid: vow[ix].vid, vn: vow[ix].vn, status: 'ready' });
                }
                else {
                    vow_status.push({ vid: vow[ix].vid, vn: vow[ix].vn, status: 'active' });
                }
            }
        }
        else {
            for (let ix = 0; ix < vow.length; ix++) {
                vow_status[ix] = { vid: vow[ix].vid, vn: vow[ix].vn, status: 'ready' };
            }
        }
    });
    //[][][][][][][][][]

    if (req.cookies.redirect_id == 0) {
        res.clearCookie('redirect_id');
        res.clearCookie('frstp_aprvd_tid');
        successful_auth_post(req, res, user, false);
        console.log(Math.abs(Date.now() - delta));

        setTimeout(() => {
            res.json({ response: true, target_path: '/advanced_telemetry', vulture_array_status: vow_status })
        }, 100);
    }
    if (req.cookies.redirect_id == 1) {
        res.clearCookie('redirect_id');
        res.clearCookie('frstp_aprvd_tid');
        successful_security_post(req, res, user, false);
        res.json({ response: true, target_path: '/security', vulture_array_status: vow_status });

    }
}

app.post('/MFA_TOTP_post', json_parser, (req, res) => {
    UAC_v2.find({ $or: [{ email: req.cookies.eor }, { username: req.cookies.eor }] }).exec().then(usr => {
        const user = usr[0];
        if (usr.length > 0) {
            var verified = mfa_mgr.totp.verify({
                secret: user.mfa_tkn.base32,
                encoding: 'base32',
                token: req.body.token,
                window: 6,
            });
            if (verified) {
                redirect_id_assessment_fn(req, res, user);
            }
            else {

                if (user.rcvry_codes_arr.find(elm => elm == req.body.backup_code) != undefined) {//verifying backup code
                    let md_arr = user.rcvry_codes_arr;
                    let ixn = md_arr.indexOf(req.body.backup_code);
                    md_arr[ixn] = "CODE ALREADY USED";
                    UAC_v2.findOneAndUpdate({ $or: [{ email: req.cookies.eor }, { username: req.cookies.eor }] }, { rcvry_codes_arr: md_arr }, { upsert: true }, (err, doc) => { });//inavlidate backup code

                    redirect_id_assessment_fn(req, res, user);
                }
                else {
                    res.json({ response: false });
                }
            }
        }
        else {
            res.json({ response: false });
        }
    });
});

function MFA_prep_and_redirect(req, res, user, redirect_id, tid) {
    set(ref(db, `frstp_aprvd_tids/${tid}`), { notification_sent: false, state: 'pending', tx: Date.now(), acid: user.acid });
    if (process.env.NODE_ENV === 'production') {
        res.cookie('eor', req.body.user_identifier, { httpOnly: false, secure: true });
        res.cookie('frstp_aprvd_tid', { tid: tid, un: user.username, acid: user.acid }, { secure: true, httpOnly: true });
        res.cookie('redirect_id', redirect_id, { secure: true, httpOnly: false });
    }
    else {
        res.cookie('eor', req.body.user_identifier, { httpOnly: false, secure: false });
        res.cookie('frstp_aprvd_tid', { tid: tid, un: user.username, acid: user.acid }, { secure: false, httpOnly: true });
        res.cookie('redirect_id', redirect_id, { secure: false, httpOnly: false });
    }

    res.json({ result: true, redirect_path: `/MFA_${user.acc_auth_methods_arr.first}` });
}

app.post('/security_post', (req, res) => {
    UAC_v2.find({ email: req.body.user_identifier }).exec().then(usr => {
        if (usr.length > 0) {
            const user = usr[0];
            bcrypt.compare(req.body.pass, user.password).then(rslt => {
                if (rslt) {
                    const un = user.username;
                    const tid = `${uuid.v4()}${uuid.v4()}`;
                    if (user.acc_auth_methods_arr.TOTP || user.acc_auth_methods_arr.app || user.acc_auth_methods_arr.security_key || user.acc_auth_methods_arr.email) {
                        MFA_prep_and_redirect(req, res, user, 1, tid);
                    } else {
                        successful_security_post(req, res, user, true);
                    }
                }
                else {
                    res.redirect('security_auth#00');
                }
            });
        }
        else {
            res.redirect('security_auth#00');
        }
    });
});


app.get('/advanced_telemetry', (req, res) => {
    if (rate_limiter_checker(adv_tele_limiter, res)) {
        check_ua(req, res, 'adv_tele.ejs', 'adv_tele_m.ejs');
    }
});

// const auth_ckr_limiter = new limiter_src.RateLimiter({ tokensPerInterval: 50, interval: 'hour' });
// app.get('/auth_checker', (req, res) => {
//     auth_ckr_limiter.removeTokens(1);
//     if (auth_ckr_limiter.getTokensRemaining() < 1) {
//         res.writeHead(429, { 'Content-Type': 'text/plain;charset=UTF-8' });
//         res.end('429 Too Many Requests');
//         console.log(`No tokens remaining. Rate limiting in effect [${res.statusCode}]`);
//     }
//     else {
//         console.log(`[05][Auth_checker] | ${Math.round(auth_ckr_limiter.getTokensRemaining())} tokens remaining | Status Code [${res.statusCode}]`);
//         res.render('auth_checker.ejs');
//     }
// });


const rklmst = '$2b$10$pvdEFcllCjo72JU2Yg.JdOImKRykze3SARsutrnoCz6Rm2Yulhlru';


const security_auth_limiter = new limiter_src.RateLimiter({ tokensPerInterval: 30, interval: 'hour' });
app.get('/security_auth', (req, res) => {
    if (rate_limiter_checker(security_auth_limiter, res)) {
        console.log(`[03][Security] | ${security_auth_limiter.getTokensRemaining()} tokens remaining | Status Code [${res.statusCode}]`);
        check_ua(req, res, 'security_auth.ejs', 'security_auth.ejs');
    }
});

app.get('/fwd_cam_broadcaster', (req, res) => {
    // res.render('fwd_cam_broadcaster.ejs');
});

app.get('/gnd_cam_broadcaster', (req, res) => {
    // res.render('gnd_cam_broadcaster.ejs');
});

function socket_transport_authenticator(payload, snapshot) {
    const data = snapshot.val();
    if (data != null) {
        return true;
    }
    else {
        return false;
    }
}

const genesis_limiter = new limiter_src.RateLimiter({ tokensPerInterval: 20, interval: 'hour' });
app.get('/genesis', (req, res) => {
    if (rate_limiter_checker(genesis_limiter, res)) {
        if (req.cookies.at != undefined && req.cookies.adv_tele_sio_ath != undefined) {
            res.redirect('/advanced_telemetry');
        } else {
            console.log(`[01][Genesis] | ${Math.round(genesis_limiter.getTokensRemaining())} tokens remaining | Status Code [${res.statusCode}]`);
            res.sendFile(path.join(__dirname, 'dist/index.html'));
        }
    }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.use(function (req, res) {
    cache_files_pth_arr = ['js/advanced_tele_parser_m.js', 'socket.io/socket.io.js', 'style/pg_style_m.css', 'visual_assets/h_mobile_bkg_v1.2.png', 'visual_assets/m_sonar_array_mask_v1.2.svg', 'manifest.json'];
    if (cache_files_pth_arr.find(path => path == req.url) == undefined) {
        try { res.redirect('/') } catch { e => console.log('yeah this isnt working') }
    }
});

var srw_sid_ary = [];
var acnt_link_ary = [];

var acid_sid_link_ary = [];

let sec_aprvd_un_arr = [];
let sec_aprvd_sid_arr = [];
let sec_aprvd_kx_arr = [];


// setInterval(() => {
//     // console.log(`${sec_aprvd_kx_arr} | ${sec_aprvd_sid_arr} | ${sec_aprvd_un_arr}`)
// }, 2000);

//----Global Relay ⇄ F/E link----//
io.on('connection', socket => {
    console.log(`Relay Online | ${Date.now()}`);
    // if (process.env.DEMO != undefined){
    //    console.log(`it worked | ${process.env.DEMO} | ${Date.now()}`)
    // }

    socket.on('adv_tele_uleave', id_payload => {
        // UAC_v2.find({ email: id_payload.un }).exec().then(rud => socket.to(`${rud[0].vid}`).emit('lgo_signal'));
    });

    console.log(`Connection detected | SIDx [${socket.id}]`);
    ////--Data flow routing demo [In-progress]--////


    ///-- Vulture Ping --///
    socket.on('req_vulture_connection_vitals', req_vulture_connection_vitals_payload => {
        get_snapshot_from_path(`adv_tele_aprvd_tids/${req_vulture_connection_vitals_payload.ath}`).then(snapshot => {
            if (snapshot.val() != null) {
                io.to(`${req_vulture_connection_vitals_payload.vid}`).emit('req_vulture_connection_vitals');
            }
        });
    });

    var mx_acid;
    ///-TLP-///
    var tlp_req_relay_unx = 0;
    socket.on('tlp_request_gen', (tlp_req_payload) => {
        console.log(`Trusted Launch Platform Demo | GENSID: ${socket.id} | Time: ${tlp_req_payload.time} UNX`);
        for (var x = 0; x < acid_sid_link_ary.length; x++) {
            if (acid_sid_link_ary[x].sid_arr == socket.id) {
                mx_acid = acid_sid_link_ary[x].acid;
                console.log(`${mx_acid} mx`)
                // console.log(`M@IX: ${x} | M@SIDX: ${acid_sid_link_ary[x].acid}`);
            }
        }
        for (var x = 0; x < acid_sid_link_ary.length; x++) {
            if (acid_sid_link_ary[x].acid == mx_acid) {
                console.log(`Trusted Launch Platform Notify SID: [${acid_sid_link_ary[x].sid_arr}]`)

                // socket.to(`${acid_sid_link_ary[x].sid_arr}`).emit('tlp_notify_signal');
                // socket.to(socket.id).emit('tlp_notify_signal');

                // console.log(`M@IX: ${x} | M@SIDX: ${acid_sid_link_ary[x].acid}`);
            }
        }
        io.emit('tlp_notify_signal', tlp_req_payload);
        tlp_req_relay_unx = Date.now();
    });

    setInterval(() => {
        if (tlp_req_relay_unx != 0) {
            if (Math.abs(tlp_req_relay_unx - Date.now()) > 5000) {
                console.log('TLP Timeout | Takeoff rejected');
                io.emit('tlp_status_update', -1);
                tlp_req_relay_unx = 0;
            }
        }
    }, 200);


    socket.on('new_target_vid', new_target_vid_payload => {
        get_snapshot_from_path(`adv_tele_aprvd_tids/${new_target_vid_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(new_target_vid_payload, snapshot)) {
                socket.leave(`${new_target_vid_payload.pvid}`);
                socket.join(`${new_target_vid_payload.vid}`);
            }
        });
    });

    //--TLP--// tlp
    socket.on('tlp_user_response', (ur) => {
        if (ur != undefined) {
            if (ur) {
                io.emit('tlp_status_update', 1);
                console.log('Take off approved by [' + `${socket.id}` + ']')
            }
            else {
                io.emit('tlp_status_update', 0);
                console.log('Take off denied by [' + `${socket.id}` + ']')
            }
        }
        else {
            console.log('TLP Timeout | Takeoff rejected');
            io.emit('tlp_status_update', -1);
        }
    });

    socket.on('add_socket_to_acid_room', id_payload => {
        UAC_v2.find({ acid: id_payload.acid }).exec().then(function (rud) {
            try {
                data_transit_vulture_req_arr.push(rud[0].vid);
                socket.join(`${rud[0].vow[0].vid}`);
                socket.join(rud[0].acid);
            } catch (e) { console.log(`[${e.message}] [LOGIN CATCH]`) }
        })

        UAC_v2.find({ acid: id_payload.acid }).exec().then((rud) => { try { io.to(socket.id).emit('un', { un: rud[0].username, vow: rud[0].vow }) } catch (e) { console.log(`[${e.message}] [LOGIN CATCH]`) } })//
    });

    socket.on('disconnect', () => {
        // const ixrl = sec_aprvd_sid_arr.indexOf(socket.id);
        // sec_aprvd_sid_arr.splice(ixrl, 1);
        // sec_aprvd_un_arr.splice(ixrl, 1);
        // sec_aprvd_kx_arr.splice(ixrl, 1);
        rem_ebv(sec_aprvd_sid_arr, data_transit_sid_arr, data_transit_vulture_req_arr, data_transit_un_arr, socket.id);
    });

    // setInterval(() => {
    //    acnt_link_ary.find((acntq, ix) => {
    //       if(acntq == acnt_id){
    //          socket.to(srw_sid_ary[ix]).emit('trgt_data_pkg', `${acnt_link_ary[0]} | ${Date.now()}`);
    //          //console.log(`mathc ${acnt_id}`);
    //       }
    //    });
    // }, 1000);

    socket.on('srv_hsc', (skt_id_) => {
        srw_sid_ary.push(skt_id_[0]);
        acnt_link_ary.push(skt_id_[1]);
    });

    var sid = socket.client.id;
    socket.emit('onenter', { sid, command_sid_arr });
    socket.on('disconnect', () => {
        for (let y = 0; y < adv_tele_sid_arr.length; y++) {
            if (adv_tele_sid_arr[y] == socket.client.id) {
                adv_tele_sid_arr.splice(y, 1);
            }
        }
        for (let k = 0; k < command_sid_arr.length; k++) {
            if (command_sid_arr[k] == socket.client.id) {
                command_sid_arr.splice(k, 1);
            }
        }
        //   console.log(command_sid_arr);  
        io.emit('users_connected_arr', command_sid_arr);
    });

    socket.on('uj_adv_tele', uid => {
        if (adv_tele_uid_arr.includes(uid) == false) {
            adv_tele_uid_arr.push(uid, socket.client.id);
        }
        if (adv_tele_sid_arr.includes(socket.client.id) == false) {
            adv_tele_sid_arr.push(socket.client.id);
        }
        //   console.log(adv_tele_sid_arr);
    });

    socket.on('uj_command', () => {
        if (command_sid_arr.includes(socket.client.id) == false) {
            command_sid_arr.push(socket.client.id);
        }
        // console.log(`${command_sid_arr} cmd`);
        io.emit('users_connected_arr', command_sid_arr);
    });


    /// Password reset ///

    socket.on('reset_pass_req', reset_pass_req_payload => {
        UAC_v2.find({ email: reset_pass_req_payload.email }).exec().then(r => {
            if (r.length > 0) {
                const user = r[0];
                const vc = getCryptoRandomInt(100000, 999999);
                const add_vc_to_rtdb = ref(db, `password_reset/${vc}/`);
                set(add_vc_to_rtdb, { vc: vc, tx: Date.now(), email: reset_pass_req_payload.email });
                const msg = {
                    to: reset_pass_req_payload.email,
                    from: 'raven@vulture-uplink.com',
                    subject: '[AURORA] Password Reset',
                    text: `Use the code ${vc} to continue the reset password process`,
                }
                try {
                    sendgrid.send(msg).then().catch(e => console.log(e));
                }
                catch (e) { }
            }
        });
    });

    socket.on('reset_pass_code_verification_req', reset_pass_code_verification_req_payload => {
        get_snapshot_from_path(`password_reset/${reset_pass_code_verification_req_payload.vc}`).then(snapshot => {
            const data = snapshot.val();
            if (data != null) {
                if (data.email == reset_pass_code_verification_req_payload.email) {
                    remove(ref(db, `password_reset/${reset_pass_code_verification_req_payload.vc}`));
                    const pass_reset_token = `${uuid.v4()}${uuid.v4()}`;
                    const add_pass_reset_token_to_rtdb = ref(db, `password_reset_tokens/${pass_reset_token}`);
                    set(add_pass_reset_token_to_rtdb, {
                        tx: Date.now()
                    });
                    io.to(socket.id).emit('reset_pass_code_verification_res', { res: true, prt: pass_reset_token });
                }
                else {
                    io.to(socket.id).emit('reset_pass_code_verification_res', { res: false });
                }
            }
            else {
                io.to(socket.id).emit('reset_pass_code_verification_res', { res: false });
            }
        });
    });

    socket.on('login_res', login_res_payload => {
        if (login_res_payload.tid != undefined) {
            get_snapshot_from_path(`frstp_aprvd_tids/${login_res_payload.tid}`).then(snapshot => {
                const data = snapshot.val();
                if (data != null) {
                    if (login_res_payload.user_response) {
                        set(ref(db, `frstp_aprvd_tids/${login_res_payload.tid}`), { tid: login_res_payload.tid, acid: login_res_payload.acid, state: true });
                    }
                    else {
                        set(ref(db, `frstp_aprvd_tids/${login_res_payload.tid}`), { tid: login_res_payload.tid, acid: login_res_payload.acid, state: false });
                    }
                }
            });
        }
    });

    socket.on('reset_pass', reset_pass_payload => {
        try {
            get_snapshot_from_path(`password_reset_tokens/${reset_pass_payload.reset_pass_token}`).then(snapshot => {
                const data = snapshot.val();
                if (data != null) {
                    if (Math.abs(Date.now() - data.tx) < 600000) {
                        remove(ref(db, `password_reset_tokens/${reset_pass_payload.reset_pass_token}`));
                        UAC_v2.find({ email: reset_pass_payload.email }).exec().then(r => {
                            if (r.length > 0) {
                                bcrypt.hash(reset_pass_payload.ax, 10).then(hash => {
                                    UAC_v2.findOneAndUpdate({ email: reset_pass_payload.email }, { password: hash }, { upsert: true }, (err, doc) => {
                                        if (err == null) {
                                            io.to(socket.id).emit('reset_pass_res', true);
                                        }
                                    });

                                });
                            }
                        });
                    }
                }
            });
        } catch (e) {
            io.to(socket.id).emit('reset_pass_res', false);
        }
    });

    ////--Security Auth--////[sec]

    socket.on('req_default_MFA_method_change', req_default_MFA_method_change_payload => {
        get_snapshot_from_path(`aprvd_tids/${req_default_MFA_method_change_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(req_default_MFA_method_change_payload, snapshot)) {
                UAC_v2.find({ acid: req_default_MFA_method_change_payload.acid }).exec().then(r => {
                    if (r.length > 0) {
                        const user = r[0];
                        let user_acc_auth_methods_arr = user.acc_auth_methods_arr;
                        for (elm in user.acc_auth_methods_arr) {
                            if (elm == req_default_MFA_method_change_payload.first) {
                                if (user_acc_auth_methods_arr[elm]) {
                                    if (req_default_MFA_method_change_payload.first == 'TOTP' || req_default_MFA_method_change_payload.first == 'security_key' || req_default_MFA_method_change_payload.first == 'app' || req_default_MFA_method_change_payload.first == 'email') {
                                        UAC_v2.findOneAndUpdate({ acid: req_default_MFA_method_change_payload.acid }, { acc_auth_methods_arr: { TOTP: user.acc_auth_methods_arr.TOTP, security_key: user.acc_auth_methods_arr.security_key, app: user.acc_auth_methods_arr.app, email: user.acc_auth_methods_arr.email, first: req_default_MFA_method_change_payload.first } }, { upsert: true }, (err, doc) => { })
                                        io.to(socket.id).emit('default_MFA_method_change_sig');
                                    }
                                }
                            }
                        }
                    }
                });
            }
            else {
                io.to(socket.id).emit('sio_transport_auth_failed_sig');
            }
        });
    });

    socket.on('req_opsec_account_pass_comp', req_opsec_account_pass_comp_payload => {
        get_snapshot_from_path(`adv_tele_aprvd_tids/${req_opsec_account_pass_comp_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(req_opsec_account_pass_comp_payload, snapshot)) {
                UAC_v2.find({ email: req_opsec_account_pass_comp_payload.email }).exec().then(r => {
                    if (r.length > 0) {
                        const user = r[0];
                        if (user.password == user.secca) {
                            io.to(socket.id).emit('opsec_account_pass_comp_res', { res: true });
                        }
                        else {
                            io.to(socket.id).emit('opsec_account_pass_comp_res', { res: false });
                        }
                    }
                });
            }
        });
    });

    socket.on('req_am_rcvry_methods_status', req_am_rcvry_methods_status_payload => {
        get_snapshot_from_path(`aprvd_tids/${req_am_rcvry_methods_status_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(req_am_rcvry_methods_status_payload, snapshot)) {
                UAC_v2.find({ email: req_am_rcvry_methods_status_payload.email }).exec().then(r => {
                    if (r.length > 0) {
                        const user = r[0];
                        console.log(user.sec_rcvry_methods_arr);
                    }
                });
            }
        });
    });

    // access & permissions //

    socket.on('v_access_flip', v_access_flip_payload => {
        get_snapshot_from_path(`aprvd_tids/${v_access_flip_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(v_access_flip_payload, snapshot)) {
                VULTURE_SCH.find({ vid: v_access_flip_payload.vid }).exec().then(_vulture_obj => {
                    if (_vulture_obj.length > 0) {
                        let vulture_obj = _vulture_obj[0];
                        vulture_obj.u_access_arr.forEach(elm => {
                            if (elm.acid == v_access_flip_payload.acid) {
                                let access = elm.access;
                                new_permission = !access[v_access_flip_payload.access];
                                elm.access[v_access_flip_payload.access] = !access[v_access_flip_payload.access];
                                new_arr = vulture_obj.u_access_arr;
                                VULTURE_SCH.findOneAndUpdate({ vid: v_access_flip_payload.vid }, { u_access_arr: new_arr }, { upsert: true }, (err, doc) => {
                                    io.to(socket.id).emit('v_access_flip_conf', { access_id: v_access_flip_payload.access, new_state: new_permission, vulture_obj: vulture_obj })
                                });
                            }
                        });
                    }
                });
            }
        });
    });

    socket.on('v_permissions_adv_tele_flip', v_permissions_adv_tele_flip_payload => {
        get_snapshot_from_path(`aprvd_tids/${v_permissions_adv_tele_flip_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(v_permissions_adv_tele_flip_payload, snapshot)) {
                VULTURE_SCH.find({ vid: v_permissions_adv_tele_flip_payload.vid }).exec().then(_vulture_obj => {
                    if (_vulture_obj.length > 0) {
                        let vulture_obj = _vulture_obj[0];
                        vulture_obj.u_access_arr.forEach(elm => {
                            if (elm.acid == v_permissions_adv_tele_flip_payload.acid) {
                                let permissions = elm.permissions;
                                new_permission = !permissions.adv_tele[v_permissions_adv_tele_flip_payload.permission];
                                elm.permissions.adv_tele[v_permissions_adv_tele_flip_payload.permission] = !permissions.adv_tele[v_permissions_adv_tele_flip_payload.permission];
                                new_arr = vulture_obj.u_access_arr;
                                VULTURE_SCH.findOneAndUpdate({ vid: v_permissions_adv_tele_flip_payload.vid }, { u_access_arr: new_arr }, { upsert: true }, (err, doc) => {
                                    io.to(socket.id).emit('v_permissions_adv_tele_flip_conf', { permission_id: v_permissions_adv_tele_flip_payload.permission, new_state: new_permission, vulture_obj: vulture_obj })
                                });
                            }
                        });
                    }
                });
            }
        });
    });



    socket.on('v_permissions_security_flip', v_permissions_security_flip_payload => {
        get_snapshot_from_path(`aprvd_tids/${v_permissions_security_flip_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(v_permissions_security_flip_payload, snapshot)) {
                VULTURE_SCH.find({ vid: v_permissions_security_flip_payload.vid }).exec().then(_vulture_obj => {
                    if (_vulture_obj.length > 0) {
                        vulture_obj = _vulture_obj[0];
                        vulture_obj.u_access_arr.forEach(elm => {
                            if (elm.acid == v_permissions_security_flip_payload.acid) {
                                let permissions = elm.permissions;
                                new_permission = !permissions.security[v_permissions_security_flip_payload.permission];
                                elm.permissions.security[v_permissions_security_flip_payload.permission] = !permissions.security[v_permissions_security_flip_payload.permission];
                                new_arr = vulture_obj.u_access_arr;
                                VULTURE_SCH.findOneAndUpdate({ vid: v_permissions_security_flip_payload.vid }, { u_access_arr: new_arr }, { upsert: true }, (err, doc) => {
                                    io.to(socket.id).emit('v_permissions_security_flip_conf', { permission_id: v_permissions_security_flip_payload.permission, new_state: new_permission, vulture_obj: vulture_obj })
                                });
                            }
                        });
                    }
                });
            }
            else {
                io.to(socket.id).emit('sio_transport_auth_failed_sig');
            }
        });
    });

    socket.on('v_permissions_cmd_flip', v_permissions_cmd_flip_payload => {
        get_snapshot_from_path(`aprvd_tids/${v_permissions_cmd_flip_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(v_permissions_cmd_flip_payload, snapshot)) {
                VULTURE_SCH.find({ vid: v_permissions_cmd_flip_payload.vid }).exec().then(_vulture_obj => {
                    if (_vulture_obj.length > 0) {
                        vulture_obj = _vulture_obj[0];
                        vulture_obj.u_access_arr.forEach(elm => {
                            if (elm.acid == v_permissions_cmd_flip_payload.acid) {
                                let permissions = elm.permissions;
                                new_permission = !permissions.cmd[v_permissions_cmd_flip_payload.permission];
                                elm.permissions.cmd[v_permissions_cmd_flip_payload.permission] = !permissions.cmd[v_permissions_cmd_flip_payload.permission];
                                new_arr = vulture_obj.u_access_arr;
                                VULTURE_SCH.findOneAndUpdate({ vid: v_permissions_cmd_flip_payload.vid }, { u_access_arr: new_arr }, { upsert: true }, (err, doc) => {
                                    io.to(socket.id).emit('v_permissions_cmd_flip_conf', { permission_id: v_permissions_cmd_flip_payload.permission, new_state: new_permission, vulture_obj: vulture_obj })
                                });
                            }
                        });
                    }
                });
            }
            else {
                io.to(socket.id).emit('sio_transport_auth_failed_sig');
            }
        });
    });

    socket.on('vulture_access_invite_res', vulture_access_invite_res_payload => {
        get_snapshot_from_path(`aprvd_tids/${vulture_access_invite_res_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(vulture_access_invite_res_payload, snapshot)) {
                get_snapshot_from_path(`vulture_access_invites/${vulture_access_invite_res_payload.acid}`).then(snapshot => {
                    const invites = snapshot.val();
                    if (!vulture_access_invite_res_payload.res) {
                        remove(ref(db, `vulture_access_invites/${vulture_access_invite_res_payload.acid}/${vulture_access_invite_res_payload.vid}`));
                    }
                    else {
                        const role_u_access_arr = [
                            gen_admin_u_access_array(vulture_access_invite_res_payload.acid, vulture_access_invite_res_payload.role),
                            gen_pilot_u_access_array(vulture_access_invite_res_payload.acid, vulture_access_invite_res_payload.role),
                            gen_data_analyst_u_access_array(vulture_access_invite_res_payload.acid, vulture_access_invite_res_payload.role)
                        ];

                        VULTURE_SCH.find({ vid: vulture_access_invite_res_payload.vid }).exec().then(r => {
                            if (r.length > 0) {
                                const vulture_obj = r[0];
                                let n_u_access_array = vulture_obj.u_access_arr;
                                vulture_obj.u_access_arr.push(role_u_access_arr[vulture_access_invite_res_payload.role]);
                                VULTURE_SCH.findOneAndUpdate({ vid: vulture_access_invite_res_payload.vid }, { u_access_arr: n_u_access_array }, { upsert: true }, (err, doc) => { });
                                remove(ref(db, `vulture_access_invites/${vulture_access_invite_res_payload.acid}/${vulture_access_invite_res_payload.vid}`));
                                UAC_v2.find({ acid: vulture_access_invite_res_payload.acid }).exec().then(r => {
                                    if (r.length > 0) {
                                        const user = r[0];
                                        add_vulture_to_vow(user.email, vulture_obj.vn, vulture_access_invite_res_payload.vid);
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                io.to(socket.id).emit('sio_transport_auth_failed_sig');
            }
        });
    });

    socket.on('fetch_vulture_access_invites', fetch_vulture_access_invites_paylaod => {
        get_snapshot_from_path(`aprvd_tids/${fetch_vulture_access_invites_paylaod.ath}`).then(snapshot => {
            if (socket_transport_authenticator(fetch_vulture_access_invites_paylaod, snapshot)) {
                get_snapshot_from_path(`vulture_access_invites/${fetch_vulture_access_invites_paylaod.acid}`).then(snapshot => {
                    const vulture_invites = snapshot.val();
                    if (vulture_invites != null) {
                        io.to(socket.id).emit('fetched_vulture_access_invites', vulture_invites);
                    }
                });
            } else {
                io.to(socket.id).emit('sio_transport_auth_failed_sig');
            }
        });
    });

    function add_vulture_access_invite_tortdb(user_obj, vulture_obj, recipient_acid) {
        const vulture_access_invites_path = ref(db, `vulture_access_invites/${recipient_acid}/${vulture_obj.vid}`);
        set(vulture_access_invites_path, {
            sender_obj: user_obj,
            target_vulture_obj: vulture_obj,
            tx: Date.now()
        });
    }

    socket.on('send_vulture_access_invite', send_vulture_access_invite_payload => {
        get_snapshot_from_path(`aprvd_tids/${send_vulture_access_invite_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(send_vulture_access_invite_payload, snapshot)) {
                UAC_v2.find({ email: send_vulture_access_invite_payload.req_params }).exec().then(r => {
                    if (r.length > 0) {
                        add_vulture_access_invite_tortdb(send_vulture_access_invite_payload.user_data, send_vulture_access_invite_payload.vulture_data, r[0].acid);
                    }
                    else {
                        UAC_v2.find({ username: send_vulture_access_invite_payload.req_params }).exec().then(r0 => {
                            if (r0.length > 0) {
                                add_vulture_access_invite_tortdb(send_vulture_access_invite_payload.user_data, send_vulture_access_invite_payload.vulture_data, r0[0].acid);
                            }
                        });
                    };
                });
            } else {
                io.to(socket.id).emit('sio_transport_auth_failed_sig');
            }
        });
    });

    socket.on('req_vulture_config', req_vulture_config_payload => {
        get_snapshot_from_path(`aprvd_tids/${req_vulture_config_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(req_vulture_config_payload, snapshot)) {
                VULTURE_SCH.find({ vid: req_vulture_config_payload.vid }).exec().then(r => {
                    if (r.length > 0) {
                        const vulture_obj = r[0];
                        if (req_vulture_config_payload.use_case == 0) {
                            io.to(socket.id).emit('vulture_config_res', { vid: vulture_obj.vid, vn: vulture_obj.vn, u_access_arr: vulture_obj.u_access_arr });
                        } else {
                            io.to(socket.id).emit('vulture_config_update', { vid: vulture_obj.vid, vn: vulture_obj.vn, u_access_arr: vulture_obj.u_access_arr });
                        }
                    }
                });
            }
        });
    });
    socket.on('acid_to_eun', acid_to_eun_payload => {
        get_snapshot_from_path(`aprvd_tids/${acid_to_eun_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(acid_to_eun_payload, snapshot)) {
                UAC_v2.find({ acid: acid_to_eun_payload.acid }).exec().then(r => {
                    if (r.length > 0) {
                        const user = r[0];
                        io.to(socket.id).emit('acid_to_eun_res', { acid: acid_to_eun_payload.acid, un: user.username, email: user.email, role: acid_to_eun_payload.role });
                    }
                });
            }
            else {
                io.to(socket.id).emit('sio_transport_auth_failed_sig');
            }
        });
    });

    //Email verification logic
    socket.on('req_vfid_email_arr', req_vfid_email_arr_payload => {
        get_snapshot_from_path(`aprvd_tids/${req_vfid_email_arr_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(req_vfid_email_arr_payload, snapshot)) {
                UAC_v2.find({ email: req_vfid_email_arr_payload.email }).exec().then(r => {
                    if (r.length > 0) {
                        const user = r[0];
                        io.to(socket.id).emit('vfid_email_arr_res', user.contact_emails_arr);
                    }
                });
            }
        });
    });

    socket.on('verify_email_code', verify_email_code_payload => {
        get_snapshot_from_path(`aprvd_tids/${verify_email_code_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(verify_email_code_payload, snapshot)) {
                get_snapshot_from_path(`email_conf/${verify_email_code_payload.vc}`).then(snapshot => {
                    const vc_data = snapshot.val();
                    if (vc_data != null) {
                        if (vc_data.email == verify_email_code_payload.ax) {
                            UAC_v2.find({ email: verify_email_code_payload.email }).exec().then(r => {
                                if (r.length > 0) {
                                    console.log('adding e to UAC')
                                    const user = r[0];//rr
                                    let n_contact_emails_arr = r[0].contact_emails_arr;
                                    r[0].contact_emails_arr.push(verify_email_code_payload.ax);
                                    UAC_v2.findOneAndUpdate({ email: verify_email_code_payload.email }, { contact_emails_arr: n_contact_emails_arr }, { upsert: true }, (err, doc) => { });
                                    remove(ref(db, `email_conf/${verify_email_code_payload.vc}`));
                                    io.to(socket.id).emit('verify_email_code_res', true);
                                }
                            });
                        }
                    }
                    else {
                        io.to(socket.id).emit('verify_email_code_res', false);
                    }
                });
            }
        });
    });

    socket.on('rm_email_rcvry_method', rm_email_rcvry_method_payload => {
        get_snapshot_from_path(`aprvd_tids/${rm_email_rcvry_method_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(rm_email_rcvry_method_payload, snapshot)) {
                UAC_v2.find({ email: rm_email_rcvry_method_payload.email }).exec().then(r => {
                    if (r.length > 0) {
                        const user = r[0];
                        for (let ixn = 0; ixn < user.contact_emails_arr.length; ixn++) {
                            if (user.contact_emails_arr[ixn] == rm_email_rcvry_method_payload.ax) {
                                user.contact_emails_arr.splice(ixn, 1);
                                let nicer = user.contact_emails_arr.splice(ixn, 1);
                                UAC_v2.findOneAndUpdate({ email: rm_email_rcvry_method_payload.email }, { contact_emails_arr: nicer }, { upsert: true }, (err, doc) => { });
                            }
                        }
                    }
                });
            }
        });
    });

    socket.on('send_email_vc', send_email_vc_payload => {
        get_snapshot_from_path(`aprvd_tids/${send_email_vc_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(send_email_vc_payload, snapshot)) {
                const vc = getCryptoRandomInt(100000, 999999);
                const add_vc_to_te = ref(db, `email_conf/${vc}/`);
                set(add_vc_to_te, { email: send_email_vc_payload.ax, tx: Date.now() });
                const ct = Date.now();
                const msg = {
                    to: send_email_vc_payload.ax, // Change to your recipient
                    from: 'raven@vulture-uplink.com', // Change to your verified sender
                    subject: '[AURORA] Security Verification Code',
                    text: `Your verification code is ${vc}`,
                }
                try {
                    sendgrid.send(msg).then().catch(e => console.log(e));
                }
                catch {
                    io.to(socket.id).emit('verify_email_code_res', false);
                }

            }
        });
    });

    // async function get_rtdb_snapshot(path){
    //     return await get(ref(db, `${path}/`));
    // }
    // async function get_user_obj_bemail(email){
    //     let user;
    //     UAC_v2.find({ email: email }).exec()
    // }

    function req_vulture_array_status_exec(payload, snapshot) {
        if (socket_transport_authenticator(payload, snapshot)) {
            if (snapshot.val().acid == payload.acid) {
                get(ref(db, 'active_vultures/')).then(active_vultures_snapshot => {
                    UAC_v2.find({ acid: payload.acid }).exec().then(r => {
                        if (r.length > 0) {
                            let vow = r[0].vow;
                            let vow_status = [];
                            let delta = Date.now()
                            const data = active_vultures_snapshot.val();
                            if (data != null) {
                                for (let ix = 0; ix < vow.length; ix++) {
                                    if (data[vow[ix].vid] == undefined) {
                                        vow_status.push({ vid: vow[ix].vid, vn: vow[ix].vn, status: 'ready' });
                                    }
                                    else {
                                        vow_status.push({ vid: vow[ix].vid, vn: vow[ix].vn, status: 'active' });
                                    }
                                }
                                console.log(Math.abs(Date.now() - delta))
                                io.to(socket.id).emit('vulture_array_status_res', { vulture_array_status: vow_status });
                            }
                            else {
                                for (let ix = 0; ix < vow.length; ix++) {
                                    vow_status[ix] = { vid: vow[ix].vid, vn: vow[ix].vn, status: 'ready' };
                                }
                                console.log(Math.abs(Date.now() - delta))
                                io.to(socket.id).emit('vulture_array_status_res', { vulture_array_status: vow_status });
                            }
                        }
                    });
                });
            } else {
                io.to(socket.id).emit('sio_transport_auth_failed_sig');
            }
        }
    }

    socket.on('req_vulture_array_status', req_vulture_array_status_payload => {
        if (req_vulture_array_status_payload.origin == undefined || req_vulture_array_status_payload.origin == 'security') {
            get_snapshot_from_path(`aprvd_tids/${req_vulture_array_status_payload.ath}`).then(snapshot => {
                req_vulture_array_status_exec(req_vulture_array_status_payload, snapshot);
            });
        }
        if (req_vulture_array_status_payload.origin == 'adv_tele') {
            get_snapshot_from_path(`adv_tele_aprvd_tids/${req_vulture_array_status_payload.ath}`).then(adv_tele_snapshot => {
                req_vulture_array_status_exec(req_vulture_array_status_payload, adv_tele_snapshot);
            });
        }
    });

    socket.on('req_relay_station_array', req_relay_station_array_payload => {
        get_snapshot_from_path(`aprvd_tids/${req_relay_station_array_payload.ath}`).then(snapshot => {
            if(snapshot != null){
                let relay_station_array = [];
                for(let ix = 0; ix < req_relay_station_array_payload.dock_array.length; ix++){
                    for(let rs_array_ix = 0; rs_array_ix < req_relay_station_array_payload.dock_array[ix].relay_station_array.length; rs_array_ix++){
                        let relay_station_ref = req_relay_station_array_payload.dock_array[ix].relay_station_array[rs_array_ix];

                        RELAY_STATION_SCH.findOne({relay_station_id: relay_station_ref.relay_station_id}).exec().then(relay_station_obj => {
                            if(relay_station_obj != null){
                                relay_station_array.push(relay_station_obj);
                                io.to(socket.id).emit('relay_station_array_res', {relay_station_array: relay_station_array});
                            }
                        });
                    }
                }
            }
        });
    });

    socket.on('req_dock_array', req_dock_array_payload => {
        get_snapshot_from_path(`aprvd_tids/${req_dock_array_payload.ath}`).then(snapshot => {
            if (snapshot != null) {
                UAC_v2.findOne({ acid: req_dock_array_payload.acid }).exec().then(user => {
                    if (user != null) {
                        let dock_array = [];
                        for (let ix = 0; ix < user.dock_array.length; ix++) {
                            DOCK_SCH.findOne({ dock_id: user.dock_array[ix].dock_id }).exec().then(dock_obj => {
                                if (dock_obj != null) {
                                    dock_array.push(dock_obj);
                                    if (dock_array.length == user.dock_array.length) {
                                        setTimeout(() => {
                                            io.to(socket.id).emit('dock_array_res', { dock_array: dock_array });
                                        }, 100);
                                    }
                                }
                            });
                        }
                    }
                });
            } else {
                io.to(socket.id).emit('sio_transport_auth_failed_sig');
            }
        });
    });

    function req_vow_exec(payload, snapshot) {
        if (socket_transport_authenticator(payload, snapshot)) {
            UAC_v2.find({ acid: payload.acid }).exec().then(r => {
                if (r.length > 0) {
                    const user = r[0];
                    io.to(socket.id).emit('vow_res', { vow: user.vow });
                }
            });
        }
        else {
            io.to(socket.id).emit('sio_transport_auth_failed_sig');
        }
    }

    socket.on('req_vow', req_vow_payload => {
        if (req_vow_payload.origin == 'security') {
            get_snapshot_from_path(`aprvd_tids/${req_vow_payload.ath}`).then(snapshot => {
                req_vow_exec(req_vow_payload, snapshot);
            });
        }
        if (req_vow_payload.origin == 'adv_tele') {
            get_snapshot_from_path(`adv_tele_aprvd_tids/${req_vow_payload.ath}`).then(adv_tele_snapshot => {
                req_vow_exec(req_vow_payload, adv_tele_snapshot);
            });
        }
    });

    socket.on('sid_update', un => {

        const qry = (element) => element == un;
        const ixl = sec_aprvd_un_arr.findIndex(qry);
        if (ixl >= 0) {
            sec_aprvd_sid_arr[ixl] = socket.id;
        }
    });

    socket.on('add_vulture_tvow', avtvw_payload => {//rr
        get_snapshot_from_path(`aprvd_tids/${avtvw_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(avtvw_payload, snapshot)) {
                let nvid = uuid.v4();
                add_vulture_to_vow(avtvw_payload.email, avtvw_payload.vn, nvid);

                const u_access_array_data_structure = { acid: avtvw_payload.acid, role: 0, access: { adv_tele: true, security: true, command: true, payload: true }, permissions: { adv_tele: { sonar_array: true, dynamics: true, power: true, autonomy: true, diagnostics: true } } };

                const vulture_sch = new VULTURE_SCH({
                    vid: nvid,
                    vn: avtvw_payload.vn,
                    u_access_arr: gen_admin_u_access_array(avtvw_payload.acid, 0),
                    local_prefs_arr: [],
                    security_rules_arr: [],
                    flt_logs: [],
                });

                vulture_sch.save().then(r => { })
            }
            else {
                io.to(socket.id).emit('sio_transport_auth_failed_sig');
            }
        });
    });

    ////--Security Access Managment--////[sam]

    socket.on('req_activity_logs', req_activity_logs_payload => {
        get_snapshot_from_path(`aprvd_tids/${req_activity_logs_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(req_activity_logs_payload, snapshot)) {
                UAC_v2.find({ email: req_activity_logs_payload.email }).exec().then(r => {
                    if (r.length > 0) {
                        const user = r[0];
                        io.to(socket.id).emit('activity_logs_res', user.activity_log_arr);
                    }
                });
            }
            else {
                io.to(socket.id).emit('sio_transport_auth_failed_sig');
            }
        });
    });

    socket.on('req_backup_codes_regen', req_backup_codes_regen_payload => {
        get_snapshot_from_path(`aprvd_tids/${req_backup_codes_regen_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(req_backup_codes_regen_payload, snapshot)) {
                UAC_v2.find({ email: req_backup_codes_regen_payload.email }).exec().then(r => {
                    if (r.length > 0) {
                        const user = r[0];
                        let new_2fa_bkp_codes = [gen_rc(), gen_rc(), gen_rc(), gen_rc(), gen_rc(), gen_rc(), gen_rc(), gen_rc()];
                        UAC_v2.findOneAndUpdate({ email: req_backup_codes_regen_payload.email }, { rcvry_codes_arr: new_2fa_bkp_codes }, { upsert: true }, (err, doc) => { });
                    }
                });
            }
            else {
                io.to(socket.id).emit('sio_transport_auth_failed_sig');
            }
        });
    });

    socket.on('req_sec_pass_change', req_sec_pass_change_payload => {
        get_snapshot_from_path(`aprvd_tids/${req_sec_pass_change_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(req_sec_pass_change_payload, snapshot)) {
                UAC_v2.find({ email: req_sec_pass_change_payload.email }).exec().then(r => {
                    if (r.length > 0) {
                        const user = r[0];
                        bcrypt.compare(req_sec_pass_change_payload.cps, user.secca).then(res => {
                            if (res) {
                                bcrypt.hash(req_sec_pass_change_payload.nps, 10).then(hash => {
                                    UAC_v2.findOneAndUpdate({ email: req_sec_pass_change_payload.email }, { secca: hash }, { upsert: true }, (err, doc) => { });
                                });
                                io.to(socket.id).emit('sec_pass_change_status', true);
                            }
                            else {
                                io.to(socket.id).emit('sec_pass_change_status', false);
                            }
                        });
                    }
                });
            }
            else {
                io.to(socket.id).emit('sio_transport_auth_failed_sig');
            }
        });
    });

    socket.on('req_auth_prefs', req_auth_prefs_payload => {
        get_snapshot_from_path(`aprvd_tids/${req_auth_prefs_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(req_auth_prefs_payload, snapshot)) {
                UAC_v2.find({ email: req_auth_prefs_payload.email }).exec().then(r => {
                    const user = r[0];
                    if (user != undefined) {
                        io.to(socket.id).emit('auth_prefs_res', { auth_methods: user.acc_auth_methods_arr, recovery_methods: user.acc_rcvry_methods_arr });
                    }
                    else {
                        io.to(socket.id).emit('sio_transport_auth_failed_sig');
                    }
                });
            }
            else {
                io.to(socket.id).emit('sio_transport_auth_failed_sig');
            }
        });
    });

    socket.on('req_user_mfa_qrc', req_user_mfa_qrc_payload => {
        get_snapshot_from_path(`aprvd_tids/${req_user_mfa_qrc_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(req_user_mfa_qrc_payload, snapshot)) {
                UAC_v2.find({ email: req_user_mfa_qrc_payload.email }).exec().then(r => {
                    if (r.length > 0) {
                        const user = r[0];
                        qrcode.toDataURL(user.mfa_tkn.otpauth_url, (err, img_data) => {
                            io.emit('user_mfa_qrc_res', img_data);
                        });
                    }
                });
            }
            else {
                io.to(socket.id).emit('sio_transport_auth_failed_sig');
            }
        });
    });

    function req_un_exec(payload, snapshot) {
        if (socket_transport_authenticator(payload, snapshot)) {
            UAC_v2.find({ $or: [{ email: payload.uid }, { username: payload.uid }] }).exec().then(r => {
                if (r.length > 0) {
                    const user = r[0];
                    io.to(socket.id).emit('un_res', { username: user.username, acid: user.acid });
                }
            });
        }
        else {
            io.to(socket.id).emit('sio_transport_auth_failed_sig');
        }
    }

    socket.on('req_un', req_un_payload => {
        if (req_un_payload.origin == undefined) {
            get_snapshot_from_path(`aprvd_tids/${req_un_payload.ath}`).then(snapshot => {
                req_un_exec(req_un_payload, snapshot);
            });
        }
        if (req_un_payload.origin == 'adv_tele') {
            get_snapshot_from_path(`adv_tele_aprvd_tids/${req_un_payload.ath}`).then(adv_tele_tids_snapshot => {
                req_un_exec(req_un_payload, adv_tele_tids_snapshot);
            });
        }
    });
    socket.on('check_mfa_token', check_mfa_token_payload => {
        get_snapshot_from_path(`aprvd_tids/${check_mfa_token_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(check_mfa_token_payload, snapshot)) {
                UAC_v2.find({ acid: check_mfa_token_payload.acid }).exec().then(r => {
                    if (r.length > 0) {
                        const user = r[0];
                        var verified = mfa_mgr.totp.verify({
                            secret: user.mfa_tkn.base32,
                            encoding: 'base32',
                            token: check_mfa_token_payload.token
                        });
                        if (verified) {
                            let user_auth_methods_obj = user.acc_auth_methods_arr;
                            UAC_v2.findOneAndUpdate({ acid: check_mfa_token_payload.acid }, { acc_auth_methods_arr: { TOTP: true, security_key: user_auth_methods_obj.security_key, app: user_auth_methods_obj.app, first: 'TOTP' } }, { upsert: true }, (err, doc) => { });
                        }
                        io.to(socket.id).emit('check_mfa_token_res', verified);
                    }
                });
            }
            else {
                io.to(socket.id).emit('sio_transport_auth_failed_sig');
            }
        });
    });

    ////--MFA--////

    socket.on('req_backup_codes', req_backup_codes_payload => {
        get_snapshot_from_path(`aprvd_tids/${req_backup_codes_payload.ath}`).then(snapshot => {
            if (socket_transport_authenticator(req_backup_codes_payload, snapshot)) {
                UAC_v2.find({ email: req_backup_codes_payload.email }).exec().then(r => {
                    if (r.length > 0) {
                        const user = r[0];
                        io.emit('backup_codes_res', user.rcvry_codes_arr);
                    }
                });
            }
            else {
                io.to(socket.id).emit('sio_transport_auth_failed_sig');
            }
        });
    });

    ////--Ping Emitters--////
    setInterval(() => {
        socket.emit('ping');
        ini_ping_time = Date.now();
    }, 2000);//this ⇄ Advanced_Telemetry F/E 

    socket.on('local_server_ping_emitter', payload => {
        local_server_unix = payload.tx;
        io.to(`${payload.vid}`).emit('local_server_ping_emitter_rebound', payload.tx);
    });//this ⇄ Vulture

    socket.on('ping_back', t => {
        var latency = Math.round((((Date.now() - ini_ping_time) / 2) * 100) / 100)
        socket.emit('ping_paint', latency);
    });//this ⇄ Advanced_Telemetry F/E  | Computed Latency Emitter

    // setInterval(() => {
    //     socket.emit('command_ping_trigger', Date.now());
    //     cmd_ping_trigger_unix = Date.now();
    // }, 2000);//this ⇄ F/E Command

    socket.on('command_ping_echo', () => {
        var latency = Math.round((((Date.now() - cmd_ping_trigger_unix) / 2) * 100) / 100);
        io.emit('cmd_ping_paint', latency);
    });//this ⇄ F/E Advanced Telemetry | Computed Latency Emitter


    ////--Connection Status--////

    ///this ⇄ Vulture
    setInterval(() => {
        if (Math.abs(local_server_unix - Date.now()) > 3500) {
            local_server_cs = false;
        }
        else {
            local_server_cs = true;
        }
        socket.emit('vulture_connection_status', local_server_cs);
    }, 250);//Checks connection between: this ⇄ Vulture | Emits results to: Advanced_Telemetry F/E 


    ///this ⇄ fwd_cam_broadcaster
    socket.on('fwd_video_broadcaster_status_sig', (_last_fwd_video_broadcaster_uni) => {
        last_fwd_video_broadcaster_unix = _last_fwd_video_broadcaster_uni;
    });//Sets last unix for the fwd video broadcaster

    setInterval(() => {
        if (Math.abs(last_fwd_video_broadcaster_unix - Date.now()) > 1900) {
            fwd_video_broadcaster_cs = false;
        }
        else {
            fwd_video_broadcaster_cs = true;
        }
        io.emit('fwd_video_broadcaster_s_relay', fwd_video_broadcaster_cs);
    }, 250);//Checks connection between: this ⇄ fwd_cam_broadcaster | Emits results to: Advanced_Telemetry F/E


    ///this ⇄ gnd_cam_broadcaster
    socket.on('gnd_video_broadcaster_status_sig', (_last_gnd_video_broadcaster_uni) => {
        last_gnd_video_broadcaster_unix = _last_gnd_video_broadcaster_uni;
    });//Sets last unix for the gnd video broadcaster
    setInterval(() => {
        if (Math.abs(last_gnd_video_broadcaster_unix - Date.now()) > 1900) {
            gnd_video_broadcaster_cs = false;
        }
        else {
            gnd_video_broadcaster_cs = true;
        }
        io.emit('gnd_video_broadcaster_s_relay', gnd_video_broadcaster_cs);
    }, 250);//Checks connection between: this ⇄ gnd_cam_broadcaster | Emits results to: Advanced_Telemetry F/E


    ///this ⇄ Command
    socket.on('command_active_status', _last_unix => {
        last_cic_unix = _last_unix;
    });// Command ⇄ this | Sets last unix for Command to display in case it goes offline | Auto emitted by Command 250ms

    socket.on('cmd_unix', cmd_unix => {
        io.emit('cmd_unix_rebound', cmd_unix);
    });// Command ⇄ this | Emits last Command unix to: Advanced_Telemetry F/E | Auto emitted by Command 10ms

    setInterval(() => {
        if (Math.abs(last_cic_unix - Date.now()) > 1900) {
            cic_active_status = false;
        }
        else {
            cic_active_status = true;
        }
        socket.emit('cic_active_status_s_relay', cic_active_status);
    }, 250);//Checks connection between: this ⇄ Command | Emits results to: Advanced_Telemetry F/E


    ///this ⇄ Vulture [Omega Hardware Interface Board]
    setInterval(() => {
        if (Math.abs(omega_board_last_unix - Date.now()) > 1000) {
            socket.emit('omega_board_hs', false);
        }
        else {
            socket.emit('omega_board_hs', true);
        }
    }, 100);//Emits Omega Board Hardware Status to: Advanced_Telemetry F/E


    ////--Web RTC--////
    socket.on('vsb_fwd_ready', (strd_cnt) => {
        io.emit('fwd_video_feed_connection_ini', strd_cnt);
    });//fwd_cam_broadcaster ⇄ this | Initial peer signaling | Relayed to: Advanced_Telemetry F/E

    socket.on('vsb_gnd_ready', (strd_cnt) => {
        io.emit('gnd_video_feed_connection_ini', strd_cnt);
    });//gnd_cam_broadcaster ⇄ this | Initial peer signaling | Relayed to: Advanced_Telemetry F/E

    socket.on('fwd_video_feed_connection_ilr', data => {
        io.emit('fwd_video_feed_connection_ilr_x', data);
    });//Advanced_Telemetry F/E ⇄ this | Advanced_Telemetry F/E initial peer signaling | Relayed to: fwd_cam_broadcaster    

    socket.on('gnd_video_feed_connection_ilr', data => {
        io.emit('gnd_video_feed_connection_ilr_x', data);
    });//Advanced_Telemetry F/E ⇄ this | Advanced_Telemetry F/E initial peer signaling | Relayed to: gnd_cam_broadcaster  

    socket.on('adv_tele_refresh_trigger', () => {
        io.emit('video_link_reini_signal');
    });//Triggered on Advanced_Telemetry F/E refresh | Refreshes signal to restart video uplink | Relayed to: gnd_cam_broadcaster, fwd_cam_broadcaster


    ////--CLI [Vulture ⇄ Advanced_Telemetry F/E]--////
    socket.on('rth_status_rqst_payload', (RTH) => {
        io.emit('rth_status_rqst_payload_relay', RTH)
    });

    ////--User input ops [In-progress]--////

    socket.on('input_pkg_local_rebound', input_pkg_bounceback => {
        io.emit('input_pkg_local_s_rebound', input_pkg_bounceback);
    });

    socket.on('joystick_input_pkg', j_in_pkg => {
        g_joystick_input_pkg = j_in_pkg;
        socket.emit('input_pkg_server_relay', j_in_pkg);
    });


    setInterval(() => {
        io.emit('ct', Date.now());
    }, 100);//this current unix emitter | Used by: Advanced_Telemetry F/E

});
//----Global Relay ⇄ F/E link----//

if (process.env.NODE_ENV !== 'production') {
    server.listen(7780);
}
else {
    server.listen(process.env.PORT);
}