<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import BaseHardwareStatusItem from "@/components/AT_BaseHardwareStatusItem.vue";

import isMobile from "@/composables/isMobile.ts";
import { ESLint } from "eslint";
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
    <div id="z_track"></div>
    <div id="YPrime_track"></div>
  </div>
  <BaseLabel
    @click="onFullScreenButtonClick"
    id="fs_btn"
    v-text="FullScreenButtonTextController()"
  ></BaseLabel>
</template>

<style scoped>
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
#z_track,
#YPrime_track {
  position: absolute;
  top: 53.888888889%;
  left: 9.53125%;
  background-color: #ffffff20;
  border: solid 1px #fff;
  width: 6.40625%;
  height: 45.555555555556vh;
}
#YPrime_track {
  transform: rotate(-90deg);
}
</style>