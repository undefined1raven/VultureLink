<script setup lang="ts">
import Background from "@/components/BaseBackgroundImg.vue";
import MobileBackground from "@/components/MobileBaseBackgroundImg.vue";
import InputField from "@/components/LoginInputField.vue";
import LoginButton from "@/components/LoginButton.vue";
import InputFieldLabel from "@/components/LoginInputFieldLabel.vue";
import VultureConnectivityDecoDesktop from "@/components/TheVultureConnectivityDeco.vue";
import MobileVultureConnectivityDecoDesktop from "@/components/MobileTheVultureConnectivityDeco.vue";
import AuroraLogo from "@/components/AuroraLogo.vue";
import Label from "@/components/Label.vue";
import NewPasswordReqIndi from "@/components/GenesisNewPasswordReq.vue";

document.title = "New Account";
</script>

<script lang="ts">
export default {
  data() {
    return {
      password_length_req_l_color: "#555",
      password_number_req_l_color: "#555",
      password_uppercase_req_l_color: "#555",
      password_special_char_req_l_color: "#555",
    };
  },
  methods: {
    redirect(path) {
      window.location.pathname = path;
    },
    new_password_validation(e) {
      if (e.target.value.length >= 8) {
        this.password_length_req_l_color = "#FFF";
      } else {
        this.password_length_req_l_color = "#555";
      }
      if (e.target.value.match(/[0-9]/g)) {
        this.password_number_req_l_color = "#FFF";
      } else {
        this.password_number_req_l_color = "#555";
      }
      if (e.target.value.match(/[A-Z]/g)) {
        this.password_uppercase_req_l_color = "#FFF";
      } else {
        this.password_uppercase_req_l_color = "#555";
      }
      if (e.target.value.match(/\W|_/g)) {
        this.password_special_char_req_l_color = "#FFF";
      } else {
        this.password_special_char_req_l_color = "#555";
      }
    },
  },
};
</script>

<template>
  <Background />
  <MobileBackground />
  <div id="logo_bkg">
    <AuroraLogo id="logo" />
  </div>
  <Label id="primary_l" color="#FFF" text="Create New Account"></Label>
  <NewPasswordReqIndi
    id="length_req_indi"
    :color="password_length_req_l_color"
    v-text="'at least 8 characters'"
  />
  <NewPasswordReqIndi
    id="number_req_indi"
    :color="password_number_req_l_color"
    v-text="'at least a number'"
  />
  <NewPasswordReqIndi
    id="uppercase_letter_req_indi"
    :color="password_uppercase_req_l_color"
    v-text="'at least an uppercase letter'"
  />
  <NewPasswordReqIndi
    id="special_char_letter_req_indi"
    :color="password_special_char_req_l_color"
    v-text="'at least a special character'"
  />
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
      @input="new_password_validation"
    ></InputField>
    <InputFieldLabel
      id="password_l"
      label="Passwod>\\"
      for="password_new_account_field"
    ></InputFieldLabel>

    <div id="m_ln_0"></div>
    <div id="m_ln_1"></div>
    <LoginButton
      class="btn_size"
      id="genesis_btn"
      text="Create Account"
      type="submit"
    ></LoginButton>
  </form>
  <VultureConnectivityDecoDesktop id="dk_deco" />
  <MobileVultureConnectivityDecoDesktop id="m_deco" />
  <LoginButton
    class="btn_size"
    @click="redirect('login')"
    id="login_btn"
    text="Login"
  ></LoginButton>
</template>

<style scoped>
#logo {
  width: 80%;
  height: 60%;
}
#dk_deco {
  display: flex;
}
.btn_size {
  width: 10%;
  height: 4%;
}
#genesis_btn {
  top: 70%;
  left: 35.3%;
  background-color: #2d00aa20;
  border: solid 1px #2d00aa;
}
#genesis_btn:hover {
  background-color: #2d00aa40;
}
#login_btn {
  top: 70%;
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
#m_deco {
  display: none;
}
#logo_bkg {
  position: absolute;
  top: 12%;
  left: 32.6%;
  background-color: #0500ff20;
  border-bottom: solid 1px #0500ff;
  width: 25%;
  height: 10%;
  transform: translate(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
}
#length_req_indi,
#number_req_indi,
#uppercase_letter_req_indi,
#special_char_letter_req_indi {
  top: calc(58.4375% - 3.2%);
  left: 20%;
}
#number_req_indi {
  top: calc(61.09375% - 3.2%);
}
#uppercase_letter_req_indi {
  top: calc(63.75% - 3.2%);
}
#special_char_letter_req_indi {
  top: calc(66.40625% - 3.2%);
}
#primary_l{
  top: 24%;
  left: 20%;
}
@media only screen and (max-width: 768px) {
  #length_req_indi,
  #number_req_indi,
  #uppercase_letter_req_indi,
  #special_char_letter_req_indi {
    top: calc(58.4375% - 2%);
    left: 16.944444444%;
  }
  #number_req_indi {
    top: calc(61.09375% - 2%);
  }
  #uppercase_letter_req_indi {
    top: calc(63.75% - 2%);
  }
  #special_char_letter_req_indi {
    top: calc(66.40625% - 2%);
  }
  #m_ln_0 {
    position: absolute;
    top: 78.90625%;
    left: 0%;
    width: 100%;
    height: 0.11vh;
    background-color: #0500ff;
  }
  #m_ln_1 {
    position: absolute;
    top: 70%;
    left: 49.722222222%;
    height: 6.25%;
    width: 0.11vh;
    background-color: #333;
  }
  #genesis_btn {
    top: 70%;
    left: 2.5%;
  }
  #login_btn {
    top: 70%;
    left: 55.277777778%;
  }
  .btn_size {
    width: 42.222222222%;
    height: 6.25%;
  }
  #username_l,
  #email_l,
  #password_l {
    top: 19.53125%;
    left: 16.944444444%;
  }
  #email_l {
    top: 31.875%;
  }
  #password_l {
    top: 44.6875%;
  }
  #username_new_account_field,
  #email_new_account_field,
  #password_new_account_field,
  #password_confirm_new_account_field {
    top: 23.125%;
    left: 16.944444444%;
    width: 61.388888889%;
  }
  #email_new_account_field {
    top: 35.625%;
  }
  #password_new_account_field {
    top: 48.4375%;
  }
  #password_confirm_new_account_field {
    top: 55.9375%;
    display: none;
  }
  #primary_l {
    top: 13.125%;
    left: 1.388888889%;
    font-size: 3.9vw;
  }
  #logo_bkg {
    top: 0;
    width: 100%;
    height: 10%;
  }
  #dk_deco {
    display: none;
  }
  #m_deco {
    top: 80.625%;
    left: 50%;
    transform: translate(-50%);
    display: flex;
  }
}
</style>