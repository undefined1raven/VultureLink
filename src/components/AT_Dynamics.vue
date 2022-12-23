
<script setup lang="ts">
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import BaseTopBar from "@/components/AT_BaseTopBar.vue";
import DynamicsTelemetry from "@/components/AT_DynamicsTelemetry.vue";
import MobileDynamicsTelemetry from "@/components/AT_MobileDynamicsTelemetry.vue";
import DynamicsControls from "@/components/AT_DynamicsControls.vue";
import DynamicsHardwareStatus from "@/components/AT_BaseHardwareStatus.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import MobileBaseFullWidthControls from "@/components/M_BaseFullWidthSelectionControls.vue";

import isMobile from "@/composables/isMobile.ts";
</script>

<script lang="ts">
export default {
  props: {
    vulture_connection: {
      default: { lastUnix: 0, status: false, signal_emit_last_unix: 0 },
    },
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
  data() {
    return {
      isIMUCalibrationRunning: false,
      vulture_connection_display_status: 0,
      mobile_window_id:
        "telemetry" /*mobile interface has 2 subcomponents: telmetry | controls */,
      hardware_status_arr: [
        {
          name: "IMU Alpha",
          telemetry: { latency: true, data: true },
          hardware_connection: true,
        },
        {
          name: "IMU Beta",
          telemetry: { latency: false, data: true },
          hardware_connection: false,
        },
      ],
    };
  },
  methods: {
    hasValidTelemetry() {
      if (this.telemetry.imu_alpha.gyro == undefined) {
        return false;
      } else {
        return true;
      }
    },
    IMUCalibrationOnStart() {
      this.isIMUCalibrationRunning = true;
      this.$refs.DynamicsTelemetryRef.IMUCalibrationActual();
    },
    IMUCalibrationOnEnd() {
      this.isIMUCalibrationRunning = false;
      this.$refs.DynamicsTelemetryRef.IMUCalibrationEnd();
    },
    onButtonSelectedHandler(args: object) {
      if (args.selectedButtonID == "left") {
        this.mobile_window_id = "telemetry";
      } else {
        this.mobile_window_id = "controls";
      }
    },
    onNewRange(args:object){
      this.$refs.DynamicControlsRef.pulseRangeIndicator(args.type, args.axis, args.rangeEnd)
    },
  },
};
</script>

<template>
  <BaseTopBar
    :SelectedVultureObject="selected_vulture_obj"
    :CurrentUsername="current_user_un"
    systemID="Dynamics"
    :ConnectionStatus="vulture_connection.status"
    ref="baseTopBarRef"
  ></BaseTopBar>
  <DynamicsTelemetry
    v-if="!isMobile()"
    :telemetry="telemetry"
    :isIMUCalibrationRunning="isIMUCalibrationRunning"
    ref="DynamicsTelemetryRef"
    @onNewRange="onNewRange"
  ></DynamicsTelemetry>

  <MobileDynamicsTelemetry
    v-if="isMobile() && mobile_window_id == 'telemetry'"
    :telemetry="telemetry"
  ></MobileDynamicsTelemetry>

  <DynamicsControls
    v-show="!isMobile() || (isMobile() && mobile_window_id == 'controls')"
    @IMUCalibrationOnStart="IMUCalibrationOnStart"
    @IMUCalibrationOnEnd="IMUCalibrationOnEnd"
    :hasValidTelemetry="hasValidTelemetry()"
    ref="DynamicControlsRef"
  ></DynamicsControls>

  <DynamicsHardwareStatus
    v-show="!isMobile() || (isMobile() && mobile_window_id == 'telemetry')"
    :hardwareStatusArray="hardware_status_arr"
    :isMinifiable="false"
    :isMinifiedByDefault="false"
  ></DynamicsHardwareStatus>

  <MobileBaseFullWidthControls
    id="mobile_dynamics_ui_controls"
    rightSideSelectionButtonLabel="Controls"
    leftSideSelectionButtonLabel="Telemetry"
    ControlsTop="12.34375%"
    @onButtonSelected="onButtonSelectedHandler"
    v-if="isMobile()"
  ></MobileBaseFullWidthControls>
</template>
<style scoped>
#mobile_dynamics_ui_controls {
  top: 0.6% !important;
}
</style>