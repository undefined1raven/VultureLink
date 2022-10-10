<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import VelocityIndicator from "@/components/CMDVelocityIndicator.vue";
import AltitudeIndicator from "@/components/CMDAltIndicator.vue";
import VSIndicator from "@/components/CMDVsIndicator.vue";

import isMobile from "@/composables/isMobile.ts";
import percentage from "@/composables/percentage.ts";
import rangeScaler from "@/composables/rangeScaler.ts";
</script>


<template>
    <div id="mobile_cmd_main_nav_dock_container">
        <VelocityIndicator id="nav_velocity_indi"></VelocityIndicator>
        <AltitudeIndicator id="alt_velocity_indi"></AltitudeIndicator>
        <VSIndicator id="vertical_speed_indi"></VSIndicator>
    </div>
</template>
<style scoped>
#mobile_cmd_main_nav_dock_container{
    position: absolute;
    top: 0%;
    left: 80.9375%;
    width: 19.0625%;
    height: 10.277777778%; 
    background-color: #0500FF40;
}
#nav_velocity_indi{
    top: 16.216216216%;
    left: 3.278688525%;
}
#alt_velocity_indi{
    top: 64.864864865%;
    left: 3.278688525%;
}
#vertical_speed_indi{
    top: 62.162162162%;
    left: 78.68852459%;
}
</style>