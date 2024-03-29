<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import BaseHardwareStatusItem from "@/components/AT_BaseHardwareStatusItem.vue";

import isMobile from "@/composables/isMobile.ts";
</script>

<script lang="ts">
export default {
  methods: {
    hasTelemetry() {
      return this.hardwareStatusArray.length > 0;
    },
    overflowController() {
      if (this.hardwareStatusArray.length > 2) {
        return "overflow-y: scroll;";
      } else {
        return "overflow-y: hidden;";
      }
    },
  },
  props: {
    hardwareStatusArray: { default: [] },
    isMinifiable: { default: false },
    isMinifiedByDefault: { default: false },
  },
};
</script>

<template>
  <div id="dynamics_hardware_status_container">
    <BaseLabel
      id="dynamics_hardware_status_l"
      v-text="'Hardware Status'"
    ></BaseLabel>
    <BaseLabel
      v-text="'No Status Telemetry Available'"
      color="#9B9B9B"
      id="hardware_status_no_telemetry"
      v-if="!hasTelemetry()"
    ></BaseLabel>
    <ul id="dynamics_hardware_status_list" :style="overflowController()">
      <BaseHardwareStatusItem
        v-for="(status_obj, index) in hardwareStatusArray"
        :key="index"
        :component_status_obj="status_obj"
        :isLast="index == hardwareStatusArray.length - 1"
        :isMinifiable="isMinifiable"
        :isMinifiedByDefault="isMinifiedByDefault"
      ></BaseHardwareStatusItem>
    </ul>
  </div>
</template>
<style scoped>
#dynamics_hardware_status_list {
  position: absolute;
  top: 11.197916667%;
  left: 0%;
  width: 100%;
  height: 89.929742389%;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
}
#dynamics_hardware_status_list::-webkit-scrollbar {
  width: 0.7vh;
  height: 0px;
}

#dynamics_hardware_status_list::-webkit-scrollbar-thumb {
  /* Foreground */
  background: #000083aa;
}
#dynamics_hardware_status_list::-webkit-scrollbar-track {
  /* Background */
  background: #00008325;
}
@keyframes ini_ani {
  0% {
    transform: translateY(-25%);
  }
  100% {
    transform: translateY(0);
  }
}
#dynamics_hardware_status_container {
  position: absolute;
  top: 9.074074074%;
  left: 75%;
  width: 23.958333333%;
  height: 39.537037037%;
  animation: ini_ani cubic-bezier(0.59, 0.23, 0.49, 1.07) 0.15s;
}
#dynamics_hardware_status_l {
  top: -2%;
  left: 0%;
  font-size: 2.1vh;
}
#hardware_status_no_telemetry {
  white-space: nowrap;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-top: solid 1px #9b9b9b;
}
@media only screen and (max-width: 1070px) and (min-height: 550px) {
  #dynamics_hardware_status_container {
    left: 60.729166667%;
    width: 37.083333333%;
  }
}
@media only screen and (max-width: 1500px) and (min-height: 850px) {
  #dynamics_hardware_status_container {
    left: 60.729166667%;
    width: 37.083333333%;
  }
}
@media only screen and (max-width: 1996.8px) and (min-height: 1200px) {
  #dynamics_hardware_status_container {
    left: 60.729166667%;
    width: 37.083333333%;
  }
}

@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  #dynamics_hardware_status_container {
    top: 47.5%;
    left: 1.111111111%;
    width: 97.777777778%;
  }
  #dynamics_hardware_status_l {
    font-size: 2.3vh;
  }
}
</style>