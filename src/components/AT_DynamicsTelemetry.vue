
<script setup lang="ts">
import DynamicsTelemetryOneAxis from "@/components/AT_DynamicsTelemetryOneAxis.vue";
</script>

<script lang="ts">
export default {
    props: {

    }    
}
</script>

<template>
    <div id="dynamics_telemetry_container">
        <DynamicsTelemetryOneAxis id="x_axis_telemetry_container" axis_id="X Axis"/>
        <DynamicsTelemetryOneAxis id="y_axis_telemetry_container" axis_id="Y Axis"/>
        <DynamicsTelemetryOneAxis id="z_axis_telemetry_container" axis_id="Z Axis"/>
    </div>
</template>
<style scoped>
#x_axis_telemetry_container{
    top: 12.235294118%;
    left: 0%;
}
#y_axis_telemetry_container{
    top: 12.235294118%;
    left: 34.058514629%;
}
#z_axis_telemetry_container{
    top: 12.235294118%;
    left: 68.117029257%;
}
#dynamics_telemetry_container{
    position: absolute;
    top: 9.074074074%;
    left: 5.052083333%;
    width: 69.427083333%;
    height: 39.351851852%;
    border-right: solid 1px #373737;
}
</style>