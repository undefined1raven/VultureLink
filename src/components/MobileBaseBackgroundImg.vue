
<script setup lang="ts">
import isMobile from "@/composables/isMobile.ts";
</script>

<template>
  <div v-if="isMobile()" id="m_bkg_img_container">
    <img
      id="mobile_bkg"
      draggable="false"
      src="../assets/visual_assets/mobile_bkg_v1.2.png"
      alt="bkg"
    />
  </div>
</template>
<style scoped>
img {
  user-select: none;
  pointer-events: none;
}
#m_bkg_img_container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}
@media only screen and (min-width: 769px) {
  #mobile_bkg {
    display: none;
  }
}
@media only screen and (max-width: 768px) {
  #mobile_bkg {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 270%;
    height: 100%;
    z-index: 0;
  }
}
</style>