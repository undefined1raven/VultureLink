
<script setup>
import DockDeco from "@/components/DockDeco.vue";
</script>

<script>
export default {
  props: {
    color: "",
  },
};
</script>

<template>
  <div class="dock_list_item_container">
    <div class="dock_main_area"></div>
    <div class="dock_menu_btn_container">
        <div class="menu_btn_dot dot_0"></div>
        <div class="menu_btn_dot dot_1"></div>
        <div class="menu_btn_dot dot_2"></div>
    </div>
    <div class="dock_id_l">Dock XBA-1</div>
    <DockDeco class="dock_deco_position" :color="color"/>
    <div class="dock_port_0_indi dock_port_x_indi"></div>
    <div class="dock_port_1_indi dock_port_x_indi"></div>
    <div class="dock_port_2_indi dock_port_x_indi"></div>
    <div class="dock_port_3_indi dock_port_x_indi"></div>
  </div>
</template>

<style scoped>
div{
    user-select: none;
}
.dock_menu_btn_container{
    position: absolute;
    top: 3.571428571%;
    left: 80.142857143%;
    width: 1.0416666666667vw;
    height: 1.0416666666667vw;
    border: solid 1px #515151;
    display: flex;
    align-items: center;
    justify-content: center;
}
.dot_0{
    left: 25%;
}
.dot_2{
    left: 65%;
}
.menu_btn_dot{
    position: absolute;
    width: 0.10416666666667vw;
    height: 0.10416666666667vw;
    background-color: #515151;
}
.dock_deco_position{
    top: 52.142857143%;
}
.dock_main_area {
  width: 100%;
  height: 100%;
  border: solid 1px #515151;
  background-color: #51515100;
}
.dock_list_item_container {
  position: relative;
  width: 7.2916666666667vw;
  height: 7.2916666666667vw;
  margin-bottom: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dock_id_l {
  position: absolute;
  top: 25%;
  font-size: 0.9vw;
  color: #fff;
  font-family: "Titillium Web", sans-serif;
}
.dock_port_x_indi {
  position: absolute;
  top: 85%;
  width: 0.78125vw;
  height: 0.78125vw;
  border: solid 1px #515151;
  background-color: #51515100;
}
.dock_port_0_indi {
  left: 11.428571429%;
}
.dock_port_1_indi {
  left: 33.571428571%;
}
.dock_port_2_indi {
  left: 55.714285714%;
}
.dock_port_3_indi {
  left: 77.857142857%;
}
</style>