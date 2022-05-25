<script setup>
import Background from "@/components/BaseBackgroundImg.vue";
import AuroraLogo from "@/components/AuroraLogo.vue";
import Label from "@/components/Label.vue";
import OptionsButton from "@/components/MfaOptionsButton.vue";
import ActionStatus from "@/components/ActionStatusIndicator.vue";
import MfaTotpInput from "@/components/TheMfaTotpInput.vue";
import MobileBackground from "@/components/MobileBaseBackgroundImg.vue";

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
let root = document.documentElement;

export default {
  data() {
    return {
      action_status_color: "0500F0",
      options_visible: false,
      backup_code_mode: false,
      backup_code_option_btn_l: "Use a backup code",
      dynamic_input_field_height: "",
      dynamic_status_indicator_height: "",
      non_fields_visibile: true,
    };
  },
  methods: {
    onResize() {
      if (root.clientHeight < 900 && root.clientWidth < 600) {
        if (root.clientHeight < 550) {
          this.non_fields_visibile = false;
        } else {
          this.non_fields_visibile = true;
        }
        this.dynamic_input_field_height = `${(53 * 100) / root.clientHeight}%`;
        this.dynamic_status_indicator_height = `${
          (103 * 100) / root.clientHeight
        }%`;
      } else {
        this.dynamic_input_field_height = "4.537037037%";
        this.dynamic_status_indicator_height = `12.184259259%`;
      }
    },
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
    redirect(path) {
      if (path != "MFA_app") {
        window.location.pathname = path;
      } else {
        if (root.clientWidth > 768) {
          //don't redirect mobile users to MFA app since that option isn't available for mobile
          window.location.pathname = path;
        }
      }
    },
  },
  mounted() {
    if (sessionStorage.getItem("TOTP_redi_type") == "true") {
      this.backup_code_reflex();
    }
    sessionStorage.removeItem("TOTP_redi_type");
    window.onresize = () => {
      this.onResize();
    };
  },
};
</script>

<template>
  <Background />
  <MobileBackground />
  <div v-if="non_fields_visibile" id="logo_bkg">
    <AuroraLogo id="logo" />
  </div>
  <Label
    v-if="non_fields_visibile"
    id="primary_label"
    color="#FFF"
    text="Multi Factor Auth"
  ></Label>
  <Label
    class="fs_1vw"
    id="description_l"
    color="#FFF"
    :text="'Check your authenticator app for the 6-digit code'"
    v-if="!backup_code_mode && non_fields_visibile"
  ></Label>
  <Label
    id="description_l0"
    color="#FFF"
    class="fs_1vw"
    text="Enter one of the recovery codes provided when you enabled MFA to your account"
    v-if="backup_code_mode && non_fields_visibile"
  ></Label>

  <div id="option_btns_container" v-if="options_visible && non_fields_visibile">
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
    v-if="!options_visible && non_fields_visibile"
    id="options_container_switch_btn"
    label="Show more authentication methods"
    @click="switch_options_visibility"
  ></OptionsButton>

  <ActionStatus
    id="MFA_TOTP_success_indi"
    class="action_status_indi"
    :fill="'#' + action_status_color + '20'"
    :stroke="'#' + action_status_color"
    :style="'height: ' + dynamic_status_indicator_height"
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
      :style="'height: ' + dynamic_input_field_height"
    ></MfaTotpInput>
    <MfaTotpInput
      autofocus
      id="backup_code_input"
      @input="assess_backup_code"
      name="backup_code"
      type="text"
      placeholder="_____________"
      v-if="backup_code_mode"
      :style="'height: ' + dynamic_input_field_height"
    ></MfaTotpInput>
  </form>

  <div v-if="non_fields_visibile" id="line_container">
    <div id="ln_0" class="ln"></div>
    <div id="ln_1" class="ln"></div>
  </div>
</template>

<style scoped>
#logo {
  width: 80%;
  height: 60%;
}
#logo_bkg {
  position: absolute;
  top: 17%;
  left: 50%;
  background-color: #0500ff20;
  border-bottom: solid 1px #0500ff;
  width: 21.822916667%;
  height: 10%;
  transform: translate(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.fs_1vw {
  font-size: 1vw;
}
.action_status_indi {
  width: 15%;
  height: 12.184259259%;
}
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
@media only screen and (max-width: 768px) {
  #backup_code_input {
    font-size: 6.7vw;
    letter-spacing: 0.8vw;
  }
  #security_key_option_btn,
  #backup_code_option_btn {
    top: calc(81.851851852% + 1.9%);
    left: calc(10% + 14.9%);
  }
  #vulture_app_option_btn,
  #recover_account_option_btn {
    top: calc(81.851851852% + 1.9%);
    left: calc(60% + 14.9%);
    text-align: center;
  }
  #backup_code_option_btn,
  #recover_account_option_btn {
    top: calc(90.036296296% + 1.9%);
  }
  #vulture_app_option_btn {
    color: #555;
    border: solid 1px #222;
  }
  #vulture_app_option_btn:hover {
    background-color: #000aff00;
  }
  #options_container_switch_btn {
    top: 88%;
    width: 80%;
    height: 6%;
  }
  #action_status_indi {
    top: 45%;
    left: 50%;
    transform: translate(-50%);
  }
  #ln_0 {
    top: 21.5625%;
  }
  #ln_1 {
    top: 82%;
  }
  #primary_label {
    font-size: 4.4vw;
    left: 2%;
    top: 23.26875%;
  }
  #description_l,
  #description_l0 {
    top: 29%;
    font-size: 4.3vw;
    left: 2%;
  }
  #description_l0 {
    width: 80%;
  }
  .ln {
    width: 100%;
    left: 0;
  }
  #logo_bkg {
    top: 11.5625%;
    width: 100%;
    height: 10%;
  }
  #TOTP_input,
  #backup_code_input {
    top: 40%;
  }
  @media only screen and (max-height: 550px) {
    #TOTP_input,
    #backup_code_input {
      top: 20%;
    }
    #action_status_indi {
      top: 70%;
    }
  }
}
</style>

<style>
div {
  user-select: none;
}
</style>