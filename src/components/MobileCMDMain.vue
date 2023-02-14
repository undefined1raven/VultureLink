<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import BaseHardwareStatusItem from "@/components/AT_BaseHardwareStatusItem.vue";
import BaseLineGraph from "@/components/BaseLineGraph.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import MobileCMDFlightControls from "@/components/MobileCMDFlightControls.vue";
import MobileCMDPowerDock from "@/components/MobileCMDPowerDock.vue";
import MobileCMDNavDock from "@/components/MobileCMDNavDock.vue";
import MobileCMDLandingAssistDock from "@/components/MobileCMDLandingAssistDock.vue";
import MobileCMDRollIndi from "@/components/MobileCMDRollIndi.vue";
import MobileCMDTakeoffButton from "@/components/MobileCMDTakeoffButton.vue";
import MobileCMDRoleSelector from "@/components/MobileCMDRoleSelector.vue";
import VultureDetailedDeco from "@/components/VultureDetailedDeco.vue";
import AuroraLogo from "@/components/AuroraLogo.vue";
import MobileCMDMainQuickSelectMenu from "@/components/MobileCMDMainQuickSelectMenu.vue";
import DynamicsIndi from "@/components/CMD_DynamicsIndi.vue";
import DiagsDock from "@/components/CMD_DiagsDock.vue";

import isMobile from "@/composables/isMobile.ts";
import percentage from "@/composables/percentage.ts";
import rangeScaler from "@/composables/rangeScaler.ts";
</script>

<script lang="ts">
export default {
  data() {
    return {
      TelcoUpdateInterval: 100,
      isFullScreen: false,
      orientation: "portrait",
      isLandingAssistVisible: false,
      roleSelected: false,
      roleID: false,
      isReadyForTakeoff: false,
      hasLaunched: false,
      TELCO: false,
    };
  },
  props: {
    TELCO_P: { default: false },
    currentPitch: { default: 0 },
    currentRoll: { default: 0 },
    lastIMUUnix: { default: 0 },
    baseThrustLvlUnix: { default: "UNK" },
    baseThrustLvl: { default: "UNK" },
    vn: { default: "--" },
    hasVideoDownlink: { default: false },
    vultureTelemetry: {
      default: { imu_alpha: { gyro: { roll: { angle: 0 } } } },
    },
    roleAvailablility: {
      default: {
        observer_btn: {
          default: { isEnabled: true, unavailability_reason: "roleTaken" },
        },
        pilot_btn: {
          default: {
            isEnabled: true,
            unavailability_reason: "insufficientPermissions",
          },
        },
      },
    },
  },
  mounted() {
    setInterval(() => {
      this.TELCO = this.TELCO_P;
    }, 10);
    window.onresize = (e: Event) => {
      if (
        document.documentElement.clientHeight <
        document.documentElement.clientWidth
      ) {
        this.orientation = "landscape";
      } else {
        this.orientation = "portrait";
      }
    };
  },
  expose: ["onVultureHeartbeat"],
  methods: {
    TELCOStyleController() {
      if (this.TELCO) {
        return { text: "TELCO Enabled", color: "#00FF94" };
      } else {
        return { text: "TELCO Disabled", color: "#ff0037" };
      }
    },
    pitchTopParser() {
      if (this.currentPitch > 0) {
        return rangeScaler(this.currentPitch, 0, 90, -185, 40);
      } else {
        return rangeScaler(this.currentPitch, -90, 0, -410, -185);
      }
    },
    pitchEA() {
      if (Math.abs(this.currentPitch) > 20) {
        return { text: `PAT [${this.currentPitch}]`, color: "#FF005C" };
      } else {
        return { text: `PBT [${this.currentPitch}]`, color: "#00FF94" };
      }
    },
    rollEA() {
      if (Math.abs(this.currentRoll) > 20) {
        return { text: `RAT [${this.currentRoll}]`, color: "#FF005C" };
      } else {
        return { text: `RBT [${this.currentRoll}]`, color: "#00FF94" };
      }
    },
    onFCRestart() {
      this.$emit("FCRestart");
    },
    onVultureHeartbeat() {
      this.$refs.diagsDockRef.onVultureHeartbeat();
    },
    onEAX() {
      this.$emit("onEAX");
    },
    onLaunchSignal() {
      this.hasLaunched = true;
    },
    onRoleSelected(args: object) {
      this.roleSelected = true;
      //-- this <---> vulture comms for preflight checks --//
      this.isReadyForTakeoff = true;
      this.roleID = args.role_id;
    },
    FullScreenButtonTextController() {
      if (this.isFullScreen) {
        return "Exit Full Screen";
      } else {
        return "Go Full Screen";
      }
    },
    landingAssistOnToggle() {
      this.isLandingAssistVisible = !this.isLandingAssistVisible;
    },
    FlightInputOnChange(args: Event) {
      this.$emit("FlightInputOnChange", args);
    },
    onTELCOToggle() {
      this.$emit("TELCO", !this.TELCO);
    },
    onFullScreenButtonClick() {
      if (!this.isFullScreen) {
        document.documentElement.requestFullscreen();
        this.isFullScreen = true;
        screen.orientation
          .lock("landscape")
          .then((r) => {})
          .catch((e) => {});
      } else {
        document.exitFullscreen().then((r) => {});
        this.isFullScreen = false;
      }
    },
  },
};
</script>

