
<script setup lang="ts">
import DynamicsTelemetryOneAxis from "@/components/AT_DynamicsTelemetryOneAxis.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import BaseOptionsMenu from "@/components/BaseOptionsMenu.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import DynamicsControlPanel from "@/components/AT_DynamicsControlPanel.vue";
import DynamicsControlsImuCalibration from "@/components/AT_DynamicsControlsImuCalibration.vue";

import UIReactivityStateAssessor from "@/composables/UIReactivityAssessor.ts";
</script>

<script lang="ts">
export default {
  methods: {
    OnControlTypeToggle(){
      if(this.VisibleControlsID == 'rate'){
        this.VisibleControlsID = 'rotation';
      }
      else{
        this.VisibleControlsID = 'rate';
      }
    },
    InputValueOnChange(args: object, ControlPanelID: string) {
      if (ControlPanelID == "rate") {
        let object_mapper_array = [
          "max_pitcmax_pitch_rateh",
          "max_roll_rate",
          "max_yaw_rate",
        ];
        this.dynamics_controls.rate_controls[object_mapper_array[args.LCU_id]] =
          args.newValue;
      }
      if (ControlPanelID == "rotation") {
        if (args.LCU_id < 2) {
          let object_mapper_array = ["max_pitch", "max_roll"];
          this.dynamics_controls.rotation_controls[
            object_mapper_array[args.LCU_id]
          ] = args.newValue;
        }
      }
      // console.log(`${JSON.stringify(this.dynamics_controls)}`);
    },
  },
  data() {
    return {
      dynamics_controls: {
        rate_controls: { max_pitch_rate: 5, max_roll_rate: 5, max_yaw_rate: 5 },
        rotation_controls: { max_pitch: 30, max_roll: 30 },
      },
      isUIMinified: 0,
      VisibleControlsID: "rate",
    };
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
};
</script>

<template>
  <BaseLabel id="dynaimcs_controls_l" v-text="'Controls'"></BaseLabel>
  <HorizontalLine id="dynamics_controls_ln_0" color="#373737"></HorizontalLine>
  <DynamicsControlPanel
    v-show="
      isUIMinified == 0 || (isUIMinified == 1 && VisibleControlsID == 'rate')
    "
    id="dynamics_rate_controls_container"
    ControlPanelLabel="Rate Controls"
    :isUIMinified="isUIMinified"
    :VisibleControlsID="VisibleControlsID"
    GlobalLinearControllerUnitLabel="Max Rate (all axis)"
    LinearControllerUnitLabel_0="Max Pitch Rate"
    LinearControllerUnitLabel_1="Max Roll Rate"
    LinearControllerUnitLabel_2="Max Yaw Rate"
    @control-type-toggle="OnControlTypeToggle"
    @InputValueOnChange="InputValueOnChange($event, 'rate')"
    :GlobalLinearControllerUnitConstraints="{
      max: 7.5,
      min: 2.5,
      default: 5,
      measurement_unit: '°/s',
    }"
    :LinearControllerUnitConstraints_0="{
      max: 7.5,
      min: 2.5,
      default: 5,
      measurement_unit: '°/s',
    }"
    :LinearControllerUnitConstraints_1="{
      max: 7.5,
      min: 2.5,
      default: 5,
      measurement_unit: '°/s',
    }"
    :LinearControllerUnitConstraints_2="{
      max: 7.5,
      min: 2.5,
      default: 5,
      measurement_unit: '°/s',
    }"
    :isThirdLinearControllerUsed="true"
    class="animation_group_0"
    :DynamicsControlsObject="dynamics_controls"
  ></DynamicsControlPanel>
  <DynamicsControlPanel
    v-show="
      isUIMinified == 0 ||
      (isUIMinified == 1 && VisibleControlsID == 'rotation')
    "
    id="dynamics_rotation_controls_container"
    :isUIMinified="isUIMinified"
    :VisibleControlsID="VisibleControlsID"
    ControlPanelLabel="Rotation Controls"
    GlobalLinearControllerUnitLabel="Max Rotation (all axis)"
    LinearControllerUnitLabel_0="Max Pitch"
    LinearControllerUnitLabel_1="Max Roll"
    :isThirdLinearControllerUsed="false"
    @control-type-toggle="OnControlTypeToggle"
    @InputValueOnChange="InputValueOnChange($event, 'rotation')"
    :GlobalLinearControllerUnitConstraints="{
      max: 40,
      min: 20,
      default: 30,
      measurement_unit: '°',
    }"
    :LinearControllerUnitConstraints_0="{
      max: 45,
      min: 15,
      default: 30,
      measurement_unit: '°',
    }"
    :LinearControllerUnitConstraints_1="{
      max: 40,
      min: 20,
      default: 30,
      measurement_unit: '°',
    }"
    class="animation_group_0"
    :DynamicsControlsObject="dynamics_controls"
  ></DynamicsControlPanel>
  <DynamicsControlsImuCalibration
    class="animation_group_0"
  ></DynamicsControlsImuCalibration>
</template>


<style scoped>
@keyframes ini_ani {
  0% {
    transform: translateY(25%);
  }
  100% {
    transform: translateY(0);
  }
}
.animation_group_0 {
  animation: ini_ani cubic-bezier(0.59, 0.23, 0.49, 1.07) 0.15s;
}
#dynamics_rate_controls_container {
  top: 57.12962963%;
  left: 5.052083333%;
}
#dynamics_rotation_controls_container {
  top: 57.12962963%;
  left: 43.020833333%;
}
#dynaimcs_controls_l {
  top: 52.222222222%;
  left: 5.052083333%;
  font-size: 2.1vh;
}
#dynamics_controls_ln_0 {
  top: 50.37037037%;
  left: 5.052083333%;
  width: 93.90625%;
}
@media only screen and (max-width: 1070px) and (min-height: 550px) {
  #dynamics_rate_controls_container,
  #dynamics_rotation_controls_container {
    width: 54.479166667%;
    left: 7.5%;
  }
  #dynaimcs_controls_l {
    left: 7.5%;
  }
}
@media only screen and (max-width: 1500px) and (min-height: 850px) {
  #dynamics_rate_controls_container,
  #dynamics_rotation_controls_container {
    width: 54.479166667%;
    left: 7.5%;
  }
  #dynaimcs_controls_l {
    left: 7.5%;
  }
}
@media only screen and (max-width: 1996.8px) and (min-height: 1200px) {
  #dynamics_rate_controls_container,
  #dynamics_rotation_controls_container {
    width: 54.479166667%;
    left: 7.5%;
  }
  #dynaimcs_controls_l {
    left: 7.5%;
  }
}
</style>