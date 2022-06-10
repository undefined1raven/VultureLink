
<script setup>
import Label from "@/components/Label.vue";
import PayloadListItem from "@/components/PayloadListItem.vue";
</script>

<script>
export default {
    props: {
        payload_array: [],
    }
}
</script>

<template>
    <div id="payload_list_container_actual">
        <PayloadListItem v-for="(payload_obj, index) in payload_array" :key="index" :payload_obj="payload_obj"></PayloadListItem>
    </div>
</template>
<style scoped>
#payload_list_container_actual{
    position: absolute;
    top: 21.524663677%;
    left: 0;
    width: 99.8%;
    height: 78.923766816%;
}
</style>