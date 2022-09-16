
<script setup lang="ts">
import isMobile from "@/composables/isMobile";
import percentage from "@/composables/percentage";
import scale from "@/composables/scale";
import rangeScaler from "@/composables/rangeScaler";
</script>
<script lang="ts">
export default {
  props: {
    readOnly: { default: true },
    width: { default: "97.680412371%" },
    height: { default: "0.660066007%" },
    min: { default: -90 },
    max: { default: 90 },
    input: { default: 60 },
  },
  data() {
    return {
      mobileDragableLeft: "50%",
      mobileDragableSize: "3.4",
    };
  },
  expose: ["setMobileDragablePosition"],
  methods: {
    setMobileDragablePosition(leftPercentage: number) {
      this.mobileDragableLeft = `${leftPercentage}%`;
    },
    slidersBackgroundColorController() {
      if (this.readOnly) {
        return "solid_background";
      } else {
        return "";
      }
    },
    mobileDragableOnTouchEnd() {
      this.mobileDragableSize = "3.4";
    },
    mobileDragableOnMove(e: Event) {
      this.mobileDragableSize = "2.4";
      let touchX = e.touches[0].clientX;
      let clientWidth = document.documentElement.clientWidth;
      if (
        percentage(touchX, clientWidth) >= 5.64 &&
        percentage(touchX, clientWidth) <= 80
      ) {
        let offset = scale(32, clientWidth);
        this.mobileDragableLeft = `${touchX - offset}px`;
        this.$emit("onMobileInput", {
          input: rangeScaler(
            percentage(touchX, clientWidth),
            5.64,
            80,
            this.min,
            this.max
          ).toFixed(2),
        });
      }
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
          positive_slider_width = `${rangeScaler(
            this.input,
            midpoint,
            this.max,
            0,
            50
          )}%`;
        } else {
          positive_slider_width = "0%";
          negative_slider_width = `${rangeScaler(
            this.input,
            midpoint,
            this.min,
            0,
            50
          )}%`;
          negative_slider_left = `${
            50 - rangeScaler(this.input, midpoint, this.min, 0, 50)
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
      :class="`base_line_graph_negative_slider p-abs ${slidersBackgroundColorController()}`"
      :style="`left: ${input_parser().negative_slider_left}; width: ${
        input_parser().negative_slider_width
      }`"
    ></div>
    <div class="base_line_graph_center_indi p-abs"></div>
    <div
      :class="`base_line_graph_positive_slider p-abs ${slidersBackgroundColorController()}`"
      :style="`width: ${input_parser().positive_slider_width}`"
    ></div>
    <div
      v-if="isMobile() && !readOnly"
      id="mobile_dragable"
      :style="`left: ${mobileDragableLeft}; width: ${mobileDragableSize}vh; height: ${mobileDragableSize}vh;`"
      @touchmove="mobileDragableOnMove"
      @touchstart="mobileDragableOnMove"
      @touchend="mobileDragableOnTouchEnd"
    ></div>
  </div>
</template> 
<style scoped>
#mobile_dragable {
  position: absolute;
  width: 3.4vh;
  height: 3.4vh;
  background-color: #0500ff80;
  transition: width cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s,
    height cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s;
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
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .base_line_graph_container {
    border-left: solid 1px #fff;
    border-right: solid 1px #fff;
  }
  .base_line_graph_negative_slider {
    background: linear-gradient(90deg, #0500ff 0%, rgba(5, 0, 255, 0) 101.05%);
  }
  .base_line_graph_positive_slider {
    background: linear-gradient(90deg, rgba(5, 0, 255, 0) 0%, #0500ff 101.05%);
  }
  .solid_background {
    background-color: #0500ff;
  }
}
</style>