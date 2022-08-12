
<script setup lang="ts">
import DynamicsTelemetryOneAxis from "@/components/AT_DynamicsTelemetryOneAxis.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import BaseOptionsMenu from "@/components/BaseOptionsMenu.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import DynamicsControlPanel from "@/components/AT_DynamicsControlPanel.vue";
</script>

<script lang="ts">
export default {
  data() {
    return {
      dynamics_controls: {
        rate_controls: { max_pitch_rate: 5, max_roll_rate: 5, max_yaw_rate: 5 },
        rotation_controls: { max_pitch: 30, max_roll: 30 },
      },
    };
  },
};
</script>

<template>
  <BaseLabel id="dynaimcs_controls_l" v-text="'Controls'"></BaseLabel>
  <HorizontalLine id="dynamics_controls_ln_0" color="#373737"></HorizontalLine>
  <DynamicsControlPanel
    id="dynamics_rate_controls_container"
    ControlPanelLabel="Rate Controls"
    GlobalLinearControllerUnitLabel="Max Rate (all axis)"
    LinearControllerUnitLabel_0="Max Pitch Rate"
    LinearControllerUnitLabel_1="Max Roll Rate"
    LinearControllerUnitLabel_2="Max Yaw Rate"
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
    id="dynamics_rotation_controls_container"
    ControlPanelLabel="Rotation Controls"
    GlobalLinearControllerUnitLabel="Max Rotation (all axis)"
    LinearControllerUnitLabel_0="Max Pitch"
    LinearControllerUnitLabel_1="Max Roll"
    :isThirdLinearControllerUsed="false"
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
}
#dynamics_controls_ln_0 {
  top: 50.37037037%;
  left: 5.052083333%;
  width: 93.90625%;
}
</style>