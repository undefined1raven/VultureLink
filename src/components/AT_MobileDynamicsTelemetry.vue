<script setup lang="ts">
import BaseLineGraph from "@/components/BaseLineGraph.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import VerticalLine from "@/components/VerticalLine.vue";

import percentage from "@/composables/percentage.ts";
import UIReactivityStateAssessor from "@/composables/UIReactivityAssessor.ts";
import isMobile from "@/composables/isMobile";
</script>

<script lang="ts">
export default {
  mounted() {
    setInterval(() => {
      this.ft = this.getRandomInt(-90, 90);
      this.fx = this.getRandomInt(-300, 300);
    }, 1000);
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
  data() {
    return {
      dataSource:
        "alpha" /*selects the sensor feeding the telemetry to the UI */,
      ft: 0,
      fx: 0,
    };
  },
  methods: {
    getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //max e | min i
    },
    telemetry_parser() {
      if (this.dataSource == "alpha") {
        return this.telemetry_validation().imu_alpha
          .gyro; /*built in accel acts like IMU Beta for now */
      } else {
        return this.telemetry_validation().imu_alpha.accelerometer;
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
};
</script>

<template>
  <div id="mobile_dynamics_telemetry_container">
    <BaseLineGraph
      id="pitch_angle_graph"
      width="100%"
      height="1.724137931%"
      :min="-90"
      :max="90"
      :input="ft"
    ></BaseLineGraph>
    <BaseLineGraph
      id="pitch_angle_accel"
      width="100%"
      height="0.574712644%"
      :min="-300"
      :max="300"
      :input="fx"
    ></BaseLineGraph>
  </div>
</template>
<style scoped>
#mobile_dynamics_telemetry_container {
  position: absolute;
  top: 16.71875%;
  left: 1.111111111%;
  width: 97.777777778%;
  height: 27.1875%;
}
#pitch_angle_graph {
  top: 44.252873563%;
  left: 0%;
}
#pitch_angle_accel{
    top: 47.701149425%;
    left: 0%;
}
</style>
