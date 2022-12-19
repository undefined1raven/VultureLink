
<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import CommsIndi from "@/components/CMD_CommsIndi.vue";
import SonarArrayIndi from "@/components/CMD_SonarArrayIndi.vue";
</script>

<script lang="ts">
export default {
  props: {
    isVultureLinkActive: { default: false },
    DiagsDockStyleObj: {
      default: {
        labelTop: "top: 36.203703704%",
        dockActualTop: "top: 39.537037037%",
      },
    },
  },
  data() {
    return {
      isExtended: true,
      CommsIndiColor: "#777777",
    };
  },
  mounted() {
    setInterval(() => {
      if (!this.isVultureLinkActive) {
        this.CommsIndiColor = "#777777";
      }
    }, 1000);
  },
  expose: ["onVultureHeartbeat"],
  methods: {
    onVultureHeartbeat() {
      this.CommsIndiColor = "#00FF94";
      setTimeout(() => {
        this.CommsIndiColor = "#005038";
      }, 700);
    },
    DiagsDockOnClick() {
      this.isExtended = !this.isExtended;
    },
  },
};
</script>


<template>
  <BaseLabel
    class="transition"
    id="diags_dock_l"
    :style="DiagsDockStyleObj.labelTop"
    v-text="'Diagnostics'"
    @click="DiagsDockOnClick"
  ></BaseLabel>

  <div
    class="cmd_diags_dock_container transition"
    :style="DiagsDockStyleObj.dockActualTop"
    v-if="isExtended"
  >
    <CommsIndi :color="CommsIndiColor" id="diags_comms_indi"></CommsIndi>
    <BaseLabel
      id="diags_imu_status_indi"
      class="status_indi"
      v-text="'IMU'"
    ></BaseLabel>
    <BaseLabel
      id="diags_acc_status_indi"
      class="status_indi"
      v-text="'ACC'"
    ></BaseLabel>
    <BaseLabel
      id="diags_gps_status_indi"
      class="status_indi"
      v-text="'GPS'"
    ></BaseLabel>
    <BaseLabel
      id="diags_mag_status_indi"
      class="status_indi"
      v-text="'MAG'"
    ></BaseLabel>
    <BaseLabel
      id="diags_baro_status_indi"
      class="status_indi"
      v-text="'BAR'"
    ></BaseLabel>
    <BaseLabel
      id="diags_fc_status_indi"
      class="status_indi"
      v-text="'FC'"
    ></BaseLabel>
    <BaseLabel
      id="diags_omega_hardware_interface_board_status_indi"
      class="status_indi"
      v-text="'ω HID'"
    ></BaseLabel>
    <HorizontalLine id="diags_ln" color="#0500FF"></HorizontalLine>
    <SonarArrayIndi
      :telemetry="{ fwd: -1, bwd: -1, rgt: -1, lft: -1, gnd: -1 }"
      id="sonar_array_indi"
    ></SonarArrayIndi>
  </div>
</template>
<style scoped>
.transition {
  transition: top ease-in-out 0.1s;
}
#sonar_array_indi {
  top: 47.972972973%;
}
#diags_ln {
  top: 46.283783784%;
  left: 0%;
  width: 100%;
}

#diags_omega_hardware_interface_board_status_indi {
  top: 35.472972973%;
  left: 50.967741935%;
  width: 44.596774%;
  height: 7.094594595%;
}
#diags_fc_status_indi {
  top: 35.472972973%;
  left: 1.935483871%;
  width: 44.596774194%;
  height: 7.094594595%;
}
#diags_baro_status_indi {
  top: 28.02702703%;
  left: 75.483870968%;
  height: 5.405405405%;
}
#diags_imu_status_indi {
  top: 21.621621622%;
  left: 1.935483871%;
}
#diags_acc_status_indi {
  top: 21.621621622%;
  left: 26.451612903%;
}
#diags_gps_status_indi {
  top: 21.621621622%;
  left: 50.967741935%;
}
#diags_mag_status_indi {
  top: 21.621621622%;
  left: 75.483870968%;
  height: 5.405405405%;
}
.status_indi {
  width: 3.24vh;
  height: 3.24vh;
  border: solid 1px #777;
  color: #777;
  font-size: 1.4vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
#diags_comms_indi {
  top: 1.013513514%;
}
#diags_dock_l {
  top: 36.203703704%;
  left: 91.875%;
  border-bottom: solid 1px #0500ff;
  font-size: 2vh;
  width: 7.716666667%;
  padding-left: 0.364583333%;
  background-color: #000000aa;
  transition: all linear 0.1s;
}
#diags_dock_l:hover {
  background-color: #0500ff99;
}
.cmd_diags_dock_container {
  position: absolute;
  background-color: #000000aa;
  width: 8.072916667%;
  height: 27.407407407%;
  top: 39.537037037%;
  left: 91.875%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>