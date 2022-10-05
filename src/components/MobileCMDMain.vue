<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import BaseHardwareStatusItem from "@/components/AT_BaseHardwareStatusItem.vue";
import BaseLineGraph from "@/components/BaseLineGraph.vue";

import isMobile from "@/composables/isMobile.ts";
import percentage from "@/composables/percentage.ts";
import rangeScaler from "@/composables/rangeScaler.ts";
</script>

<script lang="ts">
export default {
  data() {
    return {
      isFullScreen: false,
      zypStickTop: "50%",
      ZInput: 0,
    };
  },
  methods: {
    zypStickOnTouchEnd(e:Event){
        this.zypStickTop = '50%';
        this.ZInput = 0;
    },
    zypStickOnMove(e: Event) {
      let inPercentage = rangeScaler(
        percentage(e.touches[0].clientY, document.documentElement.clientHeight),
        53.333333333,
        98.888333333,
        0,
        100
      );
      let currentZIn = rangeScaler(inPercentage, 0, 100, -10, 10) * -1;
      if (currentZIn < 10 && currentZIn > -10) {
        this.ZInput = currentZIn.toFixed(2);
      }
      this.zypStickTop = inPercentage + "%";
    },
    FullScreenButtonTextController() {
      if (this.isFullScreen) {
        return "Exit Full Screen";
      } else {
        return "Go Full Screen";
      }
    },
    onFullScreenButtonClick() {
      if (!this.isFullScreen) {
        document.documentElement.requestFullscreen();
        this.isFullScreen = true;
      } else {
        document.exitFullscreen().then((r) => {});
        this.isFullScreen = false;
      }
    },
  },
};
</script>

<template>
  <div id="xy_controls_container"></div>
  <div id="zyp_controls_container">
    <div @touchend="zypStickOnTouchEnd" @touchmove="zypStickOnMove" id="z_track"></div>
    <div id="YPrime_track"></div>
    <div :style="`top: ${zypStickTop};`" @touchend="zypStickOnTouchEnd" @touchmove="zypStickOnMove" id="zyp_stick"></div>
  </div>
  <BaseLabel
    @click="onFullScreenButtonClick"
    id="fs_btn"
    v-text="FullScreenButtonTextController()"
  ></BaseLabel>
  <BaseLabel id="alt_input_display" v-text="`${ZInput}m/s`"></BaseLabel>
</template>

<style scoped>
#zyp_controls_container {
  position: absolute;
  top: 53.333333333%;
  left: 0.625%;
  height: 45.555555555556vh;
  width: 45.555555555556vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0500ff20;
  overflow: hidden;
}
#z_track {
  position: absolute;
  height: 100%;
  width: 10vh;
  background-color: #ffffff30;
}
#YPrime_track {
  width: 100%;
  height: 10vh;
  background-color: #ffffff30;
}
#zyp_stick {
  position: absolute;
  width: 7vh;
  height: 7vh;
  background-color: #ffffff90;
  transform: rotate(-45deg);
}
#alt_input_display {
  top: 40.277777778%;
  left: 24.375%;
  font-size: 4vh;
}
#xy_controls_container {
  position: absolute;
  top: 53.888888889%;
  left: 76.5625%;
  width: 45.555555555556vh;
  height: 45.555555555556vh;
  background-color: #ffffff20;
  border: solid 1px #fff;
  border-radius: 500px;
}
#fs_btn {
  top: 5%;
  left: 5%;
  width: 20%;
  height: 13%;
  font-size: 4.1vh;
  border: solid 1px #0500ff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>