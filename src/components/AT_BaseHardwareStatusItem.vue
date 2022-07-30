<script setup lang="ts">
import Label from "@/components/Label.vue";
</script>

<script lang="ts">
export default {
  mounted() {
    console.log(this.isLast);
  },
  methods: {
    lastItemBorderVisibilityParser(isLast: boolean) {
      if (isLast) {
        return "none";
      } else {
        return "solid 1px #0500FF";
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
  ></div>
</template>

<style scoped>
.base_hardware_status_item {
  width: 100%;
  height: 48.4375%;
  border-bottom: solid 1px #0500ff;
}
</style>