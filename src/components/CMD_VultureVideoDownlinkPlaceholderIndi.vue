
<script lang="ts">
export default {
    props: {
        size: {default: '63.98148148148148vh'},
        color: {default: '#151515'}
    }   
}
</script>
<template>
<svg class="cmd_overview_indi" :style="`width: ${size}; height: ${size}`" width="692" height="692" viewBox="0 0 692 692" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.0732422" y="1.41422" width="2" height="300" transform="rotate(-45 0.0732422 1.41422)" :fill="color"/>
    <rect x="689.732" width="2" height="300" transform="rotate(45 689.732 0)" :fill="color"/>
    <rect x="691.073" y="689.659" width="2" height="300" transform="rotate(135 691.073 689.659)" :fill="color"/>
    <rect x="1.41406" y="691.073" width="2" height="300" transform="rotate(-135 1.41406 691.073)" :fill="color"/>
</svg>
</template>
<style scoped>
.cmd_overview_indi{
    position: absolute;
}
</style>