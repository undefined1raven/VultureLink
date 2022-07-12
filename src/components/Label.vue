
<script>
export default {
  props: {
    id: "",
    text: "",
    color: "",
  },
};
</script>

<template>
  <div :id="id" class="l" :style="`color: ${color};`">
    {{ this.text }}
  </div>
</template>
<style scoped>
.l {
  color: #FFF;
  position: absolute;
  font-family: "Titillium Web", sans-serif;
  font-size: 1.1vw;
}
@media only screen and (max-width: 768px) {
    .l{
      font-size: 3.7vw;
    }
}
</style>