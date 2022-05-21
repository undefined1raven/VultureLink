<script setup>
import Background from "@/components/BaseBackgroundImg.vue";
import Label from "@/components/Label.vue";
import MfaTotpInput from "@/components/TheMfaTotpInput.vue";
import ActionStatus from "@/components/DesktopActionStatusIndicator.vue";
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
          e.target.value = '';
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
    };
  },
  methods: {
    assess_input(e) {
      const input = e.target.value;
      if (input.length > 5) {
        this.action_status_color = MFA_TOTP_fetch_handle(e, input, "", this);
      }
    },
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
  ></Label>
  <form id="MFA_TOTP_form" action="/MFA_TOTP_post" method="POST">
    <MfaTotpInput
      @input="assess_input"
      name="token_value"
      placeholder="------"
    ></MfaTotpInput>
  </form>
  <ActionStatus
    id="MFA_TOTP_success_indi"
    :fill="'#' + action_status_color + '20'"
    :stroke="'#' + action_status_color"
  ></ActionStatus>

  <div id="line_container">
    <div id="ln_0" class="ln"></div>
    <div id="ln_1" class="ln"></div>
  </div>
</template>

<style scoped>
#MFA_TOTP_success_indi {
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