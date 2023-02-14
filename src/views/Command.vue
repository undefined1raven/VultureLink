<script setup lang="ts">
import Background from "@/components/BaseBackgroundImg.vue";
import MobileBackground from "@/components/MobileBaseBackgroundImg.vue";
import VultureDetailedDeco from "@/components/VultureDetailedDeco.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import Main from "@/components/CMD_Main.vue";
import MobileMain from "@/components/MobileCMDMain.vue";

import isMobile from "@/composables/isMobile.ts";

import { io } from "socket.io-client";
</script>

<script lang="ts">
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

var socket = io({
  auth: {
    socket_auth_token: getCookie("adv_tele_sio_ath"),
    acid: getCookie("acid"),
  },
  path: "/real-time/",
});

export default {
  data() {
    return {
      TELCO_P: false,
      currentPitch: 0,
      currentRoll: 0,
      lastIMUUnix: 0,
      baseThrustLvlUnix: 0,
      baseThrustLvl: "UNK",
      hasStream: false,
      current_user_acid: getCookie("acid"),
      targetVid: "<Vulture ID>",
      vultureTelemetry: { imu_alpha: {} },
      PermissionsAndAccessObj: {},
      vn: "",
      vultureConnection: {
        lastHeartBeadUnix: 0,
        isActive: false,
      },
    };
  },
  methods: {
    onEAX() {
      socket.emit("onEAX", { vid: this.targetVid });
      console.log("Emergency All Stop");
    },
    onFCRestart(){
      socket.emit("onFCRestart", { vid: this.targetVid });
    },
    onTELCO(args:object){
      socket.emit("onTELCO", { vid: this.targetVid, TELCO: args });
    },
    vultureConnectionAssessor() {
      if (
        Math.abs(this.baseThrustLvlUnix - Date.now()) > 3000
      ) {
        this.vultureConnection.isActive = false;
      } else {
        this.vultureConnection.isActive = true;
        this.$refs.MobileCommandRef.onVultureHeartbeat();
      }
    },
    roleSelectorParser(PermissionsAndAccessObj: Object) {
      let roleUnavailablityReasonObj = {
        true: false,
        false: "insufficientPermissions",
      };
      let hasAccessToTelemetry = PermissionsAndAccessObj.access["adv_tele"];
      let hasAccessToCommand = PermissionsAndAccessObj.access["command"];

      let role_obj = {
        observer_btn: {
          isEnabled: hasAccessToTelemetry,
          unavailability_reason:
            roleUnavailablityReasonObj[hasAccessToTelemetry],
        },
        pilot_btn: {
          isEnabled: hasAccessToCommand,
          unavailability_reason: roleUnavailablityReasonObj[hasAccessToCommand],
        },
      };
      return role_obj;
    },
    FlightInputOnChangeHandler(args: object) {
      let transit_obj = { telemetry: args, vid: this.targetVid };
      socket.emit("FlightInputOnChange", transit_obj);
    },
  },
  mounted() {
    socket.emit("add_socket_to_acid_room", {
      sid: socket.id,
      acid: this.current_user_acid,
    });

    socket.emit("new_target_vid", {
      ath: getCookie("adv_tele_sio_ath"),
      pvid: "default",
      vid: this.targetVid,
    });

    socket.emit("request_vulture_uplink", { vid: this.targetVid });

    setInterval(() => {
      if (!this.hasStream) {
        socket.emit("request_vulture_uplink", { vid: this.targetVid });
      }
      this.vultureConnectionAssessor();
    }, 500);

    setTimeout(() => {
      socket.emit("request_vulture_permissions", {
        vid: this.targetVid,
        acid: this.current_user_acid,
      });

      const fwd_rcvng_peer = new SimplePeer({
        initiator: false,
        trickle: false,
      });

      socket.on("vulture_heartbeat", (vulture_heartbeat_payload) => {
        this.vultureConnection.lastHeartBeadUnix = vulture_heartbeat_payload.tx;
        // this.$refs.DesktopCommandRef.onVultureHeartbeat();
        this.$refs.MobileCommandRef.onVultureHeartbeat();
      });

      socket.on('imu_alpha_data_pkg_server_relay', imu_pkg => {
        this.lastIMUUnix = Date.now()
      });

      socket.on("relayed_fwd_cam_rtc_req", (offer) => {
        try {
          fwd_rcvng_peer.signal(offer);
        } catch (e) {
          console.log("bim");
        }
      });

      socket.on("baseThrustLvl", (baseThrustLvlPkg) => {
        this.baseThrustLvl = `[${(parseFloat(baseThrustLvlPkg.m1)).toFixed(0)}][${(parseFloat(baseThrustLvlPkg.m2)).toFixed(0)}][${(parseFloat(baseThrustLvlPkg.m3)).toFixed(0)}][${(parseFloat(baseThrustLvlPkg.m4)).toFixed(0)}]`;
        this.currentPitch = parseFloat(baseThrustLvlPkg.pitch).toFixed(3);
        this.currentRoll = parseFloat(baseThrustLvlPkg.roll).toFixed(3);
        this.baseThrustLvlUnix = Date.now();
        this.TELCO_P = baseThrustLvlPkg.TELCO;
      });

      socket.on("vulture_permissions", (vulture_permissions_res) => {
        this.PermissionsAndAccessObj = vulture_permissions_res.permissions;
        this.vn = vulture_permissions_res.vn;
      });

      fwd_rcvng_peer.on("stream", (stream: MediaStream) => {
        this.hasStream = true;
        let video = this.$refs.vid_container;
        video.srcObject = stream;
        video.muted = true;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
        video.play();
      });

      fwd_rcvng_peer.on("signal", (answer: string) => {
        socket.emit("fwd_cam_rtc_res", answer);
      });
      fwd_rcvng_peer.on("connect", () => {
        console.log("connected");
      });

      //- Vulture Telemetry Handling -//
      socket.on("imu_alpha_data_pkg_server_relay", (telemetry: object) => {
        this.vultureTelemetry.imu_alpha = telemetry;
      });
    }, 50);
  },
};
</script>

