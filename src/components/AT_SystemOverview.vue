
<script setup lang="ts">
import OverviewButton from "@/components/AT_OverviewButton.vue";
import MobileOverviewSonarArrayDeco from "@/components/BaseSonarArrayDeco.vue";
import MobileOverviewOpticalArrayDeco from "@/components/BaseOpticalArrayDeco.vue";
import MobileOverviewDynamicsDeco from "@/components/BaseDynamicsDeco.vue";
import MobileOverviewNetworkDeco from "@/components/BaseNetworkDeco.vue";
import MobileOverviewPropulsionDeco from "@/components/BasePropulsionDeco.vue";
import MobileOverviewNavDeco from "@/components/BaseNavDeco.vue";
import MobileOverviewAutonomyDeco from "@/components/BaseAutonomyDeco.vue";
import MobileOverviewPowerDeco from "@/components/BasePowerDeco.vue";
import MobileOverviewButton from "@/components/M_AT_OverviewButton.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import BaseLabel from "@/components/BaseLabel.vue";

import useColorFromVultureSystemStatus from "@/composables/ColorFromVultureSystemStatus.js";
</script>

<script lang="ts">
export default {
  props: {
    vulture_connection_status: "",
    vulture_hardware_status_obj: "",
    selected_vulture_obj: { default: { vn: "", vid: "" } },
    isMobile: {default: false},
  },
  methods: {
    system_selected_emitter(sys_id:string) {
      this.$emit("onVultureSystemSelected", { sys_id: sys_id });
    },
    network_status_style_parser() {
      if (this.vulture_connection_status) {
        return { label: "Nominal", color: "#00FFF0" };
      } else {
        return { label: "Vulture Offline", color: "#FF006B" };
      }
    },
    system_status_label_parser(sys_id:string) {
      if (!this.vulture_connection_status) {
        return "Awaiting Connection";
      } else {
        if (this.vulture_hardware_status_obj[sys_id].overall_status) {
          return "Nominal";
        } else {
          return "Requires Attention";
        }
      }
    },
    system_color_parser(sys_id:string) {
      if (!this.vulture_connection_status) {
        return "#0400D4";
      } else {
        if (this.vulture_hardware_status_obj[sys_id].overall_status) {
          return "#00FFF0";
        } else {
          return "#FF006B";
        }
      }
    },
  },
};
</script>
<template>
  <div class="vulture_systems_container">
    <div v-if="!isMobile" id="vulture_systems_desktop_container">
      <div id="system_overview_ln_container">
        <div id="system_menu_ln_0" class="ln ln_h"></div>
        <div id="system_menu_ln_1" class="ln ln_h"></div>
      </div>
      <div id="system_overview_container" class="animation_group_2">
        <BaseLabel id="system_menu_l" v-text="'Vulture Systems'"></BaseLabel>
        <OverviewButton
          id="sonar_array_overview_btn"
          system_label="SONAR ARRAY"
          :stroke="
            useColorFromVultureSystemStatus({
              vulture_connection_status: vulture_connection_status,
              vulture_hardware_status_obj: vulture_hardware_status_obj,
              sys_id: 'sonar_array',
            })
          "
        ></OverviewButton>
        <OverviewButton
          id="power_overview_btn"
          system_label="POWER"
          :stroke="'#0400D4'"
        ></OverviewButton>
        <OverviewButton
          id="propulsion_overview_btn"
          system_label="PROPULSION"
          :stroke="'#0400D4'"
        ></OverviewButton>
        <OverviewButton
          id="dynamics_overview_btn"
          system_label="DYNAMICS"
          :stroke="system_color_parser('dynamics')"
          @click="system_selected_emitter('dynamics')"
        ></OverviewButton>
        <OverviewButton
          id="optical_array_overview_btn"
          system_label="OPTICAL ARRAY"
          :stroke="'#0400D4'"
        ></OverviewButton>
        <OverviewButton
          id="autonomy_overview_btn"
          system_label="AUTONOMY"
          :stroke="'#0400D4'"
        ></OverviewButton>
        <OverviewButton
          id="nav_overview_btn"
          system_label="NAVIGATION"
          :stroke="system_color_parser('navigation')"
        ></OverviewButton>
        <OverviewButton
          id="network_overview_btn"
          system_label="NETWORK"
          :stroke="'#0400D4'"
        ></OverviewButton>
      </div>
    </div>
    <div
      v-if="isMobile"
      id="vulture_systems_mobile_container"
      class="animation_group_2"
    >
      <BaseLabel
        v-text="`${selected_vulture_obj.vn}\\\\Systems`"
        id="vulture_id_l"
      ></BaseLabel>
      <HorizontalLine id="m_vulture_systems_overview_ln_0" color="#1400FF" />
      <MobileOverviewButton
        id="m_overview_sonar_array_btn"
        friendlySystemLabel="Sonar Array"
        :systemStatusLabel="system_status_label_parser('sonar_array')"
        :systemStatusColor="system_color_parser('sonar_array')"
        sys_id="'sonar_array'"
      ></MobileOverviewButton>
      <MobileOverviewButton
        id="m_overview_dynamics_btn"
        friendlySystemLabel="Dynamics"
        :systemStatusLabel="system_status_label_parser('dynamics')"
        :systemStatusColor="system_color_parser('dynamics')"
        @click="system_selected_emitter('dynamics')"
      ></MobileOverviewButton>
      <MobileOverviewButton
        id="m_overview_network_btn"
        friendlySystemLabel="Network"
        :systemStatusLabel="network_status_style_parser().label"
        :systemStatusColor="network_status_style_parser().color"
      ></MobileOverviewButton>
      <MobileOverviewButton
        id="m_overview_propulsion_btn"
        friendlySystemLabel="Propulsion"
        :systemStatusLabel="'Awaiting Connection'"
        :systemStatusColor="'#0400d4'"
      ></MobileOverviewButton>
      <MobileOverviewButton
        id="m_overview_nav_btn"
        friendlySystemLabel="Navigation"
        :systemStatusLabel="system_status_label_parser('navigation')"
        :systemStatusColor="system_color_parser('navigation')"
      ></MobileOverviewButton>
      <MobileOverviewButton
        id="m_overview_autonomy_btn"
        friendlySystemLabel="Autonomy"
        :systemStatusLabel="'Awaiting Connection'"
        :systemStatusColor="'#0400d4'"
      ></MobileOverviewButton>
      <MobileOverviewButton
        id="m_overview_optical_array_btn"
        friendlySystemLabel="Optical Array"
        :systemStatusLabel="'Awaiting Connection'"
        :systemStatusColor="'#0400d4'"
      ></MobileOverviewButton>
      <MobileOverviewButton
        id="m_overview_power_btn"
        friendlySystemLabel="Power"
        :systemStatusLabel="'Awaiting Connection'"
        :systemStatusColor="'#0400d4'"
      ></MobileOverviewButton>

      <div id="overview_deco_container">
        <MobileOverviewSonarArrayDeco
          class="system_deco"
          id="m_overview_sonar_array_deco"
          :color="system_color_parser('sonar_array')"
        ></MobileOverviewSonarArrayDeco>
        <MobileOverviewDynamicsDeco
          class="system_deco"
          id="m_overview_dynamics_deco"
          :color="system_color_parser('dynamics')"
        ></MobileOverviewDynamicsDeco>
        <MobileOverviewNetworkDeco
          class="system_deco"
          id="m_overview_network_deco"
          :color="network_status_style_parser().color"
        ></MobileOverviewNetworkDeco>
        <MobileOverviewPropulsionDeco
          id="m_overview_propulsion_deco"
          :color="'#0400d4'"
        ></MobileOverviewPropulsionDeco>
        <MobileOverviewNavDeco
          id="m_overview_nav_deco"
          :color="system_color_parser('navigation')"
        ></MobileOverviewNavDeco>
        <MobileOverviewAutonomyDeco
          id="m_overview_autonomy_deco"
          :color="'#0400d4'"
        ></MobileOverviewAutonomyDeco>
        <MobileOverviewOpticalArrayDeco
          id="m_overview_optical_array_deco"
          :color="'#0400d4'"
        ></MobileOverviewOpticalArrayDeco>
        <MobileOverviewPowerDeco
          id="m_overview_power_deco"
          :color="'#0400d4'"
        ></MobileOverviewPowerDeco>
      </div>
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
.animation_group_2 {
  animation: ui_section_transition_in ease-in-out 0.1s;
}
#m_vulture_systems_overview_ln_0 {
  top: 7.1875%;
  left: 3.333333333%;
  width: 93.333333333%;
}
#vulture_id_l {
  top: 2.03125%;
  left: 3.333333333%;
  font-size: 5.6vw;
}
#m_overview_propulsion_deco {
  top: 41.40625%;
  left: 68.611111111%;
  width: 11.111111111%;
  height: 6.25%;
}
#m_overview_power_deco {
  top: 81.09375%;
  left: 66.388888889%;
  width: 16.944444444%;
  height: 6.25%;
}
#m_overview_optical_array_deco {
  top: 82.96875%;
  left: 17.5%;
  width: 16.944444444%;
  height: 4.375%;
}
#m_overview_nav_deco {
  top: 59.53125%;
  left: 18.611111111%;
  width: 14.336111111%;
  height: 8.0640625%;
}
#m_overview_autonomy_deco {
  top: 62.1875%;
  left: 69.444444444%;
  width: 9.444444444%;
  height: 5.3125%;
}
#m_overview_dynamics_deco {
  top: 23.125%;
  left: 63.055555556%;
  width: 22.119444444%;
  height: 4.475%;
}
#m_overview_network_deco {
  top: 40.625%;
  left: 12.777777778%;
  width: 26.388888889%;
  height: 7.03125%;
}
.system_deco {
  position: absolute;
}
#m_overview_sonar_array_deco {
  top: 20.625%;
  left: 19.444444444%;
  width: 12.755555556%;
  height: 7.2609375%;
}
#system_menu_ln_0 {
  top: 12.685185185%;
  left: 48.854166667%;
  width: 50.104166667%;
}
#system_menu_ln_1 {
  top: 96.944444444%;
  left: 48.854166667%;
  width: 50.104166667%;
}
#system_menu_l {
  top: 2.081051479%;
  left: 4.799216454%;
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
#system_overview_container {
  position: absolute;
  top: 12.777777778%;
  left: 46.822916667%;
  width: 53.177083333%;
  height: 84.537037037%;
}
#sonar_array_overview_btn,
#nav_overview_btn,
#network_overview_btn,
#optical_array_overview_btn {
  top: 8.502242152%;
  left: 53.085210578%;
}
#dynamics_overview_btn,
#power_overview_btn,
#autonomy_overview_btn,
#propulsion_overview_btn {
  top: 8.502242152%;
  left: calc(5.484818805%);
}
#nav_overview_btn,
#power_overview_btn {
  top: calc(10.502242152% + (17.040358745% * 1));
}
#network_overview_btn,
#propulsion_overview_btn {
  top: calc(12.502242152% + (17.040358745% * 2));
}
#optical_array_overview_btn,
#autonomy_overview_btn {
  top: calc(14.502242152% + (17.040358745% * 3));
}
#m_overview_sonar_array_btn {
  top: 10.78125%;
  left: 3.333333333%;
}
#m_overview_dynamics_btn {
  top: 10.78125%;
  left: 51.666666667%;
}
#m_overview_network_btn {
  top: 30.625%;
  left: 3.333333333%;
}
#m_overview_propulsion_btn {
  top: 30.625%;
  left: 51.666666667%;
}
#m_overview_nav_btn {
  top: 50.46875%;
  left: 3.333333333%;
}
#m_overview_autonomy_btn {
  top: 50.46875%;
  left: 51.666666667%;
}
#m_overview_optical_array_btn {
  top: 70.3125%;
  left: 3.333333333%;
}
#m_overview_power_btn {
  top: 70.3125%;
  left: 51.666666667%;
}
</style>