
<script setup lang="ts">
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import CMD_VultureVideoDownlinkPlaceholder from "@/components/CMD_VultureVideoDownlinkPlaceholderIndi.vue";
import VultureDetailedDeco from "@/components/VultureDetailedDeco.vue";
import AuroraLogo from "@/components/AuroraLogo.vue";
import ConsoleMidSectionBkg from "@/components/CMD_ConsoleMidSectionBkg.vue";
import ConsoleLowerLateralSectionBkg from "@/components/CMD_ConsoleLowerLateralSectionBkg.vue";
import MainConsoleLowerLeft from "@/components/CMD_MainConsoleLowerLeft.vue";
import isMobile from "@/composables/isMobile.ts";
import percentage from "@/composables/percentage.ts";
import scale from "@/composables/scale.ts";
</script>


<script lang="ts">
export default {
  methods: {
    UI_assessor() {
      let root = document.documentElement;
      let primaryContainerWidth = percentage(
        scale(450, 1920),
        document.documentElement.clientWidth
      );
      this.screenAspectRatio = root.clientWidth / root.clientHeight;
      this.primaryContainerStyle = `width: ${primaryContainerWidth + (Math.abs(1.971252567 - this.screenAspectRatio) * 10)}%;`;
    },
  },
  mounted() {
    this.UI_assessor();
    window.addEventListener("resize", () => {
      this.UI_assessor();
    });
  },
  unmounted() {
    window.removeEventListener("resize", () => {});
  },
  data() {
    return {
      primaryContainerStyle: "",
      screenAspectRatio:
        document.documentElement.clientWidth /
        document.documentElement.clientHeight,
    };
  },
};
</script>


<template>
  <div id="cmd_main_console_lower_left_container">
    <div
      id="cmd_main_console_lower_left_primary_container"
      :style="primaryContainerStyle"
    ></div>
  </div>
</template>
<style scoped>
#cmd_main_console_lower_left_primary_container {
  position: absolute;
  top: 87.5%;
  left: 0%;
  width: 27.1875%;
  height: 12.5%;
  background-color: #55555540;
}
</style>