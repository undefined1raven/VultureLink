<script lang="ts">
export default {
    props: {
        color: {default: "#0500FF"},
        width: {default: "11.25%"},
        height: {default: "4.444444444%"},
        roll: {default: 0},
    }   
}
</script>



<template>
<svg class="roll_indi" :style="`transform: rotate(${roll}deg);`" :width="width" :height="height" viewBox="0 0 72 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="6" width="30" height="2" :fill="color"/>
    <rect x="42" y="6" width="30" height="2" :fill="color"/>
    <rect y="6" width="2" height="10" :fill="color"/>
    <rect x="70" y="6" width="2" height="10" :fill="color"/>
    <rect x="30.4142" y="7" width="7.89954" height="7.89941" transform="rotate(-45 30.4142 7)" :fill="color" fill-opacity="0.4" stroke="#0500FF" stroke-width="2"/>
</svg>
</template>

<style scoped>
.roll_indi{
    position: absolute;
}
</style>