<script>
export default {
  props: {
    id: "",
    autocomplete: "",
    name: "",
    type: "",
    height: "",
    backgroundColor: '',
    borderColor: ''
  },
};
</script>

<template>
  <input
    :type="type"
    tabindex="0"
    spellcheck="false"
    :autocomplete="autocomplete"
    :name="name"
    :id="id"
    :style="'height: ' + height + '; border-color: ' + borderColor + '; background-color: ' + backgroundColor"
    class="in_field"
  />
</template>

<style>
.lb {
  position: absolute;
  color: #7e7e7e;
  font-family: "Titillium Web", sans-serif;
  font-size: 1vw;
  left: 13%;
}
.in_field {
  position: absolute;
  height: 4%;
  width: 25%;
  background-color: #02008850;
  color: #999999;
  font-family: "Titillium Web", sans-serif;
  font-size: 2vh;
  outline: none;
  border: solid 1px #02005e;
  transition: border linear 0.1s, background-color linear 0.1s;
}
.in_field::selection {
  color: #8a8a8a;
  background-color: #001485;
}
.in_field:focus {
  border-right: solid 1px #0400ff;
}
@media only screen and (max-width: 768px) and (-webkit-min-device-pixel-ratio: 2) {
  .in_field {
    width: 61.388888889%;
    height: 6.25%;
    background-color: #00000000;
    border: solid 1px #0f00bb;
    color: #d1d1d1;
    font-size: 4vw;
  }
  .in_field:focus {
    border: solid 1px #0000ff;
  }
}
</style>
