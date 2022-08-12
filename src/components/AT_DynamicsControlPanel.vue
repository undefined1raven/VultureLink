
<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import BaseOptionsMenu from "@/components/BaseOptionsMenu.vue";
import BaseLineGraph from "@/components/BaseLineGraph.vue";
import BaseLinearControllerUnit from "@/components/BaseLinearControllerUnit.vue";
</script>

<script lang="ts">
export default {
  methods: {
    GlobalValueOnChange(args:Object) {
      this.$refs.x_controls_linear_controller_unit.SetInputValue(args.newValue);
      this.$refs.x_controls_linear_controller_unit_1.SetInputValue(args.newValue);
      this.$refs.x_controls_linear_controller_unit_2.SetInputValue(args.newValue);
    },
    DynamicsRateControlsOptionsMenuOnUpdate(args: Object) {
      switch (args.btn_id) {
        case "restore_defaults":
          this.$refs.x_controls_linear_controller_unit.ResetToDefault();
          this.$refs.x_controls_linear_controller_unit_1.ResetToDefault();
          this.$refs.x_controls_linear_controller_unit_2.ResetToDefault();
          this.$refs.x_controls_linear_controller_unit_global.ResetToDefault();
          break;
        case "customize":
          this.isExpanded = !this.isExpanded;
          if(!this.isExpanded){
            this.GlobalValueOnChange({newValue: this.$refs.x_controls_linear_controller_unit_global.GetCurrentValue()});
            /*syncs global value with local ones when controls toggle */
          }
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
  data() {
    return {
      CustomizeButtonLabel: "Customize",
      dynamics_rate_controls_options_menu_items: [
        { label: "Restore Defaults", btn_id: "restore_defaults" },
        { label: "Select Preset", btn_id: "select_preset" },
        { label: "Toggle Controls Type", btn_id: "customize" },
        { label: "Help", btn_id: "help" },
      ],
      rf: 0,
      isExpanded: false /* is axis-specific control enabled */,
    };
  },
};
</script>

<template>
  <div class="x_controls_container">
    <BaseLabel class="x_controls_l" v-text="ControlPanelLabel"></BaseLabel>
    <BaseLinearControllerUnit
      v-show="!isExpanded"
      ref="x_controls_linear_controller_unit_global"
      class="x_linear_controller_unit_global"
      ControlPanelLabel="Max Rate (all axis)"
      @update="DynamicsRateControlsOptionsMenuOnUpdate"
      @GlobalValueOnChange="GlobalValueOnChange"
      :BaseLineGraphMax="7.5"
      :BaseLineGraphMin="2.5"
      BaseLineGraphWidth="52.409638554%"
      OptionsMenuHeight="0.091vw"
      :DefaultValue="5"
      MeasurmentUnit="°/s"
      :isGlobal="true"
    ></BaseLinearControllerUnit>
    <BaseLinearControllerUnit
      v-show="isExpanded"
      ref="x_controls_linear_controller_unit"
      class="x_linear_controller_unit_0"
      ControlPanelLabel="Max Pitch Rate"
      @update="DynamicsRateControlsOptionsMenuOnUpdate"
      :BaseLineGraphMax="7.5"
      :BaseLineGraphMin="2.5"
      BaseLineGraphWidth="52.409638554%"
      OptionsMenuHeight="0.091vw"
      :DefaultValue="5"
      :isGlobal="false"
      MeasurmentUnit="°/s"
    ></BaseLinearControllerUnit>
    <BaseLinearControllerUnit
      v-show="isExpanded"
      ref="x_controls_linear_controller_unit_1"
      class="x_linear_controller_unit_1"
      ControlPanelLabel="Max Roll Rate"
      @update="DynamicsRateControlsOptionsMenuOnUpdate"
      :BaseLineGraphMax="7.5"
      :BaseLineGraphMin="2.5"
      BaseLineGraphWidth="52.409638554%"
      OptionsMenuHeight="0.091vw"
      :DefaultValue="5"
      :isGlobal="false"
      MeasurmentUnit="°/s"
    ></BaseLinearControllerUnit>
    <BaseLinearControllerUnit
      v-show="isExpanded"
      ref="x_controls_linear_controller_unit_2"
      class="x_linear_controller_unit_2"
      ControlPanelLabel="Max Yaw Rate"
      @update="DynamicsRateControlsOptionsMenuOnUpdate"
      :BaseLineGraphMax="7.5"
      :BaseLineGraphMin="2.5"
      BaseLineGraphWidth="52.409638554%"
      OptionsMenuHeight="0.091vw"
      :DefaultValue="5"
      :isGlobal="false"
      MeasurmentUnit="°/s"
    ></BaseLinearControllerUnit>
    <BaseOptionsMenu
      class="x_controls_options_menu"
      :menuItems="dynamics_rate_controls_options_menu_items"
      @update="DynamicsRateControlsOptionsMenuOnUpdate"
    ></BaseOptionsMenu>
  </div>
</template>

<style scoped>
.x_linear_controller_unit_2 {
  position: absolute;
  top: 78.391959799%;
  left: 0%;
  z-index: 3;
}
.x_linear_controller_unit_1 {
  position: absolute;
  top: 45.728643216%;
  left: 0%;
  z-index: 3;
}
.x_linear_controller_unit_0,
.x_linear_controller_unit_global {
  position: absolute;
  top: 13.065326633%;
  left: 0%;
  z-index: 3;
}
.x_controls_l {
  position: relative;
  top: 0%;
  left: 0%;
  font-size: 1vw;
  background-color: #0500ff20;
  border-left: solid 1px #0500ff;
  width: 27.298850575%;
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