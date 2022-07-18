<script lang="ts">
export default {
    props: {
        color: {default: "#0500FF"}
    }
}   
</script>

<template>
<svg class="security_deco" width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="11.5" width="17" height="16" :stroke="color"/>
    <mask id="path-2-inside-1_21_4" fill="white">
    <path d="M18 9C18 6.61305 17.0518 4.32387 15.364 2.63604C13.6761 0.948212 11.3869 1.8021e-07 9 0C6.61305 -1.8021e-07 4.32387 0.948211 2.63604 2.63604C0.948212 4.32387 3.60419e-07 6.61305 0 9L9 9H18Z"/>
    </mask>
    <path d="M18 9C18 6.61305 17.0518 4.32387 15.364 2.63604C13.6761 0.948212 11.3869 1.8021e-07 9 0C6.61305 -1.8021e-07 4.32387 0.948211 2.63604 2.63604C0.948212 4.32387 3.60419e-07 6.61305 0 9L9 9H18Z" :stroke="color" stroke-width="2" mask="url(#path-2-inside-1_21_4)"/>
    <rect width="3" height="3" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 9 21)" :fill="color"/>
</svg>
</template>
<style scoped>
.security_deco{
    position: absolute;
    width: 5.806451613%;
    height: 50.909090909%;
}
</style>