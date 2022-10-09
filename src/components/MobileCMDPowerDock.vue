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

    },   
}
</script>

<template>
    <div id="mobile_cmd_main_power_dock_container">
        <div id="flt_bat_lvl_indi_container">
            <div id="flt_bat_lvl_indi_acx"></div>
        </div>
        <BaseLabel id="flt_bat_lvl_acx" v-text="'78%'"></BaseLabel>
        <BaseLabel id="flt_bat_discharge_rate_acx" v-text="'3.3%/min'"></BaseLabel>
        <BaseLabel id="flt_bat_discharge_eta_acx" v-text="'23 mins left'"></BaseLabel>
        <HorizontalLine id="power_dock_ln" color="#0500FF"></HorizontalLine>
        <BaseLabel id="range_l" v-text="'Range:'"></BaseLabel>
        <BaseLabel id="range_acx" v-text="'14.2km'"></BaseLabel>
        <div id="range_indi_0" class="range_indi"></div>
        <div id="range_indi_1" class="range_indi"></div>
        <div id="range_indi_2" class="range_indi"></div>
        <div id="range_indi_3" class="range_indi"></div>
    </div>
</template>
<style scoped>

#flt_bat_lvl_indi_container{
    position: absolute;
    top: 4.054054054%;
    left: 3.333333333%;
    width: 92.222222222%;
    height: 2.702702703%;
    background-color: #FFFFFF40;
    border-right: solid 1px #FFF;
    overflow: hidden;
}
#flt_bat_lvl_indi_acx{
    position: absolute;
    top: 0%;
    left: -23%;
    width: 100%;
    height: 100%;
    background-color: #0500FF;
}
#mobile_cmd_main_power_dock_container{
    position: absolute;
    top: 0%;
    left: 0%;
    width: 14.0625%;
    height: 20.555555556%;
    background-color: #000000aa;
}
#flt_bat_lvl_acx{
    top: 10.810810811%;
    height: 36.486486486%;
    width: 35.555555556%;
    font-size: 3.6vh;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: solid 1px #0500FF;
}
#flt_bat_discharge_rate_acx, #flt_bat_discharge_eta_acx{
    top: 6.756756757%;
    left: 36.666666667%;
    width: 63.333333333%;
    text-align: end;
    padding-right: 3%;
    font-size: 3.4vh;
}
#flt_bat_discharge_eta_acx{
    top: 27.027027027%;
}
#power_dock_ln{
    top: 48.648648649%;
    left: 0%;
    width: 100%;
}
#range_l, #range_acx{
    top: 50%;
    left: 3.333333333%;
    font-size: 3.6vh;
}
#range_acx{
    left: 45.555555556%;
    width: 54.444444444%;
    text-align: center;
}
.range_indi{
    position: absolute;
    top: 79.72972973%;
    width: 3.7vh;
    height: 3.7vh;
    background-color: #0500FF;
}
#range_indi_0{
    left: 12.222222222%;
}
#range_indi_1{
    left: 33.333333333%;
}
#range_indi_2{
    left: 54.444444444%;
}
#range_indi_3{
    left: 75.555555556%;
    background-color: #0500FF40;
}
</style>