<template>
  <Background />
  <MobileBackground />
  <Video v-show="hasStream" id="vid_container" ref="vid_container"></Video>
  <Main
    @FlightInputOnChange="FlightInputOnChangeHandler"
    ref="DesktopCommandRef"
    :isVultureLinkActive="vultureConnection.isActive"
    :vn="vn"
    :roleAvailablility="roleSelectorParser(PermissionsAndAccessObj)"
    v-if="!isMobile()"
    id="ui_overlay"
  ></Main>
  <MobileMain
    :vn="vn"
    :baseThrustLvl="baseThrustLvl"
    :baseThrustLvlUnix="baseThrustLvlUnix"
    :vultureTelemetry="vultureTelemetry"
    :hasVideoDownlink="hasStream"
    @FlightInputOnChange="FlightInputOnChangeHandler"
    @onEAX="onEAX"
    :lastIMUUnix="lastIMUUnix"
    @FCRestart="onFCRestart"
    @TELCO="onTELCO"
    :currentPitch="currentPitch"
    :currentRoll="currentRoll"
    :TELCO_P="TELCO_P"
    :roleAvailablility="roleSelectorParser(PermissionsAndAccessObj)"
    ref="MobileCommandRef"
    v-if="isMobile()"
    id="mobile_main"
  ></MobileMain>
</template>
<style scoped>
#ui_overlay,
#mobile_main {
  z-index: 10;
}
#vid_container {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: auto;
  z-index: 0;
  background-color: #0500ff00;
}
@keyframes can {
  0% {
    background-color: #0500ff20;
  }
  50% {
    background-color: #0500ff00;
  }
  100% {
    background-color: #0500ff20;
  }
}

#connection_deco {
  top: 73.240740741%;
  left: 50%;
  transform: translate(-50%);
  width: 43.125%;
  font-size: 1.6833333333333vw;
  height: 5.648148148%;
  background-color: #0500ff20;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  border-top: solid 1px #0500ff;
  animation: can ease-in-out 2s infinite;
}
#current_status {
  top: 65.462962963%;
  left: 50%;
  transform: translate(-50%);
  width: 43.125%;
  font-size: 1.6833333333333vw;
  height: 7.777777778%;
  background-color: #0500ff20;
  font-weight: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}
#vulture_logo {
  position: absolute;
  top: 22.5%;
  left: 50%;
  transform: translate(-50%);
  width: 17.291666667%;
  height: 34.351851852%;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  #vid_container {
    height: auto;
  }
}
</style>
