
<script setup lang="ts">
import Label from "@/components/Label.vue";
import BaseOptionsMenu from "@/components/BaseOptionsMenu.vue";
import BaseLineGraph from "@/components/BaseLineGraph.vue";
import BaseLinearControllerUnit from "@/components/BaseLinearControllerUnit.vue";
</script>

<script lang="ts">
export default {
  methods: {
    DynamicsRateControlsOptionsMenuOnUpdate(args: Object) {
      switch (args.btn_id) {
        case "restore_defaults":
          this.rf = 5;
          break;

        default:
          break;
      }
    },
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
        { label: "Restore Defaults", btn_id: "restore_defaults" },
        { label: "Select Preset", btn_id: "select_preset" },
        { label: "Help", btn_id: "help" },
      ],
      rf: 0,
    };
  },
};
</script>

<template>
  <div class="x_controls_container">
    <Label class="x_controls_l" v-text="'Rate Controls'"></Label>
    <BaseLinearControllerUnit
    class="x_linear_controller_unit_0"
      ControlPanelLabel="Max Pitch Rate"
      @update="DynamicsRateControlsOptionsMenuOnUpdate"
      :BaseLineGraphMax="7.5"
      :BaseLineGraphMin="2.5"
      :BaseLineGraphInput="rf"
      BaseLineGraphWidth="52.409638554%"
      OptionsMenuHeight=""
    ></BaseLinearControllerUnit>
    <BaseOptionsMenu
      class="x_controls_options_menu"
      :menuItems="dynamics_rate_controls_options_menu_items"
      @update="DynamicsRateControlsOptionsMenuOnUpdate"
    ></BaseOptionsMenu>
  </div>
</template>

<style scoped>
.x_linear_controller_unit_0{
  top: 7.471264368%;
  left: 0%;
}
.x_controls_l{
  position: relative;
  top: 0%;
  left: 0%;
  font-size: 1vw;
  background-color: #0500FF20;
  border-left: solid 1px #0500FF;
  width: 20.833333333%;
  height: 9.296482412%;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 1.556521739%;
}
.x_controls_options_menu {
  position: absolute;
  top: 0.251256281%;
  left: 65.373563218%;
}
.x_controls_container {
  position: absolute;
  width: 36.25%;
  height: 36.851851852%;
  border-right: solid 1px #0500ff;
}
</style>