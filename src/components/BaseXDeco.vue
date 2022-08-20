<script lang="ts">
export default {
    props: {
        color: {default: "#0500FF"}
    }   
}
</script>

<template>
<svg class="base_x_deco" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.000244141" y="0.707153" width="1" height="18" transform="rotate(-45 0.000244141 0.707153)" :fill="color"/>
    <rect x="12.728" y="0.00012207" width="1" height="18" transform="rotate(45 12.728 0.00012207)" :fill="color"/>
</svg>
</template>
<style scoped>
.base_x_deco{
    position: absolute;
    width: 1.2444vh;
    height: 1.2444vh;
}
</style>