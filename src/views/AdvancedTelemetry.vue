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
      vulture_status_array: "",
    };
  },
  methods: {
    visibility_status_update_handler(visibility_status_update) {
      this.login_req_details_obj.isVisible = visibility_status_update;
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