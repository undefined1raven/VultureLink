<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import VelocityIndicator from "@/components/CMDVelocityIndicator.vue";
import AltitudeIndicator from "@/components/CMDAltIndicator.vue";
import VSIndicator from "@/components/CMDVsIndicator.vue";
import VerticalLine from "@/components/VerticalLine.vue";

import isMobile from "@/composables/isMobile.ts";
import percentage from "@/composables/percentage.ts";
import rangeScaler from "@/composables/rangeScaler.ts";
</script>

<script lang="ts">
export default {
  props: {},
  data(){
    return{
        mapInstance: false,
        isMiniMapExtended: false,
        MiniMapHeight: 100,
        MiniMapSizeToggleButtonStyle: "",
    }
  },
  methods: {
    NavMapExtendButtonOnToggle(){
        if(this.mapInstance){
            this.isMiniMapExtended = !this.isMiniMapExtended;
            if(this.isMiniMapExtended){
                this.mapInstance.remove();
                this.MiniMapHeight = 200;
                this.MiniMapSizeToggleButtonStyle = 'transform: rotate(-180deg); top: 272%';
                setTimeout(() => {
                    this.mapSetup();
                }, 100);
            }
            else{
                this.mapInstance.remove();
                this.MiniMapHeight = 100;
                this.MiniMapSizeToggleButtonStyle = 'transform: rotate(0deg); top: 172%';
                this.mapSetup();
            }
        }
    },
    mapSetup() {
      var map = L.map("nav_map_container", {zoomControl: false}).setView([45.43151, 28.05431], 15);
      var gl = L.mapboxGL({
        attribution:
          '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
        style:
          "https://api.maptiler.com/maps/96f0d0fa-e9c9-43b1-a8ff-09fd5b45a351/style.json?key=R1cyh6lj1mTfNEycg2N1",
      }).addTo(map);
      this.mapInstance = map;
    },
  },
  mounted() {
    this.mapSetup();
  },
};
</script>

<template>
  <div id="mobile_cmd_main_nav_dock_container">
    <VelocityIndicator
      width="12.6557%"
      height="auto"
      id="nav_velocity_indi"
    ></VelocityIndicator>
    <BaseLabel id="velocity_acx" class="primary_l" v-text="'0 m/s'"></BaseLabel>
    <AltitudeIndicator
      width="13%"
      height="auto"
      id="alt_indi"
    ></AltitudeIndicator>
    <BaseLabel
      id="altitude_acx"
      class="primary_l"
      v-text="'-99 km'"
    ></BaseLabel>
    <VSIndicator
      width="6.21311%"
      height="auto"
      id="vertical_speed_indi"
    ></VSIndicator>
    <BaseLabel id="vs_acx" class="primary_l" v-text="'+12 m/s'"></BaseLabel>
    <VerticalLine id="nav_dock_ln" color="#0500FF"></VerticalLine>
    <div :style="`height: ${MiniMapHeight}%;`" id="nav_map_container"></div>
    <div @click="NavMapExtendButtonOnToggle" :style="MiniMapSizeToggleButtonStyle" id="extend_nav_map_btn_indi"></div>
    <div @click="NavMapExtendButtonOnToggle" :style="MiniMapSizeToggleButtonStyle" id="extend_nav_map_btn_touch_target"></div>
  </div>
</template>
<style scoped>
#extend_nav_map_btn_touch_target{
    position: absolute;
    top: 172%;
    left: 88%;
    width: 4vh;
    height: 4vh;
    z-index: 999;
}
#extend_nav_map_btn_indi{
    position: absolute;
    top: 172%;
    left: 86%;
    width: 0;
    height: 0;
    border-top: solid 3vh #0500ff;
    border-right: solid 3vh transparent ;
    border-left: solid 3vh transparent;
    z-index: 999;
    transition: all ease-in-out 0.1s;
}
#nav_map_container {
  position: absolute;
  top: 104%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: #000000aa;
  transition: all ease-in-out 0.1s;
}
#vs_acx {
  top: 0%;
  left: 59.016393443%;
  text-align: center;
}
#nav_dock_ln {
  top: 8.108108108%;
  height: 81.081081081%;
  left: 57.37704918%;
}
.primary_l {
  font-size: 3.6vh;
  width: 39.344262295%;
  text-align: start;
}
#altitude_acx {
  top: 45.945945946%;
  left: 18.032786885%;
}
#velocity_acx {
  top: 0%;
  left: 18.032786885%;
}
#mobile_cmd_main_nav_dock_container {
  position: absolute;
  top: 0%;
  left: 78.4375%;
  padding-right: 1.5%;
  width: 19.0625%;
  height: 10.277777778%;
  background-color: #000000aa;
  border-bottom: solid 1px #0500ff;
}
#nav_velocity_indi {
  top: 13.216216216%;
  left: 2.278689%;
}
#alt_indi {
  top: 57.864864865%;
  left: 2.278689%;
}
#vertical_speed_indi {
  top: 50.162162162%;
  left: 78.68852459%;
}
</style>
<style>
.leaflet-control-attribution.leaflet-control {
  display: none;
}

.leaflet-container a {
  display: none;
}
</style>