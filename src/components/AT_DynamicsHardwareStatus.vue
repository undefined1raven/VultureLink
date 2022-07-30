<script setup lang="ts">
import Label from "@/components/Label.vue";
import BaseHardwareStatusItem from "@/components/AT_BaseHardwareStatusItem.vue";
</script>

<script lang="ts">
export default {
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
          telemetry: { latency: true, data: true },
          hardware_connection: false,
        },
      ],
    };
  },
};
</script>

<template>
  <div id="dynamics_hardware_status_container">
    <Label id="dynamics_hardware_status_l" v-text="'Hardware Status'"></Label>
    <ul id="dynamics_hardware_status_list">
      <BaseHardwareStatusItem
        v-for="(status_obj, index) in hardware_status_arr"
        :key="index"
        :component_status_obj="status_obj"
        :isLast="index == hardware_status_arr.length - 1"
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
}
</style>