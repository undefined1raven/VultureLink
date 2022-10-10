<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import BaseHardwareStatusItem from "@/components/AT_BaseHardwareStatusItem.vue";
import BaseLineGraph from "@/components/BaseLineGraph.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import MobileCMDFlightControls from "@/components/MobileCMDFlightControls.vue";
import MobileCMDPowerDock from "@/components/MobileCMDPowerDock.vue";

import isMobile from "@/composables/isMobile.ts";
import percentage from "@/composables/percentage.ts";
import rangeScaler from "@/composables/rangeScaler.ts";
</script>

<script lang="ts">
export default {
  data() {
    return {
      isFullScreen: false,
    };
  },
  methods: {
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
        screen.orientation
          .lock("landscape")
          .then((r) => {})
          .catch((e) => {});
      } else {
        document.exitFullscreen().then((r) => {});
        this.isFullScreen = false;
      }
    },
  },
};
</script>

<template>
  <BaseLabel
    v-if="!isFullScreen"
    @click="onFullScreenButtonClick"
    id="fs_btn"
    v-text="FullScreenButtonTextController()"
  ></BaseLabel>
  <MobileCMDFlightControls v-if="isFullScreen"></MobileCMDFlightControls>
  <MobileCMDPowerDock v-if="isFullScreen"></MobileCMDPowerDock>
</template>

<style scoped>
#fs_btn {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 7%;
  width: 40%;
  font-size: 2vh;
  border: solid 1px #0500ff;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (orientation: landscape) {
  #fs_btn {
    height: 13%;
    width: 20%;
    font-size: 4.1vh;
  }
}
</style>