
<script setup>
import DockListItem from "@/components/DockListItem.vue";
</script>
<script>
export default {
  props: {
    id: "",
    dock_array: "",
  },
};
</script>
<template>
  <div :id="id">
    <DockListItem
      v-for="(dock, index) in dock_array"
      :key="index"
      color="#515151"
    ></DockListItem>
  </div>
</template>
<style scoped>
#dock_selector_list {
  position: absolute;
  top: calc(49.722222222% - 2.2%);
  left: 4.583333333%;
  width: 15.625%;
  height: calc(28.240740741% + 4%);
  gap: 3%;
  display: flex;
  flex-flow: column wrap;
}
</style>