
<script setup lang="ts">
import DynamicsTelemetryOneAxis from "@/components/AT_DynamicsTelemetryOneAxis.vue";
import Label from "@/components/Label.vue";
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
        rotation_controls: {max_pitch: 30, max_roll: 30},
      },
    };
  },
};
</script>

<template>
  <Label id="dynaimcs_controls_l" v-text="'Controls'"></Label>
  <HorizontalLine id="dynamics_controls_ln_0" color="#373737"></HorizontalLine>
  <DynamicsControlPanel
    id="dynamics_rate_controls_container"
    ControlPanelLabel="Rate Controls"
    :DynamicsControlsObject="dynamics_controls"
  ></DynamicsControlPanel>
</template>
<style scoped>
#dynamics_rate_controls_container {
  top: 57.12962963%;
  left: 4.010416667%;
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