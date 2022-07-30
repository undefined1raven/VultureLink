<script setup lang="ts">
import Label from "@/components/Label.vue";
import { stat } from "fs/promises";
</script>

<script lang="ts">
export default {
  mounted() {
    console.log(this.isLast);
  },
  methods: {
    labelController(status: boolean, offnominal_label: string) {
      if (status) {
        return "Nominal";
      } else {
        return offnominal_label;
      }
    },
    colorController(status: boolean) {
      if (status) {
        return "#00FFF0";
      } else {
        return "#FF006B";
      }
    },
    lastItemBorderVisibilityParser(isLast: boolean) {
      if (isLast) {
        return "none";
      } else {
        return "solid 1px #001379";
      }
    },
  },
  props: {
    isLast: { default: false },
    component_status_obj: {
      default: {
        name: { default: "--" },
        hardware_connection: false,
        telemetry: { latency: false, data: false },
      },
    },
  },
};
</script>

<template>
  <div
    class="base_hardware_status_item"
    :style="`border-bottom: ${lastItemBorderVisibilityParser(isLast)}`"
  >
    <Label
      class="base_hardware_status_component_name_banner"
      v-text="component_status_obj.name"
      :style="`border-left: solid 1px ${colorController(
        component_status_obj.hardware_connection &&
          component_status_obj.telemetry.data &&
          component_status_obj.telemetry.latency
      )}; background-color: ${colorController(
        component_status_obj.hardware_connection &&
          component_status_obj.telemetry.data &&
          component_status_obj.telemetry.latency
      )}20;`"
    ></Label>
    <Label
      class="base_hardware_connection_status_l"
      v-text="'Hardware Connection'"
    ></Label>
    <Label
      class="base_hardware_connection_status_acx"
      :style="`background-color: ${colorController(
        component_status_obj.hardware_connection
      )}20; color: ${colorController(
        component_status_obj.hardware_connection
      )}`"
      v-text="
        labelController(component_status_obj.hardware_connection, 'Failed')
      "
    ></Label>

    <Label
      class="base_hardware_telemetry_latency_l"
      v-text="'Telemetry Latency'"
    ></Label>
    <Label
      class="base_hardware_telemetry_latency_acx"
      :style="`background-color: ${colorController(
        component_status_obj.telemetry.latency
      )}20; color: ${colorController(component_status_obj.telemetry.latency)}`"
      v-text="
        labelController(component_status_obj.telemetry.latency, 'Out of range')
      "
    ></Label>

    <Label
      class="base_hardware_telemetry_data_l"
      v-text="'Telemetry Data'"
    ></Label>
    <Label
      class="base_hardware_telemetry_data_acx"
      :style="`background-color: ${colorController(
        component_status_obj.telemetry.data
      )}20; color: ${colorController(component_status_obj.telemetry.data)}`"
      v-text="
        labelController(component_status_obj.telemetry.data, 'Out of range')
      "
    ></Label>
  </div>
</template>

<style scoped>
.base_hardware_connection_status_acx,
.base_hardware_telemetry_latency_acx,
.base_hardware_telemetry_data_acx {
  top: 31.182795699%;
  left: 76.956521739%;
  width: 23.043478261%;
  background-color: #00fff020;
  display: flex;
  align-items: center;
  font-size: 1vw;
  justify-content: center;
}
.base_hardware_connection_status_l,
.base_hardware_telemetry_latency_l,
.base_hardware_telemetry_data_l {
  top: 31.182795699%;
  left: 0%;
  font-size: 1vw;
}
.base_hardware_telemetry_latency_l,
.base_hardware_telemetry_latency_acx {
  top: 53.225806452%;
}
.base_hardware_telemetry_data_l,
.base_hardware_telemetry_data_acx {
  top: 75.268817204%;
}
.base_hardware_status_component_name_banner {
  position: relative;
  width: 97.843478261%;
  height: 22.580645161%;
  background-color: #00fff020;
  padding-left: 1.956521739%;
  border-left: solid 1px #00fff0;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 1vw;
}
.base_hardware_status_item {
  position: relative;
  width: 100%;
  height: 48.4375%;
  border-bottom: solid 1px #0500ff;
  margin-bottom: 3.913978495%;
}
</style>