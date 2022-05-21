
<script>
export default {
  props: {
    id: "",
    text: "",
  },
};
</script>

<template>
  <div :id="id" class="dist_indi" :style="`border: solid 1px rgb(${Math.abs(255 - (text / 1.568627451))}, 0, 255)`">
    {{ this.text }}cm
  </div>
</template>
<style scoped>
.dist_indi {
  position: absolute;
  width: 11.71875%;
  height: 12.407407407%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.2vw;
  font-family: "Titillium Web", sans-serif;
  border: solid 1px rgb(44, 44, 44);
  transition: border linear 0.1s;
}
</style>