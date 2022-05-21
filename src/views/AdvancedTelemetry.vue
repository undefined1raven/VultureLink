<script setup>
import Background from "@/components/BaseBackgroundImg.vue";
import DistanceIndicator from "@/components/AdvancedTeleBaseDistanceIndi.vue";
</script>

<script >
let socket;
setTimeout(() => {
  if (io() != undefined) {
    socket = io();
  }
}, 300);

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
    };
  },
  mounted() {
    setTimeout(() => {
      socket.on("sonar_telemetry_pkg_rebound", (payload) => {
        this.sonar_telemetry_obj = payload;
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
    @click="ini()"
    :text="`${sonar_telemetry_obj.lft_sonar}`"
  ></DistanceIndicator>

  <DistanceIndicator
    id="bwd_sonar_indi"
    @click="ini()"
    :text="`${sonar_telemetry_obj.bwd_sonar}`"
  ></DistanceIndicator>

  <DistanceIndicator
    id="rgt_sonar_indi"
    @click="ini()"
    :text="`${sonar_telemetry_obj.rgt_sonar}`"
  ></DistanceIndicator>

  <DistanceIndicator
    id="gnd_sonar_indi"
    @click="ini()"
    :text="`${sonar_telemetry_obj.gnd_sonar}`"
  ></DistanceIndicator>
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