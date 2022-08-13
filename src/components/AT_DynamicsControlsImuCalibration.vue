
<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
</script>

<template>
  <div class="dynamics_imu_calibration_controller_container">
    <BaseLabel v-text="'IMU Calibration'" class="x_controls_l"></BaseLabel>
    <div id="dynamics_imu_calibration_initialization_container">
      <BaseLabel
        id="imu_calibration_ini_l"
        v-text="
          'Place the Vulture on a completely flat surface then click the ‘Start Calibration’ button.'
        "
      ></BaseLabel>
      <div id="imu_calibration_ini_btn">
        <BaseLabel id="imu_calibration_ini_btn_l" v-text="'Start Calibration'"></BaseLabel>
      </div>
      <BaseLabel color="#5B5B5B" id="ini_calibration_l_2" v-text="'The calibration is done for both IMUs at the same time'"></BaseLabel>
    </div>
    <div id="dynamics_imu_calibration_pending_container"></div>
  </div>
</template>
<style scoped>
#ini_calibration_l_2{
    top: 75.281407%;
    left: 0%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .95vw;
    text-align: center;
}
#imu_calibration_ini_btn_l{
    font-size: 1vw;
}
#imu_calibration_ini_btn{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 62.568306011%;
    height: 15.075376884%;
    border: solid 1px #0500FF;
    transform: translate(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0500FF00;
    transition: all linear 0.1s;
}
#imu_calibration_ini_btn:hover{
    background-color: #0500FF20;
}
#imu_calibration_ini_l {
  top: 12.060301508%;
  left: 0%;
  width: 100%;
  font-size: 1vw;
}
.dynamics_imu_calibration_controller_container {
  position: absolute;
  top: 57.12962963%;
  left: 80.104166667%;
  height: 36.851851852%;
  width: 19.0625%;
}
.x_controls_l {
  position: relative;
  top: 0%;
  left: 0%;
  font-size: 1vw;
  background-color: #0500ff20;
  border-left: solid 1px #0500ff;
  width: 51.912568306%;
  height: 10.796482412%;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 2.97521739%;
}
</style>
