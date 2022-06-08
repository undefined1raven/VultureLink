
<script setup>
import Label from "@/components/Label.vue";
import RelayStationDeco from "@/components/RelayStationDeco.vue";
</script>

<script>
export default {
    props: {
        relay_station_obj: "",
        color: ""
    },
    methods: {
        background_color_style_from_color(color){
            return `background-color: ${color}20;`; 
        }
    }
}
</script>

<template>
    <div :style="background_color_style_from_color(color)" class="relay_station_item_container">
        <Label class="relay_station_id" v-text="relay_station_obj.relay_station_name" color="#FFF"></Label>
        <RelayStationDeco id="relay_station_deco" :color="color"></RelayStationDeco>
    </div>
</template>
<style scoped>
#relay_station_deco{
    left: 3.095975232%;
}
.relay_station_id{
    left: 18.26625387%;
    font-size: 0.9vw;
}
.relay_station_item_container{
    height: 23.11827957%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2.3%;
}
</style>