<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";

import isMobile from "@/composables/isMobile.ts";
import percentage from "@/composables/percentage.ts";
import rangeScaler from "@/composables/rangeScaler.ts";
</script>

<script lang="ts">
export default {
  methods: {
    onContextMenu(e: Event) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
    takeoffButtonOnTouchStart() {
      let ini_time = Date.now();
      let target_hold_duration = 3000; //ms
      this.interval = setInterval(() => {
        this.currentDuration = Math.abs(Date.now() - ini_time);
        this.progress = rangeScaler(
          this.currentDuration,
          0,
          target_hold_duration,
          0,
          100
        );
        if (Math.round(this.progress) == 100) {
          this.takeoffButtonOnTouchEnd();
          this.$emit("launchSignal");
        }
      }, 25);
    },
    takeoffButtonOnTouchEnd() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = false;
      }
      this.currentDuration = 0;
      this.progress = 0;
    },
  },
  data() {
    return {
      progress: 0,
      currentDuration: 0,
      interval: false,
    };
  },
};
</script>

<template>
    <div class="mobile_cmd_takeoff_btn_container">
      <BaseLabel
        id="takeoff_btn_acx"
        @contextmenu="onContextMenu"
        @touchstart="takeoffButtonOnTouchStart"
        @touchend="takeoffButtonOnTouchEnd"
        v-text="'Hold For Takeoff'"
      ></BaseLabel>
      <div id="hold_progress_indi_container">
        <div :style="`width: ${100 - progress}%;`" id="hold_progress_acx"></div>
      </div>
    </div>
</template>

<style scoped>
#hold_progress_indi_container {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 8.510638298%;
  overflow: hidden;
  border-right: solid 1px #0500ff;
}
#hold_progress_acx {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: #0500ff;
}
.mobile_cmd_takeoff_btn_container {
  position: absolute;
  background-color: #000000aa;
  width: 34.875%;
  height: 13.055555556%;
}

#takeoff_btn_acx {
  left: 0%;
  top: 8.510638298%;
  width: 99.5%;
  height: 91.489361702%;
  font-size: 5vh;
  border: solid 1px #0500ff;
  background-color: #0500ff20;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all linear 0.1s;
}
#takeoff_btn_acx:hover {
  background-color: #0500ff40;
}
</style>