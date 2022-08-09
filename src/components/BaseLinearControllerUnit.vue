
<script setup lang="ts">
import Label from "@/components/Label.vue";
import BaseOptionsMenu from "@/components/BaseOptionsMenu.vue";
import BaseLineGraph from "@/components/BaseLineGraph.vue";
</script>

<script lang="ts">
export default {
  props: {
    ControlPanelLabel: { default: "" },
    BaseLineGraphMax: { default: 7.5 },
    BaseLineGraphMin: { default: 2.5 },
    BaseLineGraphInput: { default: 5 },
    BaseLineGraphWidth: { default: "50%" },
    BaseLineGraphHeight: { default: "0.091vw" },
    ContainerStyle: { default: "width: 95.402298851%; height: 27.386934673%; border-left: solid 1px #0500FF" },
  },
  methods: {
    ControlsOptionsMenuOnUpdate(args: Object) {
      this.$emit("update", args);
    },
  },
};
</script>

<template>
  <div class="base_linear_controller_unit_container" :style="ContainerStyle">
    <Label v-text="ControlPanelLabel" class="x_control_panel_l"></Label>
    <Label color="#222" class="base_linear_controller_min_l" v-text="BaseLineGraphMin"></Label>
    <BaseLineGraph
      class="x_generic_controls_graph"
      :max="BaseLineGraphMax"
      :min="BaseLineGraphMin"
      :input="BaseLineGraphInput"
      :width="BaseLineGraphWidth"
      :height="BaseLineGraphHeight"
    ></BaseLineGraph>
  </div>
</template>

<style scoped>
.base_linear_controller_min_l{
    font-size: .8vw;
    top: 62.385321101%;
    left: 0.451807229%;
}
.base_linear_controller_unit_container {
  position: relative;
}
.x_generic_controls_graph {
  top: 51.376146789%;
  left: 2.873563218%;
}
.x_control_panel_l {
  top: 0%;
  left: 2.873563218%;
  font-size: 1vw;
}
</style>