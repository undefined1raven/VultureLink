
<script setup lang="ts">
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import CMD_VultureVideoDownlinkPlaceholder from "@/components/CMD_VultureVideoDownlinkPlaceholderIndi.vue";
import VultureDetailedDeco from "@/components/VultureDetailedDeco.vue";
import AuroraLogo from "@/components/AuroraLogo.vue";
import ConsoleMidSectionBkg from "@/components/CMD_ConsoleMidSectionBkg.vue";
import ConsoleLowerLateralSectionBkg from "@/components/CMD_ConsoleLowerLateralSectionBkg.vue";
import MainConsoleLowerLeft from "@/components/CMD_MainConsoleLowerLeft.vue";
import isMobile from "@/composables/isMobile.ts";
import percentage from "@/composables/percentage.ts";
import scale from "@/composables/scale.ts";

// import "leaflet/dist/leaflet.css";
// import L from "mapbox-gl-leaflet";
// import mapboxGL from "mapbox-gl";
</script>


<script lang="ts">
let root = document.documentElement;
export default {
  methods: {
    mapSetup() {
      var map = L.map('minimap_container').setView([30.42110, -93.78787], 5);
      var gl = L.mapboxGL({
        attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
        style: 'https://api.maptiler.com/maps/96f0d0fa-e9c9-43b1-a8ff-09fd5b45a351/style.json?key=R1cyh6lj1mTfNEycg2N1'
      }).addTo(map);
    },
    primaryContainerStyleController() {
      let primaryContainerWidth = percentage(
        scale(450, 1920),
        document.documentElement.clientWidth
      );
      this.primaryContainerStyle = `width: ${
        primaryContainerWidth +
        Math.abs(1.971252567 - this.screenAspectRatio) * 10
      }%;`;
    },
    secondary0ContainerStyleController() {
      let screenAspectRatioOffset =
        Math.abs(1.971252567 - this.screenAspectRatio) * 10;
      let secondary0ContainerWidth = percentage(
        scale(124, 1920),
        document.documentElement.clientWidth
      );
      let secondary0ContainerLeft = percentage(
        scale(531, 1920),
        document.documentElement.clientWidth
      );
      this.secondary0ContainerStyle = `width: ${
        secondary0ContainerWidth + screenAspectRatioOffset - 1
      }%; left: ${secondary0ContainerLeft + screenAspectRatioOffset};`;
    },
    UI_assessor() {
      /*handles scaling of the ui relative to the svg background*/
      this.screenAspectRatio = root.clientWidth / root.clientHeight;
      this.primaryContainerStyleController();
      this.secondary0ContainerStyleController();
    },
  },
  mounted() {
    this.mapSetup();
    this.UI_assessor();
    window.addEventListener("resize", () => {
      this.UI_assessor();
    });
  },
  unmounted() {
    window.removeEventListener("resize", () => {});
  },
  data() {
    return {
      primaryContainerStyle: "",
      secondary0ContainerStyle: "",
      screenAspectRatio:
        document.documentElement.clientWidth /
        document.documentElement.clientHeight,
    };
  },
};
</script>


<template>
  <div id="cmd_main_console_lower_left_container">
    <div
      id="cmd_main_console_lower_left_primary_container"
      :style="primaryContainerStyle"
    >
      <div id="minimap_container"></div>
    </div>
    <div
      id="cmd_main_console_lower_left_secondary_0_container"
      :style="secondary0ContainerStyle"
    ></div>
  </div>
</template>
<style scoped>
#cmd_main_console_lower_left_primary_container {
  position: absolute;
  top: 87.5%;
  left: 0%;
  width: 27.1875%;
  height: 12.5%;
  background-color: #55555540;
}
#cmd_main_console_lower_left_secondary_0_container {
  position: absolute;
  top: 87.5%;
  left: 25.75625%;
  width: 6.458333333%;
  height: 4.074074074%;
  background-color: #55555540;
}
#minimap_container {
  position: absolute;
  top: 0;
  width: 30%;
  height: 100%;
  background-color: #0500ff40;
}
</style>