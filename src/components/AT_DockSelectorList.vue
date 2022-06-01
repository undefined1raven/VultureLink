
<script setup>
import DockListItem from "@/components/DockListItem.vue";
</script>
<script>
export default {
  props: {
    id: "",
    dock_array: "",
    vulture_array_status: "",
  },
};
</script>
<template>
  <div :id="id">
    <DockListItem
      v-for="(dock, index) in dock_array"
      :dock_name="dock.dock_name"
      :dock_obj="dock"
      :vulture_array_status="vulture_array_status"
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
  height: calc(28.240740741% + 5%);
  gap: 3%;
  display: flex;
  flex-flow: column wrap;
}
</style>