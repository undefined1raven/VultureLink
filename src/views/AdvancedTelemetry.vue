<script setup>
import Background from "@/components/BaseBackgroundImg.vue";
import Label from "@/components/Label.vue";
import DistanceIndicator from "@/components/AT_BaseDistanceIndi.vue";
import LoginRequestOverlay from "@/components/LoginRequestOverlay.vue";
import * as socket_l from "socket.io-client";
import Overview from "@/components/TheAdvancedTelemetryOverview.vue";
import VultureLogo from "@/components/VultureLogo.vue";
</script>

<script>
window.onpageshow = () => {
  sessionStorage.setItem("wid", "/advanced_telemetry");
};

let socket = socket_l.connect("/");
let login_req_tid;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default {
  data() {
    return {
      login_req_details_obj: {
        timestamp: "",
        location: "",
        platform: "",
        tid: "",
        isVisible: false,
      },
      socket_ref: socket,
      current_user_acid: "",
      current_user_un: "",
      selected_vulture_vid: "",
      vulture_status_array: "",
      vulture_connection: {
        status: "",
        last_unix: "",
        signal_emit_last_unix: "",
        latency: "",
      },
    };
  },
  methods: {
    visibility_status_update_handler(visibility_status_update) {
      this.login_req_details_obj.isVisible = visibility_status_update;
    },
    new_selected_vulture_vid_handler(obj) {
      this.selected_vulture_vid = obj.vid;
      this.last_unix = 0;
      this.vulture_connection.status = null;
    },
  },
  mounted() {
    this.current_user_acid = getCookie("acid");
    socket.emit("req_un", {
      origin: "adv_tele",
      ath: getCookie("adv_tele_sio_ath"),
      uid: getCookie("eor"),
    });
    socket.on("un_res", (un) => {
      this.current_user_un = un.username;
      socket.emit("add_socket_to_acid_room", {
        sid: socket.id,
        acid: this.current_user_acid,
      });
    });

    socket.on("sonar_telemetry_pkg_rebound", (payload) => {
      this.sonar_telemetry_obj = payload;
    });

    ///-- Selected Vulture Connection Status Management --///
    setInterval(() => {
      socket.emit("req_vulture_connection_vitals", {
        ath: getCookie("adv_tele_sio_ath"),
        vid: this.selected_vulture_vid,
      });
      this.signal_emit_last_unix = Date.now();

      if (Math.abs(Date.now() - this.vulture_connection.last_unix) > 1000) {
        this.vulture_connection.status = false;
      } else {
        this.vulture_connection.status = true;
      }
    }, 300);

    socket.on("vulture_connection_vitals_res", (connection_vitals) => {
      this.vulture_connection.last_unix = connection_vitals.tx;
    });
    //[][][][][]
  },
};
</script>

<template>
  <Background />
  <VultureLogo id="vulture_logo" />
  <Label id="adv_tele_l" v-text="'\\\\Advanced Telemetry'" color="#FFF"></Label>
  <LoginRequestOverlay
    :isVisible="login_req_details_obj.isVisible"
    :timestamp="login_req_details_obj.timestamp"
    :location="login_req_details_obj.location"
    :platform="login_req_details_obj.platform"
    :socket_ref="socket_ref"
    :tid="login_req_details_obj.tid"
    :current_user_acid="current_user_acid"
    :login_request_visible="login_req_details_obj.login_request_visible"
    @visibility_status_update="visibility_status_update_handler"
  ></LoginRequestOverlay>
  <Overview
    v-if="!login_req_details_obj.isVisible"
    :socket_ref="socket_ref"
    :current_user_acid="`${getCookie('acid')}`"
    :vulture_connection_status="vulture_connection.status"
    @new_selected_vulture_vid="new_selected_vulture_vid_handler"
  ></Overview>
</template>

<style scoped>
#vulture_logo {
  top: 3.888888889%;
  left: 0.885416667%;
}
#adv_tele_l {
  top: 3.888888889%;
  left: 16.73125%;
  height: 4.444444444%;
  width: 11.514583333%;
  background-color: #1100aa30;
  border-left: solid 1px #1100aa;
  display: flex;
  align-items: center;
  padding-left: 0.7%;
  font-size: 1vw;
}
</style>