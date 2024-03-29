
<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import BaseOptionsMenu from "@/components/BaseOptionsMenu.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import BaseLineGraph from "@/components/BaseLineGraph.vue";

import isMobile from "@/composables/isMobile";
</script>

<script lang="ts">
export default {
  mounted() {
    if(!isMobile()){
      this.$refs.NumericalInputRef.value = this.DefaultValue;
    }
  },
  props: {
    ControlPanelLabel: { default: "" },
    BaseLineGraphMax: { default: 7.5 },
    BaseLineGraphMin: { default: 2.5 },
    // BaseLineGraphWidth: { default: "50%" },
    // BaseLineGraphHeight: { default: "0.091vw" },
    DefaultValue: { default: 5.0 },
    MeasurmentUnit: { default: "°/s" },
    isGlobal: {
      default: false,
    } /*indicates whether or not the input from this LCU has to be propagaded to other more specific LCUs */,
    ContainerStyle: {
      default:
        "width: 95.402298851%; height: 27.386934673%; border-left: solid 1px #0500FF",
    },
  },
  expose: ["ResetToDefault", "SetInputValue", "GetCurrentValue"],
  data() {
    return {
      BaseLineGraphInput: this.DefaultValue,
    };
  },
  methods: {
    onMobileInputHandler(args: object) {
      this.BaseLineGraphInput = args.input;
    },
    BaseLineGraphSizeController() {
      if (window.devicePixelRatio < 2) {
        return { height: "0.091vw", width: "50%" };
      } else {
        return { height: "7.448275862%", width: "79.261363636%" };
      }
    },
    GetCurrentValue() {
      return this.BaseLineGraphInput;
    },
    SetInputValue(value: number) {
      if (this.isGlobal) {
        this.$emit("GlobalValueOnChange", { newValue: value });
      }
      this.$emit("InputValueOnChange", { newValue: value });
      this.BaseLineGraphInput = value;
      if (!isMobile()) {
        this.$refs.NumericalInputRef.value = value;
      }
    },
    ResetToDefault() {
      this.BaseLineGraphInput = this.DefaultValue;
      if (!isMobile()) {
        this.$refs.NumericalInputRef.value = this.DefaultValue;
      }
      else{
        this.$refs.LineGraph.setMobileDragablePosition(50);
      }
    },
    LinearControllerUnitNegativeStepOnClick() {
      if (this.BaseLineGraphInput > this.BaseLineGraphMin + 0.5) {
        this.SetInputValue(this.BaseLineGraphInput - 0.5);
      } else {
        this.SetInputValue(this.BaseLineGraphMin);
      }
    },
    LinearControllerUnitPositiveStepOnClick() {
      if (this.BaseLineGraphInput < this.BaseLineGraphMax - 0.5) {
        this.SetInputValue(this.BaseLineGraphInput + 0.5);
      } else {
        this.SetInputValue(this.BaseLineGraphMax);
      }
    },
    LinearControllerUnitInputParser(e: Event) {
      if (e.target.value <= this.BaseLineGraphMax) {
        this.SetInputValue(parseFloat(e.target.value));
      } else {
        this.SetInputValue(this.BaseLineGraphMax);
      }

      if (e.target.value >= this.BaseLineGraphMin) {
        this.SetInputValue(parseFloat(e.target.value));
      } else {
        this.SetInputValue(this.BaseLineGraphMin);
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
    <BaseLabel v-text="ControlPanelLabel" class="x_control_panel_l"></BaseLabel>
    <VerticalLine
      v-if="!isMobile()"
      class="base_linear_controller_min_ln base_linear_controller_ln"
      color="#555"
    ></VerticalLine>
    <BaseLabel
      color="#555"
      v-if="!isMobile()"
      class="base_linear_controller_min_l"
      v-text="`${BaseLineGraphMin}${MeasurmentUnit}`"
    ></BaseLabel>

    <VerticalLine
      v-if="!isMobile()"
      class="base_linear_controller_mid_ln base_linear_controller_ln"
      color="#555"
    ></VerticalLine>
    <BaseLabel
      color="#555"
      v-if="!isMobile()"
      class="base_linear_controller_mid_l"
      v-text="`Default`"
    ></BaseLabel>

    <VerticalLine
      v-if="!isMobile()"
      class="base_linear_controller_max_ln base_linear_controller_ln"
      color="#555"
    ></VerticalLine>
    <BaseLabel
      color="#555"
      v-if="!isMobile()"
      class="base_linear_controller_max_l"
      v-text="`${BaseLineGraphMax}${MeasurmentUnit}`"
    ></BaseLabel>
    <BaseLineGraph
      :readOnly="false"
      class="x_generic_controls_graph"
      :max="BaseLineGraphMax"
      :min="BaseLineGraphMin"
      :input="BaseLineGraphInput"
      ref="LineGraph"
      :width="BaseLineGraphSizeController().width"
      :height="BaseLineGraphSizeController().height"
      @onMobileInput="onMobileInputHandler"
    ></BaseLineGraph>

    <BaseLabel
      color="#FFF"
      v-if="isMobile()"
      id="mobile_base_linear_controller_value_l"
      v-text="
        `${parseFloat(BaseLineGraphInput.toString()).toFixed(
          2
        )}${MeasurmentUnit}`
      "
    ></BaseLabel>

    <input
      v-if="!isMobile()"
      ref="NumericalInputRef"
      @change="LinearControllerUnitInputParser"
      step="0.01"
      placeholder="5"
      :max="BaseLineGraphMax"
      :min="BaseLineGraphMin"
      type="number"
      class="base_linear_controller_input dynamic-font-weight"
    />
    <div
      v-if="!isMobile()"
      @click="LinearControllerUnitPositiveStepOnClick"
      class="base_linear_controller_positive_step_btn dynamic-font-weight"
    >
      +
    </div>
    <div
      v-if="!isMobile()"
      @click="LinearControllerUnitNegativeStepOnClick"
      class="base_linear_controller_negative_step_btn dynamic-font-weight"
    >
      -
    </div>
  </div>
</template>

<style scoped>
#mobile_base_linear_controller_value_l {
  top: 40.770114943%;
  left: 88.25%;
  font-size: 2.1vh;
  border-right: solid 1px #0500ff;
  padding-right: 0.5%;
}
.base_linear_controller_positive_step_btn,
.base_linear_controller_negative_step_btn {
  position: absolute;
  top: 33.027522936%;
  left: calc(81.325301205% + 2%);
  width: 4.2592vh;
  height: 4.2592vh;
  border: solid 1px #0500ff;
  color: #fff;
  font-size: 2.1vh;
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
  font-size: 2vh;
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
  font-size: 1.7vh;
}
.base_linear_controller_max_l {
  top: 62.385321101%;
  left: 52.259036145%;
  font-size: 1.7vh;
}
.base_linear_controller_min_ln {
  left: 2.873563218%;
}
.base_linear_controller_min_l {
  font-size: 1.7vh;
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
  font-size: 2vh;
}
</style>