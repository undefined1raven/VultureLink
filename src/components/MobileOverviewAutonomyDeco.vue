
<script lang="ts">
export default {
    props: {
        color: {default: "#0D009D"}
    }
};
</script>

<template>
<svg class="m_autonomy_deco" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="33" height="33" :fill="color" fill-opacity="0.2" :stroke="color"/>
<rect x="8" y="1" width="1" height="8" :fill="color"/>
<rect x="10" y="1" width="1" height="8" :fill="color"/>
<rect x="1" y="25" width="6" height="1" :fill="color"/>
<rect x="1" y="27" width="6" height="1" :fill="color"/>
<rect x="25" y="28" width="8" height="1" :fill="color"/>
<rect x="25" y="30" width="8" height="1" :fill="color"/>
<rect x="13" y="13" width="8" height="8" :fill="color" fill-opacity="0.3"/>
<rect x="10" y="9" width="1" height="5" :fill="color"/>
<rect x="8" y="9" width="1" height="7" :fill="color"/>
<rect x="9" y="15" width="4" height="1" :fill="color"/>
<rect x="11" y="13" width="2" height="1" :fill="color"/>
<rect x="21" y="30" width="4" height="1" :fill="color"/>
<rect x="21" y="28" width="4" height="1" :fill="color"/>
<rect x="20" y="21" width="1" height="8" :fill="color"/>
<rect x="18" y="30" width="3" height="1" :fill="color"/>
<rect x="18" y="21" width="1" height="9" :fill="color"/>
<rect x="7" y="25" width="6" height="1" :fill="color"/>
<rect x="13" y="21" width="1" height="5" :fill="color"/>
<rect x="7" y="27" width="8" height="1" :fill="color"/>
<rect x="15" y="21" width="1" height="7" :fill="color"/>
<rect x="14.5" y="14.5" width="1" height="1" :fill="color"/>
<rect x="16.5" y="14.5" width="1" height="1" :fill="color"/>
<rect x="18.5" y="14.5" width="1" height="1" :fill="color"/>
<rect x="14.5" y="16.5" width="1" height="1" :fill="color"/>
<rect x="16.5" y="16.5" width="1" height="1" :fill="color"/>
<rect x="18.5" y="16.5" width="1" height="1" :fill="color"/>
<rect x="14.5" y="18.5" width="1" height="1" :fill="color"/>
<rect x="16.5" y="18.5" width="1" height="1" :fill="color"/>
<rect x="18.5" y="18.5" width="1" height="1" :fill="color"/>
</svg>

</template>
<style scoped>
.m_autonomy_deco{
    position: absolute;
    transition: color linear 0.1s, stroke linear 0.1s;
}
</style>