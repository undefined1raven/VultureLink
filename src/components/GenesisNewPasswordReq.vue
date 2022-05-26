

<script>
export default {
  props: {
    id: "",
    color: "",
    text: "",
  },
};
</script>
<template>
  <div
    class="password_req_l"
    :id="id"
    :style="'color:' + color + '; border-color: ' + color + ';'"
  >
    {{ this.text }}
  </div>
</template>
<style scoped>
.password_req_l {
  position: absolute;
  transition: color linear 0.1s, border-color linear 0.1s;
}
@media only screen and (max-width: 768px) {
  .password_req_l {
    width: 60%;
    height: 2.1875%;
    border-left-style: solid;
    border-left-width: 1px;
    font-size: 3.5vw;
    padding-left: 2vw;
    font-family: "Titillium Web", sans-serif;
  }
}
</style>