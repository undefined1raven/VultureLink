<script setup lang="ts">
import SonarArrayDeco from "@/components/BaseSonarArrayDeco.vue";
import DynamicsDeco from "@/components/AT_MinimizedMenuDynamicsDeco.vue";
import NetworkDeco from "@/components/AT_MinimizedMenuNetworkDeco.vue";
import PropulsionDeco from "@/components/BasePropulsionDeco.vue";
import NavDeco from "@/components/BaseNavDeco.vue";
import AutonomyDeco from "@/components/BaseAutonomyDeco.vue";
import OpticalArrayDeco from "@/components/BaseOpticalArrayDeco.vue";
import PowerDeco from "@/components/BasePowerDeco.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import CommandDeco from "@/components/AT_MinimizedMenuCommandDeco.vue";
import Label from "@/components/Label.vue";
import SecurityDeco from "@/components/SecurityDeco.vue";
</script>

<script lang="ts">
export default {
  data() {
    return {
      menu_cmd_btn_deco_color: "#0500FF",
      menu_security_btn_deco_color: "#0500FF",
    };
  },
  props: {
    vulture_hardware_status_obj: {},
    vulture_connection_status: { default: false },
  },
  methods: {
    MenuCommandButtonOnMouseEnter() {
      this.menu_cmd_btn_deco_color = "#FFF";
    },
    MenuCommandButtonOnMouseLeave() {
      this.menu_cmd_btn_deco_color = "#0500FF";
    },
    MenuSecurityButtonOnMouseEnter() {
      this.menu_security_btn_deco_color = "#FFF";
    },
    MenuSecurityButtonOnMouseLeave() {
      this.menu_security_btn_deco_color = "#0500FF";
    },
    MinimizedMenuButtonOnMouseEnter(e: Event, sys_id: string) {
      e.target.style.backgroundColor = `${this.system_color_parser(sys_id)}40`;
    },
    MinimizedMenuButtonOnMouseLeave(e: Event, sys_id: string) {
      e.target.style.backgroundColor = `${this.system_color_parser(sys_id)}20`;
    },
    system_color_parser(sys_id: string) {
      if (!this.vulture_connection_status) {
        return "#0500FF";
      } else {
        if (this.vulture_hardware_status_obj[sys_id].overall_status) {
          return "#00FFF0";
        } else {
          return "#FF006B";
        }
      }
    },
    MinimizedMenuButtonOnClick(btn_id: string) {
      this.$emit("MinimizedMenuButtonOnClick", { btn_id: btn_id });
    },
  },
};
</script>
<template>
  <ul class="p-abs" id="minimized_menu_container">
    <div
      title="Back to overview"
      @click="MinimizedMenuButtonOnClick('overview')"
      id="minimized_menu_overview_btn"
      class="minimized-menu-item"
    >
      <Label
        id="minimized_menu_overview_l"
        v-text="'Back'"
        color="#FFF"
      ></Label>
    </div>
    <div
      title="Sonar Array"
      id="minimized_menu_sonar_array_btn"
      class="minimized-menu-item"
      :style="`background-color: ${system_color_parser('sonar_array')}20;`"
      @mouseenter="MinimizedMenuButtonOnMouseEnter($event, 'sonar_array')"
      @mouseleave="MinimizedMenuButtonOnMouseLeave($event, 'sonar_array')"
    >
      <SonarArrayDeco
        class="p-abs"
        id="sonar_array_deco"
        :color="system_color_parser('sonar_array')"
      />
    </div>
    <div
      title="Dynamics"
      id="minimized_menu_dynamics_btn"
      class="minimized-menu-item"
      :style="`background-color: ${system_color_parser('dynamics')}20;`"
      @mouseenter="MinimizedMenuButtonOnMouseEnter($event, 'dynamics')"
      @mouseleave="MinimizedMenuButtonOnMouseLeave($event, 'dynamics')"
    >
      <DynamicsDeco
        class="p-abs"
        id="dynamics_deco"
        :color="system_color_parser('dynamics')"
      />
    </div>
    <div
      title="Network"
      id="minimized_menu_network_btn"
      class="minimized-menu-item"
    >
      <NetworkDeco class="p-abs" id="network_deco" color="#0500FF" />
    </div>
    <div
      title="Propulsion"
      id="minimized_menu_propulsion_btn"
      class="minimized-menu-item"
    >
      <PropulsionDeco class="p-abs" id="propulsion_deco" color="#0500FF" />
    </div>
    <div
      title="Nav"
      id="minimized_menu_nav_btn"
      class="minimized-menu-item"
      :style="`background-color: ${system_color_parser('navigation')}20;`"
      @mouseenter="MinimizedMenuButtonOnMouseEnter($event, 'navigation')"
      @mouseleave="MinimizedMenuButtonOnMouseLeave($event, 'navigation')"
    >
      <NavDeco
        class="p-abs"
        id="nav_deco"
        :color="system_color_parser('navigation')"
      />
    </div>
    <div
      title="Autonomy"
      id="minimized_menu_autonomy_btn"
      class="minimized-menu-item"
    >
      <AutonomyDeco class="p-abs" id="autonomy_deco" color="#0500FF" />
    </div>
    <div
      title="Optical Array"
      id="minimized_menu_optical_array_btn"
      class="minimized-menu-item"
    >
      <OpticalArrayDeco class="p-abs" id="optical_array_deco" color="#0500FF" />
    </div>
    <div
      title="Power"
      id="minimized_menu_power_btn"
      class="minimized-menu-item"
    >
      <PowerDeco class="p-abs" id="power_deco" color="#0500FF" />
    </div>
    <HorizontalLine id="menu_separator_ln_0" color="#0500FF" />
    <div
      title="Go To Command"
      id="minimized_menu_cmd_btn"
      class="minimized-menu-item"
      @mouseenter="MenuCommandButtonOnMouseEnter"
      @mouseleave="MenuCommandButtonOnMouseLeave"
    >
      <CommandDeco
        class="p-abs"
        id="cmd_deco"
        :color="menu_cmd_btn_deco_color"
      />
    </div>
    <div
      title="Go To Security"
      id="minimized_menu_security_btn"
      class="minimized-menu-item"
      @mouseenter="MenuSecurityButtonOnMouseEnter"
      @mouseleave="MenuSecurityButtonOnMouseLeave"
    >
      <SecurityDeco
        class="p-abs"
        id="security_deco"
        :color="menu_security_btn_deco_color"
      />
    </div>
    <div
      title="Expand Menu"
      id="minimized_expend_menu_btn"
      class="minimized-menu-item"
    >
      <div id="minimized_expend_menu_btn_deco"></div>
    </div>
  </ul>
