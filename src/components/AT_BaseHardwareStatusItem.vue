<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
</script>

<script lang="ts">
export default {
  methods: {
    nameBannerOnClick() {
      if (this.isMinifiable) {
        this.isMinified = !this.isMinified;
      }
    },
    ItemHeightController() {
      if (this.isMinified && this.isMinifiable) {
        return "13.802083333%";
      } else {
        return "48.4375%";
      }
    },
    nameBannerStyleController() {
      let backgroundColor = `background-color: ${this.colorController(
        this.componentGlobalStatus
      )}${this.nameBannerTransparency};`;


      let borderLeft = `border-left: solid 1px ${this.colorController(
        this.componentGlobalStatus
      )};`;

      let height;
      if (this.isMinified && this.isMinifiable) {
        height = "height: 79.245283019%;";
      } else {
        height = "height: 22.580645161%;";
      }
      return backgroundColor + borderLeft + height;
    },
    nameBannerOnMouseEnter(e: Event) {
      if (this.isMinifiable) {
        this.nameBannerTransparency = "40";
      }
    },
    nameBannerOnMouseLeave(e: Event) {
      if (this.isMinifiable) {
        this.nameBannerTransparency = "20";
      }
    },
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
  data() {
    return {
      isMinified: this.isMinifiedByDefault && this.isMinifiable,
      nameBannerTransparency: "20",
      componentGlobalStatus:
        this.component_status_obj.hardware_connection &&
        this.component_status_obj.telemetry.data &&
        this.component_status_obj.telemetry.latency,
    };
  },
  props: {
    isLast: { default: false },
    isMinifiable: { default: true },
    isMinifiedByDefault: {default: false},
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
    :style="`border-bottom: ${lastItemBorderVisibilityParser(
      isLast
    )}; height: ${ItemHeightController()}`"
  >
    <BaseLabel
      class="base_hardware_status_component_name_banner"
      v-text="component_status_obj.name"
      @mouseenter="nameBannerOnMouseEnter"
      @mouseleave="nameBannerOnMouseLeave"
      @click="nameBannerOnClick"
      :style="nameBannerStyleController()"
    ></BaseLabel>
    <div
      id="base_hardware_status_component_details_container"
      v-show="!isMinified"
    >
      <BaseLabel
        class="base_hardware_connection_status_l"
        v-text="'Hardware Connection'"
      ></BaseLabel>
      <BaseLabel
        class="base_hardware_connection_status_acx"
        :style="`background-color: ${colorController(
          component_status_obj.hardware_connection
        )}20; color: ${colorController(
          component_status_obj.hardware_connection
        )}`"
        v-text="
          labelController(component_status_obj.hardware_connection, 'Failed')
        "
      ></BaseLabel>

      <BaseLabel
        class="base_hardware_telemetry_latency_l"
        v-text="'Telemetry Latency'"
      ></BaseLabel>
      <BaseLabel
        class="base_hardware_telemetry_latency_acx"
        :style="`background-color: ${colorController(
          component_status_obj.telemetry.latency
        )}20; color: ${colorController(
          component_status_obj.telemetry.latency
        )}`"
        v-text="
          labelController(
            component_status_obj.telemetry.latency,
            'Out of range'
          )
        "
      ></BaseLabel>

      <BaseLabel
        class="base_hardware_telemetry_data_l"
        v-text="'Telemetry Data'"
      ></BaseLabel>
      <BaseLabel
        class="base_hardware_telemetry_data_acx"
        :style="`background-color: ${colorController(
          component_status_obj.telemetry.data
        )}20; color: ${colorController(component_status_obj.telemetry.data)}`"
        v-text="
          labelController(component_status_obj.telemetry.data, 'Out of range')
        "
      ></BaseLabel>
    </div>
  </div>
</template>

<style scoped>
@keyframes component_status_detail_ani {
  0% {
    transform: translateY(-75%);
  }
  100% {
    transform: translateY(0);
  }
}

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
  animation: component_status_detail_ani cubic-bezier(0.59, 0.23, 0.49, 1.07)
    0.15s;
}
.base_hardware_connection_status_l,
.base_hardware_telemetry_latency_l,
.base_hardware_telemetry_data_l {
  top: 31.182795699%;
  left: 0%;
  font-size: 1vw;
  animation: component_status_detail_ani cubic-bezier(0.59, 0.23, 0.49, 1.07)
    0.15s;
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
  margin-bottom: 2.513978495%;
}
</style>