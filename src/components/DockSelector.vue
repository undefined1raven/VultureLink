
<script setup lang="ts">
import DockListItem from "@/components/DockListItem.vue";
import BaseLabel from "@/components/BaseLabel.vue";
</script>
<script lang="ts">
export default {
  props: {
    dock_array: "",
    vulture_array_status: "",
    isMobile: "",
  },
  data() {
    return {
      selected_dock_id: "",
    };
  },
  methods: {
    onDockSelected(dock_obj:Object) {
      this.selected_dock_id = dock_obj.dock_id;
      this.$emit("new_target_dock_id_sig", dock_obj);
    },
  },
};
</script>
<template>
  <div id="dock_selector_container">
    <div v-if="!isMobile" id="dock_selector_ln_container">
      <div id="dock_selector_ln_0" class="ln ln_v"></div>
      <div id="dock_selector_ln_1" class="ln ln_h"></div>
      <div id="dock_selector_ln_2" class="ln ln_v"></div>
      <div id="dock_selector_ln_3" class="ln ln_h"></div>
    </div>
    <BaseLabel id="dock_selector_l" color="#FFF" v-text="'Dock Selector'"></BaseLabel>
    <div id="dock_selector_list">
      <DockListItem
        v-for="(dock, index) in dock_array"
        :dock_name="dock.dock_name"
        :dock_obj="dock"
        :vulture_array_status="vulture_array_status"
        :key="index"
        :index="index"
        :isMobile="isMobile"
        color="#0500ff"
        class="animation_group_0"
        :selected_dock_id="selected_dock_id"
        @new_target_dock_id_sig="onDockSelected"
      ></DockListItem>
    </div>
  </div>
</template>
<style scoped>
@keyframes ui_section_transition_in {
  0% {
    /* transform: translateX(-4%); */
    opacity: 0;
  }
  100% {
    /* transform: translateX(0); */
    opacity: 1;
  }
}
.animation_group_0{
  animation: ui_section_transition_in ease-in-out .2s;
}
.ln {
  position: absolute;
  background-color: #2c2c2c;
}
.ln_v {
  width: 0.11vh;
}
.ln_h {
  height: 0.11vh;
}
#dock_selector_ln_3 {
  top: 80.648148148%;
  left: 23.75%;
  width: 1.041666667%;
}
#dock_selector_ln_2 {
  top: 78.842592593%;
  left: 24.739583333%;
  height: 3.703703704%;
}
#dock_selector_ln_0 {
  top: 46.111111111%;
  left: 24.739583333%;
  height: 30.925925926%;
}
#dock_selector_ln_1 {
  top: 80.648148148%;
  left: 1.041666667%;
  width: 21.666666667%;
}
#dock_selector_l {
  top: calc(44.074074074% - 1%);
  left: 0.78125%;
}
#dock_selector_list {
  position: absolute;
  top: calc(49.722222222% - 2.2%);
  left: 4.583333333%;
  width: 15.625%;
  height: calc(28.240740741% + 5%);
  gap: 3%;
  display: flex;
  flex-flow: row wrap;
}
@media only screen and (max-width: 800px) {
  #dock_selector_l {
    top: 2.03125%;
    left: 5.833333333%;
    font-size: 5.6vw;
  }
  #dock_selector_list {
    top: 8.75%;
    left: 5.277777778%;
    width: 89.722222222%;
    height: 84.21875%;
  }
  #dock_selector_list {
    gap: 12%;
  }
}
</style>