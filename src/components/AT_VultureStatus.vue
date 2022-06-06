

<script setup>
import Label from "@/components/Label.vue";
</script>

<script>
export default {
  props: {
    selected_vulture_obj: "",
    vulture_array_status: "",
    vulture_connection_status: "",
  },
  methods: {
    vulture_obj_validator(){
      if(this.selected_vulture_obj == undefined){
        return {vn: "", vid: ""}
      }else{
        return this.selected_vulture_obj
      }
    },
    vulture_connection_status_parser() {
      if (this.vulture_connection_status == true) {
        return { color: "#00FFF0", text: "Established" };
      }
      if (this.vulture_connection_status == false) {
        return { color: "#FF006B", text: "Offline" };
      }
      if (this.vulture_connection_status == null) {
        return { color: "#999", text: "Checking/|/" };
      }
    },
  },
};
</script>

<template>
  <div id="vulture_status_container">
    <Label id="vulture_status_l" color="#FFF" v-text="'Vulture Status'"></Label>
    <div class="vulture_status_data_container">
      <div id="vulture_id_container" class="data_container">
        <Label
          id="vulture_id_l"
          v-text="'Vulture ID'"
          color="#FFF"
          class="vulture_x_l"
        ></Label>
        <Label
          id="vulture_id_actual"
          v-text="vulture_obj_validator().vn"
          color="#FFF"
          class="vulture_x_actual"
        ></Label>
      </div>
      <div id="vulture_connection_status_container" class="data_container">
        <Label
          id="vulture_connection_status_l"
          v-text="'Connection Status'"
          color="#FFF"
          class="vulture_x_l"
        ></Label>
        <Label
          id="vulture_connection_status_actual"
          v-text="vulture_connection_status_parser().text"
          :color="vulture_connection_status_parser().color"
          class="vulture_x_actual"
        ></Label>
      </div>
    </div>
    <div id="vulture_status_ln_container">
      <div id="vulture_status_ln_0" class="ln ln_h"></div>
      <div id="vulture_status_ln_1" class="ln ln_h"></div>
      <div id="vulture_status_ln_2" class="ln ln_v"></div>
    </div>
  </div>
</template>
<style scoped>
#vulture_connection_status_container {
  top: 17.760617761%;
}
.vulture_status_data_container {
  position: absolute;
  top: 18.148148148%;
  left: 27.34375%;
  width: 16.822916667%;
  height: 23.981481481%;
}
.vulture_x_l {
  left: 0;
  font-size: 1vw;
}
.vulture_x_actual {
  left: 27.554179567%;
  width: 72.13622291%;
  text-align: end;
  font-size: 1vw;
}
.data_container {
  position: absolute;
  top: 0;
  left: 0;
  width: 99.8%;
  height: 17.374517375%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: solid 1px #001379;
}
#vulture_status_l {
  top: 14.351851852%;
  left: 27.34375%;
}
#vulture_status_ln_0 {
  top: 12.685185185%;
  left: 26.822916667%;
  width: 18.125%;
}
#vulture_status_ln_1 {
  top: 12.685185185%;
  left: 45.755208333%;
  width: 2.083333333%;
}
#vulture_status_ln_2 {
  top: 12.685185185%;
  left: 46.770833333%;
  height: 1.851851852%;
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