
<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
</script>
<script lang="ts">
export default {
  props: {
    color: { default: "#FFF" },
    backgroundColor: { default: "#0500FF20" },
    label: { default: "--" },
    isActive: { default: false },
    completionStatus: { default: 0 },
  },
};
</script>

<template>
  <div
    :style="`background-color: ${backgroundColor};`"
    class="dynamics_controls_imu_calibration_stage_card_container"
  >
    <BaseLabel
      class="calibration_stage_card_l"
      :color="color"
      v-text="label"
    ></BaseLabel>
    <div v-if="isActive" class="loading_bar_container">
      <HorizontalLine
        :style="`left: ${completionStatus - 100}%`"
        class="loading_bar_slider"
        color="#2400FF"
      ></HorizontalLine>
    </div>
  </div>
</template>
<style scoped>
.calibration_stage_card_l {
  font-size: 1vw;
}
.loading_bar_slider {
  position: absolute;
  width: 100%;
  height: 100%;
}
.loading_bar_container {
  position: absolute;
  top: 85.714285714%;
  left: 50%;
  transform: translate(-50%);
  width: 73.770491803%;
  height: 0.01vw;
  background-color: #0c0055;
  overflow: hidden;
}
.dynamics_controls_imu_calibration_stage_card_container {
  position: absolute;
  height: 15.829145729%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>