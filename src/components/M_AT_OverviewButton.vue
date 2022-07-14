<script setup lang="ts">
import Label from "@/components/Label.vue";
</script>

<script lang="ts">
export default {
  props: {
    friendlySystemLabel: "",
    systemStatusLabel: "",
    systemStatusColor: "",
  },
};
</script>

<template>
  <div
    class="m_overview_x_btn_container"
    :style="`border: solid 1px ${systemStatusColor}`"
  >
    <Label class="system_id_l" v-text="friendlySystemLabel"></Label>
    <Label
      class="system_status_l"
      v-text="systemStatusLabel"
      :color="systemStatusColor"
    ></Label>
  </div>
</template>
<style scoped>
.system_status_l {
  top: 26.086956522%;
  font-size: 4.6vw;
}
.m_overview_x_btn_container {
  position: absolute;
  width: 45%;
  height: 17.96875%;
  border: solid 1px #0d009d;
  display: flex;
  align-items: center;
  justify-content: center;
}
.system_id_l {
  top: 2.608695652%;
  font-size: 4.6vw;
}
</style>