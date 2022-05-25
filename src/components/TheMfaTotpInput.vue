

<script>
export default {
  props: {
    placeholder: "",
    name: "",
    id: "",
    type: ""
  },
};
</script>

<template>
  <input
    :id="id"
    spellcheck="false"
    class="in"
    :type="type"
    :placeholder="placeholder"
    :name="name"
  />
</template>
<style scoped>
.in {
  font-family: "Inconsolata", monospace;
  position: absolute;
  top: 47.5%;
  left: 42.477083333%;
  width: 13.75%;
  height: 4.537037037%;
  color: #fff;
  background-color: #00000000;
  font-size: 1.7vw;
  border: none;
  border-top: solid 1px #0026ef;
  border-bottom: solid 1px #0026ef;
  outline: 0px;
  align-items: center;
  justify-content: center;
  display: flex;
  letter-spacing: 1.3vw;
  text-align: center;
  padding-left: 1vw;
  padding-right: -1vw;
}
.in::selection {
  color: #8a8a8a;
  background-color: #00148540;
}
.in::-webkit-outer-spin-button,
.in::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.in[type="number"] {
  -moz-appearance: textfield;
}
@media only screen and (max-width: 768px){
  .in{
    width: 61.666666667%;
    left: 50%;
    transform: translate(-50%);
    letter-spacing: 3.8vw;
    font-size: 10vw;
    height: 7.65625%;
  }
}
</style>