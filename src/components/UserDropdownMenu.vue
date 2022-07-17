
<script setup>
import Label from "@/components/Label.vue";
</script>
<script>
import Vue from "vue";
export default {
  expose: ['submit_logout_form'],
  props: {
    username: "",
    top: "",
    left: "",
  },
  methods: {
    submit_logout_form(){
      this.$refs.logout_form.submit();
    }
  }
};
</script>

<template>
  <div class="user_dropdown_menu_container" :style="`top: ${top}; left: ${left};`">
    <Label
      class="signed_in_as_l"
      color="#4D4D4D"
      v-text="'Signed in as'"
    ></Label>
    <Label class="username_l" color="#FFF" v-text="username"></Label>
    <form ref="logout_form" action="/logout" method="POST" id="logout_form">
      <button id="logout_btn" type="submit">Log Out</button>
    </form>
  </div>
</template>
<style scoped>
#logout_btn {
  user-select: none;
  position: absolute;
  outline: none;
  border: none;
  color: #fff;
  font-size: 0.9vw;
  font-family: "Titillium Web", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 45.762711864%;
  left: 66.917293233%;
  width: 33.082706767%;
  height: 54.237288136%;
  border: solid 1px #0026ef;
  transition: border linear 0.1s, background-color linear 0.1s;
  background-color: #0026ef00;
}
#logout_btn:hover {
  background-color: #0400ef63;
}
.username_l {
  top: 45.762711864%;
  left: 0;
  font-size: 0.9vw;
  width: calc(63.157894737% - 2%);
  height: 54.237288136%;
  border: solid 1px #001aff;
  padding-left: 2%;
}
.signed_in_as_l {
  top: 0;
  left: 0;
  font-size: 0.7vw;
}
.user_dropdown_menu_container {
  position: absolute;
  top: 4.259259259%;
  left: 85.104166667%;
  width: 13.854166667%;
  height: 5.462962963%;
}
</style>