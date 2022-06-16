


<script>
export default {
    props: {
        color: {default: "#2C2C2C"},
    }
}
</script>
<template>
    <div class="ln ln_v" :style="`background-color: ${color};`"></div>
</template>
<style scoped>
.ln {
  position: absolute;
  background-color: #2c2c2c;
}
.ln_v {
  width: 0.11vh;
}
</style>