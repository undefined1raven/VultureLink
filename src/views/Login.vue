<script setup lang="ts">
import Background from "@/components/BaseBackgroundImg.vue";
import AuroraLogo from "@/components/AuroraLogo.vue";
import BasePrimaryLabel from "@/components/BasePrimaryLabel.vue";
import InputField from "@/components/LoginInputField.vue";
import InputFieldLabel from "@/components/LoginInputFieldLabel.vue";
import LoginButton from "@/components/LoginButton.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import MobileBackground from "@/components/MobileBaseBackgroundImg.vue";

import scale from "@/composables/scale.ts";
import percentage from "@/composables/percentage.ts";
import isMobile from "@/composables/isMobile.ts";
document.title = "Vulture//Login";
</script>

<script lang="ts">
let root = document.documentElement;

export default {
  data() {
    return {
      ini_screen_size: { width: 0, height: 0 },
      user_identifier_field_borderColor: "",
      user_identifier_field_backgroundColor: "",
      password_field_borderColor: "",
      password_field_backgroundColor: "",
      dynamic_input_field_height: "",
      dynamic_input_field_width: "",
      dynamic_button_height: "",
      dynamic_error_label_height: "",
      auth_error_label_visible: false,
      auth_error_actual: "UNK00",
      non_fields_visibile:
        true /*hides all elements that are not input fields except the login button*/,
      isMobile: isMobile(),
    };
  },
  methods: {
    user_identifier_field_onInput(e: Event) {
      if (e.target.value.length > 0) {
        if (root.clientWidth > 1200) {
          this.user_identifier_field_borderColor = "";
          this.user_identifier_field_backgroundColor = "#02008850";
        } else {
          this.user_identifier_field_borderColor = "#0f00bb";
          this.user_identifier_field_backgroundColor = "#02008800";
        }
      }
    },
    password_field_onInput(e: Event) {
      if (e.target.value.length > 0) {
        if (root.clientWidth > 1200) {
          this.password_field_borderColor = "";
          this.password_field_backgroundColor = "#02008850";
        } else {
          this.password_field_borderColor = "#0f00bb";
          this.password_field_backgroundColor = "#02008800";
        }
      }
    },
    onResize() {
      if (this.isMobile) {
        if (root.clientHeight < this.ini_screen_size.height * 0.7) {
          this.non_fields_visibile = false;
        } else {
          this.non_fields_visibile = true;
        }
        this.dynamic_input_field_height = `${percentage(
          scale(70, 640),
          document.documentElement.clientHeight
        )}%`;
        this.dynamic_button_height = `${percentage(
          scale(70, 640),
          root.clientHeight
        )}%`;
        this.dynamic_error_label_height = `${percentage(
          scale(28, 640),
          root.clientHeight
        )}%`;
      } else {
        this.dynamic_input_field_height = "4%";
        this.dynamic_input_field_width = `${percentage(
          scale(482, 1920),
          document.documentElement.clientWidth
        )}%`;
      }
    },
    redirect(path: string) {
      window.location.pathname = path;
    },
    onSubmit(e: Event) {
      e.preventDefault();
      if (e.target.user_identifier.value == "") {
        this.user_identifier_field_borderColor = "#FF006B";
        this.user_identifier_field_backgroundColor = "#FF006B20";
      }
      if (e.target.password.value == "") {
        this.password_field_borderColor = "#FF006B";
        this.password_field_backgroundColor = "#FF006B20";
      }
      if (
        e.target.user_identifier.value != "" &&
        e.target.password.value != ""
      ) {
        fetch("/auth_post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_identifier: e.target.user_identifier.value,
            password: e.target.password.value,
          }),
        }).then((res) => {
          res.json().then((response_data) => {
            if (response_data.result) {
              window.location.pathname = response_data.redirect_path;
            } else {
              this.auth_error_label_visible = true;
              e.target.password.value = "";
              setTimeout(() => {
                this.auth_error_label_visible = false;
              }, 1500);
            }
          });
        });
        // .catch(function c {
        //   this.auth_error_actual = e;
        // });
      }
    },
  },
  mounted() {
    this.ini_screen_size = {
      width: window.screen.availWidth,
      height: window.screen.availHeight,
    };
    window.onresize = () => {
      this.onResize();
    };
  },
};
</script>
 
