<script setup lang="ts">
import Background from "@/components/BaseBackgroundImg.vue";
import MobileBackground from "@/components/MobileBaseBackgroundImg.vue";
import BaseLabel from "@/components/BaseLabel.vue";
import DistanceIndicator from "@/components/AT_BaseDistanceIndi.vue";
import LoginRequestOverlay from "@/components/LoginRequestOverlay.vue";
import Overview from "@/components/TheAdvancedTelemetryOverview.vue";
import VultureLogo from "@/components/VultureLogo.vue";
import UserDropdownMenu from "@/components/UserDropdownMenu.vue";
import Menu from "@/components/AT_Menu.vue";
import MobileNav from "@/components/M_AT_Nav.vue";
import Dynamics from "@/components/AT_Dynamics.vue";
import SonarArray from "@/components/AT_SonarArray.vue";

import isMobile from "@/composables/isMobile.ts";

import { io } from "socket.io-client";
</script>

<script lang="ts">
window.onpageshow = () => {
  sessionStorage.setItem("wid", "/advanced_telemetry");
};

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

var socket = io({
  auth: {
    socket_auth_token: getCookie("adv_tele_sio_ath"),
    acid: getCookie("acid"),
  },
  path: "/real-time/",
});

export default {
  data() {
    return {
      login_req_details_obj: {
        timestamp: "",
        location: "",
        platform: "",
        tid: "",
        isVisible: false,
      },
      socket_ref: socket,
      current_user_acid: "",
      current_user_un: "",
      selected_vulture_obj: { default: { vid: "", vn: "" } },
      vulture_status_array: "",
      window_manager: {
        visible_window_id: "overview",
      },
      vulture_telemetry: {
        dynamics: { imu_alpha: {} },
      },
      mobile: {
        isMenuVisible: false,
        overview_active_section_id: 1, //0 == dock status | 1 == vulture status | 2 == vulture systems
        overview_isSecondarySectionVisible: false,
      },
      vulture_connection: {
        status: false,
        last_unix: "",
        signal_emit_last_unix: "",
        latency: "",
      },
      vulture_hardware_status_obj: "",
    };
  },
  methods: {
    onDockSelectedSignalHandler() {
      if (isMobile()) {
        this.$refs.MobileNavRef.secondary_menu_btn_onClick();
      }
    },
    MinimizedMenuButtonOnClickHandler(args: Object) {
      this.window_manager.visible_window_id = args.btn_id;
    },
    vulture_system_selected_handler(args: Object) {
      this.window_manager.visible_window_id = args.sys_id;
    },
    m_SecondaryMenuButtonOnClick_handler(visibility_status: boolean) {
      this.mobile.overview_isSecondarySectionVisible = visibility_status;
    },
    MenuButtonOnClickHandler(btn_id: string) {
      this.mobile.overview_active_section_id = btn_id;
      this.window_manager.visible_window_id = "overview";
    },
    m_menu_onVisibilityChange_handler(m_menu_visibility_status: boolean) {
      this.mobile.isMenuVisible = m_menu_visibility_status;
    },
    visibility_status_update_handler(visibility_status_update) {
      this.login_req_details_obj.isVisible = visibility_status_update;
    },
    new_selected_vulture_obj_handler(obj: Object) {
      if (
        this.selected_vulture_obj.vid != "" &&
        isMobile() &&
        obj.options.isManual
      ) {
        this.$refs.MobileNavRef.secondary_menu_btn_onClick(); //don't trigger secondary_menu_btn_onClick if this is the auto vulture selection on load
      }
      this.selected_vulture_obj = obj;
      this.last_unix = 0;
      this.vulture_connection.status = null;
    },
  },
  mounted() {
    if (getCookie("adv_tele_sio_ath") != undefined) {
      this.current_user_acid = getCookie("acid");
      socket.emit("add_socket_to_acid_room", {
        sid: socket.id,
        acid: this.current_user_acid,
      });

      socket.emit("req_un", {
        origin: "adv_tele",
        ath: getCookie("adv_tele_sio_ath"),
        uid: getCookie("eor"),
      });

      socket.on("un_res", (un) => {
        this.current_user_un = un.username;
      });

      socket.on("sonar_telemetry_pkg_rebound", (payload) => {
        this.sonar_telemetry_obj = payload;
      });

      ///-- Vulture Dynamics Telemetry RX--///
      socket.on("imu_alpha_data_pkg_server_relay", (imu_alpha_data_obj) => {
        this.vulture_telemetry.dynamics.imu_alpha = imu_alpha_data_obj;
      });

      ///-- Vulture Hardware Status Management --///
      socket.on("hardware_status", (hardware_status_payload) => {
        this.vulture_hardware_status_obj = hardware_status_payload;
      });

      ///-- Selected Vulture Connection Status Management --///
      setInterval(() => {
        socket.emit("req_vulture_connection_vitals", {
          ath: getCookie("adv_tele_sio_ath"),
          vid: this.selected_vulture_obj.vid,
        });
        this.signal_emit_last_unix = Date.now();
      }, 200);

      setInterval(() => {
        if (Math.abs(Date.now() - this.vulture_connection.last_unix) > 600) {
          this.vulture_connection.status = false;
        }
      }, 500);

      socket.on("vulture_connection_vitals_res", (connection_vitals) => {
        if (connection_vitals.vid == this.selected_vulture_obj.vid) {
          this.vulture_connection.status = true;
          this.vulture_connection.last_unix = connection_vitals.tx;
        } else {
          this.vulture_connection.last_unix = 0;
          this.vulture_connection.status = null;
        }
      });
      //[][][][][]

      ///-- Socket Auth Failure Signal Handler --///
      socket.on("sio_transport_auth_failed_sig", () => {
        this.$refs.UserDropdownMenuRef.submit_logout_form();
      });
    } else {
      this.$refs.UserDropdownMenuRef.submit_logout_form();
    }
  },
};
</script>

