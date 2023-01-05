
<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";

import UIReactivityStateAssessor from "@/composables/UIReactivityAssessor.ts";
import isMobile from "@/composables/isMobile.ts";
</script>

<script lang="ts">
export default {
  props: {
    motorID: { default: "--" },
    FCThrustLevel: { default: 0 },
    thrustLevelEmitEventName: { default: "--" },
  },
  mounted() {
    this.emitterInterval = setInterval(() => {
      if (this.armButtonStatus && this.enablerButtonStatus) {
        if (
          this.inputSourceButtonStatus == "manual" ||
          this.inputSourceButtonStatus == "lock"
        ) {
          this.emitThrustLevel(this.thrustLevel);
        }
      }
      if (this.inputSourceButtonStatus == "FC") {
        this.emitThrustLevel(this.FCThrustLevel);
      }
    }, 20);
  },
  unmounted() {},
  expose: ["incrementManualThrust", "decrementManualThrust", "cutThrust"],
  methods: {
    emitThrustLevel(thrustLevel: number) {
      this.$emit(this.thrustLevelEmitEventName, thrustLevel);
    },
    cutThrust() {
      if (
        this.armButtonStatus &&
        this.enablerButtonStatus &&
        this.inputSourceButtonStatus != "lock"
      ) {
        this.thrustLevel = 0;
      }
    },
    incrementManualThrust() {
      if (
        this.thrustLevel < 100 &&
        this.armButtonStatus &&
        this.enablerButtonStatus &&
        this.inputSourceButtonStatus != "lock"
      ) {
        this.thrustLevel += 1;
      }
    },
    decrementManualThrust() {
      if (
        this.thrustLevel > 0 &&
        this.armButtonStatus &&
        this.enablerButtonStatus &&
        this.inputSourceButtonStatus != "lock"
      ) {
        this.thrustLevel -= 1;
      }
    },
    thrustLevelOriginController() {
      if (
        this.inputSourceButtonStatus == "manual" ||
        this.inputSourceButtonStatus == "lock"
      ) {
        return this.thrustLevel;
      }
      if (this.inputSourceButtonStatus == "FC") {
        return this.FCThrustLevel;
      }
    },
    SafeIndicatorController() {
      if (this.enablerButtonStatus) {
        return { label: "Unsafe", color: "#FF003D" };
      } else {
        return { label: "Safe", color: "#00FFD1" };
      }
    },
    CurrentMotorUnitStatusLabelController() {
      if (this.armButtonStatus) {
        if (!this.enablerButtonStatus) {
          return {
            label: "Ready to start sending signals to the motor",
            color: "#FFF",
          };
        }
        if (
          this.enablerButtonStatus &&
          this.inputSourceButtonStatus == "manual"
        ) {
          return {
            label: "Emitting manual thrust level to the motor",
            color: "#FFF",
          };
        }
        if (this.enablerButtonStatus && this.inputSourceButtonStatus == "FC") {
          return {
            label:
              "Emitting the thrust level from the flight controller to the motor",
            color: "#FFF",
          };
        }
        if (
          this.enablerButtonStatus &&
          this.inputSourceButtonStatus == "lock"
        ) {
          return {
            label: "Emitting the current thrust level to the motor",
            color: "#FFF",
          };
        }
      } else {
        return { label: "Ready to arm", color: "#00FFD1" };
      }
    },
    InputSourceButtonOnClick(e: Event, styleControllerKey: string) {
      if (this.armButtonStatus) {
        switch (this.inputSourceButtonStatus) {
          case "manual":
            this.inputSourceButtonStatus = "FC";
            break;
          case "FC":
            this.inputSourceButtonStatus = "lock";
            break;
          case "lock":
            this.inputSourceButtonStatus = "manual";
            break;
          default:
            "manual";
            break;
        }
        e.target.style.backgroundColor = `${
          this[styleControllerKey]().color
        }20`;
      }
    },
    armButtonOnClick(e: Event, styleControllerKey: string) {
      this.armButtonStatus = !this.armButtonStatus;
      e.target.style.backgroundColor = `${this[styleControllerKey]().color}20`;
      if (!this.armButtonStatus) {
        this.enablerButtonStatus = false;
        this.inputSourceButtonStatus = "manual";
        this.thrustLevel = 0;
      }
    },
    enablerButtonOnClick(e: Event, styleControllerKey: string) {
      if (this.armButtonStatus) {
        this.enablerButtonStatus = !this.enablerButtonStatus;
        e.target.style.backgroundColor = `${
          this[styleControllerKey]().color
        }20`;
      }
    },
    buttonMouseEnter(e: Event, styleControllerKey: string) {
      if (
        ((styleControllerKey == "enablerButtonStyleController" ||
          styleControllerKey == "inputSourceButtonStyleController") &&
          this.armButtonStatus) ||
        styleControllerKey == "armButtonStyleController"
      ) {
        e.target.style.backgroundColor = `${
          this[styleControllerKey]().color
        }20`;
      }
    },
    buttonMouseLeave(e: Event) {
      e.target.style.backgroundColor = "#0500FF00";
    },
    armButtonStyleController() {
      if (this.armButtonStatus) {
        return { label: "Armed", color: "#8C00FF", textColor: "#8C00FF" };
      } else {
        return { label: "Arm", color: "#0500FF", textColor: "#FFF" };
      }
    },
    enablerButtonStyleController() {
      if (this.enablerButtonStatus) {
        return { label: "Ready", color: "#00FFD1", textColor: "#00FFD1" };
      } else {
        if (!this.armButtonStatus) {
          return { label: "Stand By", color: "#666", textColor: "#666" };
        } else {
          return { label: "Stand By", color: "#0500FF", textColor: "#FFF" };
        }
      }
    },
    inputSourceButtonStyleController() {
      if (this.inputSourceButtonStatus == "manual") {
        if (!this.armButtonStatus) {
          return { label: "Manual", color: "#666", textColor: "#666" };
        } else {
          return { label: "Manual", color: "#0500FF", textColor: "#FFF" };
        }
      }
      if (this.inputSourceButtonStatus == "FC") {
        return { label: "FC", color: "#8C00FF", textColor: "#8C00FF" };
      }
      if (this.inputSourceButtonStatus == "lock") {
        return {
          label: "Control Lock",
          color: "#C80030",
          textColor: "#C80030",
        };
      }
    },
  },
  data() {
    return {
      emitterInterval: 0,
      thrustLevel: 0,
      armButtonStatus: false, // false == disarmed | true == armed
      enablerButtonStatus: false, // false == standby | true == ready (emitting/receving)
      inputSourceButtonStatus: "manual", // manual / FC / lock at current lvl
    };
  },
};
</script>