<template>
  <main>
    <Background />
    <MobileBackground />
    <Transition name="fade_in">
      <BaseLabel
        v-if="!auth_error_label_visible"
        id="primary_label"
        color="#888"
        text="Log in"
      ></BaseLabel>
      <BaseLabel
        v-if="auth_error_label_visible"
        id="auth_error_label"
        color="#FF0040"
        :text="'Auth Failed [' + auth_error_actual + ']'"
        :style="'height: ' + dynamic_error_label_height"
      ></BaseLabel>
    </Transition>
    <AuroraLogo id="logo" v-if="non_fields_visibile" />
    <form @submit="onSubmit" action="/auth_post" method="post">
      <InputField
        autofocus
        id="email_auth_field"
        autocomplete="email"
        name="user_identifier"
        type="text"
        :height="dynamic_input_field_height"
        :style="`width: ${dynamic_input_field_width};`"
        :borderColor="user_identifier_field_borderColor"
        :backgroundColor="user_identifier_field_backgroundColor"
        @input="user_identifier_field_onInput"
        class="login_input_field"
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
        :style="`width: ${dynamic_input_field_width};`"
        :height="dynamic_input_field_height"
        :borderColor="password_field_borderColor"
        :backgroundColor="password_field_backgroundColor"
        class="login_input_field"
        @input="password_field_onInput"
      ></InputField>

      <InputFieldLabel
        id="password_l"
        label="Password"
        for="password_auth_field"
      ></InputFieldLabel>

      <LoginButton
        id="login_btn"
        text="Log In"
        type="submit"
        :height="dynamic_button_height"
      ></LoginButton>
    </form>
    <LoginButton
      @click="redirect('genesis')"
      id="new_account_btn"
      text="Create Account"
      :height="dynamic_button_height"
      v-if="non_fields_visibile"
    ></LoginButton>
  </main>
</template>

<style>
body {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}
</style>

<style scoped>
#primary_label,
#auth_error_label {
  font-size: 2vh;
  background-color: #1100aa30;
  border-left: solid 1px #1100aa;
  width: 6%;
  height: 4%;
  top: 28%;
  left: 20%;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 0.3%;
}
#auth_error_label {
  background-color: #ff004030;
  border-left: solid 1px #ff0040;
  width: 12%;
}
#logo {
  top: 20%;
  left: 20%;
}
#new_account_btn {
  top: 60%;
  left: 20%;
  background-color: #2d00aa30;
  border: solid 1px #2d00aa;
  font-size: 2vh;
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
.fade_in-enter-active,
.fade_in-leave-active {
  transition: opacity linear 0.1s;
}
.fade_in-enter-from,
.fade_in-leave-to {
  opacity: 0;
}
@media only screen and (max-width: 1200px) and (max-height: 900px) and (-webkit-min-device-pixel-ratio: 2) {
  #primary_label {
    display: none;
  }
  #auth_error_label {
    top: 19%;
    left: 19.444444444%;
    font-size: 3.9vw;
    width: 61.388888889%;
    height: 4%;
    padding: 0;
    justify-content: center;
    align-items: center;
    border: none;
    border-top: solid 1px #ff0040;
  }
  #logo {
    top: 4.53125%;
    left: 17.222222222%;
  }
  #email_l {
    top: 25%;
    left: 19.444444444%;
  }
  #password_l {
    top: 36.5625%;
    left: 19.444444444%;
  }
  #email_auth_field {
    top: 28.125%;
    left: 19.444444444%;
  }
  #password_auth_field {
    top: 39.6875%;
    left: 19.444444444%;
  }
  #login_btn {
    top: 56.25%;
    left: 19.444444444%;
  }
  #new_account_btn {
    top: 65.25%;
    left: 19.444444444%;
    background-color: #0000ff00;
  }
  @media only screen and (max-height: 550px) and (max-width: 400px) {
    #auth_error_label {
      top: 10%;
    }
    #email_l {
      top: calc(28.125% + 0% - 6%);
    }
    #password_l {
      top: calc(39.6875% + 13% - 6%);
    }
    #email_auth_field {
      top: calc(28.125% + 0%);
    }
    #password_auth_field {
      top: calc(39.6875% + 13%);
    }
    #login_btn {
      top: 75%;
    }
  }
}
@media only screen and (max-width: 1070px) and (min-height: 550px) and (max-height: 800px) and (-webkit-max-device-pixel-ratio: 2) {
  .login_input_field {
    width: 40%;
  }
  #primary_label {
    width: 20%;
  }
}
@media only screen and (max-width: 1500px) and (min-height: 850px) and (-webkit-max-device-pixel-ratio: 2) {
  .login_input_field {
    width: 40%;
  }
  #primary_label {
    width: 20%;
  }
}
@media only screen and (max-width: 1996.8px) and (min-height: 1200px) and (-webkit-max-device-pixel-ratio: 1) {
  .login_input_field {
    width: 40%;
  }
  #primary_label {
    width: 20%;
  }
}
</style>
