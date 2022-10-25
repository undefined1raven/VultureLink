<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";

import isMobile from "@/composables/isMobile.ts";
import percentage from "@/composables/percentage.ts";
import rangeScaler from "@/composables/rangeScaler.ts";
</script>

<script lang="ts">
export default {
    props: {
        letter: {default: 'A'},
        action: {default: 'Action'},
    },
}
</script>

<template>
  <div id="yaw_left_key" class="key">
    <BaseLabel v-text="letter" class="key_l"> </BaseLabel>
    <BaseLabel v-text="action" class="action_l"></BaseLabel>
  </div>
</template>

<style scoped>
.action_l {
  font-size: 2vh;
  color: #aaa;
  top: 60%;
}
.key_l {
  font-size: 2.3vh;
  top: 20%;
}
.key {
  position: absolute;
  border: solid 1px #0500ff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10.3vh;
  height: 10.3vh;
}
</style>