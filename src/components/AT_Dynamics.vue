
<script setup lang="ts">
import VultureLogoMin from "@/components/VultureLogoMin.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import UserDropdownMenu from "@/components/UserDropdownMenu.vue";
import DynamicsTelemetry from "@/components/AT_DynamicsTelemetry.vue";
import DynamicsControls from "@/components/AT_DynamicsControls.vue";
import DynamicsHardwareStatus from "@/components/AT_DynamicsHardwareStatus.vue";
import Label from "@/components/Label.vue";
</script>

<script lang="ts">
export default {
  props: {
    current_user_un: { default: "---" },
    telemetry: {
      type: Object,
      default(rawProps: Object) {
        return {
          imu_alpha: {
            gyro: {
              pitch: { angle: 0, rate: 0 },
              roll: { angle: 0, rate: 0 },
              yaw: { angle: 0, rate: 0 },
            },
            accelerometer: { pitch: 0, roll: 0 },
          },
        };
      },
    },
    selected_vulture_obj: { default: { vid: "", vn: "" } },
  },
};
</script>

<template>
  <div id="top_bar_container">
    <VultureLogoMin id="vulture_logo_min" />
    <VerticalLine color="#1900FF" id="logo_ln"></VerticalLine>
    <UserDropdownMenu
      ref="UserDropdownMenuRef"
      v-if="!isMobile"
      :username="current_user_un"
      top="0.740740741%"
      left="85.104166667%"
    />
    <HorizontalLine color="#1900FF" id="top_bar_ln"></HorizontalLine>
    <Label
      color="#FFF"
      id="system_l"
      v-text="`${selected_vulture_obj.vn} Systems \\\\ Dynamics`"
    ></Label>
  </div>
  <DynamicsTelemetry :telemetry="telemetry"></DynamicsTelemetry>
  <DynamicsControls></DynamicsControls>
  <DynamicsHardwareStatus></DynamicsHardwareStatus>
</template>
<style scoped>
#system_l {
  top: 1.934814815%;
  left: 4.583333333%;
  font-size: 1vw;
}
#top_bar_ln {
  top: 7.592592593%;
  left: 0.416666667%;
  width: 98.541666667%;
}
#logo_ln {
  top: 0.740740741%;
  left: 3.333333333%;
  height: 5.462962963%;
}
#vulture_logo_min {
  top: 1.203703704%;
  left: 0.416666667%;
}
</style>