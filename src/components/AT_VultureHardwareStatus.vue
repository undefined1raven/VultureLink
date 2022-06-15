<script setup>
import Label from "@/components/Label.vue";
import VultureDetailedDeco from "@/components/VultureDetailedDeco.vue";
</script>

<script>
export default {
  props: {
    isMobile: "",
  },
};
</script>

<template>
  <div id="vulture_hardware_status_container">
    <Label
      v-if="isMobile"
      id="vulture_hardware_status_l"
      v-text="'Hardware Status'"
    ></Label>
    <Label
      id="primary_status_l"
      v-text="'Vulture Offline'"
      color="#0400D4"
    ></Label>
    <VultureDetailedDeco
      id="vulture_detailed_deco"
      color="#0400D4"
    ></VultureDetailedDeco>
  </div>
</template>
<style scoped>
#vulture_detailed_deco {
  left: 33.149779736%;
  width: 13.876651982%;
  height: 72.471910112%;
}
#primary_status_l {
  left: 52.643171806%;
}
#vulture_hardware_status_container {
  position: absolute;
  top: calc(80.462962963% + 3%);
  left: 49.739583333%;
  width: 47.291666667%;
  height: calc(16.481481481% - 3%);
  border-top: solid 1px #0400d4;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media only screen and (max-width: 800px) {
  #vulture_hardware_status_l {
    top: 3.731343284%;
    left: 0%;
    font-size: 5.6vw;
  }
  #vulture_detailed_deco {
    top: 41.044776119%;
    left: auto;
    width: 37.151702786%;
    height: 50.847457627%;
  }
  #primary_status_l {
    top: 20.149253731%;
    left: auto;
    font-size: 5.6vw;
  }
  #vulture_hardware_status_container {
    top: 49.6875%;
    left: 5.277777778%;
    width: 89.722222222%;
    height: 41.875%;
    border-top: solid 1px #1400ff;
  }
}
</style>