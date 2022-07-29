
<script setup>
import RelayStationListItem from "@/components/RelayStationListItem.vue";
import Label from "@/components/Label.vue";
</script>

<script>
export default {
  props: {
    relay_station_array: [],
    selected_dock_obj: "",
  },
  methods: {
    parse_relay_station_array() {
      let relay_station_array_actual = [];
      for (let ix = 0; ix < this.relay_station_array.length; ix++) {
        if (
          this.relay_station_array[ix].dock_array.find(
            ({ dock_id }) => dock_id == this.selected_dock_obj.dock_id
          ) != null
        ) {
          relay_station_array_actual.push(this.relay_station_array[ix]);
        }
      }
      return relay_station_array_actual;
    },
  },
};
</script>
<template>
  <div class="relay_stations_list_container">
    <Label
      v-if="parse_relay_station_array().length == 0"
      id="no_relay_stations_l"
      color="#515151"
      v-text="`No Relay Stations connected to this dock`"
    ></Label>
    <TransitionGroup name="relayStationItemFade">
      <RelayStationListItem
        v-for="(relay_station, index) in parse_relay_station_array()"
        :key="index"
        :relay_station_obj="relay_station"
        color="#00FFF0"
      ></RelayStationListItem>
    </TransitionGroup>
  </div>
</template>
<style scoped>

.relayStationItemFade-enter-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}
.relayStationItemFade-leave-active {
  transition: none;
}
.relayStationItemFade-enter-from,
.relayStationItemFade-leave-to {
  transform: translate(0, -15px);
  opacity: 0;
}
#no_relay_stations_l {
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(93.498452012% - 10%);
  display: flex;
  align-items: center;
  border: solid 1px #515151;
  padding-right: 5%;
  padding-left: 5%;
  justify-content: center;
  height: 37.704545455%;
  font-size: 1vw;
  text-align: center;
}
.relay_stations_list_container {
  position: absolute;
  top: 18.061674009%;
  left: 0;
  width: 99.8%;
  height: 81.938325991%;
}
@media only screen and (max-width: 800px) {
  #no_relay_stations_l {
    font-size: 5vw;
  }
}
</style>