
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
  <div :id="id" class="l dynamic-font-weight" :style="`color: ${color};`">
    {{ this.text }}
  </div>
</template>
<style scoped>
.l {
  -webkit-user-select: none;
  color: #fff;
  position: absolute;
  font-family: "Titillium Web", sans-serif;
  font-size: 1.1vw;
}
@media only screen and (max-width: 1368px) and (max-height: 768px) {
  .l {
    font-size: 3.7vw;
    font-weight: 300;
  }
}
@media only screen and (max-width: 1500px) {
  .l {
    font-size: 1.9vh;
  }
}
</style>