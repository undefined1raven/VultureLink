
<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";

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
    RightSideButtonOnClick() {},
    LeftSideButtonOnClick() {},
  },
};
</script>

<template>
  <div
    class="BaseFullWidthSelectionControlsContainer"
    :style="ControlsHeight + ControlsTop"
  >
    <BaseLabel
      @click="RightSideButtonOnClick"
      id="right-side_selection_button"
      v-text="rightSideSelectionButtonLabel"
      color="#FFF"
    ></BaseLabel>
    <BaseLabel
      @click="LeftSideButtonOnClick"
      id="left-side_selection_button"
      v-text="leftSideSelectionButtonLabel"
      color="#FFF"
    ></BaseLabel>
  </div>
</template>

<style scoped>
.BaseFullWidthSelectionControlsContainer {
  position: absolute;
  width: 100%;
  left: 0%;
}
#right-side_selection_button {
  top: 92.03125%;
  left: 0;
  width: 49.9%;
  height: 100%;
  background-color: #0500ff20;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: solid 1px #0500ff;
  border-bottom: solid 1px #0500ff;
  font-size: 4.8vw;
  transition: background-color linear 0.05s;
}
#left-side_selection_button {
  top: 92.03125%;
  left: 49.8%;
  width: 49.9%;
  height: 100%;
  background-color: #0500ff20;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: solid 1px #0500ff;
  border-bottom: solid 1px #0500ff;
  border-left: solid 1px #0500ff;
  font-size: 4.8vw;
  transition: background-color linear 0.05s;
}
#right-side_selection_button:hover,
#left-side_selection_button:hover {
  background-color: #0500ff40;
}
</style>