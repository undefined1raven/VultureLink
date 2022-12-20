
<script setup lang="ts">
import DynamicsTelemetryOneAxis from "@/components/AT_DynamicsTelemetryOneAxis.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import BaseOptionsMenu from "@/components/BaseOptionsMenu.vue";

import percentage from "@/composables/percentage.ts";
import UIReactivityStateAssessor from "@/composables/UIReactivityAssessor.ts";
import isMobile from "@/composables/isMobile";
import RangeScaler from "@/composables/rangeScaler.ts";
</script>

<script lang="ts">
export default {
  expose: ["IMUCalibrationActual", "IMUCalibrationEnd"],
  methods: {
    IMUCalibrationUnit(inputTypeKey: string) {
      let inPitch = this.telemetry_validation().imu_alpha[inputTypeKey].pitch;
      let inRoll = this.telemetry_validation().imu_alpha[inputTypeKey].roll;
      if (inputTypeKey == "gyro") {
        inPitch =
          this.telemetry_validation().imu_alpha[inputTypeKey].pitch.angle;
        inRoll = this.telemetry_validation().imu_alpha[inputTypeKey].roll.angle;
      }
      if (inPitch > this.calibrationObj[inputTypeKey].pitch.max) {
        this.calibrationObj[inputTypeKey].pitch.max = inPitch;
      }
      if (inPitch < this.calibrationObj[inputTypeKey].pitch.min) {
        this.calibrationObj[inputTypeKey].pitch.min = inPitch;
      }
      //roll min-max
      if (inRoll > this.calibrationObj[inputTypeKey].roll.max) {
        this.calibrationObj[inputTypeKey].roll.max = inRoll;
      }
      if (inRoll < this.calibrationObj[inputTypeKey].roll.min) {
        this.calibrationObj[inputTypeKey].roll.min = inRoll;
      }
    },
    IMUCalibrationEnd() {
      clearInterval(this.calibrationObj.calibrationInterval);
    },
    IMUCalibrationActual() {
      this.calibrationObj.calibrationInterval = setInterval(() => {
        this.IMUCalibrationUnit("accelerometer");
        this.IMUCalibrationUnit("gyro");
        console.log(
          `min: ${this.calibrationObj.gyro.roll.min} | max: ${this.calibrationObj.gyro.roll.max}`
        );
      }, 20);
    },
    AxisSelectionMenuOnUpdate(args: object) {
      this.VisibleAxisID = args.btn_id;
    },
    telemetryCalibration(
      angle: number,
      calibrationKey: string,
      inputKey: string
    ) {
      if (angle >= 0) {
        return RangeScaler(
          this.telemetry_validation().imu_alpha[inputKey][calibrationKey],
          0,
          this.calibrationObj[inputKey][calibrationKey].max,
          0,
          90
        );
      } else {
        return RangeScaler(
          this.telemetry_validation().imu_alpha.accelerometer[calibrationKey],
          0,
          Math.abs(this.calibrationObj[inputKey][calibrationKey].min),
          0,
          90
        );
      }
    },
    telemetry_validation() {
      if (this.telemetry.imu_alpha.gyro == undefined) {
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
      } else {
        return this.telemetry;
      }
    },
  },
  props: {
    isIMUCalibrationRunning: { default: false },
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
  },
  mounted() {
    this.isUIMinified = UIReactivityStateAssessor();
    window.addEventListener("resize", () => {
      this.isUIMinified = UIReactivityStateAssessor();
    });
  },
  unmounted() {
    window.removeEventListener("resize", () => {});
  },
  data() {
    return {
      calibrationObj: {
        accelerometer: {
          pitch: { max: 0, min: 0 },
          roll: { max: 0, min: 0 },
        },
        gyro: {
          pitch: { max: 0, min: 0 },
          roll: { max: 0, min: 0 },
        },
        calibrationInterval: 0,
      },
      isUIMinified: 0 /*is UI below the reactivity width threshold || 0 == normal || 1 == half width */,
      VisibleAxisID: "x",
      AxisSelectionMenuItems: [
        { label: "Pitch", btn_id: "x" },
        { label: "Roll", btn_id: "y" },
        { label: "Yaw", btn_id: "z" },
      ],
    };
  },
};
</script>

