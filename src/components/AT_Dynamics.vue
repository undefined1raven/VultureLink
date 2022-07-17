
<script setup lang="ts">
import VultureLogoMin from "@/components/VultureLogoMin.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import UserDropdownMenu from "@/components/UserDropdownMenu.vue";
</script>

<script lang="ts">
export default {
  props: {
    current_user_un: {default: "---"},
  },
};
</script>

<template>
  <div id="top_bar_container">
    <VultureLogoMin id="vulture_logo_min" />
    <VerticalLine color="#1900FF" id="logo_ln"></VerticalLine>
    <UserDropdownMenu
      ref="UserDropdownMenuRef"
      v-if="!isMobile"
      :username="current_user_un"
      top="0.740740741%"
      left="85.104166667%"
    />
    <HorizontalLine color="#1900FF" id="top_bar_ln"></HorizontalLine>
  </div>
</template>
<style scoped>
#top_bar_ln{
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