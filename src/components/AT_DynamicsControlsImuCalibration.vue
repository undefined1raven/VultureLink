
<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import DynamicsControlsImuCalibrationStageCard from "@/components/AT_DynamicsControlsImuCalibrationStageCard.vue";
</script>

<script lang="ts">
export default {
  data() {
    return {
      stageColorObj: { waiting: "#777", running: "#0500FF", done: "#00FFF0" },
      isRunning: false,
      isComplete: false,
      stageStatus: { card_0: "waiting", card_1: "waiting", card_2: "waiting" },
      stageCompletionStatus: 0,
    };
  },
  methods: {
    CalibrationLabelStyleParser() {
      if (this.isComplete) {
        return {
          label: "Complete",
          style:
            "color: #00FFF0; border-top: solid 1px #00FFF0; background: radial-gradient(60.81% 60.81% at 50% 0%, rgba(0, 255, 240, 0.4) 0%, rgba(0, 255, 240, 0) 105%);",
        };
      } else {
        return {
          label: "In Progress",
          style:
            "color: #FFF; border-top: solid 1px #0500FF; background: radial-gradient(60.81% 60.81% at 50% 0%, rgba(5, 0, 255, 0.4) 0%, rgba(5, 0, 255, 0) 105%);",
        };
      }
    },
    ApplyOffsets() {
      this.stageCompletionStatus = 0;
      this.stageStatus.card_0 = "done";
      this.stageStatus.card_1 = "done";
      this.stageStatus.card_2 = "running";
      let interval = setInterval(() => {
        if (this.stageCompletionStatus < 100) {
          this.stageCompletionStatus += 1;
        } else {
          clearInterval(interval);
          this.stageStatus.card_2 = "done";
          this.isComplete = true;
          setTimeout(() => {
            this.isRunning = false;
          }, 4000);
        }
      }, 50);
    },
    MeasureOffsets() {
      this.stageCompletionStatus = 0;
      this.stageStatus.card_0 = "done";
      this.stageStatus.card_1 = "running";
      let interval = setInterval(() => {
        if (this.stageCompletionStatus < 100) {
          this.stageCompletionStatus += 1;
        } else {
          clearInterval(interval);
          this.ApplyOffsets();
        }
      }, 500);
    },
    ImuCalibrationSequance() {
      this.stageCompletionStatus = 0;
      this.isComplete = false;
      this.stageStatus.card_0 = "running";
      this.stageStatus.card_1 = "waiting";
      this.stageStatus.card_2 = "waiting";
      let intv = setInterval(() => {
        if (this.stageCompletionStatus < 100) {
          this.stageCompletionStatus += 1;
        } else {
          clearInterval(intv);
          this.MeasureOffsets();
        }
      }, 100);
    },
    ImuCalibrationButtonOnClick() {
      this.isRunning = true;
      this.ImuCalibrationSequance();
    },
  },
};
</script>

