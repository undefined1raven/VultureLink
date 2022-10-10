<script lang="ts">
export default{
    props:{
        color: {default: "#0500FF"},
        width: {default: "4.213114754%"},
        height: {default: "27.783783784%"},
    }   
}
</script>


<template>
<svg class="vs_indi" :style="`width: ${width}; height: ${height};`" width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 1H3V9H2V1Z" :fill="color"/>
    <path d="M2 0.839981L2.70711 0.132874L5.14452 2.57028L4.43741 3.27739L2 0.839981Z" :fill="color"/>
    <path d="M2.57031 0L3.27742 0.707107L0.707137 3.27739L3.04831e-05 2.57028L2.57031 0Z" :fill="color"/>
    <path d="M3.14453 9.43741L2.43742 10.1445L1.59651e-05 7.70711L0.707123 7L3.14453 9.43741Z" :fill="color"/>
    <path d="M2.57422 10.2774L1.86711 9.57028L4.43739 7L5.1445 7.70711L2.57422 10.2774Z" :fill="color"/>
</svg>

</template>

<style scoped>
.vs_indi{
    position: absolute;
}
</style>
