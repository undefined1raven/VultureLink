
<script lang="ts">
export default {
    props: {
        color: {default: "#0D009D"}
    }
};
</script>

<template>
<svg class="m_optical_array_deco" width="61" height="28" viewBox="0 0 61 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="60" height="27" :fill="color" fill-opacity="0.2" :stroke="color"/>
<path d="M38 14.5C38 18.6421 34.6421 22 30.5 22C26.3579 22 23 18.6421 23 14.5C23 10.3579 26.3579 7 30.5 7C34.6421 7 38 10.3579 38 14.5ZM24.0022 14.5C24.0022 18.0886 26.9114 20.9978 30.5 20.9978C34.0886 20.9978 36.9978 18.0886 36.9978 14.5C36.9978 10.9114 34.0886 8.00221 30.5 8.00221C26.9114 8.00221 24.0022 10.9114 24.0022 14.5Z" :fill="color"/>
<rect x="3" y="3" width="3" height="1" :fill="color"/>
</svg>

</template>
<style scoped>
.m_optical_array_deco{
    position: absolute;
    transition: color linear 0.1s, stroke linear 0.1s;
}
</style>