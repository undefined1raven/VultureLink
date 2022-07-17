<script lang="ts">
export default {
    props: {
        color: {default: "#0500FF"}
    }
}
</script>
<template>
<svg width="31" height="28" viewBox="0 0 31 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="16.5737" width="1.76995" height="30.1569" transform="rotate(-90 0 16.5737)" :fill="color"/>
    <rect y="11.2639" width="1.76995" height="30.1569" transform="rotate(-90 0 11.2639)" :fill="color"/>
    <rect width="1.68107" height="12.9636" transform="matrix(-0.667628 -0.744495 0.667628 -0.744495 1.1333 10.9029)" :fill="color"/>
    <rect width="1.68107" height="14.3191" transform="matrix(-0.667628 -0.744495 0.667628 -0.744495 20.6335 27.1935)" :fill="color"/>
</svg>
</template>