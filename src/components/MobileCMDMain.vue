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

import isMobile from "@/composables/isMobile.ts";
import percentage from "@/composables/percentage.ts";
import rangeScaler from "@/composables/rangeScaler.ts";
</script>

<script lang="ts">
export default {
  data() {
    return {
      isFullScreen: false,
      orientation: "portrait",
      isLandingAssistVisible: false,
      roleSelected: false,
      roleID: false,
      isReadyForTakeoff: false,
      hasLaunched: false,
    };
  },
  props: {
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
  methods: {
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
    <MobileCMDPowerDock></MobileCMDPowerDock>
    <MobileCMDNavDock></MobileCMDNavDock>
    <MobileCMDLandingAssistDock
      :isLandingAssistVisible="isLandingAssistVisible"
    ></MobileCMDLandingAssistDock>
    <MobileCMDRollIndi
      :roll="0 || 0"
      v-if="hasVideoDownlink"
      id="roll_indi"
    ></MobileCMDRollIndi>
    <MobileCMDRoleSelector
      v-if="!roleSelected"
      @onRoleSelected="onRoleSelected"
      :observer_btn="roleAvailablility.observer_btn"
      :pilot_btn="roleAvailablility.pilot_btn"
      id="role_selector"
    ></MobileCMDRoleSelector>
    <Transition name="fade">
      <MobileCMDMainQuickSelectMenu
        v-if="hasLaunched"
        @landingAssistOnToggle="landingAssistOnToggle"
      ></MobileCMDMainQuickSelectMenu>
      <MobileCMDTakeoffButton
        v-if="isReadyForTakeoff && !hasLaunched && roleID == 'pilot'"
        id="takeoff_btn"
        @launchSignal="onLaunchSignal"
      ></MobileCMDTakeoffButton>
    </Transition>
  </div>
</template>

<style scoped>
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
  top: 48.055555556%;
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