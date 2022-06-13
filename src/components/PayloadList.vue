
<script setup>
import Label from "@/components/Label.vue";
import PayloadListItem from "@/components/PayloadListItem.vue";
</script>

<script>
export default {
  props: {
    payload_array: [],
  },
};
</script>

<template>
  <div id="payload_list_container_actual">
    <Label
      v-if="payload_array == undefined || payload_array.length == 0"
      id="no_payloads_l"
      color="#515151"
      v-text="'No Payloads detected in storage'"
    ></Label>
    <PayloadListItem
      v-for="(payload_obj, index) in payload_array"
      :key="index"
      :payload_obj="payload_obj"
    ></PayloadListItem>
  </div>
</template>
<style scoped>
#no_payloads_l {
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 93.498452012%;
  display: flex;
  align-items: center;
  border: solid 1px #515151;
  justify-content: center;
  height: 26.704545455%;
  font-size: 1vw;
}
#payload_list_container_actual {
  position: absolute;
  top: 21.524663677%;
  left: 0;
  width: 99.8%;
  height: 78.923766816%;
}
@media only screen and (max-width: 800px) {
  #no_payloads_l {
    font-size: 5vw;
  }
}
</style>