<template>
  <BaseLabel
    v-if="!isFullScreen || orientation == 'portrait'"
    @click="onFullScreenButtonClick"
    id="fs_btn"
    v-text="FullScreenButtonTextController()"
  ></BaseLabel>
  <div v-if="isFullScreen && orientation == 'landscape'">
    <div id="vulture_downlink_placeholder" v-if="!hasVideoDownlink">
      <VultureDetailedDeco
        color="#555"
        id="detailed_vulture_deco"
      ></VultureDetailedDeco>
      <AuroraLogo id="aurora_logo" color="#555"></AuroraLogo>
      <BaseLabel
        id="vulture_downlink_l"
        color="#555"
        v-text="'Vulture Video Downlink /|/'"
      ></BaseLabel>
    </div>
    <MobileCMDFlightControls
      v-if="roleSelected && roleID == 'pilot' && hasLaunched"
      @FlightInputOnChange="FlightInputOnChange"
    ></MobileCMDFlightControls>
    <DynamicsIndi
      v-if="roleSelected && roleID == 'pilot' && hasLaunched"
      id="dynamics_indi"
      :top="`${pitchTopParser()}%`"
    ></DynamicsIndi>
    <DiagsDock
      v-show="roleSelected && roleID == 'pilot' && hasLaunched"
      ref="diagsDockRef"
      id="diags_dock"
      :lastIMUUnix="lastIMUUnix"
    ></DiagsDock>
    <MobileCMDPowerDock></MobileCMDPowerDock>
    <MobileCMDNavDock></MobileCMDNavDock>
    <MobileCMDLandingAssistDock
      :isLandingAssistVisible="isLandingAssistVisible"
    ></MobileCMDLandingAssistDock>
    <MobileCMDRollIndi
      :roll="currentRoll"
      :color="rollEA().color"
      id="roll_indi"
    ></MobileCMDRollIndi>
    <MobileCMDRoleSelector
      v-if="!roleSelected"
      :vn="vn"
      @onRoleSelected="onRoleSelected"
      :observer_btn="roleAvailablility.observer_btn"
      :pilot_btn="roleAvailablility.pilot_btn"
      id="role_selector"
    ></MobileCMDRoleSelector>
    <Transition name="fade">
      <MobileCMDMainQuickSelectMenu
        v-if="hasLaunched"
        @landingAssistOnToggle="landingAssistOnToggle"
        @onEAX="onEAX"
      ></MobileCMDMainQuickSelectMenu>
      <MobileCMDTakeoffButton
        v-if="isReadyForTakeoff && !hasLaunched && roleID == 'pilot'"
        id="takeoff_btn"
        @launchSignal="onLaunchSignal"
      ></MobileCMDTakeoffButton>
    </Transition>
    <BaseLabel
      color="#AAA"
      id="baseThrustLvlL"
      v-text="`${baseThrustLvl}`"
    ></BaseLabel>
    <BaseLabel
      color="#AAA"
      id="baseThrustLvlUnixL"
      v-text="`${baseThrustLvlUnix}`"
    ></BaseLabel>
    <BaseLabel
      @click="onFCRestart"
      id="fc_restart_btn"
      color="#ff0037"
      style="'background-color: #ff003720;'"
      v-text="'FC Restart'"
    ></BaseLabel>
    <BaseLabel
      @click="onTELCOToggle"
      id="telemetry_toggle_btn"
      :color="TELCOStyleController().color"
      :style="`color: ${TELCOStyleController().color}; border: solid 1px ${
        TELCOStyleController().color
      }; background-color: ${TELCOStyleController().color}20`"
      v-text="TELCOStyleController().text"
    ></BaseLabel>
    <BaseLabel
      class="x_error_indi"
      id="pitch_error_indi"
      :style="`color: ${pitchEA().color}; border: solid 1px ${pitchEA().color}`"
      v-text="pitchEA().text"
    ></BaseLabel>
    <BaseLabel
      class="x_error_indi"
      id="roll_error_indi"
      :style="`color: ${rollEA().color}; border: solid 1px ${rollEA().color}`"
      v-text="rollEA().text"
    ></BaseLabel>
  </div>
</template>

<style scoped>
#pitch_error_indi {
  left: 36.2%;
}
#roll_error_indi {
  left: 50.7%;
}

.x_error_indi {
  top: 0%;
  width: 13%;
  height: 4%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all linear 0.1s;
  font-size: 4vh;
}
#fc_restart_btn,
#telemetry_toggle_btn {
  top: 21%;
  left: 78.5%;
  width: 20.4%;
  height: 8%;
  border: solid 1px #ff0037;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4vh;
  transition: all linear 0.1s;
}
#telemetry_toggle_btn {
  top: 31%;
  transition: all linear 0.1s;
}
#dynamics_indi {
  top: 5%;
  left: 50%;
  transform: translate(-50%);
}
#baseThrustLvlUnixL {
  top: 93.6%;
  left: 82%;
  font-size: 3.8vh;
  width: 15%;
  border-top: solid 1px #0300a1;
  display: flex;
  align-items: center;
  justify-content: center;
}
#baseThrustLvlL {
  top: 86.6%;
  left: 82%;
  font-size: 3.8vh;
  width: 15%;
  border-top: solid 1px #0300a1;
  display: flex;
  align-items: center;
  justify-content: center;
}
#takeoff_btn {
  top: 75.277777778%;
  left: 50%;
  transform: translate(-50%);
}
#role_selector {
  top: 40.555555556%;
  left: 50%;
  transform: translate(-50%);
}
#roll_indi {
  top: 36.055555556%;
  left: 44.375%;
}
#btn_demo {
  position: absolute;
  top: 0.5%;
  left: 31.25%;
  width: 7.96875%;
  height: 6.111111111%;
  background-color: #0500ff20;
  color: #fff;
  font-size: 3.6vh;
  border: solid 1px #0500ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Titillium Web", sans-serif;
}
#btn_demo:hover {
  background-color: #0500ff60;
}
#fs_btn {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 7%;
  width: 40%;
  font-size: 2vh;
  border: solid 1px #0500ff;
  display: flex;
  align-items: center;
  justify-content: center;
}
#vulture_downlink_l {
  top: 78.833333333%;
  left: 50%;
  transform: translate(-50%);
  font-size: 6vh;
}
#aurora_logo {
  top: 7.166666667%;
  left: 50%;
  width: 26.184375%;
  height: auto;
  transform: translate(-50%);
}
#detailed_vulture_deco {
  top: 23.833333333%;
  left: 50%;
  transform: translate(-50%);
  height: auto;
  width: 20.9375%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media screen and (orientation: landscape) {
  #fs_btn {
    height: 13%;
    width: 20%;
    font-size: 4.1vh;
  }
}
</style>