
<script>
export default {
    props: {
        color: ""
    }
}
</script>

<template>
<svg class="relay_station_deco" width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect shape-rendering="crispEdges" y="15" width="29" height="1.4" :fill="color"/>
    <path shape-rendering="crispEdges" d="M18.0001 25.6065L28.5 15L29.0001 15.9999L18.7072 26.3136L18.0001 25.6065Z" :fill="color"/>
    <rect shape-rendering="crispEdges" x="29.2605" y="11.3136" width="29" height="1.4" transform="rotate(-180 29.2605 11.3136)" :fill="color"/>
    <path shape-rendering="crispEdges" d="M11.2604 0.707092L0.760498 11.3136L0.260437 10.3137L10.5533 -1.45234e-05L11.2604 0.707092Z" :fill="color"/>
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