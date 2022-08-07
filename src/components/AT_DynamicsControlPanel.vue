
<script setup lang="ts">
import Label from "@/components/Label.vue";
import BaseOptionsMenu from "@/components/BaseOptionsMenu.vue";
import BaseLineGraph from "@/components/BaseLineGraph.vue";
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
    ControlPanelLabel: { default: "" },
    DynamicsControlsObject: { default: {} },
  },
  mounted() {
    setInterval(() => {
      this.rf = this.getRandomInt(2.5, 7.5);
    }, 1000);
  },
  data() {
    return {
      dynamics_rate_controls_options_menu_items: [
        { label: "Restore Defaults", eventNameOnClick: "" },
        { label: "Select Presets", eventNameOnClick: "" },
        { label: "Help", eventNameOnClick: "" },
      ],
      rf: 0,
    };
  },
};
</script>

<template>
  <div class="x_controls_container">
    <Label v-text="ControlPanelLabel" class="x_control_panel_l"></Label>
    <BaseOptionsMenu
      class="x_controls_options_menu"
      :menuItems="dynamics_rate_controls_options_menu_items"
    ></BaseOptionsMenu>
    <BaseLineGraph
      class="x_generic_controls_graph"
      :max="7.5"
      :min="2.5"
      :input="rf"
      width="50%"
    ></BaseLineGraph>
  </div>
</template>

<style scoped>
.x_generic_controls_graph {
  top: 27.135678392%;
  left: 2.873563218%;
}
.x_control_panel_l {
  top: 0%;
  left: 2.873563218%;
  font-size: 1vw;
}
.x_controls_container {
  position: absolute;
  width: 36.25%;
  height: 36.851851852%;
  border-right: solid 1px #0500ff;
}
.x_controls_options_menu {
  top: 0.251256281%;
  left: 65.373563218%;
}
</style>