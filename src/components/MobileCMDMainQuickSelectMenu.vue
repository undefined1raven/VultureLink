<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import BaseLandingIndi from "@/components/BaseLandingIndi.vue";

import isMobile from "@/composables/isMobile.ts";
import percentage from "@/composables/percentage.ts";
import rangeScaler from "@/composables/rangeScaler.ts";
</script>

<script lang="ts">
export default {
  methods: {
    menuToggleButtonOnClick() {
      this.isExtended = !this.isExtended;
      if (this.isExtended) {
        this.menuContainerLeft = 0;
      } else {
        this.menuContainerLeft = -78.571428571;
      }
    },
    landingAssistButtonOnClick(){
        this.menuToggleButtonOnClick();
        this.$emit('landingAssistOnToggle');
    },
    RTHButtonOnClick(){
        this.menuToggleButtonOnClick();
    },
  },
  data() {
    return {
      isExtended: false,
      menuContainerLeft: -78.571428571,
    };
  },
};
</script>

<template>
  <div id="mobile_cmd_main_quickSelect_menu_container">
    <div id="menu_container_acx" :style="`left: ${menuContainerLeft}%;`">
      <BaseLabel @click="RTHButtonOnClick" class="btn" id="rth_btn" v-text="'RTH'"></BaseLabel>
      <div @click="landingAssistButtonOnClick" class="btn" id="landing_assist_btn">
        <BaseLandingIndi></BaseLandingIndi>
      </div>
      <div @click="menuToggleButtonOnClick" class="btn" id="menu_toggle_btn">
        <VerticalLine color="#0500FF" class="menu_toggle_btn_deco" id="menu_toggle_btn_deco_left"></VerticalLine>
        <VerticalLine color="#0500FF" class="menu_toggle_btn_deco" id="menu_toggle_btn_deco_right"></VerticalLine>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu_toggle_btn_deco{
    height: 75%;
}
#menu_toggle_btn_deco_left{
    left: 35%;
}
#menu_toggle_btn_deco_right{
    left: 60%;
}
#mobile_cmd_main_quickSelect_menu_container {
  position: absolute;
  top: 0%;
  left: 15.3125%;
  width: 21.875%;
  height: 12.222222222%;
  border-left: solid 1px #0500ff;
  overflow: hidden;
}
#menu_container_acx {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  transition: all ease-out 0.1s;
}
.btn {
  position: absolute;
  top: 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px #0500ff;
  height: 91%;
  background-color: #0500ff20;
  width: 14vh;
  transition: background-color linear 0.1s;
}
.btn:hover {
  background-color: #0500ff60;
}
#rth_btn {
  left: 7.142857143%;
  font-size: 3.6vh;
}
#landing_assist_btn {
  left: 46.428571429%;
}
#menu_toggle_btn {
  left: 84.314285714%;
  width: 14.285714286%;
}
</style>
