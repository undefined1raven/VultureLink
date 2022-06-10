
<script setup>
import Label from "@/components/Label.vue";
import PayloadListItemDeco from "@/components/PayloadListItemDeco.vue";
</script>

<script>
export default {
  props: {
    payload_obj: "",
  },
};
</script>

<template>
  <div class="payload_list_item_container">
    <Label
      class="payload_type_l"
      color="#FFF"
      v-text="payload_obj.type"
    ></Label>
    <Label
      class="payload_id"
      color="#AAA"
      v-text="`ID: ${payload_obj.id}`"
    ></Label>
    <PayloadListItemDeco class="payload_deco_position"></PayloadListItemDeco>
  </div>
</template>
<style scoped>
.payload_id {
  width: 20%;
  left: 77%;
  text-align: end;
  font-size: 0.8vw;
}
.payload_deco_position {
  left: 1.857585139%;
}
.payload_type_l {
  left: 18.26625387%;
  font-size: 0.9vw;
}
.payload_list_item_container {
  position: relative;
  width: 100%;
  height: 23.295454545%;
  background-color: #6100ff20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.3%;
}
</style>