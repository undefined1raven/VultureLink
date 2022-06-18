
<script setup>
import DockDeco from "@/components/DockDeco.vue";
</script>

<script>
export default {
  props: {
    color: "",
    dock_name: "",
    dock_obj: "",
    vulture_array_status: "",
    selected_dock_id: "",
    index: "",
  },
  mounted() {
    if (this.index == 0) {
      // this.$emit("new_target_dock_id_sig", this.dock_obj);
    }
  },
  data() {
    return {
      main_area_background_color_style: "",
      dock_paired_vultures_array: [],
    };
  },
  methods: {
    main_area_onClick() {
      if (this.selected_dock_id != this.dock_obj.dock_id) {
        this.$emit("new_target_dock_id_sig", this.dock_obj);
      } else {
        this.$emit("new_target_dock_id_sig", false);
      }
    },
    main_area_onMouseEnter() {
      this.main_area_background_color_style = `background-color: ${this.color}20;`;
    },
    main_area_onMouseLeave() {
      this.main_area_background_color_style = `background-color: #00000000;`;
    },
    color_from_vulture_status(vulture_status) {
      if (vulture_status == "active") {
        return "#00FFF0";
      }
      if (vulture_status == "ready") {
        return "#0500FF";
      }
      if (vulture_status == "unavailable") {
        return "#585858";
      }
      if (vulture_status == "fault") {
        return "#FF006B";
      }
    },
    color_style_parser(color) {
      return `background-color: ${color}; border-color: ${color};`;
    },
    find_vulture_by_dock_vid_array_elm(index) {
      return this.vulture_array_status.find(
        ({ vid }) => vid == this.dock_obj.vid_array[index].vid
      );
    },
    parse_vulture_array_status(index) {
      this.dock_paired_vultures_array = [];
      if (this.dock_obj.vid_array[index] != undefined) {
        return `background-color: ${this.color_from_vulture_status(
          this.find_vulture_by_dock_vid_array_elm(index).status
        )}; border-color: ${this.color_from_vulture_status(
          this.find_vulture_by_dock_vid_array_elm(index).status
        )};`;
      } else {
        return `background-color: #51515100; border-color: #515151;`;
      }
    },
  },
};
</script>

<template>
  <div class="dock_list_item_container">
    <div
      :style="main_area_background_color_style + 'border-color: ' + color"
      class="dock_main_area"
    ></div>
    <Transition name="dock_selector_t">
      <svg
        v-if="selected_dock_id == dock_obj.dock_id"
        class="dock_selection_indi"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H25L13.2353 11.8056L0 25V0Z" :fill="color" />
      </svg>
    </Transition>
    <div class="dock_id_l">{{ dock_name }}</div>
    <DockDeco class="dock_deco_position" :color="color" />
    <div
      :style="parse_vulture_array_status(0)"
      class="dock_port_0_indi dock_port_x_indi"
    ></div>
    <div
      :style="parse_vulture_array_status(1)"
      class="dock_port_1_indi dock_port_x_indi"
    ></div>
    <div
      :style="parse_vulture_array_status(2)"
      class="dock_port_2_indi dock_port_x_indi"
    ></div>
    <div
      :style="parse_vulture_array_status(3)"
      class="dock_port_3_indi dock_port_x_indi"
    ></div>
    <div
      class="main_area_mouse_cover"
      @mouseenter="main_area_onMouseEnter"
      @mouseleave="main_area_onMouseLeave"
      @click="main_area_onClick"
    ></div>
  </div>
</template>

<style scoped>
.dock_selector_t-enter-active,
.dock_selector_t-leave-active {
  transition: opacity linear 0.1s;
}
.dock_selector_t-enter-from,
.dock_selector_t-leave-to {
  opacity: 0;
}
div {
  user-select: none;
}
.dock_selection_indi {
  position: absolute;
  top: 0;
  left: 0;
  width: 1.302vw;
  height: 1.302vw;
}
.main_area_mouse_cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
}
.dock_deco_position {
  top: 52.142857143%;
}
.dock_main_area {
  width: 100%;
  height: 100%;
  border: solid 1px #515151;
  background-color: #51515100;
}
.dock_list_item_container {
  position: relative;
  width: 7.2916666666667vw;
  height: 7.2916666666667vw;
  margin-bottom: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dock_id_l {
  position: absolute;
  top: 25%;
  font-size: 0.9vw;
  color: #fff;
  font-family: "Titillium Web", sans-serif;
}
.dock_port_x_indi {
  position: absolute;
  top: 85%;
  width: 0.78125vw;
  height: 0.78125vw;
  border: solid 1px #515151;
  background-color: #51515100;
  transition: background-color linear 0.1s, border linear 0.1s;
}
.dock_port_0_indi {
  left: 11.428571429%;
}
.dock_port_1_indi {
  left: 33.571428571%;
}
.dock_port_2_indi {
  left: 55.714285714%;
}
.dock_port_3_indi {
  left: 77.857142857%;
}
@media only screen and (max-width: 800px) {
  .dock_id_l {
    font-size: 5vw;
  }
  .dock_selection_indi{
    width: 6.9444444444444vw;
    height: 6.9444444444444vw;
  }
  .dock_list_item_container{
    height: 38.888888888889vw;
    width: 38.888888888889vw;
  }
  .dock_port_x_indi {
    width: 4.1666666666667vw;
    height: 4.1666666666667vw;
  }
}
</style>