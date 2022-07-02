<script setup lang="ts">
import Background from "@/components/BaseBackgroundImg.vue";
import MobileBackground from "@/components/MobileBaseBackgroundImg.vue";
import VultureDetailedDeco from "@/components/VultureDetailedDeco.vue";
import Label from "@/components/Label.vue";
import { io } from "socket.io-client";
</script>

<script lang="ts">
function getCookie(name) {
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
  mounted() {
    setTimeout(() => {
      const fwd_rcvng_peer = new SimplePeer({ initiator: true, trickle: false });
      fwd_rcvng_peer.on("signal", (d) => {
        console.log(d);
        socket.emit('fwd_cam_rtc_req', d)
      });      
      fwd_rcvng_peer.on('connect', () => {
        console.log('connected')
      })
    }, 50);
  },
};
</script>

<template>
  <Background />
  <MobileBackground />
  <main>
    <VultureDetailedDeco id="vulture_logo" />
    <div id="ini_container">
      <Label
        id="current_status"
        v-text="'Establishing Connection'"
        color="#FFF"
      />
      <Label id="connection_deco" v-text="'/|/'" color="#1400FF" />
    </div>
  </main>
</template>
<style scoped>
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
