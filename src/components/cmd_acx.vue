<script>
import App from '../App.vue'

const socket = io();

export default{
  data(){
    return{
      flt: Math.random(),
      tx: 0
    } 
  },
  methods:{
    gen_float(){
      socket.on('ct', payload => {
        this.tx = payload;
      });
    },
  }
}

</script>

<template>
  <input class="btn tw" type="button" @click="gen_float()" value="Gen random float">
  <div class="l" id="float">{{this.tx}}</div>
</template>

<style>
body{
    font-family: 'Inconsolata', monospace;
    /*font-family: 'Titillium Web', sans-serif;*//*tls*/
}
.btn{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  background-color: #00000000;
  border: solid 1px #0026EF;
  display: flex;
  align-content: center;
  justify-content: center;
  color: #FFF;
  font-size: 1vw;
  width: 13.020833333%;
  height: 5.37037037%;
}
#float{
  left: 50%;
  transform: translate(-50%);
  top: 60%;
}
.l{
  position: absolute;
  color: #FFF;
  font-size: 1vw;
}
.btn:hover{
  background-color: #0026EF20;
}

.tw{
  font-family: 'Titillium Web', sans-serif;
}
.inc{
    font-family: 'Inconsolata', monospace;
}
</style>
