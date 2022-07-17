
<script lang="ts">
export default {
    props: {
        color: {default: "#0D009D"}
    }
};
</script>

<template>
<svg class="m_power_deco" width="61" height="40" viewBox="0 0 61 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect shapeRendering="geometricPrecision" x="0.5" y="16.5" width="60" height="23" :stroke="color"/>
<rect shapeRendering="geometricPrecision" x="2" y="35" width="8" height="1" :fill="color"/>
<rect shapeRendering="geometricPrecision" x="2" y="37" width="5" height="1" :fill="color"/>
<rect shapeRendering="geometricPrecision" x="4" y="7" width="1" height="9" :fill="color"/>
<rect shapeRendering="geometricPrecision" x="13" y="7" width="1" height="9" :fill="color"/>
<rect shapeRendering="geometricPrecision" x="22" y="12" width="1" height="4" :fill="color"/>
<rect shapeRendering="geometricPrecision" x="24" y="12" width="1" height="4" :fill="color"/>
<rect shapeRendering="geometricPrecision" x="26" y="12" width="1" height="4" :fill="color"/>
<rect shapeRendering="geometricPrecision" x="4" width="1" height="5" :fill="color"/>
<rect shapeRendering="geometricPrecision" x="2" y="2" width="5" height="1" :fill="color"/>
<rect shapeRendering="geometricPrecision" x="11" y="2" width="5" height="1" :fill="color"/>
</svg>
</template>
<style scoped>
.m_power_deco{
    position: absolute;
    transition: color linear 0.1s, stroke linear 0.1s;
}
</style>