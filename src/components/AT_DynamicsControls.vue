
<script setup lang="ts">
import DynamicsTelemetryOneAxis from "@/components/AT_DynamicsTelemetryOneAxis.vue";
import Label from "@/components/Label.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import BaseOptionsMenu from "@/components/BaseOptionsMenu.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
</script>

<template>
  <Label id="dynaimcs_controls_l" v-text="'Controls'"></Label>
  <HorizontalLine id="dynamics_controls_ln_0" color="#373737"></HorizontalLine>
  <div id="dynamics_rate_controls_container">
    <BaseOptionsMenu id="dynamics_rate_controls_options_menu"></BaseOptionsMenu>
  </div>
</template>
<style scoped>
#dynamics_rate_controls_options_menu{
  top: 0.251256281%;
  left: 65.373563218%;
}
#dynamics_rate_controls_container{
  position: absolute;
  top: 57.12962963%;
  left: 4.010416667%;
  width: 36.25%;
  height: 36.851851852%;
}
#dynaimcs_controls_l{
    top: 52.222222222%;
    left: 5.052083333%;
}
#dynamics_controls_ln_0 {
  top: 50.37037037%;
  left: 5.052083333%;
  width: 93.90625%;
}
</style>