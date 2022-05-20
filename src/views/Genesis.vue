<script setup lang="ts">
import Background from "@/components/BaseBackgroundImg.vue";
import InputField from "@/components/LoginInputField.vue";
import LoginButton from "@/components/LoginButton.vue";
import InputFieldLabel from "@/components/LoginInputFieldLabel.vue";
import VultureConnectivityDecoDesktop from "@/components/TheVultureConnectivityDeco.vue";

document.title = "New Account";
</script>

<script lang="ts">
export default {
  methods: {
    redirect(path) {
      window.location.pathname = path;
    },
  },
};
</script>

<template>
  <main>
    <Background />
    <form action="/genesis_post" method="post">
      <InputField
        autofocus
        id="username_new_account_field"
        autocomplete="username"
        name="username"
        type="text"
      ></InputField>
      <InputFieldLabel
        id="username_l"
        label="Username>\\"
        for="username_new_account_field"
      ></InputFieldLabel>

      <InputField
        id="email_new_account_field"
        autocomplete="email"
        name="email"
        type="text"
      ></InputField>
      <InputFieldLabel
        id="email_l"
        label="Email>\\"
        for="email_new_account_field"
      ></InputFieldLabel>

      <InputField
        id="password_new_account_field"
        autocomplete="new-password"
        name="password"
        type="password"
      ></InputField>
      <InputFieldLabel
        id="password_l"
        label="Passwod>\\"
        for="password_new_account_field"
      ></InputFieldLabel>

      <InputField
        id="password_confirm_new_account_field"
        autocomplete="new-password"
        type="password"
      ></InputField>
      <VultureConnectivityDecoDesktop />
      <LoginButton
        class="btn_size"
        id="genesis_btn"
        text="Create Account"
        type="submit"
      ></LoginButton>
    </form>
    <LoginButton
      class="btn_size"
      @click="redirect('login')"
      id="login_btn"
      text="Login"
    ></LoginButton>
  </main>
</template>

<style scoped>
.btn_size {
  width: 10%;
  height: 4%;
}
#genesis_btn {
  top: 60%;
  left: 35.3%;
  background-color: #2d00aa20;
  border: solid 1px #2d00aa;
}
#genesis_btn:hover {
  background-color: #2D00AA40;;
}
#login_btn {
  top: 60%;
  left: 20%;
}
#login_btn:hover {
  background-color: #0c00af70;
}
#username_l {
  top: 31%;
}
#username_new_account_field {
  top: 30%;
  left: 20%;
}
#email_new_account_field {
  top: 40%;
  left: 20%;
}
#password_new_account_field,
#password_confirm_new_account_field {
  top: 50%;
  left: 20%;
  width: 12%;
}
#password_confirm_new_account_field {
  left: 33%;
}
#email_l {
  top: 41%;
  left: 14.3%;
}
#password_l {
  top: 51%;
  left: 14.3%;
}
</style>