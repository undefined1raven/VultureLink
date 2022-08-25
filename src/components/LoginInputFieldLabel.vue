<script lang="ts">
export default {
  props: {
    id: "",
    for: "",
    label: "",
  },
};
</script>

<template>
  <label :for="for" :id="id" class="lb">{{ this.label }}</label>
</template>

<style>
label{
  user-select: none;
}
.lb {
  position: absolute;
  color: #999;
  font-family: "Titillium Web", sans-serif;
  font-size: 2vh;
  left: 13%;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .lb {
    font-size: 4vw;
  }
}
</style>
