

<script setup>
import Background from "@/components/BaseBackgroundImg.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import OptionsButton from "@/components/MfaOptionsButton.vue";
import ActionStatus from "@/components/ActionStatusIndicator.vue";
</script>

<script>
setInterval(() => {
  fetch("/MFA_mobile_poll", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ poll_tx: Date.now() }),
  }).then((res) => {
    if (res) {
      res
        .json()
        .then((msg) => {
          if (msg.result == true) {
            this.action_status_color = "00FFF0";
            setTimeout(() => {
                window.location.pathname = msg.redirect_path;
            }, 700);
          }
          if (msg.result == false) {
            this.action_status_color = "FF006B";
            setTimeout(() => {
              window.location.pathname = "/advanced_telemetry";
            }, 700);
          }
        })
        // .catch((e) => {});
    }
  });
}, 1000);

export default {
  data() {
    return {
      action_status_color: "0500F0",
      options_visible: false,
      LastNotificationSentUnix: Date.now(),
      ResendButtonClass: 'disabled_btn',
      resendNotificationTimeout: 12000,
    };
  },
  mounted() {
    setTimeout(() => {
      this.ResendButtonClass = '';
    }, this.resendNotificationTimeout);
  },
  methods: {
    ResendNotificationButtonHandler() {
      if (Math.abs(Date.now() - this.LastNotificationSentUnix) > this.resendNotificationTimeout) {
        fetch("/MFA_app_resend", { method: "POST" }).then((res) => {
          res.json().then(rcvd_json => {
            this.ResendButtonClass = 'disabled_btn';
            setTimeout(() => {
            this.ResendButtonClass = '';
            }, this.resendNotificationTimeout);
          });
        });
      }
    },
    switch_options_visibility() {
      this.options_visible = !this.options_visible;
    },
    TOTP_redirect(path, backup_code_mode) {
      //true === backup code mode; false === TOTP
      sessionStorage.setItem("TOTP_redi_type", backup_code_mode);
      window.location.pathname = path;
    },
  },
};
</script>

<template>
  <Background />
  <BaseLabel id="primary_label" color="#FFF" text="Multi Factor Auth"></BaseLabel>
  <BaseLabel
    id="description_l"
    color="#FFF"
    :text="'Check your Vulture App for the Login Request notification, and then tap ‘Approve’'"
    v-if="!backup_code_mode"
  ></BaseLabel>
  <ActionStatus
    id="MFA_app_success_indi"
    class="action_status_indi"
    :fill="'#' + action_status_color + '20'"
    :stroke="'#' + action_status_color"
  ></ActionStatus>

  <OptionsButton
    @click="ResendNotificationButtonHandler"
    id="resend_notification_btn"
    label="Resend notification"
    :class="ResendButtonClass"
  ></OptionsButton>

  <div v-if="options_visible">
    <OptionsButton
      id="security_key_option_btn"
      label="Use a Security Key"
    ></OptionsButton>
    <OptionsButton
      id="TOTP_option_btn"
      label="Use your authenticator app"
      @click="TOTP_redirect('MFA_TOTP', false)"
    ></OptionsButton>
    <OptionsButton
      id="backup_code_option_btn"
      label="Use a backup code"
      @click="TOTP_redirect('MFA_TOTP', true)"
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

  <div id="line_container">
    <div id="ln_0" class="ln"></div>
    <div id="ln_1" class="ln"></div>
  </div>
</template>
<style scoped>
.action_status_indi {
  width: 15%;
  height: 12.184259259%;
}
div {
  user-select: none;
}
.disabled_btn {
  color: #555 !important;
  background-color: #00126e00 !important;
  border: solid 1px #555 !important;
}
#options_container_switch_btn {
  top: 72.314814815%;
  left: 50%;
  transform: translate(-50%);
  width: 16.770833333%;
  height: 4.537037037%;
  color: #999;
  border: solid 1px #00126e;
  background-color: #00126e00;
}
#options_container_switch_btn:hover {
  background-color: #00126e20;
}
#security_key_option_btn,
#backup_code_option_btn {
  top: 71.851851852%;
  left: 39.0625%;
}
#TOTP_option_btn,
#recover_account_option_btn {
  top: 71.851851852%;
  left: 50.260416667%;
  text-align: center;
}
#backup_code_option_btn,
#recover_account_option_btn {
  top: 79.036296296%;
}
#resend_notification_btn {
  top: 45%;
  left: 50%;
  transform: translate(-50%);
  width: 15%;
  transition: border linear 0.1s, color linear 0.1s, background-color linear 0.1s;
}
#MFA_app_success_indi {
  top: 54.537037037%;
  left: 50%;
  transform: translate(-50%);
}
#primary_label {
  top: 29.814814815%;
  left: 39.479166667%;
}
#description_l {
  top: 35.740740741%;
  left: 39.479166667%;
  width: 20%;
  font-size: 1vw;
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