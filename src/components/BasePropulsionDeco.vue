
<script lang="ts">
export default {
    props: {
        color: {default: "#0D009D"}
    }
};
</script>

<template>
<svg class="m_propulsion_deco" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="1.33333" height="44.8043" transform="matrix(0.712741 -0.701428 0.712741 0.701428 3.87109 4.89339)" :fill="color"/>
<rect width="9.67742" height="9.52381" :fill="color"/>
<rect width="1.33333" height="44.8043" transform="matrix(0.712741 0.701428 -0.712741 0.701428 35.8049 4.44446)" :fill="color"/>
<rect x="30.3225" y="30.4762" width="9.67742" height="9.52381" :fill="color"/>
<rect y="30.4762" width="9.67742" height="9.52381" :fill="color"/>
<rect x="30.3225" width="9.67742" height="9.52381" :fill="color"/>
</svg>
</template>
<style scoped>
.m_propulsion_deco{
    position: absolute;
    transition: color linear 0.1s, stroke linear 0.1s;
}
</style>