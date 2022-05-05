<script>

export default{
  props:{
    text: ''
  }
}
</script>

<template>
    <div class="l" id="lg_l">{{this.text}}</div>
</template>

<style>
#lg_l{
    position: absolute;
    top: 8.5%;
    left: 1%;
    font-size: 1vw;
    color: #AAA;
    font-family: 'Titillium Web', sans-serif;
    letter-spacing: 0.2vw;
}
</style>
