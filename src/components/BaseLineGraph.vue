
<script setup lang="ts">
  import isMobile from "@/composables/isMobile";
  </script>
<script lang="ts">
export default {
  props: {
    width: { default: "97.680412371%" },
    height: { default: "0.660066007%" },
    min: { default: -90 },
    max: { default: 90 },
    input: { default: 60 },
  },
  data(){
    return{
      mobileDragableLeft: '50%',
    }
  },
  methods: {
    mobileDragableOnMove(e:Event){
      let touch = e.touches[0];
      this.mobileDragableLeft = `${touch.clientX}px`;
    },
    scale(
      num: number,
      in_min: number,
      in_max: number,
      out_min: number,
      out_max: number
    ) {
      return (
        ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
      );
    },
    input_parser() {
      let midpoint = (this.min + this.max) / 2;

      let positive_slider_width = "0%";
      let negative_slider_width = "0%";
      let negative_slider_left = "0%";

      if (this.input >= this.min && this.input <= this.max) {
        if (this.input > midpoint) {
          negative_slider_width = "0%";
          negative_slider_left = "0%";
          positive_slider_width = `${this.scale(
            this.input,
            midpoint,
            this.max,
            0,
            50
          )}%`;
        } else {
          positive_slider_width = "0%";
          negative_slider_width = `${this.scale(
            this.input,
            midpoint,
            this.min,
            0,
            50
          )}%`;
          negative_slider_left = `${
            50 - this.scale(this.input, midpoint, this.min, 0, 50)
          }%`;
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
    <div v-if="isMobile()" id="mobile_dragable" :style="`left: ${mobileDragableLeft}`" @touchmove="mobileDragableOnMove"></div>
  </div>
</template> 
<style scoped>
#mobile_dragable {
  position: absolute;
  width: 3vh;
  height: 3vh;
  background-color: #0500ff80;
}
#mobile_dragable:hover {
  background-color: #0500ff90;
}
.base_line_graph_center_indi {
  width: 0.104vw;
  height: 100%;
  left: 50%;
  translate: transform(-50%);
  background-color: #0500ff;
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
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>