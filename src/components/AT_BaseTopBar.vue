
<script setup lang="ts">
import VultureLogoMin from "@/components/VultureLogoMin.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import UserDropdownMenu from "@/components/UserDropdownMenu.vue";
import BaseLabel from "@/components/BaseLabel.vue";

import scale from "@/composables/scale.ts";
import percentage from "@/composables/percentage.ts";
import isMobile from "@/composables/isMobile.ts";
</script>


<script lang="ts">
export default {
  props: {
    SelectedVultureObject: { default: { vn: "", vid: "" } },
    CurrentUsername: { default: "" },
    systemID: { default: "" },
    ConnectionStatus: { default: false },
  },
  data() {
    return {
      logo_ln_left: 0,
      system_l_left: 0,
      windowWidth: document.documentElement.clientWidth,
    };
  },
  methods: {
    connectionStatusLabelStyleController() {
      if (!this.ConnectionStatus) {
        return {style: `color: #FF006B; border-left: solid 1px #FF006B; background-color: #FF006B20`, text: 'Failed to connect'};
      }
      if (this.ConnectionStatus) {
        return {style: `color: #00FFF0; border-left: solid 1px #00FFF0; background-color: #00FFF020`, text: 'Link Established'};
      }
    },
    ComputeStyleLeft(scale_target: number, scale_ref: number) {
      return `left: ${percentage(
        scale(scale_target, scale_ref),
        this.windowWidth
      )}%;`;
    },
    ComputeUIStyle() {
      if (isMobile()) {
        this.logo_ln_left = this.ComputeStyleLeft(47, 360);
        this.system_l_left = this.ComputeStyleLeft(56, 360);
      } else {
        this.logo_ln_left = this.ComputeStyleLeft(64, 1920);
        this.system_l_left = this.ComputeStyleLeft(88, 1920);
      }
    },
  },
  mounted() {
    this.ComputeUIStyle();
    window.addEventListener("resize", () => {
      this.windowWidth = document.documentElement.clientWidth;
      this.ComputeUIStyle();
    });
  },
  unmounted() {
    window.removeEventListener("resize", () => {});
  },
};
</script>

<template>
  <div id="top_bar_container">
    <VultureLogoMin id="vulture_logo_min" />
    <VerticalLine
      color="#1900FF"
      :style="logo_ln_left"
      id="logo_ln"
    ></VerticalLine>
    <UserDropdownMenu
      ref="UserDropdownMenuRef"
      v-if="!isMobile"
      :username="CurrentUsername"
      top="0.740740741%"
      left="85.104166667%"
    />
    <HorizontalLine color="#1900FF" id="top_bar_ln"></HorizontalLine>
    <BaseLabel
      color="#FFF"
      id="system_l"
      :style="system_l_left"
      v-text="`${SelectedVultureObject.vn} Systems \\\\ ${systemID}`"
    ></BaseLabel>
    <BaseLabel :style="connectionStatusLabelStyleController()?.style" v-text="connectionStatusLabelStyleController()?.text" id="connection_status_l"></BaseLabel>
  </div>
</template>
<style scoped>
#system_l {
  top: 1.934814815%;
  left: 4.583333333%;
  font-size: 2.2vh;
}
#top_bar_ln {
  top: 7.592592593%;
  left: 0.416666667%;
  width: 98.541666667%;
}
#logo_ln {
  top: 0.740740741%;
  left: 3.333333333%;
  height: 5.462962963%;
}
#vulture_logo_min {
  top: 1.203703704%;
  left: 0.416666667%;
}
#connection_status_l {
  top: 2.12962963%;
  left: 90.260416667%;
  width: 8.297916667%;
  height: 3.425925926%;
  padding-left: 0.4%;
  font-size: 2.2vh;
  transition: all linear 0.1s;
}
</style>