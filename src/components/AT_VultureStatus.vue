

<script setup>
import BaseLabel from "@/components/BaseLabel.vue";
</script>

<script>
export default {
  props: {
    selected_vulture_obj: "",
    vulture_array_status: "",
    vulture_connection_status: "",
    isMobile: "",
  },
  methods: {
    vulture_obj_validator() {
      if (this.selected_vulture_obj == undefined) {
        return { vn: "", vid: "" };
      } else {
        return this.selected_vulture_obj;
      }
    },
    vulture_current_status_parser() {
      if (
        this.selected_vulture_obj.vid == "" &&
        this.selected_vulture_obj.vn == ""
      ) {
        //if selected vulture object is undefined
        return { color: "#999", text: "Checking/|/" };
      }
      if (this.selected_vulture_obj.status == "ready") {
        return { color: "#000AFF", text: "Stand By" };
      }
      if (this.selected_vulture_obj.status == "active") {
        return { color: "#00FFF0", text: "Active" };
      }
      if (this.selected_vulture_obj.status == "fault") {
        return { color: "#FF006B", text: "Requires Maintenence" };
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
  <div id="vulture_status_container" class="animation_group_1">
    <BaseLabel id="vulture_status_l" color="#FFF" v-text="'Vulture Status'"></BaseLabel>
    <div class="vulture_status_data_container">
      <div id="vulture_id_container" class="data_container">
        <BaseLabel
          id="vulture_id_l"
          v-text="'Vulture ID'"
          color="#FFF"
          class="vulture_x_l"
        ></BaseLabel>
        <BaseLabel
          id="vulture_id_actual"
          v-text="vulture_obj_validator().vn"
          color="#FFF"
          class="vulture_x_actual"
        ></BaseLabel>
      </div>
      <div id="vulture_connection_status_container" class="data_container">
        <BaseLabel
          id="vulture_connection_status_l"
          v-text="'Connection Status'"
          color="#FFF"
          class="vulture_x_l"
        ></BaseLabel>
        <BaseLabel
          id="vulture_connection_status_actual"
          v-text="vulture_connection_status_parser().text"
          :color="vulture_connection_status_parser().color"
          class="vulture_x_actual"
        ></BaseLabel>
      </div>
      <div id="vulture_current_status_container" class="data_container">
        <BaseLabel
          id="vulture_current_status_l"
          v-text="'Current Status'"
          color="#FFF"
          class="vulture_x_l"
        ></BaseLabel>
        <BaseLabel
          id="vulture_current_status_actual"
          v-text="vulture_current_status_parser().text"
          :color="vulture_current_status_parser().color"
          class="vulture_x_actual"
        ></BaseLabel>
      </div>
      <div id="vulture_mounted_payloads_container" class="data_container">
        <BaseLabel
          id="vulture_mounted_payloads_l"
          v-text="'Mounted Payloads'"
          color="#FFF"
          class="vulture_x_l"
        ></BaseLabel>
        <div id="vulture_payload_0" class="payload_port_container">
          <BaseLabel class="bay_l" color="#7A7A7A" v-text="'Bay 1'"></BaseLabel>
          <BaseLabel class="payload_l" color="#7A7A7A" v-text="'EMPTY'"></BaseLabel>
          <BaseLabel class="payload_status" color="#7A7A7A" v-text="'--'"></BaseLabel>
        </div>
        <div
          id="vulture_payload_1"
          class="payload_port_container"
          style="background-color: #00fff020"
        >
          <BaseLabel class="bay_l" color="#7A7A7A" v-text="'Bay 2'"></BaseLabel>
          <BaseLabel
            class="payload_l"
            color="#FFF"
            v-text="'LIDAR Scanner'"
          ></BaseLabel>
          <BaseLabel
            class="payload_status"
            color="#00FFF0"
            v-text="'Ready'"
          ></BaseLabel>
        </div>
      </div>
    </div>
    <div v-if="!isMobile" id="vulture_current_status_ln_container">
      <div id="vulture_current_status_ln_0" class="ln ln_h"></div>
      <div id="vulture_current_status_ln_1" class="ln ln_h"></div>
      <div id="vulture_current_status_ln_2" class="ln ln_v"></div>
    </div>
    <div v-if="isMobile == true" id="m_vulture_current_status_ln_container">
      <div id="m_vulture_current_status_ln_0" class="ln ln_h"></div>
      <div id="m_vulture_current_status_ln_1" class="ln ln_h"></div>
      <div id="m_vulture_current_status_ln_2" class="ln ln_v"></div>
    </div>
  </div>
</template>
<style scoped>
@keyframes ui_section_transition_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.animation_group_1{
  animation: ui_section_transition_in ease-in-out .1s;
}
.bay_l {
  left: 0;
  top: -62%;
  font-size: 0.8vw;
}
#vulture_payload_1 {
  left: 53.86996904%;
}
#vulture_payload_0 {
  left: 0%;
}
.payload_l {
  font-size: 0.9vw;
  top: -5%;
}
.payload_status {
  font-size: 0.7vw;
  top: 45%;
}
.payload_port_container {
  position: absolute;
  top: 53.333333333%;
  width: 45.510835913%;
  height: 34.166666667%;
  background-color: #000aff20;
  display: flex;
  align-items: center;
  justify-content: center;
}
#vulture_mounted_payloads_l {
  top: 7.5%;
}
#vulture_mounted_payloads_container {
  top: 53.281853282%;
  height: 46.332046332%;
  border: none;
}
#vulture_current_status_container {
  top: 35.521235521%;
}
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
@media only screen and (max-width: 800px) {
  #vulture_status_l {
    top: 2.03125%;
    font-size: 5.6vw;
    left: 5.833333333%;
  }
  #m_vulture_current_status_ln_0 {
    top: 8.59375%;
    left: 5.277777778%;
    width: 89.444444444%;
    background-color: #1400ff;
  }
  .vulture_status_data_container {
    top: 8.75%;
    left: 5.277777778%;
    width: 89.722222222%;
    height: 40.78125%;
  }
  .bay_l,
  .payload_status {
    font-size: 4.5vw;
  }
  .vulture_x_l,
  .vulture_x_actual,
  .payload_l {
    font-size: 5vw;
  }
}
</style>