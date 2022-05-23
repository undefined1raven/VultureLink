<script>
export default {
  props: {
    id: "",
    text: "",
    type: "",
  },
};
</script>

<template>
  <button class="login_btn" :type="type" :id="id">{{ this.text }}</button>
</template>

<style scoped>
.login_btn {
  position: absolute;
  width: 8%;
  height: 4%;
  background-color: #02008850;
  font-family: "Titillium Web", sans-serif;
  font-size: 1vw;
  outline: none;
  color: #999999;
  border: solid 1px #001485;
  transition: linear background-color 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media only screen and (max-width: 768px) {
  .login_btn {
    width: 61.388888889%;
    height: 6.25%;
    border: solid 1px #001aff;
    font-size: 4vw;
    background-color: #00000000;
  }
}
</style>