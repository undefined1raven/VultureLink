
<script>
export default {
  props: {
    id: "",
    text: "",
    color: "",
    fontSize: "",
  },
};
</script>

<template>
  <div :id="id" class="l" :style="`color: ${color}; font-size: ${fontSize}`">
    {{ this.text }}
  </div>
</template>
<style scoped>
.l {
  position: absolute;
  font-family: "Titillium Web", sans-serif;
}
</style>