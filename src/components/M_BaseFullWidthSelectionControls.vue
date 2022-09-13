
<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";

import isMobile from "@/composables/isMobile.ts";
</script>

<script lang="ts">
export default {
  props: {
    rightSideSelectionButtonLabel: { default: "" },
    leftSideSelectionButtonLabel: { default: "" },
    ControlsHeight: { default: "height: 7.6125%;" },
    ControlsTop: { default: "top: 12.34375%;" },
  },
  methods: {
    RightSideButtonOnClick() {
      this.selectedButtonID = "right";
      this.$emit('onButtonSelected', {selectedButtonID: "right"});
      this.rightButtonStyleObj = {
        LabelColor: "#FFF",
        LineBkgColor: "#0500FF",
      };
      this.leftButtonStyleObj = {
        LabelColor: "#8D8D8D",
        LineBkgColor: "#8D8D8D",
      };
    },
    LeftSideButtonOnClick() {
      this.selectedButtonID = "left";
      this.$emit('onButtonSelected', {selectedButtonID: "left"});
      this.rightButtonStyleObj = {
        LabelColor: "#8D8D8D",
        LineBkgColor: "#8D8D8D",
      };
      this.leftButtonStyleObj = { LabelColor: "#FFF", LineBkgColor: "#0500FF" };
    },
  },
  data() {
    return {
      selectedButtonID: "left",
      leftButtonStyleObj: { LabelColor: "#FFF", LineBkgColor: "#0500FF" },
      rightButtonStyleObj: { LabelColor: "#8D8D8D", LineBkgColor: "#8D8D8D" },
    };
  },
};
</script>

<template>
  <div
    class="BaseFullWidthSelectionControlsContainer"
    :style="ControlsHeight + ControlsTop"
  >
    <div
      @click="RightSideButtonOnClick"
      id="right-side_selection_button_container"
    >
      <BaseLabel
        v-text="rightSideSelectionButtonLabel"
        :color="rightButtonStyleObj.LabelColor"
        class="l"
      ></BaseLabel>
      <HorizontalLine class="ln_indi" :color="rightButtonStyleObj.LineBkgColor"></HorizontalLine>
    </div>
    <div
      @click="LeftSideButtonOnClick"
      id="left-side_selection_button_container"
      >
      <BaseLabel
        id="left-side_selection_button"
        v-text="leftSideSelectionButtonLabel"
        class="l"
        :color="leftButtonStyleObj.LabelColor"
      ></BaseLabel>
      <HorizontalLine class="ln_indi" :color="leftButtonStyleObj.LineBkgColor"></HorizontalLine>
    </div>
  </div>
</template>

<style scoped>
.BaseFullWidthSelectionControlsContainer {
  position: absolute;
  width: 100%;
  left: 0%;
}
#right-side_selection_button_container,
#left-side_selection_button_container {
  position: absolute;
  top: 92.03125%;
  left: 49.8%;
  width: 49.9%;
  height: 100%;
  background-color: #0500ff00;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: solid 1px #0500ff;
  border-bottom: solid 1px #0500ff;
  transition: background-color linear 0.05s;
}
.ln_indi {
  top: 73.076923077%;
  width: 18.941504178%;
  transition: all linear 0.1s;
}
.l {
  font-size: 4.8vw;
}
#left-side_selection_button_container {
  left: 0%;
  border-right: solid 1px #0500ff;
}
</style>