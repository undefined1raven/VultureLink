
<script lang="ts" setup>
import BaseLabel from "@/components/BaseLabel.vue";

import scale from '@/composables/scale.ts';
import percentage from '@/composables/percentage.ts';

</script>
<script lang="ts">
export default {
  expose: ["submit_logout_form"],
  props: {
    username: "",
    top: "",
  },
  data() {
    return {
      DropdownContainerStyle: "",
      windowWidth: document.documentElement.clientWidth,
    };
  },
  methods: {
    submit_logout_form() {
      this.$refs.logout_form.submit();
    },
    ComputeUIStyle() {
      this.DropdownContainerStyle = `width: ${percentage(
        scale(266, 1920),
        this.windowWidth
      )}%; left: ${98.958333333 - percentage(scale(266, 1920), this.windowWidth)}%`;
    },
  },
  mounted() {
    this.ComputeUIStyle();
    window.addEventListener("resize", () => {
      this.windowWidth = document.documentElement.clientWidth;
      this.ComputeUIStyle();
    });
  },
};
</script>

<template>
  <div
    class="user_dropdown_menu_container"
    :style="`top: ${top}; ${DropdownContainerStyle}`"
  >
    <BaseLabel
      class="signed_in_as_l"
      color="#4D4D4D"
      v-text="'Signed in as'"
    ></BaseLabel>
    <BaseLabel class="username_l" color="#FFF" v-text="username"></BaseLabel>
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
  font-size: 1.8vh;
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
  font-size: 1.8vh;
  width: calc(63.157894737% - 2%);
  height: 54.237288136%;
  border: solid 1px #001aff;
  padding-left: 2%;
}
.signed_in_as_l {
  top: 0;
  left: 0;
  font-size: 1.5vh;
}
.user_dropdown_menu_container {
  position: absolute;
  top: 4.259259259%;
  left: 85.104166667%;
  width: 13.854166667%;
  height: 5.462962963%;
}
</style>