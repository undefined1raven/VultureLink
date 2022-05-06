module.exports.gen_admin_u_access_array = (acid, role) => {
    const admin_u_access_array = {
        acid: acid, role: role, access:
            { adv_tele: true, security: true, command: true, payload: true }, permissions:
        {
            adv_tele: {
                sonar_array_controls: true,
                dynamics_controls: true,
                power_controls: true,
                autonomy_controls: true,
                diagnostics_controls: true,
                sonar_array_tele: true,
                dynamics_tele: true,
                power_tele: true,
                autonomy_tele: true,
                optical_array_tele: true,
                nav_tele: true,
                propulsion_controls: true,
                uplink_controls: true
            },
            security: {
                remote_takeoff_config: true,
                flt_logs: true,
                access_permissions: true,
                geofencing: true,
                lockdown_controls: true,
            },
            cmd: {
                manual_flt_control: true,
                wnav_controls: true,
                rth_params: true,
                autolanding_params: true,
                low_bat_warn_override: true,
                data_collection_controls: true,
                env_warn_override: true,
            }
        },
    };
    return admin_u_access_array;
}

module.exports.gen_pilot_u_access_array = (acid, role) => {
    const pilot_u_access_array = {
        acid: acid, role: role, access:
            { adv_tele: true, security: false, command: true, payload: true }, permissions:
        {
            adv_tele: {
                sonar_array_controls: true,
                dynamics_controls: true,
                power_controls: true,
                autonomy_controls: true,
                diagnostics_controls: true,
                sonar_array_tele: true,
                dynamics_tele: true,
                power_tele: true,
                autonomy_tele: true,
                optical_array_tele: true,
                nav_tele: true,
                propulsion_controls: true,
                uplink_controls: true
            },
            security: {
                remote_takeoff_config: false,
                flt_logs: false,
                access_permissions: false,
                geofencing: false,
                lockdown_controls: false,
            },
            cmd: {
                manual_flt_control: true,
                wnav_controls: true,
                rth_params: false,
                autolanding_params: false,
                low_bat_warn_override: true,
                data_collection_controls: true,
                env_warn_override: true,
            }
        },
    };
    return pilot_u_access_array;
}


module.exports.gen_data_analyst_u_access_array = (acid, role) => {
    const data_analyst_u_access_array = {
        acid: acid, role: role, access:
            { adv_tele: true, security: false, command: false, payload: true }, permissions:
        {
            adv_tele: {
                sonar_array_controls: false,
                dynamics_controls: false,
                power_controls: false,
                autonomy_controls: false,
                diagnostics_controls: false,
                sonar_array_tele: true,
                dynamics_tele: true,
                power_tele: true,
                autonomy_tele: true,
                optical_array_tele: true,
                nav_tele: true,
                propulsion_controls: false,
                uplink_controls: false
            },
            security: {
                remote_takeoff_config: false,
                flt_logs: false,
                access_permissions: false,
                geofencing: false,
                lockdown_controls: false,
            },
            cmd: {
                manual_flt_control: false,
                wnav_controls: false,
                rth_params: false,
                autolanding_params: false,
                low_bat_warn_override: false,
                data_collection_controls: false,
                env_warn_override: false,
            }
        },
    };
    return data_analyst_u_access_array;
}