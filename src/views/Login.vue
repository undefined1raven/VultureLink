<script setup lang="ts">
import Background from "@/components/BaseBackgroundImg.vue";
import BaseWideLogo from "@/components/BaseWideLogo.vue";
import BasePrimaryLabel from "@/components/BasePrimaryLabel.vue";
import InputField from "@/components/LoginInputField.vue";
import InputFieldLabel from "@/components/LoginInputFieldLabel.vue";
import LoginButton from "@/components/LoginButton.vue";
import MobileBackground from "@/components/MobileBaseBackgroundImg.vue";

document.title = "Vulture//Login";
</script>

<script lang="ts">
let root = document.documentElement;
export default {
  data() {
    return {
      dynamic_input_field_height: "",
      dynamic_button_height: "",
      non_fields_visibile:
        true /*hides all elements that are not input fields except the login button*/,
    };
  },
  methods: {
    compute_input_field_height() {
      if (root.clientHeight < 900 && root.clientWidth < 600) {
        if (root.clientHeight < 550) {
          this.non_fields_visibile = false;
        } else {
          this.non_fields_visibile = true;
        }
        this.dynamic_input_field_height = `${(44 * 100) / root.clientHeight}%`;
        this.dynamic_button_height = `${(40 * 100) / root.clientHeight}%`;
      } else {
        this.dynamic_input_field_height = "4%";
      }
    },
    redirect(path) {
      window.location.pathname = path;
    },
  },
  mounted() {
    window.onresize = () => {
      this.compute_input_field_height();
    };
  },
};
</script>

<template>
  <main>
    <Background></Background>
    <MobileBackground></MobileBackground>
    <Label id="primary_label" text="Additional Security Step"></Label>
    <BaseWideLogo v-if="non_fields_visibile" />
    <form action="/auth_post" method="post">
      <InputField
        autofocus
        id="email_auth_field"
        autocomplete="email"
        name="email"
        type="text"
        :height="dynamic_input_field_height"
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
        :height="dynamic_input_field_height"
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
@media only screen and (max-width: 768px) {
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
    font-size: 3.9vw;
    background-color: #0000ff00;
  }
  @media only screen and (max-height: 400px) {
    #email_l{
      top: calc(28.125% + 0% - 6%);
    }
    #password_l{
      top: calc(39.6875% + 13% - 6%);
    }
    #email_auth_field{
      top: calc(28.125% + 0%);
    }
    #password_auth_field{
      top: calc(39.6875% + 13%);
    }
    #login_btn{
      top: 75%;
    }
  }
}
</style>