<template>
  <div class="dynamics_imu_calibration_controller_container">
    <BaseLabel v-text="'IMU Calibration'" class="x_controls_l"></BaseLabel>
    <div
      class="fade"
      v-if="!isRunning"
      id="dynamics_imu_calibration_initialization_container"
    >
      <BaseLabel
        id="imu_calibration_ini_l"
        v-text="
          'Place the Vulture on a completely flat surface then click the ‘Start Calibration’ button.'
        "
      ></BaseLabel>
      <div @click="ImuCalibrationButtonOnClick" id="imu_calibration_ini_btn">
        <BaseLabel
          id="imu_calibration_ini_btn_l"
          v-text="'Start Calibration'"
        ></BaseLabel>
      </div>
      <BaseLabel
        color="#5B5B5B"
        id="ini_calibration_l_2"
        v-text="'The calibration is done for both IMUs at the same time'"
      ></BaseLabel>
    </div>
    <div
      class="fade"
      v-if="isRunning"
      id="dynamics_imu_calibration_pending_container"
    >
      <BaseLabel
        id="imu_calibration_pending_l"
        v-text="CalibrationLabelStyleParser().label"
        :style="CalibrationLabelStyleParser().style"
      ></BaseLabel>
      <VerticalLine
        :color="stageColorObj[stageStatus.card_0]"
        id="calibration_stage_indi_0"
        class="calibration_stage_indi_x"
      ></VerticalLine>
      <VerticalLine
        :color="stageColorObj[stageStatus.card_1]"
        id="calibration_stage_indi_1"
        class="calibration_stage_indi_x"
      ></VerticalLine>
      <VerticalLine
        :color="stageColorObj[stageStatus.card_2]"
        id="calibration_stage_indi_2"
        class="calibration_stage_indi_x"
      ></VerticalLine>
      <DynamicsControlsImuCalibrationStageCard
        id="calibration_pending_stage_card_0"
        color="#FFF"
        :currentStage="stageStatus.card_0"
        label="Validating Stability"
        :completionStatus="stageCompletionStatus"
      ></DynamicsControlsImuCalibrationStageCard>
      <DynamicsControlsImuCalibrationStageCard
        id="calibration_pending_stage_card_1"
        :currentStage="stageStatus.card_1"
        color="#FFF"
        label="Measuring Offsets"
        :completionStatus="stageCompletionStatus"
      ></DynamicsControlsImuCalibrationStageCard>
      <DynamicsControlsImuCalibrationStageCard
        id="calibration_pending_stage_card_2"
        :currentStage="stageStatus.card_2"
        color="#FFF"
        label="Applying Offsets"
        :completionStatus="stageCompletionStatus"
      ></DynamicsControlsImuCalibrationStageCard>
    </div>
  </div>
</template>
<style scoped>
@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.calibration_stage_indi_x {
  height: 5.025125628%;
  left: 50%;
  transform: translate(-50%);
  width: 0.01vw;
  transition: all linear 0.1s;
}
#calibration_stage_indi_0 {
  top: calc(14.572864322% + 13%);
}
#calibration_stage_indi_1 {
  top: calc(39.447236181% + 13%);
}
#calibration_stage_indi_2 {
  top: calc(64.32160804% + 13%);
}
.fade {
  animation: fade linear 0.1s;
}
#calibration_pending_stage_card_0 {
  top: calc(31.909547739% + 3%);
}
#calibration_pending_stage_card_1 {
  top: calc(46.48241206% + 13%);
}
#calibration_pending_stage_card_2 {
  top: calc(71.35678392% + 13%);
}
#imu_calibration_pending_l {
  top: 15.027523%;
  width: 100%;
  height: 25.879396985%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 1%;
  border-top: solid 1px #0500ff;
  background: radial-gradient(
    52.7% 52.7% at 50% 0%,
    rgba(5, 0, 255, 0.4) 0%,
    rgba(5, 0, 255, 0) 105%
  );
  transition: all linear 0.1s;
}
#ini_calibration_l_2 {
  top: 75.281407%;
  left: 0%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95vw;
  text-align: center;
}
#imu_calibration_ini_btn_l {
  font-size: 1vw;
}
#imu_calibration_ini_btn {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 62.568306011%;
  height: 15.075376884%;
  border: solid 1px #0500ff;
  transform: translate(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0500ff00;
  transition: all linear 0.1s;
}
#imu_calibration_ini_btn:hover {
  background-color: #0500ff20;
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
@media only screen and (max-width: 683px) and (min-height: 550px) {
  .dynamics_imu_calibration_controller_container {
    left: 65%;
    width: 32.735416667%;
  }
  #imu_calibration_ini_btn_l,
  #imu_calibration_ini_l {
    font-size: 1.6vh;
  }
  .x_controls_l {
    font-size: 2vh;
  }
  #ini_calibration_l_2 {
    font-size: 1.4vh;
  }
}
@media only screen and (max-width: 1500px) and (min-height: 850px) {
  .dynamics_imu_calibration_controller_container {
    left: 65%;
    width: 32.735416667%;
  }
  #imu_calibration_ini_btn_l,
  #imu_calibration_ini_l {
    font-size: 1.6vh;
  }
  .x_controls_l {
    font-size: 2vh;
  }
  #ini_calibration_l_2 {
    font-size: 1.4vh;
  }
}
</style>
