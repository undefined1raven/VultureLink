<script setup lang="ts">
import Background from "@/components/BaseBackgroundImg.vue";
import InputField from "@/components/LoginInputField.vue";
import BasePrimaryLabel from "@/components/BasePrimaryLabel.vue";
import BaseWideLogo from "@/components/BaseWideLogo.vue";
import LoginButton from "@/components/LoginButton.vue";

document.title = "Vulture//Login";
</script>

<template>
  <main>
    <Background></Background>
    <BaseWideLogo/>
    <form action="/auth_post" method="post">
    <InputField
      id_l="email_l"
      label="Email"
      id_in="email_auth_field"
      for="email_auth_field"
      autocomplete="email"
      name="email"
      type="text"
    ></InputField>
    <InputField
      id_l="password_l"
      label="Passwod"
      id_in="password_auth_field"
      for="password_auth_field"
      autocomplete="password"
      name="password"
      type="password"
    ></InputField>
    <LoginButton id="login_btn" text="Log In" type="submit"></LoginButton>
    </form>
    <BasePrimaryLabel text="\\Sign In"></BasePrimaryLabel>
  </main>
</template>

<style>
#login_btn {
  top: 60%;
  left: 37%;
}
#login_btn:hover {
  background-color: #0c00af70;
}
#login_btn:focus {
  border: solid 1px #0000FF;
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
