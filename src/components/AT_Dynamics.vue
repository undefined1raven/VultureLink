
<script setup lang="ts">
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import BaseTopBar from "@/components/AT_BaseTopBar.vue";
import DynamicsTelemetry from "@/components/AT_DynamicsTelemetry.vue";
import MobileDynamicsTelemetry from "@/components/AT_MobileDynamicsTelemetry.vue";
import DynamicsControls from "@/components/AT_DynamicsControls.vue";
import DynamicsHardwareStatus from "@/components/AT_DynamicsHardwareStatus.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import MobileBaseFullWidthControls from "@/components/M_BaseFullWidthSelectionControls.vue";

import isMobile from "@/composables/isMobile.ts";
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
  <BaseTopBar
    :SelectedVultureObject="selected_vulture_obj"
    :CurrentUsername="current_user_un"
  ></BaseTopBar>
  <DynamicsTelemetry v-if="!isMobile()" :telemetry="telemetry"></DynamicsTelemetry>
  <MobileDynamicsTelemetry v-if="isMobile()" :telemetry="telemetry"></MobileDynamicsTelemetry>
  <DynamicsControls></DynamicsControls>
  <DynamicsHardwareStatus></DynamicsHardwareStatus>
  <MobileBaseFullWidthControls
    id="mobile_dynamics_ui_controls"
    rightSideSelectionButtonLabel="Telemetry"
    leftSideSelectionButtonLabel="Controls"
    ControlsTop="12.34375%"
    v-if="isMobile()"
  ></MobileBaseFullWidthControls>
</template>
<style scoped>
  #mobile_dynamics_ui_controls{
    top: 0.6% !important;
  }
</style>