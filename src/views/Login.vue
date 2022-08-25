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
import { restProperty } from "@babel/types";
document.title = "Vulture//Login";
</script>

<script lang="ts">
let root = document.documentElement;

export default {
  data() {
    return {
      ini_screen_size: {width: 0, height: 0},
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
      isMobile: false,
    };
  },
  methods: {
    update_isMobile() {
      // device detection
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
          navigator.userAgent
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          navigator.userAgent.substr(0, 4)
        )
      ) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      } //thx stackoverflow
    },
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
      this.update_isMobile();
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
        this.dynamic_input_field_width = `${percentage(scale(482, 1920), document.documentElement.clientWidth)}%`;
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
  mounted(){
    this.ini_screen_size = {width: window.screen.availWidth, height: window.screen.availHeight};
    this.update_isMobile();
    window.onresize = () => {
      this.onResize();
    };
  },
};
</script>
 
<template>
  <main>
    <Background v-if="!isMobile" />
    <MobileBackground v-if="isMobile" />
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
