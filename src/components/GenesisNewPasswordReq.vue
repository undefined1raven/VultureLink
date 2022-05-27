

<script>
export default {
  props: {
    id: "",
    color: "",
    text: "",
    height: "",
  },
};
</script>
<template>
  <div
    class="password_req_l"
    :id="id"
    :style="'color:' + color + '; border-color: ' + color + '; height: ' + height"
  >
    {{ this.text }}
  </div>
</template>
<style scoped>
div{
  user-select: none;
}
.password_req_l {
  position: absolute;
  transition: color linear 0.1s, border-color linear 0.1s;
  font-family: "Titillium Web", sans-serif;
  border-left-style: solid;
  border-left-width: 1px;
  width: 20%;
  height: 2%;
  font-size: 0.83vw;
  padding-left: 0.5%;
  display: flex;
  align-items: center;
}
@media only screen and (max-width: 768px) {
  .password_req_l {
    width: 60%;
    height: 2.1875%;
    font-size: 3.5vw;
    padding-left: 2vw;
  }
}
</style>