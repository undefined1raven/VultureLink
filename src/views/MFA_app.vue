

<script setup>
import Background from "@/components/BaseBackgroundImg.vue";
import Label from "@/components/Label.vue";
import OptionsButton from "@/components/MfaOptionsButton.vue";
import ActionStatus from "@/components/DesktopActionStatusIndicator.vue";
</script>

<script>
export default {
    data(){
        return{
            action_status_color: '0500F0'
        }
    }
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
    :text="'Check your Vulture App for the Login Request notification, and then tap ‘Approve’'"
    v-if="!backup_code_mode"
  ></Label>
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
div {
  user-select: none;
}
#primary_label {
  top: 29.814814815%;
  left: 39.479166667%;
}
#description_l {
  top: 35.740740741%;
  left: 39.479166667%;
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