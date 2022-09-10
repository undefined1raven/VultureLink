<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import BaseHardwareStatusItem from "@/components/AT_BaseHardwareStatusItem.vue";

import isMobile from "@/composables/isMobile.ts";
</script>

<script lang="ts">
export default {
  methods: {
    overflowController() {
      if (this.hardware_status_arr.length > 2) {
        return "overflow-y: scroll;";
      } else {
        return "overflow-y: hidden;";
      }
    },
  },
  props: {},
  data() {
    return {
      hardware_status_arr: [
        {
          name: "IMU Alpha",
          telemetry: { latency: true, data: true },
          hardware_connection: true,
        },
        {
          name: "IMU Beta",
          telemetry: { latency: false, data: true },
          hardware_connection: false,
        },
      ],
    };
  },
};
</script>

<template>
  <div id="dynamics_hardware_status_container">
    <BaseLabel
    v-if="!isMobile()"
      id="dynamics_hardware_status_l"
      v-text="'Hardware Status'"
    ></BaseLabel>
    <ul id="dynamics_hardware_status_list" :style="overflowController()">
      <BaseHardwareStatusItem
        v-for="(status_obj, index) in hardware_status_arr"
        :key="index"
        :component_status_obj="status_obj"
        :isLast="index == hardware_status_arr.length - 1"
        :isMinifiable="false"
        :isMinifiedByDefault="false"
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
    top: 48.074074074%;
    left: 6.729166667%;
    width: 84.083333333%;
  }
}
</style>