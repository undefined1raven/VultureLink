<script setup>
import VultureSelector from "@/components/VultureSelector.vue";
import DockSelector from "@/components/DockSelector.vue";
import BaseMenuButton from "@/components/BaseMenuButton.vue";
import Label from "@/components/Label.vue";
import VultureStatus from "@/components/AT_VultureStatus.vue";
import DockStatus from "@/components/AT_DockStatus.vue";
import SystemOverview from "@/components/AT_SystemOverview.vue";
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
    vulture_hardware_status_obj: "",
    m_active_section_id: "",
    isMobile: "",
  },
  data() {
    return {
      vulture_array_status: "",
      dock_array: [],
      relay_station_array: "",
      selected_dock_obj: false,
      docked_vultures_array: [],
      selected_vulture_obj: { vn: "", vid: "" },
      vulture_array_received: false,
    };
  },
  methods: {
    section_visibility_assessor(section_id) {
      //0 == dock status | 1 == vulture status | 2 == vulture systems
      if (this.isMobile) {
        if (this.m_active_section_id == section_id) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    redirect(path) {
      window.location.pathname = path;
    },
    new_target_vid_sig_handler(pvid, _vid) {
      if (this.vulture_array_received) {
        this.selected_vulture_obj = this.vulture_array_status.find(
          ({ vid }) => vid == _vid
        );
        this.$emit("new_selected_vulture_vid", { vid: _vid });
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
    this.socket_ref.emit("req_vulture_array_status", {
      origin: "adv_tele",
      ath: getCookie("adv_tele_sio_ath"),
      acid: this.current_user_acid,
    });

    this.socket_ref.on("refresh_vulture_array_status_sig", () => {
      this.socket_ref.emit("req_vulture_array_status", {
        origin: "adv_tele",
        ath: getCookie("adv_tele_sio_ath"),
        acid: this.current_user_acid,
      });
    });

    this.socket_ref.on("vulture_array_status_res", (res) => {
      this.vulture_array_received = true;
      this.vulture_array_status = res.vulture_array_status;
      this.dynamic_vulture_selector_array_gen();
    });
    //[][][][][]

    ///-- dock array event management --///
    this.socket_ref.emit("req_dock_array", {
      ath: getCookie("adv_tele_sio_ath"),
      origin: "adv_tele",
      acid: this.current_user_acid,
    });
    this.socket_ref.on("dock_array_res", (res) => {
      this.dock_array = res.dock_array;

      ///-- relay station array management --///
      this.socket_ref.emit("req_relay_station_array", {
        origin: "adv_tele",
        ath: getCookie("adv_tele_sio_ath"),
        acid: this.current_user_acid,
        dock_array: res.dock_array,
      });

      this.socket_ref.on("relay_station_array_res", (res) => {
        this.relay_station_array = res.relay_station_array;
      });
    });
    //[][][][][]
  },
};
</script>

<template>
  <div class="advanced_telemetry_overview_container">
    <SystemOverview
      :vulture_connection_status="vulture_connection_status"
      :vulture_hardware_status_obj="vulture_hardware_status_obj"
      v-show="section_visibility_assessor(2)"
    ></SystemOverview>
    <VultureSelector
      @new_target_vid_sig="new_target_vid_sig_handler"
      :id="'vulture_selector_list'"
      :vulture_array_status="docked_vultures_array"
      :isMobile="isMobile"
      v-show="section_visibility_assessor(1)"
    ></VultureSelector>
    <DockSelector
      :vulture_array_status="vulture_array_status"
      :dock_array="dock_array"
      @new_target_dock_id_sig="onDockSelected"
      v-show="section_visibility_assessor(0)"
    ></DockSelector>
    <VultureStatus
      :vulture_connection_status="vulture_connection_status"
      :vulture_array_status="vulture_array_status"
      :selected_vulture_obj="selected_vulture_obj"
      :isMobile="isMobile"
      v-show="section_visibility_assessor(1)"
    ></VultureStatus>
    <DockStatus
      :selected_dock_obj="selected_dock_obj"
      :dock_connection_status="true"
      :relay_station_array="relay_station_array"
      v-show="section_visibility_assessor(0)"
    >
    </DockStatus>
    <div v-if="!isMobile" id="menu_container">
      <div id="menu_ln_container">
        <div id="menu_ln_0" class="ln ln_v"></div>
        <div id="menu_ln_1" class="ln ln_v"></div>
        <div id="menu_ln_2" class="ln ln_h"></div>
        <div id="menu_ln_3" class="ln ln_h"></div>
      </div>

      <BaseMenuButton v-text="'Command'" @click="redirect('/')" id="cmd_btn" />
      <BaseMenuButton
        v-text="'Security'"
        @click="redirect('/security')"
        id="security_btn"
      />
    </div>
  </div>
</template>
<style scoped>
#menu_ln_3 {
  top: 96.944444444%;
  left: 1.041666667%;
  width: 21.666666667%;
}
#menu_ln_1 {
  top: 95.185185185%;
  left: 24.791666667%;
  height: 1.851851852%;
}
#menu_ln_2 {
  top: 96.944444444%;
  left: 23.723958333%;
  width: 2.0833333333333vw;
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
</style>