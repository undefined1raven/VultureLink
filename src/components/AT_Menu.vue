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
import VerticalLine from "@/components/VerticalLine.vue";
import CommandDeco from "@/components/AT_MinimizedMenuCommandDeco.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import SecurityDeco from "@/components/SecurityDeco.vue";
</script>

<script lang="ts">
export default {
  data() {
    return {
      menu_cmd_btn_deco_color: "#0500FF",
      menu_security_btn_deco_color: "#0500FF",
      menu_left: "-11.041666667%",
      isMenuExtended: false,
      back_l_left: "83.333333333%",
      expand_menu_toggle_btn: {
        deco_rotation: "rotate(45deg)",
        deco_left: "-8%",
        left: "80.37037037%",
      },
    };
  },
  props: {
    vulture_hardware_status_obj: {},
    vulture_connection_status: { default: false },
  },
  methods: {
    MenuExpendToggleOnClick() {
      this.isMenuExtended = !this.isMenuExtended;
      if (this.isMenuExtended) {
        this.menu_left = "0.416666667%";
        this.expand_menu_toggle_btn.deco_rotation = "rotate(-135deg)";
        this.expand_menu_toggle_btn.deco_left = "8%";
        this.expand_menu_toggle_btn.left = "0%";
        this.back_l_left = "3.064066852%";
      } else {
        this.menu_left = "-11.041666667%";
        this.expand_menu_toggle_btn.deco_rotation = "rotate(45deg)";
        this.expand_menu_toggle_btn.deco_left = "-8%";
        this.expand_menu_toggle_btn.left = "80.37037037%";
        this.back_l_left = "83.333333333%";
      }
    },
    redirect(path: string) {
      window.location.pathname = path;
    },
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
  mounted() {
    window.addEventListener('click', (e) => {
      if(e.target != this.$refs.menu_toggle_btn && this.isMenuExtended){
        this.MenuExpendToggleOnClick();
      }
    });
    window.addEventListener('keyup', e => {
      if(e.key == 'Escape'){
        this.MinimizedMenuButtonOnClick('overview');
      }
    });
  },
  unmounted(){
    window.removeEventListener('keyup', e => {});
  }
};
</script>
<template>
  <div id="minimized_menu_obfuscator"></div>
  <ul
    class="p-abs"
    id="minimized_menu_container"
    :style="`left: ${menu_left};`"
  >
    <div
      title="Back to overview"
      @click="MinimizedMenuButtonOnClick('overview')"
      id="minimized_menu_overview_btn"
      class="minimized-menu-item"
    >
      <BaseLabel
        id="minimized_menu_overview_l"
        v-text="'Back'"
        color="#FFF"
        :style="`left: ${back_l_left};`"
      ></BaseLabel>
    </div>
    <div
      title="Sonar Array"
      id="minimized_menu_sonar_array_btn"
      class="minimized-menu-item"
      :style="`background-color: ${system_color_parser('sonar_array')}20;`"
      @mouseenter="MinimizedMenuButtonOnMouseEnter($event, 'sonar_array')"
      @mouseleave="MinimizedMenuButtonOnMouseLeave($event, 'sonar_array')"
    >
      <BaseLabel class="extended_btn_l" color="#FFF" v-text="'Sonar Array'"></BaseLabel>
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
      <BaseLabel class="extended_btn_l" color="#FFF" v-text="'Dynamics'"></BaseLabel>
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
      <BaseLabel class="extended_btn_l" color="#FFF" v-text="'Network'"></BaseLabel>
      <NetworkDeco class="p-abs" id="network_deco" color="#0500FF" />
    </div>
    <div
      title="Propulsion"
      id="minimized_menu_propulsion_btn"
      class="minimized-menu-item"
    >
      <BaseLabel class="extended_btn_l" color="#FFF" v-text="'Propulsion'"></BaseLabel>
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
      <BaseLabel class="extended_btn_l" color="#FFF" v-text="'Navigation'"></BaseLabel>
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
      <BaseLabel class="extended_btn_l" color="#FFF" v-text="'Autonomy'"></BaseLabel>
      <AutonomyDeco class="p-abs" id="autonomy_deco" color="#0500FF" />
    </div>
    <div
      title="Optical Array"
      id="minimized_menu_optical_array_btn"
      class="minimized-menu-item"
    >
      <BaseLabel
        class="extended_btn_l"
        color="#FFF"
        v-text="'Optical Array'"
      ></BaseLabel>
      <OpticalArrayDeco class="p-abs" id="optical_array_deco" color="#0500FF" />
    </div>
    <div
      title="Power"
      id="minimized_menu_power_btn"
      class="minimized-menu-item"
    >
      <BaseLabel class="extended_btn_l" color="#FFF" v-text="'Power'"></BaseLabel>
      <PowerDeco class="p-abs" id="power_deco" color="#0500FF" />
    </div>
    <HorizontalLine id="menu_separator_ln_0" color="#0500FF" />
    <div
      title="Go To Command"
      id="minimized_menu_cmd_btn"
      class="minimized-menu-item"
      @mouseenter="MenuCommandButtonOnMouseEnter"
      @mouseleave="MenuCommandButtonOnMouseLeave"
      @click="redirect('/')"
    >
      <VerticalLine
        v-if="!isMenuExtended"
        id="cmd_btn_left_border_emulator"
        color="#0500FF"
      ></VerticalLine>
      <BaseLabel class="extended_btn_l" color="#FFF" v-text="'Command'"></BaseLabel>
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
      @click="redirect('/security')"
    >
      <VerticalLine
        v-if="!isMenuExtended"
        id="security_btn_left_border_emulator"
        color="#0500FF"
      ></VerticalLine>
      <BaseLabel class="extended_btn_l" color="#FFF" v-text="'Security'"></BaseLabel>
      <SecurityDeco
        class="p-abs"
        id="security_deco"
        :color="menu_security_btn_deco_color"
      />
    </div>
    <div
      title="Expand Menu"
      ref="menu_toggle_btn"
      id="minimized_expend_menu_btn"
      class="minimized-menu-item"
      @click="MenuExpendToggleOnClick"
      :style="`left: ${expand_menu_toggle_btn.left};`"
    >
      <div
        id="minimized_expend_menu_btn_deco"
        :style="`left: ${expand_menu_toggle_btn.deco_left};transform: ${expand_menu_toggle_btn.deco_rotation}`"
      ></div>
    </div>
  </ul>
</template>
<style scoped>
#security_btn_left_border_emulator,
#cmd_btn_left_border_emulator {
  position: absolute;
  height: 100%;
  z-index: 5;
  left: 80.840740741%;
}
@media only screen and (max-width: 1770px) {
  #security_btn_left_border_emulator,
  #cmd_btn_left_border_emulator {
    left: 80.740740741%;
  }
}
.extended_btn_l {
  position: absolute;
  left: 3.064066852%;
  font-size: 0.9vw;
}
#minimized_menu_cmd_btn,
#minimized_menu_security_btn {
  background-color: #0500ff00;
  border: solid 1px #1900ff;
  width: 99.17%;
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
@media only screen and (max-width: 1390px) {
  #menu_separator_ln_0 {
    top: 72.744578313%;
  }
}
#minimized_menu_power_btn {
  margin-bottom: 10px;
}
#minimized_expend_menu_btn {
  position: relative;
  background-color: #0500ff20;
  border-top: solid 1px #0500ff;
  margin-top: 3px;
  width: 19.259259259%;
  left: 80.37037037%;
  display: flex;
  transition: left ease-in-out 0.1s;
  z-index: 10;
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
  z-index: -1;
  pointer-events: none;
}
@keyframes mini_menu_in {
  0% {
    transform: translateX(-15%);
  }
  100% {
    transform: translateX(0);
  }
}
.x_extended_btn_bkg {
  position: relative;
  left: 0%;
  width: 85.619866707%;
  height: 7.831325301%;
  background-color: #0500ff20;
  display: flex;
  justify-content: start;
  padding-left: 10px;
  align-items: center;
  margin-bottom: 2px;
  transition: background-color linear 0.01s;
}
.minimized-menu-item {
  position: relative;
  left: 0%; /*84.621553607 */
  width: 100%; /*14.380133293 */
  height: 7.831325301%;
  background-color: #0500ff20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
  transition: background-color linear 0.01s;
  backdrop-filter: blur(3px);
}
.minimized-menu-item:hover {
  background-color: #0500ff40;
}
#sonar_array_deco {
  position: absolute;
  left: 83.569139063%;
  width: 12.838854041%;
  height: 70%;
}
#dynamics_deco {
  position: absolute;
  left: 81.935017057%;
  width: 16.613477128%;
  height: 80%;
}
#network_deco {
  position: absolute;
  left: 84.669612267%;
  width: 11.074428671%;
  height: 52.288461538%;
}
#optical_array_deco,
#power_deco {
  position: absolute;
  left: 81.435017057%;
  width: 16.873922453%;
  height: auto;
}
#propulsion_deco,
#cmd_deco,
#security_deco {
  position: absolute;
  left: 83.569139063%;
  width: 12.838854041%;
  height: 67.307692308%;
}
#autonomy_deco {
  position: absolute;
  left: 83.569139063%;
  width: 12.471983889%;
  height: 65.384615385%;
}
#nav_deco {
  position: absolute;
  top: -8%;
  left: 81.368192656%;
  width: 18.931807344%;
  height: 99.25%;
}
#minimized_menu_container {
  top: 7.87037037%;
  left: -11.041666667%; /*0.416666667 */
  width: 14.1984375%; /*2.604166667*/
  height: 61.481481481%;
  animation: mini_menu_in ease-in-out 0.2s;
  display: flex;
  flex-flow: column;
  padding: 0;
  margin: 0;
  overflow: hidden;
  transition: left ease-in-out 0.1s;
}
#minimized_menu_overview_l {
  font-size: 0.9vw;
  transition: left ease-in-out 0.15s;
}
#minimized_menu_overview_btn {
  margin-top: 2px;
  background-color: #90909020;
}
#minimized_menu_overview_btn:hover {
  background-color: #90909040;
}
#minimized_menu_obfuscator {
  position: absolute;
  top: 7.87037037%;
  left: 0;
  width: 0.430416667%;
  height: 61.481481481%;
  background-color: #000;
  z-index: 5;
}
</style>