<template>
  <Background v-if="!isMobile()" />
  <MobileBackground v-if="isMobile()" />

  <div
    id="overview_container"
    v-show="window_manager.visible_window_id == 'overview'"
  >
    <VultureLogo v-if="!isMobile()" id="vulture_logo" />
    <BaseLabel
      v-if="!isMobile()"
      id="adv_tele_l"
      v-text="'\\\\Advanced Telemetry'"
      color="#FFF"
    ></BaseLabel>
    <Overview
      v-show="!login_req_details_obj.isVisible && !mobile.isMenuVisible"
      :socket_ref="socket_ref"
      :current_user_acid="`${getCookie('acid')}`"
      :vulture_connection_status="vulture_connection.status"
      :vulture_hardware_status_obj="vulture_hardware_status_obj"
      :m_active_section_id="mobile.overview_active_section_id"
      :m_isSecondarySectionVisible="mobile.overview_isSecondarySectionVisible"
      :isMobile="isMobile()"
      @new_selected_vulture_obj="new_selected_vulture_obj_handler"
      @onVultureSystemSelected="vulture_system_selected_handler"
      @onDockSelectedSignal="onDockSelectedSignalHandler"
    ></Overview>
    <UserDropdownMenu
      ref="UserDropdownMenuRef"
      v-show="!isMobile()"
      :username="current_user_un"
      top="4.259259259%"
      left="85.104166667%"
    />
  </div>

  <LoginRequestOverlay
    :isVisible="login_req_details_obj.isVisible"
    :timestamp="login_req_details_obj.timestamp"
    :location="login_req_details_obj.location"
    :platform="login_req_details_obj.platform"
    :socket_ref="socket_ref"
    :tid="login_req_details_obj.tid"
    :current_user_acid="current_user_acid"
    :login_request_visible="login_req_details_obj.login_request_visible"
    @visibility_status_update="visibility_status_update_handler"
  ></LoginRequestOverlay>
  <div
    v-if="window_manager.visible_window_id != 'overview'"
    id="vulture_system_container"
  >
    <Dynamics
      v-if="
        !login_req_details_obj.isVisible &&
        !mobile.isMenuVisible &&
        window_manager.visible_window_id == 'dynamics' &&
        ((mobile.overview_active_section_id == 2 && isMobile()) || true)
      "
      :telemetry="vulture_telemetry.dynamics"
      :current_user_un="current_user_un"
      :selected_vulture_obj="selected_vulture_obj"
    ></Dynamics>
    <SonarArray
      v-if="
        !login_req_details_obj.isVisible &&
        !mobile.isMenuVisible &&
        window_manager.visible_window_id == 'sonar_array' &&
        ((mobile.overview_active_section_id == 2 && isMobile()) || true)
      "
      :current_user_un="current_user_un"
      :selected_vulture_obj="selected_vulture_obj"
    ></SonarArray>
    <Menu
      v-if="!isMobile()"
      :vulture_connection_status="vulture_connection.status"
      :vulture_hardware_status_obj="vulture_hardware_status_obj"
      :selectedSystemID="window_manager.visible_window_id"
      @MinimizedMenuButtonOnClick="MinimizedMenuButtonOnClickHandler"
      @onVultureSystemSelected="vulture_system_selected_handler"
    />
  </div>

  <MobileNav
    @m_menu_onVisibilityChange="m_menu_onVisibilityChange_handler"
    @m_SecondaryMenuButtonOnClick="m_SecondaryMenuButtonOnClick_handler"
    @MenuButtonOnClick="MenuButtonOnClickHandler"
    v-if="isMobile()"
    ref="MobileNavRef"
  ></MobileNav>
</template>

<style scoped>
#vulture_logo {
  top: 3.888888889%;
  left: 0.885416667%;
}
#adv_tele_l {
  top: 3.888888889%;
  left: 16.73125%;
  height: 4.444444444%;
  width: 11.514583333%;
  background-color: #1100aa30;
  border-left: solid 1px #1100aa;
  display: flex;
  align-items: center;
  padding-left: 0.7%;
  font-size: 1vw;
}
</style>

<style>
.d-flex-standard {
  display: flex;
  align-items: center;
  justify-content: center;
}
.p-abs {
  position: absolute;
}
body {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
  opacity: 0;
  display: none;
}
@media only screen and (max-width: 1370px) and (max-height: 770px) {
  .dynamic-font-weight {
    font-weight: 200;
  }
}
</style>