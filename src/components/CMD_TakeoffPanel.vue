<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import ControlsOverviewLetter from "@/components/CMD_ControlsOverviewLetter.vue";

import isMobile from "@/composables/isMobile.ts";
import percentage from "@/composables/percentage.ts";
import rangeScaler from "@/composables/rangeScaler.ts";
</script>


<script lang="ts">
export default {
  props: {
    width: { default: "41.510416667%" },
    height: { default: "31.5185%" },
  },
  data() {
    return {
      progress: 0,
      currentDuration: 0,
      interval: false,
      isKeyDown: false,
      iniTime: 0,
    };
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      this.takeoffButtonOnKeyDown(e);
    });
    document.addEventListener("keyup", (e) => {
      this.takeoffButtonOnKeyUp(e);
    });
  },
  methods: {
    takeoffButtonOnKeyDown(e: Event) {
      let target_hold_duration = 3000; //ms
      if (e.code == "Space" && !this.isKeyDown) {
        this.isKeyDown = true;
        this.iniTime = Date.now();
        this.interval = setInterval(() => {
          if (e.code == "Space") {
            this.currentDuration = Math.abs(Date.now() - this.iniTime);
            this.progress = rangeScaler(
              this.currentDuration,
              0,
              target_hold_duration,
              0,
              100
            );
            if (Math.round(this.progress) == 100) {
              this.$emit("launchSignal");
              this.takeoffButtonOnKeyUp({code: "Space"});
            }
          }
        }, 20);
      }
    },
    takeoffButtonOnKeyUp(e: Event) {
      if (e.code == "Space" && this.isKeyDown) {
        if (this.interval) {
          clearInterval(this.interval);
          this.interval = false;
        }
        this.isKeyDown = false;
        this.currentDuration = 0;
        this.progress = 0;
      }
    },
  },
};
</script>


<template>
  <div
    class="cmd_takeoff_panel_container"
    :style="`width: ${width}; height: ${height};`"
  >
    <HorizontalLine id="takeoff_panel_ln" color="#0500FF"></HorizontalLine>
    <BaseLabel id="takeoff_panel_l" v-text="'Automatic Takeoff'"></BaseLabel>
    <BaseLabel id="takeoff_panel_details_l_0_0" v-text="'Hold'"></BaseLabel>
    <BaseLabel id="takeoff_panel_details_l_0_1" v-text="'Space'"></BaseLabel>
    <BaseLabel
      id="takeoff_panel_details_l_0_2"
      v-text="'3 seconds for takeoff'"
    ></BaseLabel>
    <BaseLabel
      id="takeoff_panel_details_l_1"
      v-text="'After takeoff the Vulture will hover'"
    ></BaseLabel>
    <div id="takeoff_hold_progress_indi_container">
      <div
        :style="`width: ${progress}%;`"
        id="takeoff_hold_progress_indi_acx"
      ></div>
    </div>
  </div>
</template>
<style scoped>
#takeoff_hold_progress_indi_container {
  position: absolute;
  top: 69.291338583%;
  width: 50.223337516%;
  height: 0.768503937%;
  background-color: #99999940;
  overflow: hidden;
}
#takeoff_hold_progress_indi_acx {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: #0500ff;
}
#takeoff_panel_details_l_1 {
  top: 84.645669291%;
  font-size: 2vh;
}
#takeoff_panel_details_l_0_0,
#takeoff_panel_details_l_0_1,
#takeoff_panel_details_l_0_2 {
  top: 38.582677165%;
  left: 26.223337516%;
  font-size: 2.3vh;
}
#takeoff_panel_details_l_0_1 {
  left: 32.649686324%;
  width: 13.425345044%;
  border: solid 2px #0500ff;
  text-align: center;
  border-radius: 7px;
}
#takeoff_panel_details_l_0_2 {
  left: 47.553324969%;
}
#takeoff_panel_l {
  top: 8.267716535%;
  left: 2.25846926%;
  font-size: 2.7vh;
}
.cmd_takeoff_panel_container {
  position: absolute;
  background-color: #000000aa;
  display: flex;
  align-items: cetnter;
  justify-content: center;
}
#takeoff_panel_ln {
  top: 31.88976378%;
  left: 0%;
  width: 100%;
}
</style>