
<script setup lang="ts">
import VultureLogoMin from "@/components/VultureLogoMin.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import UserDropdownMenu from "@/components/UserDropdownMenu.vue";
import BaseLabel from "@/components/BaseLabel.vue";

import scale from '@/composables/scale.ts';
import percentage from '@/composables/percentage.ts';
</script>


<script lang="ts">
export default {
  props: {
    SelectedVultureObject: { default: { vn: "", vid: "" } },
    CurrentUsername: { default: "" },
  },
  data() {
    return {
      logo_ln_left: 0,
      system_l_left: 0,
      windowWidth: document.documentElement.clientWidth,
    };
  },
  methods: {
    ComputeUIStyle() {
      this.logo_ln_left = `left: ${percentage(scale(64, 1920), this.windowWidth)}%;`;
      this.system_l_left = `left: ${percentage(scale(88, 1920), this.windowWidth)}%;`;
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
      v-text="`${SelectedVultureObject.vn} Systems \\\\ Dynamics`"
    ></BaseLabel>
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
</style>