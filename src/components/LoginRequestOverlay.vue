<script setup>
import Label from "@/components/Label.vue";
import ActionStatus from "@/components/ActionStatusIndicator.vue";
</script>

<script>

function unix_tx_formatter(unix_time) {
  let dt = new Date(unix_time);

  return `${("0" + dt.getHours()).slice(-2)}:${("0" + dt.getMinutes()).slice(
    -2
  )}:${("0" + dt.getSeconds()).slice(-2)}:${("0" + dt.getMilliseconds()).slice(
    -3
  )}`;
}

export default {
  data() {
    return {
      action_status_color: "0500F0",
      tid: "",
      location: "",
      timestamp: "",
      platform: "",
      isVisible: "",
    };
  },
  props: {
    current_user_acid: "",
    socket_ref: "",
  },
  mounted() {
    this.socket_ref.on("login_req", (login_req_payload) => {
      this.isVisible = true;
      this.signal_visibility_status_update(true);
      this.tid = login_req_payload.tid;
      this.timestamp = unix_tx_formatter(
        login_req_payload.tx
      );
      this.location = `${login_req_payload.state}, ${login_req_payload.city} [${login_req_payload.iso_code}]`;
      this.platform = `${login_req_payload.os} ${login_req_payload.os_version}`;
    });
  },
  methods: {
    signal_visibility_status_update(isVisible) {
      this.isVisible = isVisible;
      this.$emit("visibility_status_update", isVisible);
    },
    approve_btn_reflex(socket_ref, tid, current_user_acid) {
      socket_ref.emit("login_res", {
        tid: tid,
        acid: current_user_acid,
        user_response: true,
      });
      this.action_status_color = "00FFF0";
      setTimeout(() => {
        this.action_status_color = "0500F0";
        this.signal_visibility_status_update(false);
      }, 700);
    },
    deny_btn_reflex(socket_ref, tid, current_user_acid) {
      socket_ref.emit("login_res", {
        tid: tid,
        acid: current_user_acid,
        user_response: false,
      });
      this.action_status_color = "FF006B";
      setTimeout(() => {
        this.action_status_color = "0500F0";
        this.signal_visibility_status_update(false);
      }, 700);
    },
  },
};
</script>


<template>
  <div v-if="isVisible" id="login_req_container">
    <div id="bkg_darkner"></div>
    <Label
      id="login_request_l"
      color="#FFF"
      text="Login Request Detected"
    ></Label>
    <div id="login_request_details_container">
      <div id="timestamp_container" class="detail_container">
        <div class="x_l">Time:</div>
        <Label
          class="x_acx"
          id="timestamp_acx"
          color="#FFF"
          v-text="timestamp"
        ></Label>
      </div>
      <div id="location_container" class="detail_container">
        <div class="x_l">Location:</div>
        <Label
          class="x_acx"
          id="not_important"
          color="#FFF"
          v-text="location"
        ></Label>
      </div>
      <div id="platform_container" class="detail_container">
        <div class="x_l">Platform:</div>
        <Label
          class="x_acx"
          id="not_important"
          color="#FFF"
          v-text="platform"
        ></Label>
      </div>
    </div>
    <div id="controls_container">
      <div
        id="approve_btn"
        @click="approve_btn_reflex(socket_ref, tid, current_user_acid)"
        class="x_btn"
      >
        Approve
      </div>
      <div
        id="deny_btn"
        @click="deny_btn_reflex(socket_ref, tid, current_user_acid)"
        class="x_btn"
      >
        Deny
      </div>
    </div>
    <ActionStatus
      id="login_request_user_res_feedback_top"
      class="login_request_user_res_feedback_x"
      :fill="'#' + action_status_color + '20'"
      :stroke="'#' + action_status_color"
    ></ActionStatus>
    <ActionStatus
      id="login_request_user_res_feedback_bottom"
      class="login_request_user_res_feedback_x"
      :fill="'#' + action_status_color + '20'"
      :stroke="'#' + action_status_color"
    ></ActionStatus>
  </div>
</template>
<style scoped>
#login_request_user_res_feedback_top {
  top: calc(14.21875% - 11%);
}
#login_request_user_res_feedback_bottom {
  top: calc(75.625% - 7%);
}
.login_request_user_res_feedback_x {
  left: 50%;
  transform: translate(-50%);
  width: 60.666666667%;
  height: 30.09375%;
}
.x_btn {
  position: absolute;
  top: 60.625%;
  width: 40.277777778%;
  height: 6.5625%;
  font-size: 2.1vh;
  font-family: "Titillium Web", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}
#approve_btn {
  left: 4.444444444%;
  color: #00fff0;
  border: solid 1px #00fff0;
  background-color: #00fff020;
}
#approve_btn:focus {
  background-color: #00fff020;
}
#deny_btn {
  left: 53.055555556%;
  color: #ff006b;
  border: solid 1px #ff006b;
  background-color: #ff006b20;
}
#deny_btn:focus {
  background-color: #ff006b20;
}
.x_l {
  position: absolute;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 24.342105263%;
  display: flex;
  align-items: center;
  justify-content: start;
  color: #888;
  font-size: 2vh;
  font-family: "Titillium Web", sans-serif;
}
.x_acx {
  position: absolute;
  top: 0%;
  left: 22%;
  height: 100%;
  width: 78%;
  display: flex;
  align-items: center;
  justify-content: start;
  color: #fff;
  font-size: 2vh;
  font-family: "Titillium Web", sans-serif;
}
#timestamp_acx {
  font-family: "Inconsolata", monospace;
  font-size: 2.1vh;
  font-weight: 600;
}
.detail_container {
  position: absolute;
  left: 7.5%;
  width: 84.444444444%;
  height: 3.59375%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: solid 1px #1300f0;
}
#timestamp_container {
  top: 41.59375%;
}
#location_container {
  top: calc(41.59375% + (5% * 1));
}
#platform_container {
  top: calc(41.59375% + (5% * 2));
}
#bkg_darkner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.50);
}
#login_request_l {
  top: 36.25%;
  left: 7.5%;
}
</style>