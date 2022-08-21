
<script setup lang="ts">
import BaseLineGraph from "@/components/BaseLineGraph.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import VerticalLine from "@/components/VerticalLine.vue";
</script>

<script lang="ts">
export default {
  methods: {
    getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //max e | min i
    },
  },
  props: {
    imu_alpha_axis_telemetry: { default: { angle: 0, rate: 0 } },
    imu_beta_axis_telemetry: { default: { angle: 0, rate: 0 } },
    axis_id: { default: "--" },
  },
};
</script>

<template>
  <div class="dynamics_telemetry_one_axis_container p-abs">
    <BaseLabel id="x_axis_l" class="axis_l" v-text="axis_id"></BaseLabel>
    <div id="imu_alpha_telemetry_container">
      <BaseLabel
        id="imu_alpha_l"
        class="imu_x_l"
        v-text="'IMU Alpha'"
      ></BaseLabel>
      <BaseLabel
        id="imu_alpha_angle_l"
        class="imu_x_y_l"
        v-text="'Angle'"
        color="#7C7C7C"
      ></BaseLabel>
      <BaseLabel
        id="imu_alpha_angle_acx"
        class="imu_x_y_acx"
        v-text="`${imu_alpha_axis_telemetry.angle.toFixed(1)}°`"
        color="#FFF"
      ></BaseLabel>
      <BaseLineGraph
        :input="imu_alpha_axis_telemetry.angle.toFixed(1)"
        class="imu_x_y"
        id="imu_alpha_angle"
      />
      <BaseLabel
        id="imu_alpha_acceleration_l"
        class="imu_x_y_l"
        v-text="'Acceleration'"
        color="#7C7C7C"
      ></BaseLabel>
      <BaseLabel
        id="imu_alpha_acceleration_acx"
        class="imu_x_y_acx"
        v-text="`${imu_alpha_axis_telemetry.rate.toFixed(1)}°/s`"
        color="#FFF"
      ></BaseLabel>
      <BaseLineGraph
        :input="imu_alpha_axis_telemetry.rate.toFixed(1)"
        :max="250"
        :min="-250"
        class="imu_x_y"
        id="imu_alpha_acc"
      />
      <VerticalLine
        id="imu_alpha_ln"
        class="imu_x_ln"
        color="#0500FF"
      ></VerticalLine>
    </div>
    <div id="imu_beta_telemetry_container">
      <BaseLabel
        id="imu_beta_l"
        class="imu_x_l"
        v-text="'IMU Beta'"
      ></BaseLabel>
      <BaseLabel
        id="imu_beta_angle_l"
        class="imu_x_y_l"
        v-text="'Angle'"
        color="#7C7C7C"
      ></BaseLabel>
      <BaseLabel
        id="imu_beta_angle_acx"
        class="imu_x_y_acx"
        v-text="`${imu_beta_axis_telemetry.angle.toFixed(1)}°`"
        color="#FFF"
      ></BaseLabel>
      <BaseLineGraph
        :input="imu_beta_axis_telemetry.angle.toFixed(1)"
        class="imu_x_y"
        id="imu_beta_angle"
      />
      <BaseLabel
        id="imu_beta_acceleration_l"
        class="imu_x_y_l"
        v-text="'Acceleration'"
        color="#7C7C7C"
      ></BaseLabel>
      <BaseLabel
        id="imu_beta_acceleration_acx"
        class="imu_x_y_acx"
        v-text="`${imu_beta_axis_telemetry.rate.toFixed(1)}°/s`"
        color="#FFF"
      ></BaseLabel>
      <BaseLineGraph
        :input="imu_beta_axis_telemetry.rate.toFixed(1)"
        :max="250"
        :min="-250"
        class="imu_x_y"
        id="imu_beta_acc"
      />
      <VerticalLine
        id="imu_beta_ln"
        class="imu_x_ln"
        color="#0500FF"
      ></VerticalLine>
    </div>
  </div>
</template>
<style scoped>
.imu_x_y_acx {
  left: 81.701030928%;
  width: calc(18.041237113% - 2%); /*padding offset */
  border-right: solid 1px #0500ff;
  height: 8.910891089%;
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 2vh;
  padding-right: 2%;
}
#imu_beta_ln {
  top: 60%;
}
#imu_beta_acc {
  top: 95.666666667%;
}
#imu_beta_acceleration_l,
#imu_beta_acceleration_acx {
  top: 85.666666667%;
}
#imu_beta_angle {
  top: 80%;
}
#imu_beta_angle_l,
#imu_beta_angle_acx {
  top: 70%;
}
#imu_beta_l {
  top: 60%;
}
#imu_alpha_ln {
  top: 17%;
}
.imu_x_ln {
  left: 0%;
  height: 40%;
}
.axis_l {
  left: 0%;
  border-left: solid 1px #0500ff;
  height: 14%;
  width: 35.824742268%;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 2.78%;
  font-size: 2vh;
  background-color: #0500ff20;
}
.imu_x_y {
  left: 2.319587629%;
}
#imu_alpha_acc {
  top: 52.666666667%;
}
#imu_alpha_angle_l,
#imu_alpha_angle_acx {
  top: 27.062706271%;
}
#imu_alpha_acceleration_l,
#imu_alpha_acceleration_acx {
  top: 42.666666667%;
}
#imu_alpha_l {
  top: 17%;
}
.imu_x_l,
.imu_x_y_l {
  left: 2.319587629%;
  font-size: 2vh;
}
#imu_alpha_angle {
  top: 36.96369637%;
}
.dynamics_telemetry_one_axis_container {
  width: 29.107276819%;
  height: 71.294117647%;
}
@media only screen and (max-width: 1070px) and (min-height: 550px) {
  .dynamics_telemetry_one_axis_container {
    width: 84.716157205%;
    left: 7.641921397%;
  }
}
@media only screen and (max-width: 1500px) and (min-height: 850px) {
  .dynamics_telemetry_one_axis_container {
    width: 84.716157205%;
    left: 7.641921397%;
  }
}
@media only screen and (max-width: 1996.8px) and (min-height: 1200px) {
  .dynamics_telemetry_one_axis_container {
    width: 84.716157205%;
    left: 7.641921397%;
  }
}
</style>