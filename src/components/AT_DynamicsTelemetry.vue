
<script setup lang="ts">
import DynamicsTelemetryOneAxis from "@/components/AT_DynamicsTelemetryOneAxis.vue";
import Label from "@/components/Label.vue";
</script>

<script lang="ts">
export default {
    props: {

    }    
}
</script>

<template>
    <div id="dynamics_telemetry_container">
        <TransitionGroup name="dynamics_telemetry_g">
            <Label id="dynamics_telemetry_l" v-text="'Telemetry'"></Label>
            <DynamicsTelemetryOneAxis id="x_axis_telemetry_container" axis_id="X Axis"/>
            <DynamicsTelemetryOneAxis id="y_axis_telemetry_container" axis_id="Y Axis"/>
            <DynamicsTelemetryOneAxis id="z_axis_telemetry_container" axis_id="Z Axis"/>
        </TransitionGroup>
    </div>
</template>
<style scoped>
@keyframes ini_ani {
  0%{transform: translateY(-25%);}
  100%{transform: translateY(0);}
}
.dynamics_telemetry_g-enter-active {
  transition: all 10s cubic-bezier(0.1, 0, 0.1, 1);
}
.dynamics_telemetry_g-leave-active {
  transition: all;
}
.dynamics_telemetry_g-enter-from,
.dynamics_telemetry_g-leave-to {
    transform: scaleY(0.9);
}
#dynamics_telemetry_l{
    top: 0;
    left: 0;
}
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
    animation: ini_ani cubic-bezier(.59,.23,.49,1.07) 0.15s;
}
</style>