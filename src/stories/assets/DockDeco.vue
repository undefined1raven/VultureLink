<script>
export default {
    props: {
        color: "",
    }
}
</script>
<template>
<svg class="dock_deco" width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.5 16C0.5 14.067 2.067 12.5 4 12.5H24C25.933 12.5 27.5 14.067 27.5 16V31.5H0.5V16Z" :stroke="color"/>
    <rect x="10.5" y="4.5" width="7" height="4" :stroke="color"/>
    <rect x="13.5" y="2" width="1" height="2" :fill="color"/>
    <rect x="3" y="1" width="22" height="1" :fill="color"/>
    <rect width="3" height="3" :fill="color"/>
    <rect x="25" width="3" height="3" :fill="color"/>
    <rect x="13" y="6" width="2" height="1" :fill="color"/>
    <rect x="3" y="29" width="1" height="1" :fill="color"/>
    <rect x="5" y="29" width="1" height="1" :fill="color"/>
</svg>

</template>
<style scoped>
rect, path{
    transition: stroke linear 0.1s, fill linear 0.1s;
}
.dock_deco{
    position: absolute;
    width: 20%;
    height: 22.857142857%;
}
</style>