<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import BaseHardwareStatusItem from "@/components/AT_BaseHardwareStatusItem.vue";
import BaseLineGraph from "@/components/BaseLineGraph.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";

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
      zypStickLeft: "50%",
      ZInput: 0,
      YPrimeInput: 0,
      zypStickInitialPosition: { x: 0, y: 0 },
      zypInputDirection: "",
    };
  },
  methods: {
    zypStickOnTouchStart(e: Event) {
      this.zypStickInitialPosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    },
    zypStickOnTouchEnd(e: Event) {
      this.zypStickTop = "50%";
      this.zypStickLeft = "50%";
      this.ZInput = 0;
      this.YPrimeInput = 0;
    },
    zypStickOnMove(e: Event) {
      if (this.ZInput == 0) {
        setTimeout(() => {
          if (
            Math.abs(e.touches[0].clientX - this.zypStickInitialPosition.x) >
            Math.abs(e.touches[0].clientY - this.zypStickInitialPosition.y)
          ) {
            this.inputDirection = "x";
          } else {
            this.inputDirection = "y";
          }
          console.log(this.inputDirection);
        }, 200);
      }
      if (this.inputDirection == "y") {
        let inPercentage = rangeScaler(
          percentage(
            e.touches[0].clientY,
            document.documentElement.clientHeight
          ),
          53.333333333,
          98.888333333,
          0,
          100
        );
        let currentZIn = rangeScaler(inPercentage, 0, 100, -10, 10) * -1;
        if (currentZIn < 10 && currentZIn > -10) {
          this.ZInput = currentZIn.toFixed(2);
          this.zypStickTop = inPercentage + "%";
        }
        this.YPrimeInput = 0;
        this.zypStickLeft = "50%";
      } else {
        let inPercentage = rangeScaler(
          percentage(
            e.touches[0].clientX,
            document.documentElement.clientWidth
          ),
          0.625,
          26.2496875,
          0,
          100
        );
        let currentYPrimeIn = rangeScaler(inPercentage, 0, 100, -10, 10);
        if (currentYPrimeIn < 10 && currentYPrimeIn > -10) {
          this.YPrimeInput = currentYPrimeIn.toFixed(2);
          this.zypStickLeft = inPercentage + "%";
        }
        this.zypStickTop = "50%";
        this.ZInput = 0;
      }
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
    <div
      @touchstart="zypStickOnTouchStart"
      @touchend="zypStickOnTouchEnd"
      @touchmove="zypStickOnMove"
      id="z_track"
      class="track"
    >
      <VerticalLine id="z_track_indi" color="#0500FF"></VerticalLine>
    </div>
    <div id="YPrime_track" class="track">
      <HorizontalLine id="yprime_track_indi" color="#0500FF"></HorizontalLine>
    </div>
    <div
      :style="`top: ${zypStickTop}; left: ${zypStickLeft}`"
      id="zyp_stick_representation"
    ></div>
    <div
      @touchstart="zypStickOnTouchStart"
      :style="`top: ${zypStickTop}; left: ${zypStickLeft}`"
      @touchend="zypStickOnTouchEnd"
      @touchmove="zypStickOnMove"
      id="zyp_stick"
    ></div>
  </div>
  <BaseLabel
    @click="onFullScreenButtonClick"
    id="fs_btn"
    v-text="FullScreenButtonTextController()"
  ></BaseLabel>
  <BaseLabel id="alt_input_display" v-text="`${ZInput}m/s`"></BaseLabel>
  <BaseLabel id="yaw_input_display" v-text="`${YPrimeInput}°/s`"></BaseLabel>
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
.track {
  display: flex;
  align-items: center;
  justify-content: center;
}
#z_track {
  position: absolute;
  height: 100%;
  width: 10vh;

  background-color: #ffffff01;
}
#z_track_indi {
  top: 0%;
  height: 100%;
}
#yprime_track_indi {
  left: 0%;
  width: 100%;
}
#YPrime_track {
  width: 100%;
  height: 10vh;
  background-color: #ffffff01;
}
#zyp_stick {
  position: absolute;
  width: 8vh;
  height: 8vh;
  background-color: #ffffff00;
  transform: rotate(-45deg);
  z-index: 50;
}
#zyp_stick_representation {
  position: absolute;
  width: 5vh;
  height: 5vh;
  background-color: #0500ff80;
  z-index: 2;
}
#alt_input_display,
#yaw_input_display {
  top: 40.277777778%;
  left: 24.375%;
  font-size: 4vh;
}
#yaw_input_display {
  left: 44.375%;
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