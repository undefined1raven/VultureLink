<script setup lang="ts">
import Background from "@/components/BaseBackgroundImg.vue";
import MobileBackground from "@/components/MobileBaseBackgroundImg.vue";
import VultureDetailedDeco from "@/components/VultureDetailedDeco.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import Main from "@/components/CMD_Main.vue";
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
      hasStream: false,
    };
  },
  mounted() {
    setTimeout(() => {
      const fwd_rcvng_peer = new SimplePeer({
        initiator: false,
        trickle: false,
      });

      socket.on("relayed_fwd_cam_rtc_req", (offer) => {
        fwd_rcvng_peer.signal(offer);
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
    }, 50);
  },
};
</script>

<template>
  <Background />
  <MobileBackground />
  <main>
    <Video v-show="hasStream" id="vid_container" ref="vid_container"></Video>
    <Main id="ui_overlay"></Main>
  </main>
</template>
<style scoped>
#ui_overlay {
  z-index: 10;
}
#vid_container {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
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
</style>
