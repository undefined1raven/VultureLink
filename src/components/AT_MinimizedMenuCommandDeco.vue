<script lang="ts">
export default {
    props: {
        color: {default: "#0500FF"}
    }
}
</script>
<template>
<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="0.874084" width="1.23615" height="18.5422" transform="rotate(-45 0 0.874084)" :fill="color"/>
    <rect x="34.1259" width="1.23615" height="18.5422" transform="rotate(45 34.1259 0)" :fill="color"/>
    <rect x="35" y="34.1259" width="1.23615" height="18.5422" transform="rotate(135 35 34.1259)" :fill="color"/>
    <rect x="0.874146" y="35" width="1.23615" height="18.5422" transform="rotate(-135 0.874146 35)" :fill="color"/>
    <rect x="14.88" y="17.9242" width="3.70845" height="3.70845" transform="rotate(-45 14.88 17.9242)" :fill="color"/>
</svg>
</template>