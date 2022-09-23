
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
</script>


<script lang="ts">
export default {
  components: {
    ConsoleLowerLateralSectionBkg,
  },
  mounted() {
  },
};
</script>
    
<template>
  <CMD_VultureVideoDownlinkPlaceholder
    id="cmd_overview_video_downlink_indi"
    color="#303030"
  ></CMD_VultureVideoDownlinkPlaceholder>
  <VultureDetailedDeco
    color="#303030"
    id="detailed_vulture_deco"
  ></VultureDetailedDeco>
  <AuroraLogo id="aurora_logo" color="#303030"></AuroraLogo>
  <BaseLabel
    id="vulture_downlink_l"
    color="#303030"
    v-text="'Vulture Video Downlink /|/'"
  ></BaseLabel>
  <div id="ui_overlay_container">
    <ConsoleMidSectionBkg id="console_lower_mid_bkg"></ConsoleMidSectionBkg>
    <ConsoleMidSectionBkg id="console_top_mid_bkg"></ConsoleMidSectionBkg>
    <ConsoleMidSectionBkg
      id="console_vertical_left_side_bkg"
    ></ConsoleMidSectionBkg>
    <ConsoleMidSectionBkg
      id="console_vertical_right_side_bkg"
    ></ConsoleMidSectionBkg>
    <ConsoleLowerLateralSectionBkg
      id="console_lower_left_side_bkg"
      side="left"
      ref="lower_lateral_left_ref"
    ></ConsoleLowerLateralSectionBkg>
    <ConsoleLowerLateralSectionBkg
      id="console_lower_right_side_bkg"
      side="right"
    ></ConsoleLowerLateralSectionBkg>
  </div>
  <div id="ui_actual_container">
    <MainConsoleLowerLeft></MainConsoleLowerLeft>
  </div>
</template>
<style scoped>
#console_vertical_right_side_bkg {
  top: 50%;
  left: 75.28125%;
  transform: translateY(-50%) rotate(-90deg);
}
#console_vertical_left_side_bkg {
  top: 50%;
  left: -20.620833333%;
  transform: translateY(-50%) rotate(90deg);
}
#console_top_mid_bkg {
  top: -5.648148148%;
  left: 50%;
  transform: translate(-50%) rotate(180deg);
}
#console_lower_mid_bkg {
  top: 87.407407407%;
  left: 50%;
  transform: translate(-50%);
}
#vulture_downlink_l {
  top: 57.222222222%;
  left: 50%;
  transform: translate(-50%);
  font-size: 1.9518518518518519vh;
}
#aurora_logo {
  top: 36.574074074%;
  left: 50%;
  width: 15.516666666666667vh;
  height: 3.0787037037037037vh;
  transform: translate(-50%);
}
#detailed_vulture_deco {
  top: 42.12962963%;
  left: 50%;
  transform: translate(-50%);
  height: 12.407407407407407vh;
  width: 13.703703703703704vh;
}
#cmd_overview_video_downlink_indi {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>