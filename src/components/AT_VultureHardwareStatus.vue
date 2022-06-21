<script setup>
import Label from "@/components/Label.vue";
import VultureDetailedDeco from "@/components/VultureDetailedDeco.vue";
import VultureHardwareStatusIssuesList from "@/components/AT_VultureHardwareStatusIssuesList.vue";
import VultureHardwareStatusIssueDiag from "@/components/AT_VultureHardwareStatusIssueDiag.vue";
</script>

<script>
export default {
  props: {
    isMobile: "",
    vulture_hardware_status_obj: "",
    vulture_connection_status: { default: false },
  },
  data() {
    return {
      selected_issue_obj_and_dictionaries: "",
      areIssueDiagsVisible: false,
    };
  },
  mounted() {},
  methods: {
    onIssueSelectedHandler(args) {
      this.selected_issue_obj_and_dictionaries = args;
      this.areIssueDiagsVisible = true;
    },
    issueDiags_onBackButtonClicked() {
      this.areIssueDiagsVisible = !this.areIssueDiagsVisible;
    },
    parse_issues() {
      let issues_obj_arr = [];
      if (this.isTelemetryValid()) {
        for (let vulture_system in this.vulture_hardware_status_obj) {
          for (let system_component in this.vulture_hardware_status_obj[
            vulture_system
          ]) {
            let system_component_object =
              this.vulture_hardware_status_obj[vulture_system][
                system_component
              ];
            if (system_component_object.status == false) {
              issues_obj_arr.push({
                system_id: vulture_system,
                component_id: system_component,
                status_type: system_component_object.status_type,
              });
            }
          }
        }
        return issues_obj_arr;
      }
    },
    isTelemetryValid() {
      if (this.vulture_hardware_status_obj != "") {
        return true;
      } else {
        return false;
      }
    },
    global_system_status_assessor() {
      //true if all vulture systems are nominal false if otherwise
      if (this.isTelemetryValid()) {
        if (
          this.vulture_hardware_status_obj.sonar_array.overall_status &&
          this.vulture_hardware_status_obj.dynamics.overall_status &&
          this.vulture_hardware_status_obj.navigation.overall_status
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    simple_hardware_status_UI_controller() {
      let primary_status_label = "";
      let primary_status_l_style = "";
      let vulture_deco_color = "";
      if (this.isTelemetryValid() && this.vulture_connection_status) {
        if (this.global_system_status_assessor()) {
          primary_status_label = "Vulture Systems Nominal";
          primary_status_l_style = "border: none; color: #00FFF0;";
          vulture_deco_color = "#00FFF0";
        } else {
          vulture_deco_color = "#FF006B";
        }
      } else {
        primary_status_label = "Vulture Offline";
        primary_status_l_style = "color: #0400D4;";
        vulture_deco_color = "#0400D4";
      }
      return {
        label: primary_status_label,
        style: primary_status_l_style,
        color: vulture_deco_color,
      };
    },
  },
};
</script>

<template>
  <div
    :style="`border-top: solid 1px ${
      simple_hardware_status_UI_controller().color
    };`"
    id="vulture_hardware_status_container"
  >
    <Label
      v-if="isMobile"
      id="vulture_hardware_status_l"
      v-text="'Hardware Status'"
    ></Label>
    <div
      v-show="global_system_status_assessor() || !vulture_connection_status"
      id="simple_hardware_status_container"
    >
      <Label
        id="primary_status_l"
        v-text="simple_hardware_status_UI_controller().label"
        :style="simple_hardware_status_UI_controller().style"
        color="#0400D4"
      ></Label>
      <VultureDetailedDeco
        id="vulture_detailed_deco"
        :color="simple_hardware_status_UI_controller().color"
      ></VultureDetailedDeco>
    </div>
    <div
      v-show="
        !global_system_status_assessor() &&
        vulture_connection_status &&
        !areIssueDiagsVisible
      "
      id="detailed_hardware_status_container"
    >
      <Label
        id="detailed_hardware_status_l"
        v-text="'Some issues have been detected'"
        color="#FF006B"
      ></Label>
      <VultureDetailedDeco
        id="detailed_hardware_status_vulture_deco"
        color="#ff006b"
        v-if="!isMobile"
      ></VultureDetailedDeco>
      <VultureHardwareStatusIssuesList
        @onIssueSelected="onIssueSelectedHandler"
        :issues_array="parse_issues()"
        :isMobile="isMobile"
      ></VultureHardwareStatusIssuesList>
    </div>
    <div
      id="issue_diags_container"
      v-if="areIssueDiagsVisible && vulture_connection_status"
    >
      <Label
        id="issue_diags_l"
        color="#FFF"
        v-text="'Additional Diagnostic Data'"
      ></Label>
      <VultureHardwareStatusIssueDiag
        :issue_obj_pkg="selected_issue_obj_and_dictionaries"
        @onBackButtonClicked="issueDiags_onBackButtonClicked"
      ></VultureHardwareStatusIssueDiag>
    </div>
  </div>
</template>
<style scoped>
#detailed_hardware_status_vulture_deco {
  position: absolute;
  top: 30.260674157%;
  left: 1.431718062%;
  width: 8%;
  height: 60%;
}
#simple_hardware_status_container {
  display: flex;
  align-items: center;
  justify-content: center;
}
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
#detailed_hardware_status_l {
  top: 1.123595506%;
  left: 1.431718062%;
  font-size: 1vw;
}
@media only screen and (max-width: 800px) {
  #issue_diags_l {
    top: 14.552238806%;
    left: 0%;
    font-size: 5vw;
  }
  #vulture_hardware_status_l {
    top: 3.731343284%;
    left: 0%;
    font-size: 5.6vw;
  }
  #detailed_hardware_status_l {
    top: 14.552238806%;
    left: 0%;
    font-size: 5vw;
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