

<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import VerticalLine from "@/components/VerticalLine.vue";
</script>

<script lang="ts">
export default {
  props: {
    NavDockStyleObj: {
      default: {
        labelTop: "top: 36.203703704%;",
        dockActualTop: "top: 39.537037037%;",
      },
    },
    telemetryUItoggle: { default: true },
    telemetry: {
      default: {
        gps: { range: "--", velocity: "--", heading: "24" },
        mag: { heading: "5" },
      },
    },
  },
  data() {
    return {
      isExtended: true,
      mapInstance: false,
      showLoadingMapLabel: true,
    };
  },
  methods: {
    onNavDockTitleClick() {
      this.isExtended = !this.isExtended;
    },
    mapSetup() {
      var map = L.map("nav_map_container", { zoomControl: false }).setView(
        [45.43151, 28.05431],
        15
      );
      var gl = L.mapboxGL({
        attribution:
          '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
        style:
          "https://api.maptiler.com/maps/96f0d0fa-e9c9-43b1-a8ff-09fd5b45a351/style.json?key=R1cyh6lj1mTfNEycg2N1",
      }).addTo(map);
      this.mapInstance = map;
      setTimeout(() => {
        this.showLoadingMapLabel = false;
      }, 200);
    },
  },
  mounted() {
    this.mapSetup();
  },
};
</script>

<template>
  <div v-if="telemetryUItoggle" id="cmd_main_nav_dock">
    <BaseLabel
      @click="onNavDockTitleClick"
      class="transition"
      :style="NavDockStyleObj.labelTop"
      id="nav_dock_l"
      v-text="'Nav'"
    ></BaseLabel>
    <div
      id="nav_dock_container"
      class="transition"
      :style="NavDockStyleObj.dockActualTop"
      v-if="isExtended"
    >
      <BaseLabel
        id="nav_dock_hdg_l"
        class="primary_l"
        v-text="'Heading'"
      ></BaseLabel>
      <BaseLabel
        id="nav_dock_mag_hdg_value_acx"
        v-text="`${telemetry.mag.heading.toString().padStart(3, '0')}°`"
        class="primary_l"
      ></BaseLabel>
      <BaseLabel
        id="nav_dock_gps_hdg_value_acx"
        v-text="`${telemetry.gps.heading.toString().padStart(3, '0')}°`"
        class="primary_l"
      ></BaseLabel>
      <BaseLabel
        id="nav_dock_gps_hdg_l"
        v-text="'GPS'"
        class="secondary_l"
      ></BaseLabel>
      <BaseLabel
        id="nav_dock_mag_hdg_l"
        v-text="'MAG'"
        class="secondary_l"
      ></BaseLabel>
      <VerticalLine id="nav_dock_hdg_ln" color="#0500FF"></VerticalLine>
      <!-- <HorizontalLine id="nav_dock_ln_0" color="#0500FF"></HorizontalLine>
      <HorizontalLine id="nav_dock_ln_1" color="#0500FF"></HorizontalLine> -->
      <BaseLabel
        id="nav_dock_range_l"
        v-text="'Range'"
        class="primary_l"
      ></BaseLabel>
      <BaseLabel
        id="nav_dock_range_value_acx"
        v-text="`${telemetry.gps.range}km`"
        class="primary_l"
      ></BaseLabel>
      <div id="nav_map_container">
        <BaseLabel
          id="loading_map_l"
          v-if="showLoadingMapLabel"
          color="#777"
          v-text="'Loading Map'"
        ></BaseLabel>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transition {
  transition: top ease-in-out 0.1s;
}
#nav_dock_range_l {
  top: 28.689189189%;
  padding-left: 4.580645161%;
  padding-top: 2%;
  padding-bottom: 2%;
  left: 0%;
  width: 50%;
  justify-content: start;
  border-top: solid 1px #0500ff;
  border-bottom: solid 1px #0500ff;
}
#loading_map_l {
  font-size: 1.7vh;
}
#nav_map_container {
  position: absolute;
  top: 42%;
  left: 0%;
  width: 102.7%;
  height: 58%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000aa;
}
#nav_dock_range_value_acx {
  top: 28.689189189%;
  left: 50%;
  width: 50%;
  text-align: end;
  padding-right: 2.5%;
  border-top: solid 1px #0500ff;
  border-bottom: solid 1px #0500ff;
  padding-top: 2%;
  padding-bottom: 2%;
}
#nav_dock_gps_hdg_l,
#nav_dock_mag_hdg_l {
  top: 16.891891892%;
  width: 50%;
  left: 50%;
  text-align: center;
}
#nav_dock_ln_0,
#nav_dock_ln_1 {
  top: 25.675675676%;
  left: 0%;
  width: 100%;
}
#nav_dock_ln_1 {
  top: 37.5%;
}
#nav_dock_mag_hdg_l {
  left: 0%;
}
#nav_dock_l {
  top: 36.203703704%;
  left: 0%;
  border-bottom: solid 1px #0500ff;
  font-size: 2vh;
  width: 7.916666667%;
  padding-left: 0.364583333%;
  background-color: #0500ff00;
  transition: all linear 0.1s;
}
#nav_dock_l:hover {
  background-color: #0500ff40;
}
#nav_dock_hdg_ln {
  top: 10.135135135%;
  left: 50%;
  transform: translate(-50%);
  height: 14.189189189%;
  width: 0.01vh;
}
#nav_dock_container {
  position: absolute;
  top: 39.537037037%;
  left: 0%;
  width: 8.072916667%;
  height: 27.407407407%;
  background-color: #000000aa;
}
#nav_dock_hdg_l {
  top: 0%;
  left: 50%;
  transform: translate(-50%);
}
#nav_dock_mag_hdg_value_acx,
#nav_dock_gps_hdg_value_acx {
  top: 8.783783784%;
  left: 0%;
  width: 50%;
  text-align: center;
  padding-left: 2.5%;
}
#nav_dock_gps_hdg_value_acx {
  left: 50%;
}
.primary_l {
  font-size: 1.7vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.secondary_l {
  color: #8e8e8e;
  font-size: 1.4vh;
}
</style>