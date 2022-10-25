<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import ControlsOverviewLetter from "@/components/CMD_ControlsOverviewLetter.vue";

import isMobile from "@/composables/isMobile.ts";
import percentage from "@/composables/percentage.ts";
import rangeScaler from "@/composables/rangeScaler.ts";
</script>


<script lang="ts">
export default {
  props: {
    width: { default: "41.510416667%" },
    height: { default: "56.111111111%" },
  },
  methods:{
    continueButtonOnClick(){
        this.$emit('continueButtonOnClick');
    }
  },
};
</script>

<template>
  <div
    :style="`width: ${width}; height: ${height};`"
    class="cmd_controls_overview_container"
  >
    <HorizontalLine id="controls_overview_ln" color="#0500FF"></HorizontalLine>
    <BaseLabel id="controls_overview_l" v-text="'Controls'"></BaseLabel>
    <ControlsOverviewLetter
      id="yaw_left_key"
      letter="Q"
      action="Yaw Left"
    ></ControlsOverviewLetter>
    <ControlsOverviewLetter
      id="forward_key"
      letter="W"
      action="Forward"
    ></ControlsOverviewLetter>
    <ControlsOverviewLetter
      id="yaw_right_key"
      letter="E"
      action="Yaw Right"
    ></ControlsOverviewLetter>
    <ControlsOverviewLetter
      id="roll_left_key"
      letter="A"
      action="Roll Left"
    ></ControlsOverviewLetter>
    <ControlsOverviewLetter
      id="backward_key"
      letter="S"
      action="Backward"
    ></ControlsOverviewLetter>
    <ControlsOverviewLetter
      id="roll_right_key"
      letter="D"
      action="Roll Right"
    ></ControlsOverviewLetter>
    <ControlsOverviewLetter
      id="descent_key"
      letter="C"
      action="Descent"
    ></ControlsOverviewLetter>
    <ControlsOverviewLetter
      id="ascent_key"
      letter="Space"
      action="Ascent"
    ></ControlsOverviewLetter>
    <BaseLabel id="details_l_0" class="details_l_x" v-text="'Holding any controls moves the Vulture in the specific direction.'"></BaseLabel>
    <BaseLabel id="details_l_1" class="details_l_x" v-text="'Releasing all controls makes the Vulture hover.'"></BaseLabel>
    <BaseLabel @click="continueButtonOnClick" id="continue_btn" v-text="'Continue'"></BaseLabel>
  </div>
</template>

<style scoped>
#continue_btn:hover{
    background-color: #0500FF40;
}

#continue_btn{
    top: calc(87.95379538% + 3%);
    left: 50%;
    transform: translate(-50%);
    border: solid 1px #0500FF;
    width: 29.987452949%;
    height: 7.590759076%;
    background-color: #0500FF20;
    display: flex;
    align-items: center;
    justify-content: center;
}
.details_l_x{
    left: 50%;
    transform: translate(-50%);
    color: #888;
    font-size: 1.9vh;
    white-space: nowrap;
}
#details_l_0{
    top: calc(73.432343234% + 6%);
}
#details_l_1{
    top: calc(79.372937294% + 6%);
}
#ascent_key{
    top: calc(53.465346535% + 4%);
    left: 38.644918444%;
    width: 38.770388959%;
}
#descent_key{
    top: calc(53.465346535% + 4%);
    left: 22.584692597%;
}
#roll_right_key{
    top: calc(34.323432343% + 2%);
    left: 57.716436637%;
}
#backward_key {
  top: calc(34.323432343% + 2%);
  left: 43.789209536%;
}
#roll_left_key {
  top: calc(34.323432343% + 2%);
  left: 29.73651192%;
}
#yaw_right_key {
  top: 15.346534653%;
  left: 57.716436637%;
}
#forward_key {
  top: 15.346534653%;
  left: 43.789209536%;
}
#yaw_left_key {
  top: 15.346534653%;
  left: 29.73651192%;
}

#controls_overview_l {
  top: 3.135313531%;
  left: 2.509410289%;
  font-size: 2.7vh;
}

#controls_overview_ln {
  top: 12.541254125%;
  left: 0%;
  width: 100%;
}
.cmd_controls_overview_container {
  position: absolute;
  background-color: #000000aa;
}
</style>