<script setup>
import Background from "@/components/BaseBackgroundImg.vue";
import MobileBackground from "@/components/MobileBaseBackgroundImg.vue";
import Label from "@/components/Label.vue";
import DistanceIndicator from "@/components/AT_BaseDistanceIndi.vue";
import LoginRequestOverlay from "@/components/LoginRequestOverlay.vue";
import Overview from "@/components/TheAdvancedTelemetryOverview.vue";
import VultureLogo from "@/components/VultureLogo.vue";
import UserDropdownMenu from "@/components/UserDropdownMenu.vue";
import Menu from "@/components/AT_Menu.vue";
import MobileNav from "@/components/M_AT_Nav.vue";
import Dynamics from "@/components/AT_Dynamics.vue";
import { io } from "socket.io-client";
</script>

<script>
window.onpageshow = () => {
  sessionStorage.setItem("wid", "/advanced_telemetry");
};

function getCookie(name) {
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
      selected_vulture_vid: "",
      vulture_status_array: "",
      isMobile: false,
      window_manager: {
        visible_window_id: "overview",
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
    MinimizedMenuButtonOnClickHandler(args) {
      this.window_manager.visible_window_id = args.btn_id;
    },
    vulture_system_selected_handler(args) {
      this.window_manager.visible_window_id = args.sys_id;
    },
    m_SecondaryMenuButtonOnClick_handler(visibility_status) {
      this.mobile.overview_isSecondarySectionVisible = visibility_status;
    },
    MenuButtonOnClickHandler(btn_id) {
      this.mobile.overview_active_section_id = btn_id;
    },
    m_menu_onVisibilityChange_handler(m_menu_visibility_status) {
      this.mobile.isMenuVisible = m_menu_visibility_status;
    },
    update_isMobile() {
      // device detection
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
          navigator.userAgent
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          navigator.userAgent.substr(0, 4)
        )
      ) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      } //thx stackoverflow
    },
    visibility_status_update_handler(visibility_status_update) {
      this.login_req_details_obj.isVisible = visibility_status_update;
    },
    new_selected_vulture_vid_handler(obj) {
      if (this.selected_vulture_vid != "" && this.isMobile) {
        this.$refs.MobileNavRef.secondary_menu_btn_onClick(); //don't trigger secondary_menu_btn_onClick if this is the auto vulture selection on load
      }
      this.selected_vulture_vid = obj.vid;
      this.last_unix = 0;
      this.vulture_connection.status = null;
    },
  },
  mounted() {
    this.update_isMobile();
    window.onresize = () => {
      this.update_isMobile();
    };

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

      ///-- Vulture Hardware Status Management --///
      socket.on("hardware_status", (hardware_status_payload) => {
        this.vulture_hardware_status_obj = hardware_status_payload;
      });

      ///-- Selected Vulture Connection Status Management --///
      setInterval(() => {
        socket.emit("req_vulture_connection_vitals", {
          ath: getCookie("adv_tele_sio_ath"),
          vid: this.selected_vulture_vid,
        });
        this.signal_emit_last_unix = Date.now();
      }, 200);

      setInterval(() => {
        if (Math.abs(Date.now() - this.vulture_connection.last_unix) > 600) {
          this.vulture_connection.status = false;
        }
      }, 500);

      socket.on("vulture_connection_vitals_res", (connection_vitals) => {
        if (connection_vitals.vid == this.selected_vulture_vid) {
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
  <Background />
  <MobileBackground />

  <div
    id="overview_container"
    v-show="window_manager.visible_window_id == 'overview'"
  >
    <VultureLogo v-if="!isMobile" id="vulture_logo" />
    <Label
      v-if="!isMobile"
      id="adv_tele_l"
      v-text="'\\\\Advanced Telemetry'"
      color="#FFF"
    ></Label>
    <Overview
      v-show="!login_req_details_obj.isVisible && !mobile.isMenuVisible"
      :socket_ref="socket_ref"
      :current_user_acid="`${getCookie('acid')}`"
      :vulture_connection_status="vulture_connection.status"
      :vulture_hardware_status_obj="vulture_hardware_status_obj"
      :m_active_section_id="mobile.overview_active_section_id"
      :m_isSecondarySectionVisible="mobile.overview_isSecondarySectionVisible"
      :isMobile="isMobile"
      @new_selected_vulture_vid="new_selected_vulture_vid_handler"
      @onVultureSystemSelected="vulture_system_selected_handler"
    ></Overview>
    <UserDropdownMenu
      ref="UserDropdownMenuRef"
      v-if="!isMobile"
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
        window_manager.visible_window_id == 'dynamics'
      "
      :current_user_un="current_user_un"
    ></Dynamics>
    <Menu
      :vulture_connection_status="vulture_connection.status"
      :vulture_hardware_status_obj="vulture_hardware_status_obj"
      @MinimizedMenuButtonOnClick="MinimizedMenuButtonOnClickHandler"
    />
  </div>

  <MobileNav
    @m_menu_onVisibilityChange="m_menu_onVisibilityChange_handler"
    @m_SecondaryMenuButtonOnClick="m_SecondaryMenuButtonOnClick_handler"
    @MenuButtonOnClick="MenuButtonOnClickHandler"
    v-if="isMobile"
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
}
</style>