
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
      var map = L.map("minimap_container").setView([30.4211, -93.78787], 5);
      var gl = L.mapboxGL({
        attribution:
          '\u003ca href="https://www.maptiler.com/copyright/" target="_blank"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href="https://www.openstreetmap.org/copyright" target="_blank"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e',
        style:
          "https://api.maptiler.com/maps/96f0d0fa-e9c9-43b1-a8ff-09fd5b45a351/style.json?key=R1cyh6lj1mTfNEycg2N1",
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
      <BaseLabel
        id="vs_l"
        class="telemetry_l"
        v-text="'V/S: 2.3m/s'"
      ></BaseLabel>
      <BaseLabel
        id="ground_speed_l"
        v-text="'Ground Speed: 9.4m/s'"
        class="telemetry_l"
      ></BaseLabel>
      <BaseLabel
        id="altitude_label"
        v-text="'Altitude'"
        class="telemetry_l"
      ></BaseLabel>
      <BaseLabel
        id="altitude_baro_label"
        v-text="'ATM'"
        class="telemetry_l"
      ></BaseLabel>
      <BaseLabel
        id="altitude_baro_actual"
        v-text="'12m'"
        class="telemetry_l"
      ></BaseLabel>
      <BaseLabel
        id="altitude_gps_label"
        v-text="'GPS'"
        class="telemetry_l"
      ></BaseLabel>
      <BaseLabel
        id="altitude_gps_actual"
        v-text="'14m'"
        class="telemetry_l"
      ></BaseLabel>
      <VerticalLine id="alt_ln" color="#0500FF"></VerticalLine>
      <VerticalLine id="ln_0" color="#0500FF"></VerticalLine>
    </div>
    <div
      id="cmd_main_console_lower_left_secondary_0_container"
      :style="secondary0ContainerStyle"
    ></div>
  </div>
</template>
<style scoped>
#ln_0 {
  top: 0;
  left: 74.712643678%;
  height: 100%;
}
#altitude_gps_label,
#altitude_gps_actual {
  border: none;
  top: 72.592592593%;
}
#altitude_gps_label {
  color: #999;
  left: 55.555555556%;
}
#altitude_gps_actual {
  left: 65.134099617%;
}
#alt_ln {
  top: 72.592592593%;
  left: 53.256704981%;
  height: 23.703703704%;
}
#altitude_label {
  border: none;
  top: 47.407407407%;
  left: 33.524904215%;
}
#altitude_baro_label {
  border: none;
  color: #999;
  top: 72.592592593%;
  left: 33.524904215%;
}
#altitude_baro_actual {
  border: none;
  top: 72.592592593%;
  left: 43.67816092%;
}
.telemetry_l {
  width: 40.421455939%;
  height: 22.222222222%;
  font-size: 2vh;
  display: flex;
  align-items: center;
  justify-content: start;
  border-bottom: solid 1px #0500ff;
  white-space: nowrap;
}
#ca_demo {
  position: absolute;
  top: 0.2%;
  left: 50%;
  transform: translate(-50%);
  width: 10.88888888888889vh;
  height: 10.88888888888889vh;
}
#cmd_main_console_lower_left_primary_container {
  position: absolute;
  top: 87.5%;
  left: 0%;
  width: 27.1875%;
  height: 12.5%;
  background-color: #55555500;
}
#cmd_main_console_lower_left_secondary_0_container {
  position: absolute;
  top: 87.5%;
  left: 25.75625%;
  width: 6.458333333%;
  height: 4.074074074%;
  background-color: #55555500;
}
#minimap_container {
  position: absolute;
  top: 0;
  width: 32.637931034%;
  height: 100%;
  background-color: #0500ff40;
  border-right: solid 1px #0500ff;
}
#vs_l {
  top: 0%;
  left: 33.524904215%;
}
#ground_speed_l {
  top: 23.703703704%;
  left: 33.524904215%;
}
</style>
<style>
.leaflet-control-attribution.leaflet-control {
  background-color: #00000000;
}

.leaflet-container a {
  color: #50505000;
  display: none;
}
</style>