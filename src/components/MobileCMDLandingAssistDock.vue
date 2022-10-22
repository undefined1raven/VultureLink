<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";

import isMobile from "@/composables/isMobile.ts";
import percentage from "@/composables/percentage.ts";
import rangeScaler from "@/composables/rangeScaler.ts";
</script>

<script lang="ts">
export default{
    props:{
        isLandingAssistVisible: {default: false},
        groundDistance: {default: 2.5},
    },
    methods: {
      LandingAssistController(){
        return `left: ${rangeScaler(this.groundDistance, 4, 0, 0, 100)}%;`;
      },
    },
}
</script>

<template>
    <Transition name="ani">
        <div v-if="isLandingAssistVisible" id="mobile_cmd_main_landing_assist_dock_container">
          <HorizontalLine id="landing_assist_ln" color="#0500FF"></HorizontalLine>
          <BaseLabel id="landing_assist_sonar_alt_acx" v-text="`${groundDistance.toFixed(1)}m`"></BaseLabel>
          <div id="landing_assist_indi_container">
            <div :style="LandingAssistController()" id="landing_assist_indi_acx"></div>
            <div class="landing_assist_separator" id="landing_assist_4m_mark"></div>
            <div class="landing_assist_separator" id="landing_assist_3m_mark"></div>
            <div class="landing_assist_separator" id="landing_assist_2m_mark"></div>
            <div class="landing_assist_separator" id="landing_assist_075m_mark"></div>
            <div class="landing_assist_separator" id="landing_assist_05m_mark"></div>
            <div class="landing_assist_separator" id="landing_assist_025m_mark"></div>
          </div>
        </div>
    </Transition>
</template>

<style scoped>

#landing_assist_0m_mark{
    left: 95.327102804%;
    display: none;
}
#landing_assist_025m_mark{
    left: 93.457943925%;
}
#landing_assist_05m_mark{
    left: 86.91588785%;
}
#landing_assist_075m_mark{
    left: 80.373831776%;
}
#landing_assist_4m_mark{
    left: 23.364485981%;
}
#landing_assist_3m_mark{
    left: 48.598130841%;
}
#landing_assist_2m_mark{
    left: 73.831775701%;
}
#landing_assist_indi_acx{
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: #0500FF;
}
.landing_assist_separator {
  position: absolute;
  top: 0%;
  height: 100%;
  width: 1.869158879%;
  background-color: #000000;
}
#landing_assist_indi_container{
  position: absolute;
  top: 61.111111111%;
  height: 32.444444%;
  width: 100%;
  background-color: #55555540;
  overflow: hidden;
}
.mini_width{
    width: 4.273504274%;
}
#landing_assist_sonar_alt_acx {
  top: 0%;
  font-size: 4vh;
}
#landing_assist_ln {
  position: absolute;
  top: 52.777777778%;
  left: 0%;
  width: 100%;
}
#mobile_cmd_main_landing_assist_dock_container {
  position: absolute;
  top: 89.444444444%;
  left: 50%;
  width: 16.71875%;
  height: 10%;
  transform: translate(-50%);
  background-color: #000000aa;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ani-move,
.ani-enter-active,
.ani-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
  transform: translateX(0);
}

.ani-enter-from,
.ani-leave-to {
  opacity: 0;
  transform: translateX(-50%);
}

.ani-leave-active {
  position: absolute;
}
</style>