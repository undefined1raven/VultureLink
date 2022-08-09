

<script lang="ts">
export default {
  props: {
    width: { default: "97.680412371%" },
    height: { default: "0.660066007%" },
    min: { default: -90 },
    max: { default: 90 },
    input: { default: 60 },
  },
  methods: {
    input_parser() {
      let midpoint = (this.min + this.max) / 2;

      let positive_slider_width = "0%";
      let negative_slider_width = "0%";
      let negative_slider_left = "0%";

      if (this.input >= this.min && this.input <= this.max) {
        if (this.input > midpoint) {
          negative_slider_width = "0%";
          negative_slider_left = "0%";
          positive_slider_width = `${
            (((this.input) * 100) / this.max) / 2
          }%`;
        } else {
          positive_slider_width = "0%";
          negative_slider_width = `${
            Math.abs(((this.input - midpoint) * 100) / this.min / 2)
          }%`;
          negative_slider_left = `${50 - Math.abs(((this.input - midpoint) * 100) / this.min / 2)}%`;
        }
      }

      return {
        negative_slider_left: negative_slider_left,
        negative_slider_width: negative_slider_width,
        positive_slider_width: positive_slider_width,
      };
    },
  },
};
</script>

<template>
  <div
    class="base_line_graph_container"
    :style="`width: ${width}; height: ${height}`"
  >
    <div
      class="base_line_graph_negative_slider p-abs"
      :style="`left: ${input_parser().negative_slider_left}; width: ${
        input_parser().negative_slider_width
      }`"
    ></div>
    <div class="base_line_graph_center_indi p-abs"></div>
    <div
      class="base_line_graph_positive_slider p-abs"
      :style="`width: ${input_parser().positive_slider_width}`"
    ></div>
  </div>
</template> 
<style scoped>
.base_line_graph_center_indi {
  width: 0.104vw;
  height: 100%;
  left: 50%;
  translate: transform(-50%);
  background-color: #0500FF;
  z-index: 5;
}
.base_line_graph_negative_slider {
  width: 50%;
  height: 100%;
  background-color: #0500ff;
}
.base_line_graph_positive_slider {
  left: 50%;
  width: 50%;
  height: 100%;
  background-color: #0500ff;
}
.base_line_graph_container {
  position: absolute;
  background-color: #0500ff40;
}
</style>