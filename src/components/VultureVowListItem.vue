
<script setup>
import VultureFlatDeco from "@/components/VultureFlatDeco.vue";
import BaseLabel from "@/components/BaseLabel.vue";
</script>

<script>
export default {
  props: {
    vn: "",
    vid: "",
    color: "",
    selected: "",
    selected_vn: "",
    index: "",
    isEmpty: "",
  },
  methods: {
    vulture_main_mouse_cover_onMouseEnter() {
      if (this.color == "#0500FF") {
        this.backgroundColor = `${this.color}40`;
      } else {
        this.backgroundColor = `${this.color}20`;
      }
    },
    vulture_main_mouse_cover_onMouseLeave() {
      this.backgroundColor = "#00000000";
    },
    vulture_main_mouse_cover_onClick() {
      if (!this.isEmpty) {
        this.$emit("onVultureSelected", this.vid, this.vn);
      }
    },
  },
  mounted() {
    if (this.index == 0) {
      this.$emit("onVultureSelected", this.vid, this.vn);
      this.$emit("hide_loading_deco_sig");
    }
  },
  data() {
    return {
      backgroundColor: "",
      main_area_style: `border-color: ${this.color};`,
      side_status_indi_style: `background-color: ${this.color};`,
    };
  },
};
</script>

<template>
  <div class="vulture_vow_list_item_container">
    <div
      :style="`border-color: ${color}; background-color: ${backgroundColor};`"
      class="vulture_main_area"
    ></div>
    <div
      v-if="isEmpty == undefined"
      :style="`background-color: ${color}`"
      class="vulture_side_status_indi"
    ></div>
    <BaseLabel
      v-if="isEmpty"
      class="empty_l"
      color="#515151"
      v-text="'EMPTY'"
    ></BaseLabel>
    <div v-if="isEmpty == undefined" class="vulture_id_l">{{ vn }}</div>
    <Transition name="vulture_selector_t">
      <div
        v-if="selected_vn == vn"
        :style="main_area_style"
        class="vulture_selected_indi"
      ></div>
    </Transition>

    <VultureFlatDeco class="vulture_deco" :color="color" />
    <div
      @mouseenter="vulture_main_mouse_cover_onMouseEnter"
      @mouseleave="vulture_main_mouse_cover_onMouseLeave"
      @click="vulture_main_mouse_cover_onClick"
      class="vulture_main_mouse_cover"
    ></div>
  </div>
</template>

<style scoped>
.empty_l {
  font-size: 0.9vw;
}
.vulture_selector_t-enter-active,
.vulture_selector_t-leave-active {
  transition: opacity linear 0.1s;
}
.vulture_selector_t-enter-from,
.vulture_selector_t-leave-to {
  opacity: 0;
}
div {
  user-select: none;
}
.vulture_vow_list_item_container {
  margin-top: 1px;
  margin-bottom: 2%;
  width: 99%;
  height: 19%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.vulture_selected_indi {
  position: absolute;
  width: 0.8vw;
  height: 0.8vw;
  border: solid 1px #515151;
  left: 92.583732057%;
  transform: rotate(-45deg);
  transition: background-color linear 0.1s;
}
.vulture_main_mouse_cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.vulture_deco {
  position: absolute;
  left: 2.392344498%;
  width: 12.698564593%;
  height: 25.930232558%;
  z-index: 1;
}
.vulture_selected_l {
  position: absolute;
  left: 77.511961722%;
  font-size: 0.9vw;
  color: #fff;
  font-family: "Titillium Web", sans-serif;
  z-index: 1;
}
.vulture_main_area {
  position: absolute;
  left: 1.196172249%;
  width: 98.803827751%;
  height: 100%;
  border: solid 1px #515151;
  z-index: 0;
  transition: background-color linear 0.1s, border linear 0.1s;
}
.vulture_id_l {
  width: 65.550239234%;
  left: 10.765550239%;
  font-size: 1vw;
  color: #fff;
  font-family: "Titillium Web", sans-serif;
  z-index: 1;
}
.vulture_side_status_indi {
  position: absolute;
  left: 0;
  height: 95%;
  width: 0.4784689%;
  background-color: #515151;
}
@media only screen and (max-width: 800px) {
  .vulture_id_l {
    font-size: 5vw;
  }
  .vulture_selected_indi {
    width: 4vw;
    height: 4vw;
  }
  .empty_l{
    font-size: 5vw;
  }
  .vulture_vow_list_item_container{
    height: 8.634538153%;
  }
}
</style>