<script lang="ts">
export default{
    props:{
        color: {default: "#0500FF"},
        width: {default: "10.655737705%"},
        height: {default: "24.324324324%"},
    }   
}
</script>


<template>
<svg width="13" class="alt_indi" :style="`width: ${width}; height: ${height};`" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="8" width="13" height="1" :fill="color"/>
    <path d="M6 1H7V9H6V1Z" :fill="color"/>
    <path d="M6 0.839981L6.70711 0.132874L9.14452 2.57028L8.43741 3.27739L6 0.839981Z" :fill="color"/>
    <path d="M6.57031 0L7.27742 0.707107L4.70714 3.27739L4.00003 2.57028L6.57031 0Z" :fill="color"/>
</svg>
</template>

<style scoped>
.alt_indi{
    position: absolute;
}
</style>
