
<script setup lang="ts">
import DynamicsTelemetryOneAxis from "@/components/AT_DynamicsTelemetryOneAxis.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import BaseOptionsMenu from "@/components/BaseOptionsMenu.vue";

import percentage from "@/composables/percentage.ts";
import UIReactivityStateAssessor from "@/composables/UIReactivityAssessor.ts";
</script>

<script lang="ts">
export default {
  methods: {
    AxisSelectionMenuOnUpdate(args: object) {
      this.VisibleAxisID = args.btn_id;
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
      isUIMinified: 0 /*is UI below the reactivity width threshold || 0 == normal || 1 == half width */,
      VisibleAxisID: "x",
      AxisSelectionMenuItems: [
        { label: "X Axis", btn_id: "x" },
        { label: "Y Axis", btn_id: "y" },
        { label: "Z Axis", btn_id: "z" },
      ],
    };
  },
};
</script>

<template>
  <div id="dynamics_telemetry_container">
    <BaseOptionsMenu
      v-if="isUIMinified == 1"
      id="axis_selection_menu"
      @update="AxisSelectionMenuOnUpdate"
      :menuItems="AxisSelectionMenuItems"
      height="29.176470588%"
      width="46.506550218%"
    ></BaseOptionsMenu>
    <VerticalLine id="dynamics_telemetry_line" color="#373737"></VerticalLine>
    <BaseLabel
      id="dynamics_telemetry_l"
      class="animation_group_0"
      v-text="'Telemetry'"
    ></BaseLabel>
    <DynamicsTelemetryOneAxis
      v-show="isUIMinified == 0 || (isUIMinified == 1 && VisibleAxisID == 'x')"
      id="x_axis_telemetry_container"
      axis_id="X Axis"
      :imu_alpha_axis_telemetry="telemetry_validation().imu_alpha.gyro.pitch"
      :imu_beta_axis_telemetry="{
        angle: Math.round(
          telemetry_validation().imu_alpha.accelerometer.pitch * -1
        ),
        rate: 0,
      }"
      class="animation_group_0"
    />
    <DynamicsTelemetryOneAxis
      v-show="isUIMinified == 0 || (isUIMinified == 1 && VisibleAxisID == 'y')"
      id="y_axis_telemetry_container"
      axis_id="Y Axis"
      :imu_alpha_axis_telemetry="telemetry_validation().imu_alpha.gyro.roll"
      :imu_beta_axis_telemetry="{
        angle: Math.round(
          telemetry_validation().imu_alpha.accelerometer.roll * -1
        ),
        rate: 0,
      }"
      class="animation_group_0"
    />
    <DynamicsTelemetryOneAxis
      v-show="isUIMinified == 0 || (isUIMinified == 1 && VisibleAxisID == 'z')"
      id="z_axis_telemetry_container"
      axis_id="Z Axis"
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
  left: 100%;
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
</style>