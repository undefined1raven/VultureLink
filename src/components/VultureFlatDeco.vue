<script>
export default {
    props: {
        color: "",
    }
}
</script>


<template>
<svg width="28" height="9" viewBox="0 0 28 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10.5" y="4.5" width="7" height="4" :stroke="color"/>
    <rect x="13.5" y="2" width="1" height="2" :fill="color"/>
    <rect x="3" y="1" width="22" height="1" :fill="color"/>
    <rect width="3" height="3" :fill="color"/>
    <rect x="25" width="3" height="3" :fill="color"/>
    <rect x="13" y="6" width="2" height="1" :fill="color"/>
</svg>

</template>

<style scoped>
rect{
    transition: fill linear 0.1s, stroke linear 0.1s;
}
</style>