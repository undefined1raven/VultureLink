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
import { RSA_PKCS1_PADDING } from "constants";

document.title = "New Account";
</script>

<script lang="ts">
const email_regex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const root = document.documentElement;
export default {
  data() {
    return {
      error_label_visible: false,
      error_label_text: "",
      password_length_req_l_color: "#555",
      password_number_req_l_color: "#555",
      password_uppercase_req_l_color: "#555",
      password_special_char_req_l_color: "#555",
      username_field_background_color: "#02008850",
      username_field_border_color: "",
      email_field_background_color: "#02008850",
      email_field_border_color: "",
      password_field_background_color: "#02008850",
      password_field_border_color: "",
      virtual_keyboard_visible: false,
      dynamic_input_field_height: "",
      dynamic_error_label_height: "",
      dynamic_button_height: "",
      dynamic_password_req_label_height: "",
      username_field_input_opacity: 1,
      email_field_input_opacity: 1,
      password_field_input_opacity: 1,
    };
  },
  mounted() {
    window.onresize = () => {
      this.onResize();
    };
  },
  methods: {
    onResize() {
      if (root.clientWidth < 900 && root.clientWidth < 600) {
        this.dynamic_button_height = `${(40 * 100) / root.clientHeight}%`;
        this.dynamic_input_field_height = `${(44 * 100) / root.clientHeight}%`;
        this.dynamic_error_label_height = `${(34 * 100) / root.clientHeight}%`;
        this.dynamic_password_req_label_height = `${
          (14 * 100) / root.clientHeight
        }%`;

        if (root.clientHeight < 550) {
          this.virtual_keyboard_visible = true;
        } else {
          this.virtual_keyboard_visible = false;

          this.username_field_input_opacity = 1;
          this.email_field_input_opacity = 1;
          this.password_field_input_opacity = 1;
        }
      }
    },
    redirect(path) {
      window.location.pathname = path;
    },
    password_field_on_click() {
      if (root.clientHeight < 768 && root.clientWidth < 768) {
        this.username_field_input_opacity = 0;
        this.email_field_input_opacity = 0;
      }
    },
    new_password_on_input(e) {
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
      this.password_field_background_color = "#02008850";
      this.password_field_border_color = "";
    },
    onSubmit(e) {
      e.preventDefault();
      if (e.target.username.value == "") {
        this.username_field_background_color = "#FF006B20";
        this.username_field_border_color = "#FF006B";
      }
      if (e.target.email.value == "") {
        this.email_field_background_color = "#FF006B20";
        this.email_field_border_color = "#FF006B";
      }
      if (e.target.password.value == "") {
        this.password_field_background_color = "#FF006B20";
        this.password_field_border_color = "#FF006B";
      }
      if (e.target.password.value.length < 8) {
        this.password_length_req_l_color = "#FF006B";
      }
      if (!e.target.password.value.match(/[0-9]/g)) {
        this.password_number_req_l_color = "#FF006B";
      }
      if (!e.target.password.value.match(/[A-Z]/g)) {
        this.password_uppercase_req_l_color = "#FF006B";
      }
      if (!e.target.password.value.match(/\W|_/g)) {
        this.password_special_char_req_l_color = "#FF006B";
      }
      if (
        e.target.username.value.length > 0 &&
        e.target.email.value.length > 0 &&
        e.target.email.value.match(email_regex) &&
        e.target.password.value.length >= 8 &&
        e.target.password.value.match(/[0-9]/g) &&
        e.target.password.value.match(/[A-Z]/g) &&
        e.target.password.value.match(/\W|_/g)
      ) {
        e.target.submit();
      }
    },
    username_field_on_click(e) {
      if (root.clientHeight < 768 && root.clientWidth < 768) {
        this.password_field_input_opacity = 0;
        this.email_field_input_opacity = 0;

      }
    },
    username_field_on_input(e) {
      this.error_label_visible = false;
      if (e.target.value.length >= 3) {
        fetch("/doesUserExist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: e.target.value }),
        }).then((response) => {
          response.json().then((res_data) => {
            if (res_data.isUsernameTaken) {
              this.error_label_text = "Username already taken";
              this.error_label_visible = true;
            } else {
              this.error_label_visible = false;
            }
          });
        });
        this.username_field_background_color = "#02008850";
        this.username_field_border_color = "";
      }
    },
    email_field_on_click() {
      if (root.clientHeight < 768 && root.clientWidth < 768) {
        this.password_field_input_opacity = 0;
        this.username_field_input_opacity = 0;

      }
    },
    email_field_on_input(e) {
      if (!e.target.value.match(email_regex)) {
        this.error_label_text = "Invalid email address";
        this.error_label_visible = true;
      } else {
        this.error_label_visible = false;
      }
      this.email_field_background_color = "#02008850";
      this.email_field_border_color = "";
    },
  },
};
</script>

