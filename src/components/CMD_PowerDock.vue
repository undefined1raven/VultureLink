
<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
</script>
    
<script lang="ts">
export default {
  props: {
    telemetryUItoggle: { default: true },
    telemetry: {
      default: {
        flt_bat: { percentage: "--", voltage: "--" },
        fc_bat: { percentage: "--", voltage: "--" },
      },
    },
  },
  data() {
    return {
      isExtended: true,
    };
  },
  methods: {
    onPowerDockTitleClick() {
      this.$emit("powerDockOnExtendedToggle", {
        isExtended: !this.isExtended,
      });
      this.isExtended = !this.isExtended;
    },
  },
};
</script>

<template>
  <div v-if="telemetryUItoggle" id="cmd_main_alt_dock">
    <BaseLabel
      id="power_dock_l"
      @click="onPowerDockTitleClick"
      v-text="'Power'"
    ></BaseLabel>
    <div id="power_dock_container" v-if="isExtended">
      <BaseLabel
        id="flt_bat_l"
        class="secondary_l"
        v-text="'FLT Battery'"
      ></BaseLabel>
      <BaseLabel
        id="flt_bat_percentage_acx"
        class="primary_l"
        v-text="`${telemetry.flt_bat.percentage}%`"
      ></BaseLabel>
      <BaseLabel
        id="flt_bat_voltage_acx"
        class="primary_l"
        v-text="`${telemetry.flt_bat.voltage}V`"
      ></BaseLabel>
      <BaseLabel
        id="fc_bat_l"
        class="secondary_l"
        v-text="'FC Battery'"
      ></BaseLabel>
      <BaseLabel
        id="fc_bat_percentage_acx"
        class="primary_l"
        v-text="`${telemetry.fc_bat.percentage}%`"
      ></BaseLabel>
      <BaseLabel
        id="fc_bat_voltage_acx"
        class="primary_l"
        v-text="`${telemetry.fc_bat.voltage.toString().padStart(2, '0')}V`"
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
#power_dock_container {
  /* animation: ini_ani linear 0.05s; */
}
#fc_bat_percentage_acx,
#fc_bat_voltage_acx {
  top: 70.94017094%;
  left: 0%;
  width: 50%;
}
#fc_bat_voltage_acx {
  border-left: solid 1px #0500ff;
  left: 50%;
}
#fc_bat_l {
  top: 50.427350427%;
  left: 2.580645161%;
}
#altitude_dock_ln {
  top: 49.572649573%;
  left: 0;
  width: 100%;
}
#power_dock_l {
  top: 21.388888889%;
  left: 91.875%;
  border-bottom: solid 1px #0500ff;
  font-size: 2vh;
  width: 7.916666667%;
  padding-left: 0.364583333%;
  background-color: #0500ff00;
  transition: all linear 0.1s;
}
#power_dock_l:hover {
  background-color: #0500ff40;
}
.secondary_l {
  color: #8e8e8e;
  font-size: 1.4vh;
}
#flt_bat_percentage_acx {
  top: 22.222222222%;
  width: 50%;
  left: 0;
}
#flt_bat_voltage_acx {
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
#flt_bat_l {
  top: 1.709401709%;
  left: 2.580645161%;
}
#power_dock_container {
  position: absolute;
  top: 24.722222222%;
  left: 91.875%;
  height: 10.833333333%;
  width: 7.916666667%;
  background-color: #000000aa;
}
</style>