<template>
  <div id="dynamics_telemetry_container">
    <BaseOptionsMenu
      v-if="isUIMinified == 1 || isMobile()"
      id="axis_selection_menu"
      @update="AxisSelectionMenuOnUpdate"
      :menuItems="AxisSelectionMenuItems"
      height="29.176470588%"
      width="46.506550218%"
    ></BaseOptionsMenu>
    <VerticalLine id="dynamics_telemetry_line" color="#373737"></VerticalLine>
    <BaseLabel
      v-if="!isMobile()"
      id="dynamics_telemetry_l"
      class="animation_group_0"
      v-text="'Telemetry'"
    ></BaseLabel>
    <DynamicsTelemetryOneAxis
      v-show="
        (isUIMinified == 0 && !isMobile()) ||
        ((isUIMinified == 1 || isMobile()) && VisibleAxisID == 'x')
      "
      id="x_axis_telemetry_container"
      ref="x_axis_telemetry"
      axis_id="Pitch"
      :imu_alpha_axis_telemetry="{
        angle: telemetryCalibration(
          telemetry_validation().imu_alpha.gyro.pitch.angle,
          'pitch',
          'gyro'
        ), rate: telemetry_validation().imu_alpha.gyro.pitch.rate
      }"
      :imu_beta_axis_telemetry="{
        angle: telemetryCalibration(
          telemetry_validation().imu_alpha.accelerometer.pitch,
          'pitch',
          'accelerometer'
        ),
        rate: 0,
      }"
      class="animation_group_0"
    />
    <DynamicsTelemetryOneAxis
      v-show="
        (isUIMinified == 0 && !isMobile()) ||
        ((isUIMinified == 1 || isMobile()) && VisibleAxisID == 'y')
      "
      id="y_axis_telemetry_container"
      axis_id="Roll"
      :imu_alpha_axis_telemetry="{
        angle: telemetryCalibration(
          telemetry_validation().imu_alpha.gyro.roll.angle,
          'roll',
          'gyro'
        ), rate: telemetry_validation().imu_alpha.gyro.roll.rate
      }"
      :imu_beta_axis_telemetry="{
        angle:
          telemetryCalibration(
            telemetry_validation().imu_alpha.accelerometer.roll,
            'roll',
            'accelerometer'
          ) * -1,
        rate: 0,
      }"
      class="animation_group_0"
    />
    <DynamicsTelemetryOneAxis
      v-show="
        (isUIMinified == 0 && !isMobile()) ||
        ((isUIMinified == 1 || isMobile()) && VisibleAxisID == 'z')
      "
      id="z_axis_telemetry_container"
      axis_id="Yaw"
      :imu_alpha_axis_telemetry="telemetry_validation().imu_alpha.gyro.yaw"
      :imu_beta_axis_telemetry="{
        angle: 0,
        rate: 0,
      }"
      class="animation_group_0"
    />
  </div>
</template>
<style scoped>
#dynamics_telemetry_line {
  top: 0%;
  left: 99%;
  height: 100%;
}
@keyframes ini_ani {
  0% {
    transform: translateY(-25%);
  }
  100% {
    transform: translateY(0);
  }
}
#dynamics_telemetry_l {
  top: 0%;
  left: 0;
  font-size: 2.1vh;
}
#x_axis_telemetry_container {
  top: 12.235294118%;
  left: 0%;
}
#y_axis_telemetry_container {
  top: 12.235294118%;
  left: 34.058514629%;
}
#z_axis_telemetry_container {
  top: 12.235294118%;
  left: 68.117029257%;
}
.post_ani {
  transform: translateY(0%) !important;
}
.animation_group_0 {
  animation: ini_ani cubic-bezier(0.59, 0.23, 0.49, 1.07) 0.15s;
}
#dynamics_telemetry_container {
  position: absolute;
  top: 9.074074074%;
  left: 5.052083333%;
  width: 69.427083333%;
  height: 39.351851852%;
}
@media only screen and (max-width: 1070px) and (min-height: 550px) {
  #axis_selection_menu {
    top: 15.058823529%;
    left: 45.633187773%;
    z-index: 10 !important;
  }
  #dynamics_telemetry_line {
    left: 105%;
  }
  #dynamics_telemetry_container {
    width: 47.708333333%;
  }
  #x_axis_telemetry_container,
  #y_axis_telemetry_container,
  #z_axis_telemetry_container,
  #dynamics_telemetry_l {
    left: 7.641921397%;
  }
}
@media only screen and (max-width: 1500px) and (min-height: 850px) {
  #axis_selection_menu {
    top: 15.058823529%;
    left: 45.633187773%;
    z-index: 10 !important;
  }
  #dynamics_telemetry_line {
    left: 105%;
  }
  #dynamics_telemetry_container {
    width: 47.708333333%;
  }
  #x_axis_telemetry_container,
  #y_axis_telemetry_container,
  #z_axis_telemetry_container,
  #dynamics_telemetry_l {
    left: 7.641921397%;
  }
}
@media only screen and (max-width: 1996.8px) and (min-height: 1200px) {
  #axis_selection_menu {
    top: 15.058823529%;
    left: 45.633187773%;
    z-index: 10 !important;
  }
  #dynamics_telemetry_line {
    left: 105%;
  }
  #dynamics_telemetry_container {
    width: 47.708333333%;
  }
  #x_axis_telemetry_container,
  #y_axis_telemetry_container,
  #z_axis_telemetry_container,
  #dynamics_telemetry_l {
    left: 7.641921397%;
  }
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  #dynamics_telemetry_container {
    top: 12.4375%;
    left: 1.388888889%;
    width: 97.222222222%;
    overflow: hidden;
  }
}
</style>