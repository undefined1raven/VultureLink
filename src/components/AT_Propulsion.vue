
<script setup lang="ts">
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import BaseTopBar from "@/components/AT_BaseTopBar.vue";
import DynamicsTelemetry from "@/components/AT_DynamicsTelemetry.vue";
import MobileDynamicsTelemetry from "@/components/AT_MobileDynamicsTelemetry.vue";
import DynamicsControls from "@/components/AT_DynamicsControls.vue";
import BaseHardwareStatus from "@/components/AT_BaseHardwareStatus.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import MobileBaseFullWidthControls from "@/components/M_BaseFullWidthSelectionControls.vue";
import PropulsionMotorUnit from "@/components/AT_PropulsionMotorUnit.vue";

import isMobile from "@/composables/isMobile.ts";
</script>

<script lang="ts">
export default {
  props: {
    current_user_un: { default: "---" },
    telemetry: {
      type: Object,
      default(rawProps: Object) {
        return {};
      },
    },
    selected_vulture_obj: { default: { vid: "", vn: "" } },
  },
  methods: {
    onMotor1NewThrustLevel(thrustLevel:number){
      this.$emit('onMotor1NewThrustLevel', thrustLevel)
    },
    onMotor2NewThrustLevel(thrustLevel:number){
      this.$emit('onMotor2NewThrustLevel', thrustLevel)
    },
    onMotor3NewThrustLevel(thrustLevel:number){
      this.$emit('onMotor3NewThrustLevel', thrustLevel)
    },
    onMotor4NewThrustLevel(thrustLevel:number){
      this.$emit('onMotor4NewThrustLevel', thrustLevel)
    },
  },
  data() {
    return {
      isDownArrowKeyDown: false,
      isUpArrowKeyDown: false,
    };
  },
  mounted() {
    document.addEventListener("keypress", (e) => {
      if (e.key.toLowerCase() == "s") {
        this.$refs.motor1ControlUnit.cutThrust();
        this.$refs.motor2ControlUnit.cutThrust();
        this.$refs.motor3ControlUnit.cutThrust();
        this.$refs.motor4ControlUnit.cutThrust();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key == "ArrowUp") {
        this.isUpArrowKeyDown = true;
      }
      if (e.key == "ArrowDown") {
        this.isDownArrowKeyDown = true;
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.key == "ArrowUp") {
        this.isUpArrowKeyDown = false;
      }
      if (e.key == "ArrowDown") {
        this.isDownArrowKeyDown = false;
      }
    });
    setInterval(() => {
      if (this.isUpArrowKeyDown) {
        this.$refs.motor1ControlUnit.incrementManualThrust();
        this.$refs.motor2ControlUnit.incrementManualThrust();
        this.$refs.motor3ControlUnit.incrementManualThrust();
        this.$refs.motor4ControlUnit.incrementManualThrust();
      }
      if (this.isDownArrowKeyDown) {
        this.$refs.motor1ControlUnit.decrementManualThrust();
        this.$refs.motor2ControlUnit.decrementManualThrust();
        this.$refs.motor3ControlUnit.decrementManualThrust();
        this.$refs.motor4ControlUnit.decrementManualThrust();
      }
    }, 100);
  },
};
</script>

<template>
  <BaseTopBar
    :SelectedVultureObject="selected_vulture_obj"
    :CurrentUsername="current_user_un"
    systemID="Propulsion"
  ></BaseTopBar>
  <BaseHardwareStatus
    v-show="!isMobile() || (isMobile() && mobile_window_id == 'telemetry')"
    :hardwareStatusArray="[]"
    :isMinifiable="true"
    :isMinifiedByDefault="true"
  ></BaseHardwareStatus>
  <MobileBaseFullWidthControls
    id="mobile_dynamics_ui_controls"
    rightSideSelectionButtonLabel="Controls"
    leftSideSelectionButtonLabel="Telemetry"
    ControlsTop="12.34375%"
    @onButtonSelected="onButtonSelectedHandler"
    v-if="isMobile()"
  ></MobileBaseFullWidthControls>
  <PropulsionMotorUnit
    ref="motor1ControlUnit"
    id="motor_1_unit"
    motorID="Motor 1"
    thrustLevelEmitEventName="onMotor1NewThrustLevel"
    @onMotor1NewThrustLevel="onMotor1NewThrustLevel"
  ></PropulsionMotorUnit>
  <PropulsionMotorUnit
    ref="motor2ControlUnit"
    id="motor_2_unit"
    motorID="Motor 2"
    thrustLevelEmitEventName="onMotor2NewThrustLevel"
    @onMotor2NewThrustLevel="onMotor2NewThrustLevel"
  ></PropulsionMotorUnit>
  <PropulsionMotorUnit
    ref="motor3ControlUnit"
    id="motor_3_unit"
    motorID="Motor 3"
    thrustLevelEmitEventName="onMotor3NewThrustLevel"
    @onMotor3NewThrustLevel="onMotor3NewThrustLevel"
  ></PropulsionMotorUnit>
  <PropulsionMotorUnit
    ref="motor4ControlUnit"
    id="motor_4_unit"
    motorID="Motor 4"
    thrustLevelEmitEventName="onMotor4NewThrustLevel"
    @onMotor4NewThrustLevel="onMotor4NewThrustLevel"
  ></PropulsionMotorUnit>
  <VerticalLine id="prop_ln_0" color="#373737"></VerticalLine>
  <VerticalLine id="prop_ln_1" color="#373737"></VerticalLine>
  <HorizontalLine id="prop_ln_2" color="#373737"></HorizontalLine>
  <HorizontalLine id="prop_ln_3" color="#373737"></HorizontalLine>
  <VerticalLine id="prop_ln_4" color="#373737"></VerticalLine>
  <VerticalLine id="prop_ln_5" color="#373737"></VerticalLine>
  <VerticalLine id="prop_ln_6" color="#373737"></VerticalLine>
</template>

<style scoped>
#prop_ln_6{
  top: 14.259259259%;
  left: 71.197916667%;
  height: 71.481481481%;
}
#prop_ln_4, #prop_ln_5{
  top: 46.851851852%;
  left: 38.541666667%;
  height: 6.203703704%;
}
#prop_ln_5{
  transform: rotate(-90deg);
}
#prop_ln_2{
  top: 49.907407407%;
  left: 7.760416667%;
  width: 26.666666667%;
}
#prop_ln_3{
  top: 49.907407407%;
  left: 42.65625%;
  width: 26.666666667%;
}
#prop_ln_0, #prop_ln_1{
  top: 14.259259259%;
  left: 38.541666667%;
  height: 29.537037037%;
}
#prop_ln_1{
  top: 56.203703704%;
}
#motor_1_unit {
  top: 14.259259259%;
  left: 7.760416667%;
}
#motor_2_unit{
  top: 14.259259259%;
  left: 42.65625%;
}
#motor_3_unit{
  top: 56.203703704%;
  left: 7.760416667%;
}
#motor_4_unit{
  top: 56.203703704%;
  left: 42.65625%;
}
</style>