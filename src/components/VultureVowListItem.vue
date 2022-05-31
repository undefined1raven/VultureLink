
<script setup>
import VultureFlatDeco from "@/components/VultureFlatDeco.vue";


</script>

<script>
export default {
  props: {
    vn: "",
    color: "",
    selected: "",
  },
  methods: {
    vulture_main_mouse_cover_onMouseEnter() {
      if(this.color == '#0500FF'){
        this.backgroundColor = `${this.color}40`;
      }
      else{
        this.backgroundColor = `${this.color}20`;
      }
    },
    vulture_main_mouse_cover_onMouseLeave() {
      this.backgroundColor = "#00000000";
    },
  },
  data() {
    return {
      backgroundColor: "",
      main_area_style: `border-color: ${this.color};`,
      side_status_indi_style: `background-color: ${this.color};`,
    };
  },
};
</script>

<template>
  <div class="vulture_vow_list_item_container">
    <div :style="`border-color: ${color}; background-color: ${backgroundColor};`" class="vulture_main_area"></div>
    <div :style="`background-color: ${color}`" class="vulture_side_status_indi"></div>
    <div class="vulture_id_l">{{ vn }}</div>
    <div class="vulture_selected_l">Selected</div>
    <VultureFlatDeco class="vulture_deco" :color="color"/>
    <div
      @mouseenter="vulture_main_mouse_cover_onMouseEnter"
      @mouseleave="vulture_main_mouse_cover_onMouseLeave"
      class="vulture_main_mouse_cover"
    ></div>
  </div>
</template>

<style scoped>
.vulture_vow_list_item_container {
  margin-top: 1px;
  margin-bottom: 2%;
  width: 99%;
  height: 19%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.vulture_main_mouse_cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.vulture_deco{
  position: absolute;
  left: 2.392344498%;
  width: 12.698564593%;
  height: 25.930232558%;
  z-index: 1;
}
.vulture_selected_l {
  position: absolute;
  left: 77.511961722%;
  font-size: 0.9vw;
  color: #fff;
  font-family: "Titillium Web", sans-serif;
  z-index: 1;
}
.vulture_main_area {
  position: absolute;
  left: 1.196172249%;
  width: 98.803827751%;
  height: 100%;
  border: solid 1px #555;
  z-index: 0;
}
.vulture_id_l {
  width: 65.550239234%;
  left: 10.765550239%;
  font-size: 1vw;
  color: #fff;
  font-family: "Titillium Web", sans-serif;
  z-index: 1;
}
.vulture_side_status_indi {
  position: absolute;
  left: 0;
  height: 95%;
  width: 0.4784689%;
  background-color: #515151;
}
</style>