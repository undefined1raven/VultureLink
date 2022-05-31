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
    current_user_acid: ""
  },
  data() {
    return {
      vulture_array_status: "",
    };
  },
  mounted() {
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
        console.log(res.vulture_array_status);
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
    <Label id="overview_l" v-text="'Systems Overview'" color="#FFF"></Label>
  </div>
  <div id="vulture_selector_container">
    <VultureSelectorList
      :id="'vulture_selector_list'"
      :vulture_array_status="vulture_array_status"
    />
  </div>
</template>
<style scoped>
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
  border-top: solid 1px #2400ff;
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