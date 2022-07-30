
<script setup lang="ts">
import DynamicsTelemetryOneAxis from "@/components/AT_DynamicsTelemetryOneAxis.vue";
import Label from "@/components/Label.vue";
import VerticalLine from "@/components/VerticalLine.vue";
</script>

<script lang="ts">
export default {
  props: {},
};
</script>

<template>
  <div id="dynamics_telemetry_container">
    <VerticalLine id="dynamics_telemetry_line" color="#373737"></VerticalLine>
    <Label id="dynamics_telemetry_l" class="animation_group_0" v-text="'Telemetry'"></Label>
    <DynamicsTelemetryOneAxis
      id="x_axis_telemetry_container"
      axis_id="X Axis"
      class="animation_group_0"
    />
    <DynamicsTelemetryOneAxis
      id="y_axis_telemetry_container"
      axis_id="Y Axis"
      class="animation_group_0"
    />
    <DynamicsTelemetryOneAxis
      id="z_axis_telemetry_container"
      axis_id="Z Axis"
      class="animation_group_0"
    />
  </div>
</template>
<style scoped>
#dynamics_telemetry_line {
  top: 0%;
  left: 100%;
  height: 100%;
}
@keyframes ini_ani {
  0% {
    transform: translateY(-25%);
  }
  100% {
    transform: translateY(0);
  }
}
#dynamics_telemetry_l {
  top: 0%;
  left: 0;
}
#x_axis_telemetry_container {
  top: 12.235294118%;
  left: 0%;
}
#y_axis_telemetry_container {
  top: 12.235294118%;
  left: 34.058514629%;
}
#z_axis_telemetry_container {
  top: 12.235294118%;
  left: 68.117029257%;
}
.animation_group_0 {
  animation: ini_ani cubic-bezier(0.59, 0.23, 0.49, 1.07) 0.15s;
}
#dynamics_telemetry_container {
  position: absolute;
  top: 9.074074074%;
  left: 5.052083333%;
  width: 69.427083333%;
  height: 39.351851852%;
}
</style>