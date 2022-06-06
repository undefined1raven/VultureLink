<script setup>
import VultureSelector from "@/components/VultureSelector.vue";
import DockSelector from "@/components/DockSelector.vue";
import OverviewButton from "@/components/AT_OverviewButton.vue";
import BaseMenuButton from "@/components/BaseMenuButton.vue";
import Label from "@/components/Label.vue";
import VultureStatus from "@/components/AT_VultureStatus.vue";
import { computed } from "@vue/runtime-core";
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
    vulture_connection_status: "",
  },
  data() {
    return {
      vulture_array_status: "",
      dock_array: [],
      selected_dock_obj: "",
      docked_vultures_array: [],
      selected_vulture_obj: {vn: "", vid: ""},
      vulture_array_received: false,
    };
  },
  methods: {
    redirect(path) {
      window.location.pathname = path;
    },
    new_target_vid_sig_handler(pvid, _vid) {
      if(this.vulture_array_received){
        this.selected_vulture_obj = this.vulture_array_status.find(({vid}) => vid == _vid);
        this.$emit('new_selected_vulture_vid', {vid: _vid});
        this.socket_ref.emit("new_target_vid", {
          ath: getCookie("adv_tele_sio_ath"),
          pvid: pvid,
          vid: _vid,
        });
      }
    },
    onDockSelected(dock_obj) {
      this.selected_dock_obj = dock_obj;
      this.dynamic_vulture_selector_array_gen();
    },
    dynamic_vulture_selector_array_gen() {
      if (this.selected_dock_obj != false) {
        let l_docked_vultures_array = [];
        for (let ix = 0; ix < 4; ix++) {
          if (this.selected_dock_obj.vid_array[ix] != undefined) {
            let find_res = this.vulture_array_status.find(
              ({ vid }) => vid == this.selected_dock_obj.vid_array[ix].vid
            );
            if (find_res != undefined) {
              l_docked_vultures_array.push(find_res);
            }
          } else {
            l_docked_vultures_array.push({ empty: true });
          }
          if (ix == this.selected_dock_obj.vid_array.length - 1) {
            this.docked_vultures_array = l_docked_vultures_array;
          }
        }
      } else {
        this.docked_vultures_array = this.vulture_array_status;
      }
    },
  },
  mounted() {
    this.socket_ref.on("sonar_telemetry_pkg_rebound", (sonar_telemetry_pkg) => {
      // console.log(sonar_telemetry_pkg);
    });

    ///-- vulture array status management --///
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
      this.vulture_array_received = true;
      this.vulture_array_status = res.vulture_array_status;
    });
    //[][][][][]

    ///-- dock array event management --///
    let delta;
    this.socket_ref.emit("req_dock_array", {
      ath: getCookie("adv_tele_sio_ath"),
      origin: "adv_tele",
      acid: this.current_user_acid,
    })
    delta = Date.now();
    this.socket_ref.on("dock_array_res", (res) => {
      this.dock_array = res.dock_array;
      console.log(Math.abs(Date.now() - delta));
    });
    //[][][][][]
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
  <VultureSelector
    @new_target_vid_sig="new_target_vid_sig_handler"
    :id="'vulture_selector_list'"
    :vulture_array_status="docked_vultures_array"
  ></VultureSelector>
  <DockSelector
    :vulture_array_status="vulture_array_status"
    :dock_array="dock_array"
    @new_target_dock_id_sig="onDockSelected"
  ></DockSelector>
  <VultureStatus :vulture_connection_status="vulture_connection_status" :vulture_array_status="vulture_array_status" :selected_vulture_obj="selected_vulture_obj"></VultureStatus>
  <div id="menu_container">
    <div id="menu_ln_container">
      <div id="menu_ln_0" class="ln ln_v"></div>
      <div id="menu_ln_1_2"></div>
      <div id="menu_ln_3" class="ln ln_h"></div>
    </div>
    <BaseMenuButton v-text="'Command'" @click="redirect('/')" id="cmd_btn" />
    <BaseMenuButton
      v-text="'Security'"
      @click="redirect('/security')"
      id="security_btn"
    />
  </div>
</template>
<style scoped>
#menu_ln_3 {
  top: 96.944444444%;
  left: 1.041666667%;
  width: 21.666666667%;
}
#menu_ln_1_2 {
  position: absolute;
  top: calc(95.092592593% - 0.24%);
  left: 23.697916667%;
  width: 1.0416666666667vw;
  height: 1.0416666666667vw;
  border-right: solid 1px #2c2c2c;
  border-bottom: solid 1px #2c2c2c;
}
#menu_ln_0 {
  top: 84.351851852%;
  left: 24.739583333%;
  height: 8.981481481%;
}
#cmd_btn {
  top: 83.148148148%;
  left: 3.645833333%;
}
#security_btn {
  top: 90%;
  left: 3.645833333%;
}
.ln {
  position: absolute;
  background-color: #2c2c2c;
}
.ln_v {
  width: 0.11vh;
}
.ln_h {
  height: 0.11vh;
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