
<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
</script>
    
<script lang="ts">
export default {
  props: {
    telemetryUItoggle: {default: true},
    telemetry: {
      default: { gps: { rate: "--", value: "--" }, baro: { rate: "--", value: "--" } },
    },
  },
  data() {
    return {
      isExtended: true,
    };
  },
  methods: {
    onAltitudeDockTitleClick() {
      this.$emit('altitudeDockOnExtendedToggle', {isExtended: !this.isExtended});
      this.isExtended = !this.isExtended;
    },
  },
};
</script>

<template>
  <div v-if="telemetryUItoggle" id="cmd_main_alt_dock">
    <BaseLabel
      id="altitude_dock_l"
      @click="onAltitudeDockTitleClick"
      v-text="'Altitude'"
    ></BaseLabel>
    <div id="altitude_dock_container" v-if="isExtended">
      <BaseLabel
        id="altitude_atm_l"
        class="secondary_l"
        v-text="'ATM'"
      ></BaseLabel>
      <BaseLabel
        id="altitude_atm_value_acx"
        class="primary_l"
        v-text="`${telemetry.baro.value}m`"
      ></BaseLabel>
      <BaseLabel
        id="altitude_atm_rate_acx"
        class="primary_l"
        v-text="`${telemetry.baro.value}m/s`"
      ></BaseLabel>
      <BaseLabel
        id="altitude_gps_l"
        class="secondary_l"
        v-text="'GPS'"
      ></BaseLabel>
      <BaseLabel
        id="altitude_gps_value_acx"
        class="primary_l"
        v-text="`${telemetry.gps.value}m`"
      ></BaseLabel>
      <BaseLabel
        id="altitude_gps_rate_acx"
        class="primary_l"
        v-text="`${telemetry.gps.rate.toString().padStart(2, '0')}m/s`"
      ></BaseLabel>
      <HorizontalLine color="#0500FF" id="altitude_dock_ln"></HorizontalLine>
    </div>
  </div>
</template>
<style scoped>
@keyframes ini_ani {
  0% {
    transform: translateY(-1%);
  }
  100% {
    transform: translateY(0%);
  }
}
#altitude_dock_container {
  /* animation: ini_ani linear 0.05s; */
}
#altitude_gps_value_acx,
#altitude_gps_rate_acx {
  top: 70.94017094%;
  left: 0%;
  width: 50%;
}
#altitude_gps_rate_acx {
  border-left: solid 1px #0500ff;
  left: 50%;
}
#altitude_gps_l {
  top: 50.427350427%;
  left: 2.580645161%;
}
#altitude_dock_ln {
  top: 49.572649573%;
  left: 0;
  width: 100%;
}
#altitude_dock_l {
  top: 21.388888889%;
  left: 0%;
  border-bottom: solid 1px #0500ff;
  font-size: 2vh;
  width: 7.716666667%;
  padding-left: 0.364583333%;
  background-color: #000000aa;
  transition: all linear 0.1s;
}
#altitude_dock_l:hover {
  background-color: #0500ff99;
}
.secondary_l {
  color: #8e8e8e;
  font-size: 1.4vh;
}
#altitude_atm_value_acx {
  top: 22.222222222%;
  width: 50%;
  left: 0;
}
#altitude_atm_rate_acx {
  top: 22.222222222%;
  width: 50%;
  left: 50%;
  border-left: solid 1px #0500ff;
}
.primary_l {
  font-size: 1.7vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
#altitude_atm_l {
  top: 1.709401709%;
  left: 2.580645161%;
}
#altitude_dock_container {
  position: absolute;
  top: 24.722222222%;
  left: 0;
  height: 10.833333333%;
  width: 8.072916667%;
  background-color: #000000aa;
}
</style>