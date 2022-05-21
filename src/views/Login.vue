<script setup lang="ts">
import Background from "@/components/BaseBackgroundImg.vue";
import BaseWideLogo from "@/components/BaseWideLogo.vue";
import BasePrimaryLabel from "@/components/BasePrimaryLabel.vue";
import InputField from "@/components/LoginInputField.vue";
import InputFieldLabel from "@/components/LoginInputFieldLabel.vue";
import LoginButton from "@/components/LoginButton.vue";

document.title = "Vulture//Login";
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
    <Background></Background>
    <Label id="primary_label" text="Additional Security Step"></Label>
    <BaseWideLogo />
    <form action="/auth_post" method="post">
      <InputField
        autofocus
        id="email_auth_field"
        autocomplete="email"
        name="email"
        type="text"
      ></InputField>

      <InputFieldLabel
        id="email_l"
        label="Email or Username"
        for="email_auth_field"
      ></InputFieldLabel>

      <InputField
        id="password_auth_field"
        autocomplete="password"
        name="password"
        type="password"
      ></InputField>

      <InputFieldLabel
        id="password_l"
        label="Password"
        for="password_auth_field"
      ></InputFieldLabel>

      <LoginButton id="login_btn" text="Log In" type="submit"></LoginButton>
    </form>
    <LoginButton
      @click="redirect('genesis')"
      id="new_account_btn"
      text="Create Account"
    ></LoginButton>
  </main>
</template>

<style scoped>
#new_account_btn {
  top: 60%;
  left: 20%;
  background-color: #2d00aa30;
  border: solid 1px #2d00aa;
  font-size: 0.9vw;
  color: #686868;
}
#new_account_btn:hover {
  background-color: #2d00aa60;
}
#login_btn {
  top: 60%;
  left: 37%;
}
#login_btn:hover {
  background-color: #0c00af70;
}
#login_btn:focus {
  border: solid 1px #0000ff;
}
#email_l {
  top: 37%;
  left: 20%;
}
#email_auth_field {
  top: 40%;
  left: 20%;
}
#password_l {
  top: 47%;
  left: 20%;
}
#password_auth_field {
  top: 50%;
  left: 20%;
}
</style>
