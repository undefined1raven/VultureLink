
<script setup lang="ts">
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import BaseTopBar from "@/components/AT_BaseTopBar.vue";
import DynamicsTelemetry from "@/components/AT_DynamicsTelemetry.vue";
import MobileDynamicsTelemetry from "@/components/AT_MobileDynamicsTelemetry.vue";
import DynamicsControls from "@/components/AT_DynamicsControls.vue";
import BaseHardwareStatus from "@/components/AT_BaseHardwareStatus.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import MobileBaseFullWidthControls from "@/components/M_BaseFullWidthSelectionControls.vue";

import isMobile from "@/composables/isMobile.ts";
</script>

<script lang="ts">
export default {
  props: {
    current_user_un: { default: "---" },
    telemetry: {
      type: Object,
      default(rawProps: Object) {
        return {};
      },
    },
    selected_vulture_obj: { default: { vid: "", vn: "" } },
  },
};
</script>

<template>
  <BaseTopBar
    :SelectedVultureObject="selected_vulture_obj"
    :CurrentUsername="current_user_un"
    systemID="Propulsion"
  ></BaseTopBar>
  <BaseHardwareStatus
    v-show="!isMobile() || (isMobile() && mobile_window_id == 'telemetry')"
    :hardwareStatusArray="[]"
    :isMinifiable="true"
    :isMinifiedByDefault="true"
  ></BaseHardwareStatus>
  <MobileBaseFullWidthControls
    id="mobile_dynamics_ui_controls"
    rightSideSelectionButtonLabel="Controls"
    leftSideSelectionButtonLabel="Telemetry"
    ControlsTop="12.34375%"
    @onButtonSelected="onButtonSelectedHandler"
    v-if="isMobile()"
  ></MobileBaseFullWidthControls>
</template>