<script>
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
  font-size: 1vw;
  left: 13%;
}
@media only screen and (max-width: 768px) {
  .lb {
    font-size: 3.7vw;
  }
}
</style>
