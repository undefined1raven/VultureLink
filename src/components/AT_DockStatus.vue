<script setup>
import Label from "@/components/Label.vue";
import RelayStationList from "@/components/RelayStationList.vue";
import PayloadList from "@/components/PayloadList.vue";
import DockDecoDetailed from "@/components/DockDecoDetailed.vue";
</script>

<script>
export default {
  props: {
    selected_dock_obj: "",
    dock_connection_status: "",
    relay_station_array: "",
  },
  methods: {
    dock_connection_status_parser() {
      if (this.dock_connection_status == true) {
        return { color: "#00FFF0", text: "Established" };
      }
      if (this.dock_connection_status == false) {
        return { color: "#FF006B", text: "Offline" };
      }
      if (this.dock_connection_status == null) {
        return { color: "#999", text: "Checking/|/" };
      }
    },
  },
};
</script>

<template>
  <div id="dock_status_container">
    <div v-if="selected_dock_obj == ''" class="no_dock_selected_container">
        <Label id="no_dock_selected_l" color="#FFF" v-text="'Select a Dock to see its status'"></Label>
        <DockDecoDetailed id="no_dock_selected_deco"></DockDecoDetailed>
    </div>
    <div class="dock_status_data_container">
      <Label id="dock_status_l" color="#FFF" v-text="'Dock Status'"></Label>
      <div id="dock_id_container" class="data_container">
        <Label color="#FFF" class="dock_x_l" v-text="'Dock ID:'"></Label>
        <Label
          color="#FFF"
          class="dock_x_actual"
          v-text="selected_dock_obj.dock_name"
        ></Label>
      </div>
      <div id="dock_connection_status_container" class="data_container">
        <Label
          color="#FFF"
          class="dock_x_l"
          v-text="'Connection Status:'"
        ></Label>
        <Label
          :color="dock_connection_status_parser().color"
          class="dock_x_actual"
          v-text="dock_connection_status_parser().text"
        ></Label>
      </div>
      <div id="dock_relay_station_list_container" class="data_container">
        <Label
          id="dock_relay_station_list_l"
          class="dock_x_l"
          v-text="'Relay Stations Connected To'"
          color="#FFF"
        ></Label>
        <RelayStationList
          :relay_station_array="relay_station_array"
          :selected_dock_obj="selected_dock_obj"
        ></RelayStationList>
      </div>
      <div id="payload_list_container" class="data_container">
        <Label
          id="dock_payload_list_l"
          color="#FFF"
          class="dock_x_l"
          v-text="'Available Payloads'"
        ></Label>
        <PayloadList :payload_array="selected_dock_obj.payload_array"></PayloadList>
      </div>
    </div>
    <div class="dock_status_ln_container">
      <div id="dock_status_ln_0" class="ln ln_h"></div>
      <div id="dock_status_ln_1" class="ln ln_h"></div>
      <div id="dock_status_ln_2" class="ln ln_v"></div>
      <div id="dock_status_ln_3" class="ln ln_h"></div>
      <div id="dock_status_ln_4" class="ln ln_v"></div>
      <div id="dock_status_ln_5" class="ln ln_h"></div>
      <div id="dock_status_ln_6" class="ln ln_v"></div>
      <div id="dock_status_ln_7" class="ln ln_v"></div>
      <div id="dock_status_ln_8" class="ln ln_v"></div>
      <div id="dock_status_ln_9" class="ln ln_h"></div>
      <div id="dock_status_ln_10" class="ln ln_h"></div>
    </div>
  </div>
</template>
<style scoped>
#no_dock_selected_deco{
  top: 43.707482993%;
}
#no_dock_selected_l{
  top: 34.523809524%;
  font-size: 1.05vw;
}
.no_dock_selected_container{
  position: absolute;
  top: 42.5%;
  left: 24.791666667%;
  width: 21.979166667%;
  height: 54.444444444%;
  z-index: 10;
  background-color: rgba(0, 0, 0, .95);
  display: flex;
  align-items: center;
  justify-content: center;
}
#dock_payload_list_l{
  top: 4.035874439%;
}
#payload_list_container{
  top: 61.904761905%;
  height: 37.925170068%;
  border: none;
}
#dock_relay_station_list_l {
  top: 3.964757709%;
}
#dock_relay_station_list_container {
  top: 22.959183673%;
  height: 38.605442177%;
}
#dock_connection_status_container {
  top: 15.136054422%;
}
.dock_x_actual {
  left: 27.554179567%;
  width: 72.13622291%;
  text-align: end;
  font-size: 1vw;
}
#dock_id_container {
  top: 7.31292517%;
}
.dock_x_l {
  left: 0%;
  font-size: 1vw;
}
.data_container {
  position: absolute;
  height: 7.653061224%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: solid 1px #001379;
}
.dock_status_data_container {
  position: absolute;
  top: 42.5%;
  left: 27.34375%;
  width: 16.822916667%;
  height: 54.444444444%;
}
#dock_status_l {
  top: 0.680272109%;
  left: 0;
}
#dock_status_ln_10 {
  top: 96.944444444%;
  left: 26.822916667%;
  width: 17.916666667%;
}
#dock_status_ln_8 {
  top: 95.185185185%;
  left: 46.770833333%;
  height: 1.851851852%;
}
#dock_status_ln_9 {
  top: 96.944444444%;
  left: 45.755208333%;
  width: 2.0833333333333vw;
}
#dock_status_ln_7 {
  top: 46.111111111%;
  left: 46.770833333%;
  height: 47.314814815%;
}
#dock_status_ln_6 {
  top: 16.481481481%;
  left: 46.770833333%;
  height: 22.314814815%;
}
#dock_status_ln_5 {
  top: 12.685185185%;
  left: 26.822916667%;
  width: 17.916666667%;
}
#dock_status_ln_3 {
  top: 12.685185185%;
  left: 45.755208333%;
  width: 2.083333333%;
}
#dock_status_ln_4 {
  top: 12.685185185%;
  left: 46.770833333%;
  height: 1.851851852%;
}
#dock_status_ln_0 {
  top: 42.407407407%;
  left: 26.822916667%;
  width: 17.864583333%;
}
#dock_status_ln_1 {
  top: 42.407407407%;
  left: 45.729166667%;
  width: 1.041666667%;
}
#dock_status_ln_2 {
  top: 40.601851852%;
  left: 46.770833333%;
  height: 3.703703704%;
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
</style>