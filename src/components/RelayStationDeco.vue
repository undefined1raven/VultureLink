
<script>
export default {
    props: {
        color: ""
    }
}
</script>

<template>
<svg class="relay_station_deco" width="35" height="32" viewBox="0 0 35 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect shape-rendering="geometricPrecision" y="18.5" width="34" height="1.5" :fill="color"/>
    <path shape-rendering="geometricPrecision" d="M20 29.9376L32.5991 19.3657L34 20L33.5633 20.5147L20.9642 31.0867L20 29.9376Z" :fill="color"/>
    <rect shape-rendering="geometricPrecision" x="34.073" y="12.5867" width="34" height="1.5" transform="rotate(-180 34.073 12.5867)" :fill="color"/>
    <path shape-rendering="geometricPrecision" d="M14.073 1.14905L1.47385 11.721L0.0729974 11.0867L0.509667 10.5719L13.1088 -1.88053e-05L14.073 1.14905Z" :fill="color"/>
</svg>



</template>

<style scoped>
.relay_station_deco{
    position: absolute;
    width: 9.058823529%;
    height: 61.186046512%;
}
rect, path{
    transition: fill linear 0.1s;
}
</style>