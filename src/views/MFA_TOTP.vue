<script setup>
import Background from "@/components/BaseBackgroundImg.vue";
import Label from "@/components/Label.vue";
import OptionsButton from "@/components/MfaOptionsButton.vue";
import ActionStatus from "@/components/DesktopActionStatusIndicator.vue";
import MfaTotpInput from "@/components/TheMfaTotpInput.vue";

document.title = "Vulture//MFA";
</script>

<script>
function MFA_TOTP_fetch_handle(e, token, backup_code, this_ref) {
  fetch("/MFA_TOTP_post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      backup_code: backup_code,
    }),
  }).then((res) => {
    res.json().then((data) => {
      console.log(data);
      if (!data.response) {
        this_ref.action_status_color = "FF006B";
        setTimeout(() => {
          this_ref.action_status_color = "0500F0";
          e.target.value = "";
        }, 500);
      } else {
        setTimeout(() => {
          this_ref.action_status_color = "00FFF0";
          window.location.pathname = data.target_path;
        }, 500);
      }
    });
  });
}

export default {
  data() {
    return {
      action_status_color: "0500F0",
      options_visible: false,
      backup_code_mode: false,
      backup_code_option_btn_l: "Use a backup code",
    };
  },
  methods: {
    assess_input(e) {
      const input = e.target.value;
      if (input.length > 5) {
        MFA_TOTP_fetch_handle(e, input, "", this);
      }
    },
    assess_backup_code(e) {
      const backup_code = e.target.value;
      if (backup_code.length > 12) {
        MFA_TOTP_fetch_handle(e, "", backup_code, this);
      }
    },
    switch_options_visibility() {
      this.options_visible = !this.options_visible;
    },
    backup_code_reflex() {
      this.backup_code_mode = !this.backup_code_mode;
      if (this.backup_code_mode) {
        this.backup_code_option_btn_l = "Use your authenticator app";
        setTimeout(() => {
          document.getElementById("backup_code_input").focus();
        }, 50);
      } else {
        this.backup_code_option_btn_l = "Use a backup code";
        setTimeout(() => {
          document.getElementById("TOTP_input").focus();
        }, 50);
      }
    },
    redirect(path){
      window.location.pathname = path;
    }
  },
};
</script>

<template>
  <Background />
  <Label
    id="primary_label"
    color="#FFF"
    fontSize="1.1vw"
    text="Multi Factor Auth"
  ></Label>
  <Label
    id="description_l"
    color="#FFF"
    fontSize="1vw"
    :text="'Check your authenticator app for the 6-digit code'"
    v-if="!backup_code_mode"
  ></Label>
  <Label
    id="description_l0"
    color="#FFF"
    fontSize="1vw"
    text="Enter one of the recovery codes provided when you enabled MFA to your account"
    v-if="backup_code_mode"
  ></Label>

  <div v-if="options_visible">
    <OptionsButton
      id="security_key_option_btn"
      label="Use a Security Key"
    ></OptionsButton>
    <OptionsButton
      id="vulture_app_option_btn"
      label="Send a notification to the Vulture App"
      @click="redirect('MFA_app')"
    ></OptionsButton>
    <OptionsButton
      id="backup_code_option_btn"
      :label="backup_code_option_btn_l"
      @click="backup_code_reflex"
    ></OptionsButton>
    <OptionsButton
      id="recover_account_option_btn"
      label="Recover your account"
    ></OptionsButton>
  </div>

  <OptionsButton
    v-if="!options_visible"
    id="options_container_switch_btn"
    label="Show more authentication methods"
    @click="switch_options_visibility"
  ></OptionsButton>

  <ActionStatus
    id="MFA_TOTP_success_indi"
    :fill="'#' + action_status_color + '20'"
    :stroke="'#' + action_status_color"
  ></ActionStatus>

  <form id="MFA_TOTP_form" action="/MFA_TOTP_post" method="POST">
    <MfaTotpInput
      autofocus
      id="TOTP_input"
      @input="assess_input"
      name="token_value"
      placeholder="------"
      type="number"
      v-if="!backup_code_mode"
    ></MfaTotpInput>
    <MfaTotpInput
      autofocus
      id="backup_code_input"
      @input="assess_backup_code"
      name="backup_code"
      type="text"
      placeholder="_____________"
      v-if="backup_code_mode"
    ></MfaTotpInput>
  </form>

  <div id="line_container">
    <div id="ln_0" class="ln"></div>
    <div id="ln_1" class="ln"></div>
  </div>
</template>

<style scoped>
#backup_code_input {
  font-size: 1.3vw;
  letter-spacing: 0.3vw;
}
#options_container_switch_btn {
  top: 72.314814815%;
  left: 50%;
  transform: translate(-50%);
  width: 16.770833333%;
  height: 4.537037037%;
}
#security_key_option_btn,
#backup_code_option_btn {
  top: 71.851851852%;
  left: calc(39.0625% + 5.35%);
}
#vulture_app_option_btn,
#recover_account_option_btn {
  top: 71.851851852%;
  left: calc(50.260416667% + 5.3%);
  text-align: center;
}
#backup_code_option_btn,
#recover_account_option_btn {
  top: 79.036296296%;
}
#MFA_TOTP_success_indi {
  top: 54.537037037%;
  left: 50%;
  transform: translate(-50%);
}
#primary_label {
  top: 29.814814815%;
  left: 39.479166667%;
}
#description_l,
#description_l0 {
  top: 35.740740741%;
  left: 39.479166667%;
}
#description_l0 {
  width: 20%;
}
.ln {
  position: absolute;
  left: 39.0625%;
  width: 21.822916667%;
  background-color: #0500ff;
  height: 0.11vh;
}
#ln_0 {
  top: 27.592592593%;
}
#ln_1 {
  top: 70.555555556%;
}
</style>

<style>
div {
  user-select: none;
}
</style>