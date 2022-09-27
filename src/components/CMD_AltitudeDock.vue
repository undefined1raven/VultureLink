
<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import { throwStatement } from "@babel/types";
</script>
    
<script lang="ts">
export default {
  props: {},
  data() {
    return {
      isExtended: true,
    };
  },
  methods: {
    onAltitudeDockTitleClick() {
      this.isExtended = !this.isExtended;
    },
  },
};
</script>

<template>
  <div id="cmd_main_alt_dock">
    <BaseLabel
      id="altitude_dock_l"
      @click="onAltitudeDockTitleClick"
      v-text="'Altitude'"
    ></BaseLabel>
    <div id="altitude_dock_container" v-if="isExtended">
      <BaseLabel
        id="altitude_atm_l"
        class="secondary_l"
        v-text="'ATM'"
      ></BaseLabel>
      <BaseLabel
        id="altitude_atm_value_acx"
        class="primary_l"
        v-text="'00m'"
      ></BaseLabel>
      <BaseLabel
        id="altitude_atm_rate_acx"
        class="primary_l"
        v-text="'00m/s'"
      ></BaseLabel>
      <BaseLabel
        id="altitude_gps_l"
        class="secondary_l"
        v-text="'GPS'"
      ></BaseLabel>
      <BaseLabel
        id="altitude_gps_value_acx"
        class="primary_l"
        v-text="'00m'"
      ></BaseLabel>
      <BaseLabel
        id="altitude_gps_rate_acx"
        class="primary_l"
        v-text="'00m/s'"
      ></BaseLabel>
      <HorizontalLine color="#0500FF" id="altitude_dock_ln"></HorizontalLine>
    </div>
  </div>
</template>
<style scoped>
@keyframes ini_ani {
  0% {
    transform: translateY(-1%);
  }
  100% {
    transform: translateY(0%);
  }
}
#altitude_dock_container {
  /* animation: ini_ani linear 0.05s; */
}
#altitude_gps_value_acx,
#altitude_gps_rate_acx {
  top: 76.129032258%;
  left: 0%;
  width: 50%;
}
#altitude_gps_rate_acx {
  border-left: solid 1px #0500ff;
  left: 50%;
}
#altitude_gps_l {
  top: 60.64516129%;
  left: 2.580645161%;
}
#altitude_dock_ln {
  top: 60%;
  left: 0;
  width: 100%;
}
#altitude_dock_l {
  border-bottom: solid 1px #0500ff;
  font-size: 2vh;
  width: 95.483870968%;
  padding-left: 4.516129032%;
  background-color: #0500ff00;
  transition: all linear 0.1s;
}
#altitude_dock_l:hover {
  background-color: #0500ff20;
}
.secondary_l {
  color: #8e8e8e;
  font-size: 1.4vh;
}
#altitude_atm_value_acx {
  top: 39.35483871%;
  width: 50%;
  left: 0;
}
#altitude_atm_rate_acx {
  top: 39.35483871%;
  width: 50%;
  left: 50%;
  border-left: solid 1px #0500ff;
}
.primary_l {
  font-size: 1.7vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
#altitude_atm_l {
  top: 23.026315789%;
  left: 2.580645161%;
}
#cmd_main_alt_dock {
  position: absolute;
  top: 21.481481481%;
  left: 0;
  height: 14.074074074%;
  width: 7.916666667%;
  background-color: #000000aa;
}
</style>