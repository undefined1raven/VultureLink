
<script setup lang="ts">
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import CMD_VultureVideoDownlinkPlaceholder from "@/components/CMD_VultureVideoDownlinkPlaceholderIndi.vue";
import VultureDetailedDeco from "@/components/VultureDetailedDeco.vue";
import AuroraLogo from "@/components/AuroraLogo.vue";
import ConsoleLowerLateralSectionBkg from "@/components/CMD_ConsoleLowerLateralSectionBkg.vue";
import AltitudeDock from "@/components/CMD_AltitudeDock.vue";
import DiagsDock from "@/components/CMD_DiagsDock.vue";
import PowerDock from "@/components/CMD_PowerDock.vue";
import Menu from "@/components/CMD_Menu.vue";
import ControlsOverview from "@/components/CMD_ControlsOverview.vue";
import TakeoffPanel from "@/components/CMD_TakeoffPanel.vue";
import MobileCMDRoleSelector from "@/components/MobileCMDRoleSelector.vue";
import NavDock from "@/components/CMD_NavDock.vue";

import isMobile from "@/composables/isMobile.ts";
</script>


<script lang="ts">
export default {
  components: {
    ConsoleLowerLateralSectionBkg,
  },
  props: {
    isVultureLinkActive: { default: false },
    vn: { default: "--" },
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
  expose: ["onVultureHeartbeat"],
  methods: {
    flightControlInputKeyOnKeyUp(keyRef: string, flightInputAxisRef: string) {
      this.flightInputKeyStates[keyRef] = false;
      this.flightInput[flightInputAxisRef] = 0;
      this.emitFlightInput();
    },
    emitFlightInput() {
      this.$emit("FlightInputOnChange", this.flightInput);
    },
    controlLoopCore(
      fligtInputAxisRef: string,
      positiveKeyStateRef: string,
      negativeKeyStateRef: string,
      absoluteRange: number
    ) {
      if (
        this["flightInput"][fligtInputAxisRef] < absoluteRange &&
        this["flightInputKeyStates"][positiveKeyStateRef]
      ) {
        this["flightInput"][fligtInputAxisRef] += 0.5;
        this.emitFlightInput();
      }
      if (
        this["flightInput"][fligtInputAxisRef] > absoluteRange * -1 &&
        this["flightInputKeyStates"][negativeKeyStateRef]
      ) {
        this["flightInput"][fligtInputAxisRef] -= 0.5;
        this.emitFlightInput();
      }
    },
    onVultureHeartbeat() {
      this.$refs.DiagsDockRef.onVultureHeartbeat();
    },
    onLaunchSignal() {
      this.hasLaunched = true;
    },
    continueButtonOnClick() {
      this.isControlOverviewVisible = false;
      this.isReadyForTakeoff = true;
    },
    onRoleSelected(args: object) {
      this.roleSelected = true;
      //-- this <---> vulture comms for preflight checks --//
      this.isReadyForTakeoff = false;
      this.isControlOverviewVisible = true;
      this.roleID = args.role_id;
    },
    UIDockOnExtendedToggleHandle(args: object) {
      if (args.isExtended) {
        return {
          labelTop: "top: 36.203703704%;",
          dockActualTop: "top: 39.537037037%;",
        };
      } else {
        return {
          labelTop: "top: 24.722222222%;",
          dockActualTop: "top: 28.055555556%;",
        };
      }
    },
    altitudeDockOnExtendedToggle(args: object) {
      this.NavDockStyleObj = this.UIDockOnExtendedToggleHandle(args);
    },
    powerDockOnExtendedToggle(args: object) {
      this.DiagsDockStyleObj = this.UIDockOnExtendedToggleHandle(args);
    },
  },
  data() {
    return {
      isControlOverviewVisible: false,
      isLandingAssistVisible: false,
      roleSelected: false,
      roleID: false,
      isReadyForTakeoff: false,
      hasLaunched: false,
      telemetryUItoggle: true /*state for the toggle global shortcut */,
      isAltDockExtended: true,
      NavDockStyleObj: {
        labelTop: "36.203703704%",
        dockActualTop: "39.537037037%",
      },
      DiagsDockStyleObj: {
        labelTop: "36.203703704%",
        dockActualTop: "39.537037037%",
      },
      flightInput: { pitchRate: 0, rollRate: 0, yawRate: 0, altRate: 0 },
      flightInputKeyStates: {
        isWdown: false,
        isSdown: false,
        isAdown: false,
        isDdown: false,
        isCdown: false,
        isSpacedown: false,
        isEdown: false,
        isQdown: false,
      },
    };
  },
  mounted() {
    let controlLoopInterval = 25; //ms
    setInterval(() => {
      this.controlLoopCore("pitchRate", "isWdown", "isSdown", 30);

      this.controlLoopCore("rollRate", "isDdown", "isAdown", 35);

      this.controlLoopCore("yawRate", "isEdown", "isQdown", 10);

      this.controlLoopCore("altRate", "isSpacedown", "isCdown", 10);
    }, controlLoopInterval);

    document.addEventListener("keyup", (e) => {
      if ((e.shiftKey && e.key == "T") || (e.shiftKey && e.key == "t")) {
        this.telemetryUItoggle = !this.telemetryUItoggle;
      }
      switch (e.key.toUpperCase()) {
        case "W":
          this.flightControlInputKeyOnKeyUp("isWdown", "pitchRate");
          break;
        case "S":
          this.flightControlInputKeyOnKeyUp("isSdown", "pitchRate");
        case "A":
          this.flightControlInputKeyOnKeyUp("isAdown", "rollRate");
        case "D":
          this.flightControlInputKeyOnKeyUp("isDdown", "rollRate");
        case "C":
          this.flightControlInputKeyOnKeyUp("isCdown", "altRate");
        case " ":
          this.flightControlInputKeyOnKeyUp("isSpacedown", "altRate");
        case "E":
          this.flightControlInputKeyOnKeyUp("isEdown", "yawRate");
        case "Q":
          this.flightControlInputKeyOnKeyUp("isQdown", "yawRate");
        default:
          break;
      }
    });
    document.addEventListener("keydown", (e: Event) => {
      switch (e.key.toUpperCase()) {
        case "W":
          this.flightInputKeyStates.isWdown = true;
          break;
        case "S":
          this.flightInputKeyStates.isSdown = true;
          break;
        case "A":
          this.flightInputKeyStates.isAdown = true;
          break;
        case "D":
          this.flightInputKeyStates.isDdown = true;
          break;
        case "C":
          this.flightInputKeyStates.isCdown = true;
          break;
        case " ":
          this.flightInputKeyStates.isSpacedown = true;
          break;
        case "E":
          this.flightInputKeyStates.isEdown = true;
          break;
        case "Q":
          this.flightInputKeyStates.isQdown = true;
          break;
        default:
          break;
      }
    });
  },
  unmounted() {
    document.removeEventListener("keyup", () => {});
  },
};
</script>
    
<template>
  <CMD_VultureVideoDownlinkPlaceholder
    id="cmd_overview_video_downlink_indi"
    color="#303030"
  ></CMD_VultureVideoDownlinkPlaceholder>
  <VultureDetailedDeco
    color="#303030"
    id="detailed_vulture_deco"
  ></VultureDetailedDeco>
  <AuroraLogo id="aurora_logo" color="#303030"></AuroraLogo>
  <BaseLabel
    id="vulture_downlink_l"
    color="#303030"
    v-text="'Vulture Video Downlink /|/'"
  ></BaseLabel>
  <AltitudeDock
    :telemetryUItoggle="telemetryUItoggle"
    @altitudeDockOnExtendedToggle="altitudeDockOnExtendedToggle"
  ></AltitudeDock>
  <NavDock
    :NavDockStyleObj="NavDockStyleObj"
    :telemetryUItoggle="telemetryUItoggle"
    ref="NavDockRef"
  ></NavDock>
  <PowerDock @powerDockOnExtendedToggle="powerDockOnExtendedToggle"></PowerDock>
  <DiagsDock
    :isVultureLinkActive="isVultureLinkActive"
    ref="DiagsDockRef"
    :DiagsDockStyleObj="DiagsDockStyleObj"
  ></DiagsDock>
  <MobileCMDRoleSelector
    v-if="!roleSelected"
    :vn="vn"
    @onRoleSelected="onRoleSelected"
    :observer_btn="roleAvailablility.observer_btn"
    :pilot_btn="roleAvailablility.pilot_btn"
    id="role_selector"
    width="41.510416667%"
    height="41.510416667%"
  ></MobileCMDRoleSelector>
  <ControlsOverview
    @continueButtonOnClick="continueButtonOnClick"
    id="control_overview"
    v-if="isControlOverviewVisible && roleID == 'pilot'"
  ></ControlsOverview>
  <TakeoffPanel
    @launchSignal="onLaunchSignal"
    id="takeoff_panel"
    v-if="isReadyForTakeoff && roleID == 'pilot' && !hasLaunched"
  ></TakeoffPanel>
  <Menu id="menu"></Menu>
</template>
<style scoped>
#menu{
  top: 0.555555556%;
  left: 0%;
}
#takeoff_panel {
  top: 30.425926%;
  left: 50%;
  transform: translate(-50%);
}
#control_overview {
  top: 23.888888889%;
  left: 50%;
  transform: translate(-50%);
}
#role_selector {
  top: 24.907407407%;
  left: 50%;
  transform: translate(-50%);
}
#console_vertical_right_side_bkg {
  top: 50%;
  left: 75.28125%;
  transform: translateY(-50%) rotate(-90deg);
}
#console_vertical_left_side_bkg {
  top: 50%;
  left: -20.620833333%;
  transform: translateY(-50%) rotate(90deg);
}
#console_top_mid_bkg {
  top: -5.648148148%;
  left: 50%;
  transform: translate(-50%) rotate(180deg);
}
#console_lower_mid_bkg {
  top: 87.407407407%;
  left: 50%;
  transform: translate(-50%);
}
#vulture_downlink_l {
  top: 57.222222222%;
  left: 50%;
  transform: translate(-50%);
  font-size: 1.9518518518518519vh;
}
#aurora_logo {
  top: 36.574074074%;
  left: 50%;
  width: 15.516666666666667vh;
  height: 3.0787037037037037vh;
  transform: translate(-50%);
}
#detailed_vulture_deco {
  top: 42.12962963%;
  left: 50%;
  transform: translate(-50%);
  height: 12.407407407407407vh;
  width: 13.703703703703704vh;
}
#cmd_overview_video_downlink_indi {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>