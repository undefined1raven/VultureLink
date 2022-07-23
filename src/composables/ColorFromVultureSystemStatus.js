
export default function useColorFromVultureSystemStatus(args_obj) {
    if (!args_obj.vulture_connection_status) {
        return "#0400D4";
    } else {
        if (args_obj.vulture_hardware_status_obj[args_obj.sys_id].overall_status) {
            return "#00FFF0";
        } else {
            return "#FF006B";
        }
    }
}