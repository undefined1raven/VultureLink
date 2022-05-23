<script setup>
import Background from "@/components/BaseBackgroundImg.vue";
import DistanceIndicator from "@/components/AdvancedTeleBaseDistanceIndi.vue";
import LoginRequestOverlay from "@/components/LoginRequestOverlay.vue";
</script>

<script>
let socket = io();
// let current_user_acid;
let login_req_tid;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
function unix_tx_formatter(unix_time) {
  let dt = new Date(unix_time);

  return `${("0" + dt.getHours()).slice(-2)}:${("0" + dt.getMinutes()).slice(
    -2
  )}:${("0" + dt.getSeconds()).slice(-2)}:${("0" + dt.getMilliseconds()).slice(
    -3
  )}`;
}

export default {
  data() {
    return {
      sonar_telemetry_obj: {
        fwd_sonar: 0,
        lft_sonar: 0,
        bwd_sonar: 0,
        rgt_sonar: 0,
        gnd_sonar: 0,
      },
      login_req_details_obj: {
        timestamp: "",
        location: "",
        platform: "",
        socket_ref: socket,
        tid: "",
        isVisible: false,
      },
      current_user_acid: "",
      current_user_un: "",
    };
  },
  methods: {
    handle_visibility_sig() {
      this.login_req_details_obj.isVisible = false;
    },
  },
  mounted() {
    setTimeout(() => {
      socket.emit("req_un", {
        origin: "adv_tele",
        ath: getCookie("adv_tele_sio_ath"),
        uid: getCookie("eor"),
      });

      socket.on("un_res", (un) => {
        this.current_user_un = un.username;
        this.current_user_acid = un.acid;
        socket.emit("req_vow", {
          origin: "adv_tele",
          ath: getCookie("adv_tele_sio_ath"),
          acid: this.current_user_acid,
        });
        socket.emit("req_vulture_array_status", {
          origin: "adv_tele",
          ath: getCookie("adv_tele_sio_ath"),
          acid: this.current_user_acid,
        });
        socket.emit("add_socket_to_acid_room", {
          sid: socket.id,
          acid: this.current_user_acid,
        });
      });

      socket.on("sonar_telemetry_pkg_rebound", (payload) => {
        this.sonar_telemetry_obj = payload;
      });
      socket.on("login_req", (login_req_payload) => {
        this.login_req_details_obj.isVisible = true;
        this.login_req_details_obj.tid = login_req_payload.tid;
        this.login_req_details_obj.timestamp = unix_tx_formatter(
          login_req_payload.tx
        );
        this.login_req_details_obj.location = `${login_req_payload.state}, ${login_req_payload.city} [${login_req_payload.iso_code}]`;
        this.login_req_details_obj.platform = `${login_req_payload.os} ${login_req_payload.os_version}`;
      });
    }, 300);
  },
};
</script>

<template>
  <Background />
  <DistanceIndicator
    id="fwd_sonar_indi"
    :text="`${sonar_telemetry_obj.fwd_sonar}`"
  ></DistanceIndicator>

  <DistanceIndicator
    id="lft_sonar_indi"
    :text="`${sonar_telemetry_obj.lft_sonar}`"
  ></DistanceIndicator>

  <DistanceIndicator
    id="bwd_sonar_indi"
    :text="`${sonar_telemetry_obj.bwd_sonar}`"
  ></DistanceIndicator>

  <DistanceIndicator
    id="rgt_sonar_indi"
    :text="`${sonar_telemetry_obj.rgt_sonar}`"
  ></DistanceIndicator>

  <DistanceIndicator
    id="gnd_sonar_indi"
    :text="`${sonar_telemetry_obj.gnd_sonar}`"
  ></DistanceIndicator>

  <LoginRequestOverlay
    :isVisible="login_req_details_obj.isVisible"
    :timestamp="login_req_details_obj.timestamp"
    :location="login_req_details_obj.location"
    :platform="login_req_details_obj.platform"
    :socket_ref="login_req_details_obj.socket_ref"
    :tid="login_req_details_obj.tid"
    :current_user_acid="current_user_acid"
    :login_request_visible="login_req_details_obj.login_request_visible"
    @visibility_switch_sig="handle_visibility_sig"
  ></LoginRequestOverlay>
</template>

<style scoped>
#fwd_sonar_indi {
  top: 20%;
  left: 30%;
}
#lft_sonar_indi {
  top: 30%;
  left: 10%;
}
#rgt_sonar_indi {
  top: 30%;
  left: 50%;
}
#bwd_sonar_indi {
  top: 50%;
  left: 30%;
}
#gnd_sonar_indi {
  top: 70%;
  left: 30%;
}
</style>