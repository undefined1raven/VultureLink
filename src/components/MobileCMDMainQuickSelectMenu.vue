<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";

import isMobile from "@/composables/isMobile.ts";
import percentage from "@/composables/percentage.ts";
import rangeScaler from "@/composables/rangeScaler.ts";
</script>

<script lang="ts">
export default {
    methods:{
        menuToggleButtonOnClick(){
            this.isExtended = !this.isExtended;
            if(this.isExtended){
                this.menuContainerLeft = 0;
            }
            else{
                this.menuContainerLeft = -77.319587629;
            }
        },
    },
    data(){
        return{
            isExtended: false,
            menuContainerLeft: -77.319587629,
        }
    }
}   
</script>

<template>
  <div id="mobile_cmd_main_quickSelect_menu_container">
    <div id="menu_container_acx" :style="`left: ${menuContainerLeft}%;`">
      <BaseLabel class="btn" id="rth_btn" v-text="'RTH'"></BaseLabel>
      <div class="btn" id="landing_assist_btn"></div>
      <div @click="menuToggleButtonOnClick" class="btn" id="menu_toggle_btn"></div>
    </div>
  </div>
</template>

<style scoped>

#mobile_cmd_main_quickSelect_menu_container{
    position: absolute;
    top: 0%;
    left: 15.3125%;
    width: 15.15625%;
    height: 8.333333333%;
    border-left: solid 1px #0500FF;
    overflow: hidden;
}
#menu_container_acx{
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    transition: all ease-out 0.1s;
}
.btn{
    position: absolute;
    top: 0%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px #0500FF;
    height: 91%;
    background-color: #0500FF20;
    width: 8.4vh;
    transition: background-color linear 0.1s;
}
.btn:hover{
    background-color: #0500FF60;
}
#rth_btn{
    left: 11.340206186%;
    font-size: 3.6vh;
}
#landing_assist_btn{
    left: 46.391752577%;
}
#menu_toggle_btn{
    left: 83.136082474%;
    width: 15.463917526%;
}
</style>
