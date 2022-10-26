
<script setup lang="ts">
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import CMD_VultureVideoDownlinkPlaceholder from "@/components/CMD_VultureVideoDownlinkPlaceholderIndi.vue";
import VultureDetailedDeco from "@/components/VultureDetailedDeco.vue";
import AuroraLogo from "@/components/AuroraLogo.vue";
import ConsoleLowerLateralSectionBkg from "@/components/CMD_ConsoleLowerLateralSectionBkg.vue";
import AltitudeDock from "@/components/CMD_AltitudeDock.vue";
import PowerDock from "@/components/CMD_PowerDock.vue";
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
  methods: {
    onLaunchSignal() {
      this.hasLaunched = true;
    },
    continueButtonOnClick(){
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
    altitudeDockOnExtendedToggle(args: object) {
      args.isExtended;
      if (args.isExtended) {
        this.NavDockStyleObj = {
          labelTop: "top: 36.203703704%;",
          dockActualTop: "top: 39.537037037%;",
        };
      } else {
        this.NavDockStyleObj = {
          labelTop: "top: 24.722222222%;",
          dockActualTop: "top: 28.055555556%;",
        };
      }
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
    };
  },
  mounted() {
    document.addEventListener("keyup", (e) => {
      if ((e.shiftKey && e.key == "T") || (e.shiftKey && e.key == "t")) {
        this.telemetryUItoggle = !this.telemetryUItoggle;
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
  <PowerDock></PowerDock>
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
  <ControlsOverview @continueButtonOnClick="continueButtonOnClick" id="control_overview" v-if="isControlOverviewVisible && roleID == 'pilot'"></ControlsOverview>
  <TakeoffPanel @launchSignal="onLaunchSignal" id="takeoff_panel" v-if="isReadyForTakeoff && roleID == 'pilot' && !hasLaunched"></TakeoffPanel>
</template>
<style scoped>
#takeoff_panel{
  top: 30.425926%;
  left: 50%;
  transform: translate(-50%);
}
#control_overview{
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