<template>
  <Background />
  <MobileBackground />
  <AuroraLogo v-if="!virtual_keyboard_visible" id="logo" />
  <Transition name="fade_in">
    <Label
      v-if="!error_label_visible && !virtual_keyboard_visible"
      id="primary_l"
      color="#888"
      v-text="'Create New Account'"
      :style="'height: ' + dynamic_error_label_height"
    ></Label>
    <Label
      v-if="error_label_visible"
      id="error_l"
      color="#FF0040"
      v-text="error_label_text"
      :style="'height: ' + dynamic_error_label_height"
    ></Label>
  </Transition>
  <NewPasswordReqIndi
    id="length_req_indi"
    :color="password_length_req_l_color"
    :height="dynamic_password_req_label_height"
    v-text="'at least 8 characters'"
    :style="'opacity: ' + password_field_input_opacity"
  />
  <NewPasswordReqIndi
    id="number_req_indi"
    :color="password_number_req_l_color"
    :height="dynamic_password_req_label_height"
    v-text="'at least a number'"
    :style="'opacity: ' + password_field_input_opacity"
  />
  <NewPasswordReqIndi
    id="uppercase_letter_req_indi"
    :color="password_uppercase_req_l_color"
    :height="dynamic_password_req_label_height"
    v-text="'at least an uppercase letter'"
    :style="'opacity: ' + password_field_input_opacity"
  />
  <NewPasswordReqIndi
    id="special_char_letter_req_indi"
    :color="password_special_char_req_l_color"
    :height="dynamic_password_req_label_height"
    v-text="'at least a special character'"
    :style="'opacity: ' + password_field_input_opacity"
  />
  <form @submit="onSubmit" action="/genesis_post" method="post">
    <InputField
      autofocus
      id="username_new_account_field"
      autocomplete="username"
      name="username"
      type="text"
      :style="
        'background-color: ' +
        username_field_background_color +
        '; border-color: ' +
        username_field_border_color +
        '; height: ' +
        dynamic_input_field_height +
        ';opacity: ' +
        username_field_input_opacity
      "
      @input="username_field_on_input"
      @click="username_field_on_click"
    ></InputField>
    <InputFieldLabel
      id="username_l"
      label="Username>\\"
      for="username_new_account_field"
      :style="'opacity: ' + username_field_input_opacity"
    ></InputFieldLabel>

    <InputField
      id="email_new_account_field"
      autocomplete="email"
      name="email"
      type="text"
      :style="
        'background-color: ' +
        email_field_background_color +
        '; border-color: ' +
        email_field_border_color +
        '; height: ' +
        dynamic_input_field_height +
        ';opacity: ' +
        email_field_input_opacity
      "
      @input="email_field_on_input"
      @click="email_field_on_click"
    ></InputField>
    <InputFieldLabel
      id="email_l"
      label="Email>\\"
      for="email_new_account_field"
      :style="'opacity: ' + email_field_input_opacity"
    ></InputFieldLabel>

    <InputField
      id="password_new_account_field"
      autocomplete="new-password"
      name="password"
      type="password"
      :style="
        'background-color: ' +
        password_field_background_color +
        '; border-color: ' +
        password_field_border_color +
        '; height: ' +
        dynamic_input_field_height +
        ';opacity: ' +
        password_field_input_opacity
      "
      @input="new_password_on_input"
      @click="password_field_on_click"
    ></InputField>
    <InputFieldLabel
      id="password_l"
      label="Passwod>\\"
      for="password_new_account_field"
      :style="'opacity: ' + password_field_input_opacity"
    ></InputFieldLabel>

    <div v-if="!virtual_keyboard_visible" id="m_ln_0"></div>
    <div :style="'height: ' + dynamic_button_height" id="m_ln_1"></div>
    <LoginButton
      class="btn_size"
      id="genesis_btn"
      text="Create Account"
      type="submit"
      :style="'height:' + dynamic_button_height"
    ></LoginButton>
  </form>
  <VultureConnectivityDecoDesktop
    v-if="!virtual_keyboard_visible"
    id="dk_deco"
  />
  <MobileVultureConnectivityDecoDesktop
    v-if="!virtual_keyboard_visible"
    id="m_deco"
  />
  <LoginButton
    class="btn_size"
    @click="redirect('login')"
    id="login_btn"
    text="Login"
    :style="'height:' + dynamic_button_height"
  ></LoginButton>
</template>

<style scoped>
.fade_in-enter-active,
.fade_in-leave-active {
  transition: opacity linear 0.1s;
}
.fade_in-enter-from,
.fade_in-leave-to {
  opacity: 0;
}
#logo {
  top: 15%;
  left: 20%;
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
#password_new_account_field {
  top: 50%;
  left: 20%;
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
#primary_l,
#error_l {
  font-size: 1vw;
  background-color: #1100aa30;
  border-left: solid 1px #1100aa;
  width: 12%;
  height: 4%;
  top: 24%;
  left: 20%;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 0.3%;
}
#error_l {
  background-color: #ff004030;
  border-left: solid 1px #ff0040;
  width: 15%;
}
@media only screen and (max-width: 768px) {
  #logo {
    top: 4.53125%;
    left: 17.222222222%;
  }
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
  #password_new_account_field {
    top: 23.125%;
    left: 16.944444444%;
    width: 65.279611111%;
  }
  #email_new_account_field {
    top: 35.625%;
  }
  #password_new_account_field {
    top: 48.4375%;
  }
  #primary_l,
  #error_l {
    top: 14%;
    left: 16.944444444%;
    font-size: 3.9vw;
    width: 66.79611111%;
    height: 4%;
    padding: 0;
    justify-content: center;
    align-items: center;
    border: none;
    border-bottom: solid 1px #10a;
  }
  #error_l {
    border-bottom: solid 1px #ff0040;
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
  @media only screen and (max-height: 550px) {
    #primary_l,
    #error_l {
      top: 5%;
    }
    #username_l,
    #email_l,
    #password_l {
      top: 20%;
    }
    #username_new_account_field,
    #email_new_account_field,
    #password_new_account_field {
      top: 30%;
    }
    #genesis_btn,
    #login_btn,
    #m_ln_1 {
      top: 85%;
    }
    #length_req_indi,
    #number_req_indi,
    #uppercase_letter_req_indi,
    #special_char_letter_req_indi {
      top: calc(52% - 2%);
    }
    #number_req_indi {
      top: calc(60% - 2%);
    }
    #uppercase_letter_req_indi {
      top: calc(68% - 2%);
    }
    #special_char_letter_req_indi {
      top: calc(76% - 2%);
    }
  }
}
</style>