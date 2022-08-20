
<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
</script>
<script lang="ts">
export default {
  props: {
    label: { default: "--" },
    currentStage: { default: "waiting" },
    completionStatus: { default: 0 },
  },
  data() {
    return {
      isLoadingBarVisible: false,
    };
  },
  methods: {
    styleParser() {
      switch (this.currentStage) {
        case "waiting":
          return {
            card: "background-color: #77777720;",
            label: "color: #777;",
          };
        case "running":
          this.isLoadingBarVisible = true;
          return {
            card: "background-color: #0500FF20;",
            label: "color: #FFF;",
          };
        case "done":
          this.isLoadingBarVisible = false;
          return {
            card: "background-color: #00FFF020;",
            label: "color: #00FFF0;",
          };
        default:
          return {
            card: "background-color: #0500FF20;",
            label: "color: #FFF;",
          };
      }
    },
  },
};
</script>

<template>
  <div
    :style="styleParser().card"
    class="dynamics_controls_imu_calibration_stage_card_container"
  >
    <BaseLabel
      class="calibration_stage_card_l"
      :style="styleParser().label"
      v-text="label"
    ></BaseLabel>
    <div v-if="isLoadingBarVisible" class="loading_bar_container">
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
  font-size: 2vh;
  transition: all linear 0.1s;
}
.loading_bar_slider {
  position: absolute;
  height: 0.06vw;
  width: 100%;
  transition: all linear 0.1s;
}
.loading_bar_container {
  position: absolute;
  top: 85.714285714%;
  left: 50%;
  transform: translate(-50%);
  width: 73.770491803%;
  height: 0.06vw;
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
  left: 50%;
  transform: translate(-50%);
  transition: all linear 0.1s;
  border-radius: 8px;
}
@media only screen and (max-width: 1500px){
  .calibration_stage_card_l{
    font-size: 2vh;
  }
}
</style>