<script>

export default{
    props:{
        id_l: '',
        id_in: '',
        for: '',
        autocomplete: '',
        name: '',
        label: '',
        type:'',
    }
}

</script>

<template>
    <label :for="for" :id="id_l" class="lb">{{this.label}}</label>
    <input :type="type" tabindex="0" spellcheck="false" :autocomplete="autocomplete" :name="name" :id="id_in" class="in_field">
</template>

<style>
.lb{
  position: absolute;
  color: #7e7e7e;
  font-family: 'Titillium Web', sans-serif;
  font-size: 1vw;
}
.in_field{
  position: absolute;
  height: 4%;
  width: 25%;
  background-color: #02008850;
  color: #999999;
  font-family: 'Titillium Web', sans-serif;
  font-size: 1vw;
  outline: none;
  border: solid 1px #02005e;
  transition: border-color linear 0.1s;
}
.in_field::selection{
  color: #8a8a8a;
  background-color: #001485;
}
.in_field:focus{
  border-right: solid 1px #0400ff;
}
</style>
