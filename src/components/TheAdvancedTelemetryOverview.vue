<script setup>
import VultureSelectorList from "@/components/AT_VultureSelectorList.vue";
import OverviewButton from "@/components/AT_OverviewButton.vue";
import Label from "@/components/Label.vue";
</script>

<script>
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export default {
  props: {
    socket_ref: "",
    current_user_acid: "",
  },
  data() {
    return {
      vulture_array_status: "",
    };
  },
  methods: {
    new_target_vid_sig_handler(pvid, vid){
      this.socket_ref.emit('new_target_vid', {ath: getCookie('adv_tele_sio_ath'), pvid: pvid, vid: vid});
    }
  },
  mounted() {
    this.socket_ref.on('sonar_telemetry_pkg_rebound', sonar_telemetry_pkg => {
      console.log(sonar_telemetry_pkg)
    });
    this.socket_ref.on("refresh_vulture_array_status_sig", () => {
      this.socket_ref.emit("req_vulture_array_status", {
        origin: "adv_tele",
        ath: getCookie("adv_tele_sio_ath"),
        acid: this.current_user_acid,
      });
    });

    this.socket_ref.emit("req_vulture_array_status", {
      origin: "adv_tele",
      ath: getCookie("adv_tele_sio_ath"),
      acid: this.current_user_acid,
    });

    this.socket_ref.on("vulture_array_status_res", (res) => {
      this.vulture_array_status = res.vulture_array_status;
    });
  },
};
</script>

<template>
  <div id="system_overview_container">
    <OverviewButton
      id="sonar_array_overview_btn"
      system_label="SONAR ARRAY"
      stroke="#00FFF0"
    ></OverviewButton>
    <OverviewButton
      id="power_overview_btn"
      system_label="POWER"
      stroke="#00FFF0"
    ></OverviewButton>
    <OverviewButton
      id="propulsion_overview_btn"
      system_label="PROPULSION"
      stroke="#00FFF0"
    ></OverviewButton>
    <OverviewButton
      id="dynamics_overview_btn"
      system_label="DYNAMICS"
      stroke="#00FFF0"
    ></OverviewButton>
    <OverviewButton
      id="optical_array_overview_btn"
      system_label="OPTICAL ARRAY"
      stroke="#00FFF0"
    ></OverviewButton>
    <OverviewButton
      id="autonomy_overview_btn"
      system_label="AUTONOMY"
      stroke="#00FFF0"
    ></OverviewButton>
    <OverviewButton
      id="nav_overview_btn"
      system_label="NAVIGATION"
      stroke="#00FFF0"
    ></OverviewButton>
    <OverviewButton
      id="network_overview_btn"
      system_label="NETWORK"
      stroke="#00FFF0"
    ></OverviewButton>
  </div>
  <div id="ln_container">
    <div id="vulture_selector_ln_0" class="ln ln_h"></div>
    <div id="vulture_selector_ln_1" class="ln ln_h"></div>
    <div id="vulture_selector_ln_2" class="ln ln_v"></div>
    <div id="vulture_selector_ln_3" class="ln ln_v"></div>
    <div id="vulture_selector_ln_4" class="ln ln_v"></div>
    <div id="vulture_selector_ln_5" class="ln ln_h"></div>
    <div id="vulture_selector_ln_6" class="ln ln_h"></div>
  </div>
  <div id="vulture_selector_container">
    <VultureSelectorList
      @new_target_vid_sig="new_target_vid_sig_handler"
      :id="'vulture_selector_list'"
      :vulture_array_status="vulture_array_status"
    />
    <Label id="vulture_selector_l" v-text="'Vulture Selector'" color="#FFF"></Label>
    <Label id="vulture_selector_legend_unavailable" class="vulture_selector_legend_x" v-text="'Unavailable'" color="#585858"></Label>
    <Label id="vulture_selector_legend_fault" class="vulture_selector_legend_x" v-text="'Requires Attention'" color="#FF006B"></Label>
    <Label id="vulture_selector_legend_ready" class="vulture_selector_legend_x" v-text="'Ready'" color="#0500FF"></Label>
    <Label id="vulture_selector_legend_active" class="vulture_selector_legend_x" v-text="'Active'" color="#00FFF0"></Label>
  </div>
</template>
<style scoped>
.vulture_selector_legend_x{
  font-size: 0.8vw;
  top: 39.877777778%;
}
#vulture_selector_legend_unavailable{
  border-top: solid 2px #585858;
  left: 3.958333333%;
}
#vulture_selector_legend_fault{
  border-top: solid 2px #FF006B;
  left: 8.177083333%;
}
#vulture_selector_legend_ready{
  border-top: solid 2px #0500FF;
  left: 14.791666667%;
}
#vulture_selector_legend_active{
  border-top: solid 2px #00FFF0;
  left: 17.291666667%;
}
#vulture_selector_l{
  top: 14.351851852%;
  left: 0.78125%;
}
.ln {
  position: absolute;
  background-color: #2c2c2c;
}
.ln_v{
  width: 0.11vh;
}
.ln_h{
  height: 0.11vh;
}
#vulture_selector_ln_0 {
  top: 12.685185185%;
  left: 1.041666667%;
  width: 21.666666667%;
}
#vulture_selector_ln_1 {
  top: 12.685185185%;
  left: 23.723958333%;
  width: 2.083333333%;
}
#vulture_selector_ln_2{
  top: 12.685185185%;
  left: 24.739583333%;
  height: 1.851851852%;
}
#vulture_selector_ln_3{
  top: 16.481481481%;
  left: 24.739583333%;
  height: 22.314814815%;
}
#vulture_selector_ln_4{
  top: 40.601851852%;
  left: 24.739583333%;
  height: 3.703703704%;
}
#vulture_selector_ln_5{
  top: 42.407407407%;
  left: 23.75%;
  width: 1.041666667%;
}
#vulture_selector_ln_6{
  top: 42.407407407%;
  left: 1.041666667%;
  width: 21.666666667%;
}
#overview_l {
  top: -4.820627803%;
  left: 0;
  font-size: 1.2vw;
}
#system_overview_container {
  position: absolute;
  top: 12.777777778%;
  left: 25.989583333%;
  width: 73.90625%;
  height: 82.592592593%;
}
#sonar_array_overview_btn,
#nav_overview_btn,
#network_overview_btn,
#optical_array_overview_btn {
  top: 6.502242152%;
  left: 68.217054264%;
}
#dynamics_overview_btn,
#power_overview_btn,
#autonomy_overview_btn,
#propulsion_overview_btn {
  top: 6.502242152%;
  left: calc(32.769556025% + 10%);
}
#nav_overview_btn,
#power_overview_btn {
  top: calc(6.502242152% + (17.040358745% * 1));
}
#network_overview_btn,
#propulsion_overview_btn {
  top: calc(6.502242152% + (17.040358745% * 2));
}
#optical_array_overview_btn,
#autonomy_overview_btn {
  top: calc(6.502242152% + (17.040358745% * 3));
}
</style>