<script lang="ts">
export default {
  props: {
    id: "",
    text: "",
    type: "",
    height: "",
  },
};
</script>

<template>
  <button class="login_btn" :type="type" :id="id" :style="'height:' + height">
    {{ this.text }}
  </button>
</template>

<style scoped>
.login_btn {
  position: absolute;
  width: 8%;
  height: 4%;
  background-color: #02008850;
  font-family: "Titillium Web", sans-serif;
  font-size: 2vh;
  outline: none;
  color: #999999;
  border: solid 1px #001485;
  transition: linear background-color 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media only screen and (max-width: 1070px) and (min-height: 550px) and (max-height: 800px) and (-webkit-max-device-pixel-ratio: 2) {
  .login_btn {
    width: 16.041666667%;
  }
}
@media only screen and (max-width: 1500px) and (min-height: 850px) and (-webkit-max-device-pixel-ratio: 2) {
  .login_btn {
    width: 16.041666667%;
  }
}
@media only screen and (max-width: 1996.8px) and (min-height: 1200px) and (-webkit-max-device-pixel-ratio: 1) {
  .login_input_login_btnfield {
    width: 16.041666667%;
  }
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .login_btn {
    width: 61.388888889%;
    height: 6.25%;
    border: solid 1px #001aff;
    font-size: 4vw;
    background-color: #00000000;
  }
}
</style>