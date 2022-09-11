<script setup lang="ts">
import BaseLineGraph from "@/components/BaseLineGraph.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import BaseSwitchIndi from "@/components/BaseSwitchIndi.vue";

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
      dataSourceLabelMapping: { alpha: "IMU Alpha", beta: "IMU Beta" },
    };
  },
  methods: {
    dataSourceSwitchHandler() {
      if (this.dataSource == "alpha") {
        this.dataSource = "beta";
      } else {
        this.dataSource = "alpha";
      }
    },
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
    <BaseLabel
      id="data_source_label"
      v-text="dataSourceLabelMapping[dataSource]"
    ></BaseLabel>
    <BaseSwitchIndi
      @click="dataSourceSwitchHandler"
      id="data_source_switch_indi"
    ></BaseSwitchIndi>
    <div id="pitch_telemetry_container">
      <BaseLabel id="pitch_l" v-text="'Pitch'"></BaseLabel>
      <BaseLabel
        id="pitch_acx"
        class="x_acx"
        v-text="`${ft.toFixed(1)}° | ${fx.toFixed(1)}°/s`"
      ></BaseLabel>
      <BaseLineGraph
        id="pitch_angle_graph"
        class="x_angle_graph"
        width="100%"
        height="1.149425287%"
        :min="-90"
        :max="90"
        :input="ft"
      ></BaseLineGraph>
      <BaseLineGraph
        id="pitch_angle_accel"
        class="x_accel_graph"
        width="100%"
        height="0.574712644%"
        :min="-300"
        :max="300"
        :input="fx"
      ></BaseLineGraph>
    </div>

    <div id="roll_telemetry_container">
      <BaseLabel id="roll_l" v-text="'Roll'"></BaseLabel>
      <BaseLabel
        id="roll_acx"
        class="x_acx"
        v-text="`${ft.toFixed(1)}° | ${fx.toFixed(1)}°/s`"
      ></BaseLabel>
      <BaseLineGraph
        id="roll_angle_graph"
        class="x_angle_graph"
        width="100%"
        height="1.149425287%"
        :min="-90"
        :max="90"
        :input="ft"
      ></BaseLineGraph>
      <BaseLineGraph
        id="roll_angle_accel"
        class="x_accel_graph"
        width="100%"
        height="0.574712644%"
        :min="-300"
        :max="300"
        :input="fx"
      ></BaseLineGraph>
    </div>

    <div id="yaw_telemetry_container">
      <BaseLabel id="yaw_l" v-text="'Yaw'"></BaseLabel>
      <BaseLabel
        id="yaw_acx"
        class="x_acx"
        v-text="`${ft.toFixed(1)}° | ${fx.toFixed(1)}°/s`"
      ></BaseLabel>
      <BaseLineGraph
        id="yaw_angle_graph"
        class="x_angle_graph"
        width="100%"
        height="1.149425287%"
        :min="-90"
        :max="90"
        :input="ft"
      ></BaseLineGraph>
      <BaseLineGraph
        id="yaw_angle_accel"
        class="x_accel_graph"
        width="100%"
        height="0.574712644%"
        :min="-300"
        :max="300"
        :input="fx"
      ></BaseLineGraph>
    </div>
  </div>
  <HorizontalLine id="m_dynamics_telemetry_ln" color="#0500FF"></HorizontalLine>
</template>
<style scoped>
@keyframes ini_ani {
  0% {
    transform: translateY(-25%);
  }
  100% {
    transform: translateY(0);
  }
}
#mobile_dynamics_telemetry_container {
  position: absolute;
  top: 16.71875%;
  left: 1.111111111%;
  width: 97.777777778%;
  height: 27.1875%;
  animation: ini_ani cubic-bezier(0.59, 0.23, 0.49, 1.07) 0.15s;
}
#data_source_switch_indi {
  top: 6.32183908%;
  left: 83.238636364%;
}
#data_source_label {
  top: 0%;
  left: 0%;
  width: 97.727272727%;
  height: 24.137931034%;
  font-size: 2.3vh;
  background-color: #0500ff20;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 2.272727273%;
  border-left: solid 1px #0500ff;
}
#m_dynamics_telemetry_ln {
  top: 45.625%;
  left: 1.111111111%;
  width: 97.777777778%;
}
.x_accel_graph,
.x_angle_graph {
  left: 0%;
}
#pitch_angle_graph {
  top: 44.252873563%;
}
#pitch_angle_accel {
  top: calc(44.252873563% + 3.448275862%);
}
#roll_angle_graph {
  top: 70.114942529%;
}
#roll_angle_accel {
  top: calc(70.114942529% + 3.448275862%);
}
#pitch_l {
  top: 27.586206897%;
  left: 0%;
  font-size: 2.1vh;
}
.x_acx {
  width: 40%;
  left: 60%;
  text-align: end;
  font-size: 2.1vh;
}
#pitch_acx {
  top: calc(27.586206897% + 4.5%);
}
#roll_acx,
#roll_l {
  top: calc(53.448275862% + 4.5%);
}
#yaw_acx,
#yaw_l {
  top: calc(78.735632184% + 4.5%);
}
#yaw_angle_graph {
  top: 95.402298851%;
}
#yaw_angle_accel {
  top: calc(95.402298851% + 3.448275862%);
}
</style>
