

<script setup>
import Label from "@/components/Label.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import VerticalLine from "@/components/VerticalLine.vue";
</script>

<script>
export default {
  props: {
    issue_obj: "",
    isMobile: ""
  },
  methods: {
    issue_onClick() {
      this.$emit("onIssueSelected", {
        issue_obj: this.issue_obj,
        system_id_dictionary: this.system_id_dictionary,
        component_id_dictionary: this.component_id_dictionary,
        status_type_dictionary: this.status_type_dictionary,
      });
    },
  },
  data() {
    return {
      system_id_dictionary: {
        sonar_array: "Sonar Array",
        dynamics: "Dynamics",
        navigation: "Navigation",
      },
      component_id_dictionary: {
        fwd_sonar: "Forward Sonar",
        bwd_sonar: "Rear Sonar",
        lft_sonar: "Left-side Sonar",
        rgt_sonar: "Right-side Sonar",
        gnd_sonar: "Ground Sonar",
        primary_imu: "IMU",
        primary_acc: "Accelerometer",
        gps: "GPS",
        magnetometer: "Magnetometer",
        barometer: "Barometer",
      },
      status_type_dictionary: {
        0: "Offline",
        1: "Faulty",
        2: "Unknown",
      },
    };
  },
};
</script>

<template>
  <div @click="issue_onClick" class="issue_list_item_container">
    <div id="issue_label_types_container" v-if="!isMobile">
      <Label id="issue_system_id_type_l" color="#B7B7B7" class="issue_x_type_l" v-text="'System:'"></Label>
      <Label id="issue_part_id_type_l" color="#B7B7B7" class="issue_x_type_l" v-text="'Component:'"></Label>
      <Label id="issue_status_type_l" color="#B7B7B7" class="issue_x_type_l" v-text="'Status:'"></Label>
    </div>
    <Label
      id="issue_system_id_l"
      class="issue_x_l"
      v-text="system_id_dictionary[issue_obj.system_id]"
      color="#FFF"
    ></Label>
    <Label
      id="issue_part_id_l"
      class="issue_x_l"
      v-text="component_id_dictionary[issue_obj.component_id]"
      color="#FFF"
    ></Label>
    <Label
      id="issue_part_status_type_l"
      class="issue_x_l"
      v-text="status_type_dictionary[issue_obj.status_type]"
      color="#FFF"
    ></Label>
  </div>
</template>
<style scoped>
.issue_x_l {
  position: absolute;
  font-size: 0.93vw;
  left: calc(59.589041096% - 25%);
  width: 60%;
  text-align: end;
}
.issue_x_type_l{
  position: absolute;
  font-size: 0.93vw;
  left: 3.698630137%;
  text-align: start;
}
.issue_list_item_container {
  position: relative;
  width: 29.871794872%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: solid 1px #ff006b;
  border-left: solid 1px #ff006b;
  transition: background-color linear 0.1s;
}
.issue_list_item_container:hover {
  background-color: #ff006b20;
}
#issue_system_id_l, #issue_system_id_type_l {
  top: 10.95890411%;
}
#issue_part_id_l, #issue_part_id_type_l {
  top: 32.191780822%;
}
#issue_part_status_type_l, #issue_status_type_l {
  top: 53.424657534%;
}
@media only screen and (max-width: 800px) {
  #issue_system_id_l, #issue_system_id_type_l, #issue_part_id_l, #issue_part_id_type_l, #issue_part_status_type_l, #issue_status_type_l{/* for mobile let display flex auto set top */
    top: auto;
  } 
  .issue_list_item_container {
    left: 0%;
    width: 100%;
    height: 24.855491329%;
    border: none;
    border-bottom: solid 1px #ff006b;
  }
  .issue_x_l {
    top: auto;
    font-size: 4.5vw;
    height: 50.744186047%;
    display: flex;
    align-items: center;
    justify-content: start;
    border-right: solid 1px #ff006b;
  }
  #issue_system_id_l {
    width: 31.269349845%;
    left: 0.92879257%;
  }
  #issue_part_id_l {
    width: 38.390092879%;
    left: 33.436532508%;
  }
  #issue_part_status_type_l {
    left: 73.06501548%;
    width: 26.93498452%;
    border: none;
  }
}
</style>