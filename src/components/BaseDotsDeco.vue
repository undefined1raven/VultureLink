
<script lang="ts">
export default {
    props: {
        color: {default: "#0500FF"}
    }   
}
</script>

<template>
<svg class="base_dots_deco" width="15" height="3" viewBox="0 0 15 3" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="3" height="3" fill="#0500FF"/>
    <rect x="6" width="3" height="3" :fill="color"/>
    <rect x="12" width="3" height="3" :fill="color"/>
</svg>
</template>

<style scoped>
.base_dots_deco{
    position: absolute;
    width: 42.857142857%;
    height: 20%;
}
</style>