<script setup lang="ts">
import SonarArrayDeco from "@/components/BaseSonarArrayDeco.vue";
import DynamicsDeco from "@/components/AT_MinimizedMenuDynamicsDeco.vue";
import NetworkDeco from "@/components/AT_MinimizedMenuNetworkDeco.vue";
import PropulsionDeco from "@/components/BasePropulsionDeco.vue";
import NavDeco from "@/components/BaseNavDeco.vue";
import AutonomyDeco from "@/components/BaseAutonomyDeco.vue";
import OpticalArrayDeco from "@/components/BaseOpticalArrayDeco.vue";
import PowerDeco from "@/components/BasePowerDeco.vue";
import Label from "@/components/Label.vue";
</script>

<script lang="ts">
export default {
  props: {
    vulture_hardware_status_obj: {},
    vulture_connection_status: { default: false },
  },
  methods: {
    MinimizedMenuButtonOnMouseEnter(e: Event, sys_id: string) {
      console.log(e);
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
#minimized_expend_menu_btn{
  background-color: #0500FF20;
  border-top: solid 1px #0500FF;
  margin-top: 3px;
}
#minimized_expend_menu_btn:hover{
  background-color: #0500FF40;
}
#minimized_expend_menu_btn_deco{
  position: relative;
  left: -8%;
  border-top: solid 1px #0500FF;
  border-right: solid 1px #0500FF;
  transform: rotate(45deg);
  width: .8vw;
  height: .8vw;
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
  height: 9.558823529%;
  background-color: #0500ff20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
  transition: background-color linear .01s;
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
#propulsion_deco {
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
  height: 50.37037037%;
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