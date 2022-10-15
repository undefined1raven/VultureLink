<script lang="ts">
export default {
    props:{
        color: {default: "#0500FF"},
        width: {default: "6vh"},
        height: {default: "6vh"},
    }   
}
</script>

<template>
<svg class="landing_indi" :width="width" :height="height" viewBox="0 0 29 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.6628 18.6667H13.4705L13.4705 8.01086e-05H15.6628L15.6628 18.6667Z" :fill="color"/>
    <path d="M15.6628 19.04L14.1126 20.69L8.7691 15.0027L10.3193 13.3528L15.6628 19.04Z" :fill="color"/>
    <rect y="18.6666" width="28.5" height="2.33333" :fill="color"/>
    <path d="M14.4126 21L12.8624 19.3501L18.4973 13.3528L20.0474 15.0027L14.4126 21Z" :fill="color"/>
</svg>
</template>

<style scoped>
.landing_indi{
    position: absolute;
}
</style>