
<script setup lang="ts">
import Label from "@/components/Label.vue";
import BaseOptionsMenu from "@/components/BaseOptionsMenu.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import BaseLineGraph from "@/components/BaseLineGraph.vue";
</script>

<script lang="ts">
export default {
  props: {
    ControlPanelLabel: { default: "" },
    BaseLineGraphMax: { default: 7.5 },
    BaseLineGraphMin: { default: 2.5 },
    BaseLineGraphWidth: { default: "50%" },
    BaseLineGraphHeight: { default: "0.091vw" },
    MeasurmentUnit: { default: "°/s" },
    ContainerStyle: {
      default:
        "width: 95.402298851%; height: 27.386934673%; border-left: solid 1px #0500FF",
    },
  },
  data() {
    return {
      BaseLineGraphInput: 5,
    };
  },
  methods: {
    LinearControllerUnitNegativeStepOnClick() {
      if (this.BaseLineGraphInput > 3) {
        this.$refs.NumericalInputRef.value = this.BaseLineGraphInput - 0.5;
        this.BaseLineGraphInput -= 0.5;
      } else {
        this.$refs.NumericalInputRef.value = 2.5;
        this.BaseLineGraphInput = 2.5;
      }
    },
    LinearControllerUnitPositiveStepOnClick() {
      if (this.BaseLineGraphInput < 7) {
        this.$refs.NumericalInputRef.value = this.BaseLineGraphInput + 0.5;
        this.BaseLineGraphInput += 0.5;
      } else {
        this.$refs.NumericalInputRef.value = 7.5;
        this.BaseLineGraphInput = 7.5;
      }
    },
    LinearControllerUnitInputParser(e: Event) {
      if (e.target.value <= 7.5) {
        this.BaseLineGraphInput = parseFloat(e.target.value);
      } else {
        this.BaseLineGraphInput = 7.5;
        e.target.value = 7.5;
      }

      if (e.target.value >= 2.5) {
        this.BaseLineGraphInput = parseFloat(e.target.value);
      } else {
        this.BaseLineGraphInput = 2.5;
        e.target.value = 2.5;
      }
    },
    ControlsOptionsMenuOnUpdate(args: Object) {
      this.$emit("update", args);
    },
  },
};
</script>

<template>
  <div class="base_linear_controller_unit_container" :style="ContainerStyle">
    <Label v-text="ControlPanelLabel" class="x_control_panel_l"></Label>
    <VerticalLine
      class="base_linear_controller_min_ln base_linear_controller_ln"
      color="#555"
    ></VerticalLine>
    <Label
      color="#555"
      class="base_linear_controller_min_l"
      v-text="`${BaseLineGraphMin}${MeasurmentUnit}`"
    ></Label>

    <VerticalLine
      class="base_linear_controller_mid_ln base_linear_controller_ln"
      color="#555"
    ></VerticalLine>
    <Label
      color="#555"
      class="base_linear_controller_mid_l"
      v-text="`Default`"
    ></Label>

    <VerticalLine
      class="base_linear_controller_max_ln base_linear_controller_ln"
      color="#555"
    ></VerticalLine>
    <Label
      color="#555"
      class="base_linear_controller_max_l"
      v-text="`${BaseLineGraphMax}${MeasurmentUnit}`"
    ></Label>

    <BaseLineGraph
      class="x_generic_controls_graph"
      :max="BaseLineGraphMax"
      :min="BaseLineGraphMin"
      :input="BaseLineGraphInput"
      :width="BaseLineGraphWidth"
      :height="BaseLineGraphHeight"
    ></BaseLineGraph>

    <input
      ref="NumericalInputRef"
      @change="LinearControllerUnitInputParser"
      step="0.01"
      placeholder="5"
      max="7.5"
      min="2.5"
      type="number"
      class="base_linear_controller_input"
    />
    <div
      @click="LinearControllerUnitPositiveStepOnClick"
      class="base_linear_controller_positive_step_btn"
    >
      +
    </div>
    <div
      @click="LinearControllerUnitNegativeStepOnClick"
      class="base_linear_controller_negative_step_btn"
    >
      -
    </div>
  </div>
</template>

<style scoped>
.base_linear_controller_positive_step_btn,
.base_linear_controller_negative_step_btn {
  position: absolute;
  top: 33.027522936%;
  left: calc(81.325301205% + 2%);
  width: 6.927710843%;
  height: 44.401834862%;
  border: solid 1px #0500ff;
  color: #fff;
  font-size: 1.3vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Titillium Web", sans-serif;
  user-select: none;
}
.base_linear_controller_positive_step_btn {
  left: calc(89.006024096% + 3.301204989%);
}
.base_linear_controller_positive_step_btn:hover,
.base_linear_controller_negative_step_btn:hover {
  background-color: #0500ff20;
}
.base_linear_controller_input {
  position: absolute;
  top: 33.027522936%;
  left: 61.897590361%;
  width: 18.674698795%;
  height: 42.201834862%;
  border: solid 1px #0500ff;
  color: #fff;
  font-size: 1vw;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  background-color: #0500ff00;
  font-family: "Titillium Web", sans-serif;
  transition: all linear 0.1s;
}
.base_linear_controller_input:focus {
  border: solid 1px #2f2cff;
}
.base_linear_controller_input:hover {
  background-color: #0500ff20;
}
.base_linear_controller_input::selection {
  color: #aaa;
  background-color: #0500ff40;
}
.base_linear_controller_input:out-of-range {
  border: solid 1px #ff0055;
}
.base_linear_controller_max_ln {
  left: 55.120481928%;
}
.base_linear_controller_ln {
  top: 57.798165138%;
  height: 4.587155963%;
}
.base_linear_controller_mid_ln {
  left: 29.192168675%;
}
.base_linear_controller_mid_l {
  top: 62.385321101%;
  left: 25.954216867%;
  font-size: 0.8vw;
}
.base_linear_controller_max_l {
  top: 62.385321101%;
  left: 52.259036145%;
  font-size: 0.8vw;
}
.base_linear_controller_min_ln {
  left: 2.873563218%;
}
.base_linear_controller_min_l {
  font-size: 0.8vw;
  top: 62.385321101%;
  left: calc(0.451807229% + 1%);
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