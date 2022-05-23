
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
@media only screen and (max-width: 768px) {
    .l{
      /* font-size: 3.7vw; */
    }
}
</style>