<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import BaseHardwareStatusItem from "@/components/AT_BaseHardwareStatusItem.vue";
import BaseLineGraph from "@/components/BaseLineGraph.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import MobileCMDFlightControls from "@/components/MobileCMDFlightControls.vue";
import MobileCMDPowerDock from "@/components/MobileCMDPowerDock.vue";
import MobileCMDNavDock from "@/components/MobileCMDNavDock.vue";
import VultureDetailedDeco from "@/components/VultureDetailedDeco.vue";
import AuroraLogo from "@/components/AuroraLogo.vue";
import MobileCMDMainQuickSelectMenu from "@/components/MobileCMDMainQuickSelectMenu.vue";

import isMobile from "@/composables/isMobile.ts";
import percentage from "@/composables/percentage.ts";
import rangeScaler from "@/composables/rangeScaler.ts";
</script>

<script lang="ts">
export default {
  data() {
    return {
      isFullScreen: false,
      orientation: "portrait",
    };
  },
  props: {
    hasVideoDownlink: { default: false },
  },
  mounted() {
    window.onresize = (e: Event) => {
      if (
        document.documentElement.clientHeight <
        document.documentElement.clientWidth
      ) {
        this.orientation = "landscape";
      } else {
        this.orientation = "portrait";
      }
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
    v-if="!isFullScreen || orientation == 'portrait'"
    @click="onFullScreenButtonClick"
    id="fs_btn"
    v-text="FullScreenButtonTextController()"
  ></BaseLabel>
  <div
    id="vulture_downlink_placeholder"
    v-if="isFullScreen && orientation == 'landscape' && !hasVideoDownlink"
  >
    <VultureDetailedDeco
      color="#555"
      id="detailed_vulture_deco"
    ></VultureDetailedDeco>
    <AuroraLogo id="aurora_logo" color="#555"></AuroraLogo>
    <BaseLabel
      id="vulture_downlink_l"
      color="#555"
      v-text="'Vulture Video Downlink /|/'"
    ></BaseLabel>
  </div>
  <MobileCMDFlightControls
    v-if="isFullScreen && orientation == 'landscape'"
  ></MobileCMDFlightControls>
  <MobileCMDPowerDock
    v-if="isFullScreen && orientation == 'landscape'"
  ></MobileCMDPowerDock>
  <MobileCMDNavDock
    v-if="isFullScreen && orientation == 'landscape'"
  ></MobileCMDNavDock>
  <MobileCMDMainQuickSelectMenu></MobileCMDMainQuickSelectMenu>
</template>

<style scoped>
#btn_demo {
  position: absolute;
  top: 0.5%;
  left: 31.25%;
  width: 7.96875%;
  height: 6.111111111%;
  background-color: #0500ff20;
  color: #fff;
  font-size: 3.6vh;
  border: solid 1px #0500ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Titillium Web", sans-serif;
}
#btn_demo:hover {
  background-color: #0500ff60;
}
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
#vulture_downlink_l {
  top: 85.833333333%;
  left: 50%;
  transform: translate(-50%);
  font-size: 6vh;
}
#aurora_logo {
  top: 14.166666667%;
  left: 50%;
  width: 26.184375%;
  height: auto;
  transform: translate(-50%);
}
#detailed_vulture_deco {
  top: 30.833333333%;
  left: 50%;
  transform: translate(-50%);
  height: auto;
  width: 20.9375%;
}
@media screen and (orientation: landscape) {
  #fs_btn {
    height: 13%;
    width: 20%;
    font-size: 4.1vh;
  }
}
</style>