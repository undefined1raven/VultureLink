
<script setup>
import RelayStationListItem from "@/components/RelayStationListItem.vue";
    
</script>

<script>
export default {
    props: {
        relay_station_array: [],
        selected_dock_obj: ""
    },
    methods:{
        parse_relay_station_array(){
            let relay_station_array_actual = [];
            for(let ix = 0; ix < this.relay_station_array.length; ix++){
                if(this.relay_station_array[ix].dock_array.find(({dock_id}) => dock_id == this.selected_dock_obj.dock_id) != null){
                    relay_station_array_actual.push(this.relay_station_array[ix]);
                }
            }
            return relay_station_array_actual;
        }
    }
}
</script>
<template>
  <div class="relay_stations_list_container">
      <RelayStationListItem v-for="(relay_station, index) in parse_relay_station_array()" :key="index" :relay_station_obj="relay_station" color="#00FFF0"></RelayStationListItem>
  </div>
</template>
<style scoped>
.relay_stations_list_container {
    position: absolute;
    top: 18.061674009%;
    left: 0;
    width: 99.8%;
    height: 81.938325991%;
}
</style>