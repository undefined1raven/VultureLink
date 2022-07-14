
<script setup>
import OverviewButton from "@/components/AT_OverviewButton.vue";
import MobileOverviewSonarArrayDeco from "@/components/MobileOverviewSonarArrayDeco.vue";
import MobileOverviewDynamicsDeco from "@/components/MobileOverviewDynamicsDeco.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import Label from "@/components/Label.vue";
</script>

<script>
export default {
  props: {
    vulture_connection_status: "",
    vulture_hardware_status_obj: "",
    selected_vulture_obj: { default: { vn: "", vid: "" } },
    isMobile: "",
  },
  methods: {
    system_status_label_parser(sys_id) {
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
    system_color_parser(sys_id) {
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
      <div id="system_overview_container">
        <Label id="system_menu_l" v-text="'Vulture Systems'"></Label>
        <OverviewButton
          id="sonar_array_overview_btn"
          system_label="SONAR ARRAY"
          :stroke="system_color_parser('sonar_array')"
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
    <div v-if="isMobile" id="vulture_systems_mobile_container">
      <Label
        v-text="`${selected_vulture_obj.vn}\\\\Systems`"
        id="vulture_id_l"
      ></Label>
      <HorizontalLine id="m_vulture_systems_overview_ln_0" color="#1400FF"/>
      <div
        id="m_overview_sonar_array_btn_container"
        class="m_overview_x_btn_container"
        :style="`border: solid 1px ${system_color_parser('sonar_array')}`"
      >
        <Label class="system_id_l" v-text="'Sonar Array'"></Label>
        <Label
          class="system_status_l"
          v-text="system_status_label_parser('sonar_array')"
          :color="system_color_parser('sonar_array')"
        ></Label>
        <MobileOverviewSonarArrayDeco
          class="system_deco"
          id="m_overview_sonar_array_deco"
          :color="system_color_parser('sonar_array')"
        />
      </div>

      <div
        id="m_overview_dynamics_btn_container"
        class="m_overview_x_btn_container"
        :style="`border: solid 1px ${system_color_parser('dynamics')}`"
      >
        <Label class="system_id_l" v-text="'Dynamics'"></Label>
        <Label
          class="system_status_l"
          v-text="system_status_label_parser('dynamics')"
          :color="system_color_parser('dynamics')"
        ></Label>
        <MobileOverviewDynamicsDeco
          class="system_deco"
          id="m_overview_dynamics_deco"
          :color="system_color_parser('dynamics')"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
#m_vulture_systems_overview_ln_0{
  top: 7.1875%;
  left: 3.333333333%;
  width: 93.333333333%;
}
#vulture_id_l {
  top: 2.03125%;
  left: 3.333333333%;
  font-size: 5.6vw;
}
#m_overview_dynamics_deco {
  top: 68.695652174%;
}
.system_id_l {
  top: 2.608695652%;
  font-size: 4.6vw;
}
.system_status_l {
  top: 26.086956522%;
  font-size: 4.6vw;
}
.system_deco {
  position: absolute;
}
#m_overview_sonar_array_deco {
  top: 54.782608696%;
  width: 28.345679012%;
  height: 40.408695652%;
}

.m_overview_x_btn_container {
  position: absolute;
  width: 45%;
  height: 17.96875%;
  border: solid 1px #0d009d;
  display: flex;
  align-items: center;
  justify-content: center;
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
#m_overview_sonar_array_btn_container {
  top: 10.78125%;
  left: 3.333333333%;
}
#m_overview_dynamics_btn_container {
  top: 10.78125%;
  left: 51.666666667%;
}
</style>