<template>
  <div class="propulsion_motor_unit_container">
    <BaseLabel v-text="motorID" class="motorID_l"></BaseLabel>
    <div class="propulsion_motor_unit_container_bkg"></div>
    <BaseLabel v-text="'Controls'" color="#999" class="controls_l"></BaseLabel>
    <BaseLabel
      @mouseenter="buttonMouseEnter($event, 'armButtonStyleController')"
      @mouseleave="buttonMouseLeave"
      @click="armButtonOnClick($event, 'armButtonStyleController')"
      v-text="armButtonStyleController().label"
      :style="`border: solid 1px ${armButtonStyleController().color}; color: ${
        armButtonStyleController().textColor
      };`"
      class="arm_btn btn"
    ></BaseLabel>
    <BaseLabel
      @mouseenter="buttonMouseEnter($event, 'enablerButtonStyleController')"
      @mouseleave="buttonMouseLeave"
      @click="enablerButtonOnClick($event, 'enablerButtonStyleController')"
      v-text="enablerButtonStyleController().label"
      :style="`border: solid 1px ${
        enablerButtonStyleController().color
      }; color: ${enablerButtonStyleController().textColor};`"
      class="enabler_btn btn"
    ></BaseLabel>
    <BaseLabel
      @mouseenter="buttonMouseEnter($event, 'inputSourceButtonStyleController')"
      @mouseleave="buttonMouseLeave"
      @click="
        InputSourceButtonOnClick($event, 'inputSourceButtonStyleController')
      "
      v-text="inputSourceButtonStyleController().label"
      :style="`border: solid 1px ${
        inputSourceButtonStyleController().color
      }; color: ${inputSourceButtonStyleController().textColor};`"
      class="input_source_btn btn"
    ></BaseLabel>
    <HorizontalLine class="motor_unit_ln_0" color="#0400B5"></HorizontalLine>
    <HorizontalLine class="motor_unit_ln_1" color="#0400B5"></HorizontalLine>
    <BaseLabel v-text="'Status'" color="#999" class="status_l"></BaseLabel>
    <BaseLabel
      v-text="CurrentMotorUnitStatusLabelController()?.label"
      :color="CurrentMotorUnitStatusLabelController()?.color"
      class="current_motor_unit_status_l"
    ></BaseLabel>
    <BaseLabel
      v-text="SafeIndicatorController()?.label"
      :style="`background-color: ${
        SafeIndicatorController()?.color
      }20; color: ${SafeIndicatorController()?.color};`"
      class="safe_indicator_l"
    ></BaseLabel>
    <div class="motor_unit_thurst_bar_container">
      <div
        :style="`left: ${thrustLevelOriginController() - 100}%`"
        class="motor_unit_thurst_bar_actual"
      ></div>
      <BaseLabel
        v-text="`${thrustLevelOriginController()}%`"
        color="#FFF"
        class="motor_unit_thurst_bar_l"
      ></BaseLabel>
      <VerticalLine color="#000" class="thrust_bar_ln_0"></VerticalLine>
      <VerticalLine color="#000" class="thrust_bar_ln_1"></VerticalLine>
      <VerticalLine color="#000" class="thrust_bar_ln_2"></VerticalLine>
    </div>
  </div>
</template>

<style scoepd>
.thrust_bar_ln_0 {
  top: 0%;
  left: 25%;
  height: 100%;
}
.thrust_bar_ln_1 {
  top: 0%;
  left: 50%;
  height: 100%;
}
.thrust_bar_ln_2 {
  top: 0%;
  left: 75%;
  height: 100%;
}
.motor_unit_thurst_bar_l {
  left: 1.035196687%;
  font-size: 2vh;
}
.motor_unit_thurst_bar_actual {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: #0500ffaa;
}
.motor_unit_thurst_bar_container {
  position: absolute;
  top: 84.326018809%;
  left: 1.5625%;
  width: 95.735938%;
  height: 10.031347962%;
  overflow: hidden;
  background-color: #29292930;
  border-left: solid 1px #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.safe_indicator_l {
  top: 0%;
  left: 71.2890625%;
  width: 28.7109375%;
  height: 13.166144201%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color linear 0.1s;
}
.current_motor_unit_status_l {
  top: 62.695924765%;
  font-size: 1.9vh !important;
  left: 1.5625%;
}
.status_l {
  top: 52.351097179%;
  left: 1.5625%;
  font-size: 1.9vh;
}
.motor_unit_ln_0 {
  top: 49.21630094%;
  left: 1.5625%;
  width: 95.7078125%;
}
.motor_unit_ln_1 {
  top: 78.369905956%;
  left: 1.5625%;
  width: 95.7078125%;
}
.arm_btn {
  top: 27.586206897%;
  left: 1.5625%;
}
.input_source_btn {
  top: 27.586206897%;
  left: 68.75%;
}
.enabler_btn {
  top: 27.586206897%;
  left: 35.7421875%;
}
.btn {
  width: 28.3203125%;
  height: 17.24137931%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2vh;
  transition: background-color linear 0.1s;
}
.controls_l {
  top: 16.300940439%;
  left: 1.5625%;
  font-size: 1.9vh;
}
.propulsion_motor_unit_container {
  position: absolute;
  width: 26.666666667%;
  height: 29.537037037%;
}
.propulsion_motor_unit_container_bkg {
  position: absolute;
  top: 13.793103448%;
  left: 0%;
  width: 100%;
  height: 86.206896552%;
  background-color: #00034d30;
}
.motorID_l {
  top: 0%;
  left: 0%;
  width: 69.53125%;
  height: 13.166144201%;
  font-size: 2vh;
  padding-left: 1.5625%;
  display: flex;
  align-items: center;
  border-left: solid 1px #0500ff;
  background-color: #0500ff30;
}
</style>