</template>
<style scoped>
#minimized_menu_cmd_btn,
#minimized_menu_security_btn {
  background-color: #0500ff00;
  border: solid 1px #1900ff;
  width: 96%;
  margin-bottom: 2px;
}
#minimized_menu_cmd_btn:hover,
#minimized_menu_security_btn:hover {
  background-color: #1900ff20;
}
#menu_separator_ln_0 {
  position: absolute;
  top: 73.344578313%;
  width: 100%;
}
#minimized_menu_power_btn {
  margin-bottom: 10px;
}
#minimized_expend_menu_btn {
  background-color: #0500ff20;
  border-top: solid 1px #0500ff;
  margin-top: 3px;
}
#minimized_expend_menu_btn:hover {
  background-color: #0500ff40;
}
#minimized_expend_menu_btn_deco {
  position: relative;
  left: -8%;
  border-top: solid 1px #0500ff;
  border-right: solid 1px #0500ff;
  transform: rotate(45deg);
  width: 0.8vw;
  height: 0.8vw;
}
@keyframes mini_menu_in {
  0% {
    transform: translateX(-15%);
  }
  100% {
    transform: translateX(0);
  }
}
.minimized-menu-item {
  position: relative;
  width: 100%;
  height: 7.831325301%;
  background-color: #0500ff20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
  transition: background-color linear 0.01s;
}
.minimized-menu-item:hover {
  background-color: #0500ff40;
}
#sonar_array_deco {
  width: 70%;
  height: 70%;
}
#dynamics_deco {
  width: 80%;
  height: 80%;
}
#network_deco {
  width: 60.38%;
  height: 52.288461538%;
}
#optical_array_deco,
#power_deco {
  width: 92%;
  height: auto;
}
#propulsion_deco,
#cmd_deco,
#security_deco {
  width: 70%;
  height: 67.307692308%;
}
#autonomy_deco {
  width: 68%;
  height: 65.384615385%;
}
#nav_deco {
  position: relative;
  top: -8%;
  left: 4%;
  width: 103.22%;
  height: 99.25%;
}
#minimized_menu_container {
  top: 7.87037037%;
  left: 0.416666667%;
  width: 2.604166667%;
  height: 61.481481481%;
  animation: mini_menu_in ease-in-out 0.2s;
  display: flex;
  flex-flow: column;
  padding: 0;
  margin: 0;
}
#minimized_menu_overview_l {
  font-size: 0.9vw;
}
#minimized_menu_overview_btn {
  margin-top: 2px;
  background-color: #90909020;
}
#minimized_menu_overview_btn:hover {
  background-color: #90909040;
}
</style>