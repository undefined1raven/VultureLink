
<script setup>
import Label from "@/components/Label.vue";
import VultureVowListItem from "@/components/VultureVowListItem.vue";
import VultureArrayLoadingDeco from "@/components/VultureArrayLoadingDeco.vue";
</script>

<script>
export default {
  props: {
    vulture_array_status: "",
    id: "",
    isMobile: "",
    selected_dock_obj: undefined,
  },
  data() {
    return {
      selected_vn: "",
      target_vid: "",
      pvid: "",
      isDecoVisible: true,
    };
  },
  methods: {
    dock_name_formatter() {
      if (this.selected_dock_obj.dock_name == undefined) {
        return "";
      } else {
        return `${this.selected_dock_obj.dock_name}\\\\`;
      }
    },
    color_from_status(vulture_status) {
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
    onVultureSelected(vid, vn) {
      this.selected_vn = vn;
      this.pvid = this.target_vid;
      this.target_vid = vid;
      this.$emit("new_target_vid_sig", this.pvid, vid);
    },
    hide_loading_deco_sig_handler() {
      this.isDecoVisible = false;
    },
  },
};
</script>

<template>
  <div id="vulture_selector_container">
    <Label
      id="vulture_selector_l"
      v-text="dock_name_formatter() + 'Vulture Selector'"
      color="#FFF"
    ></Label>
    <Label
      id="vulture_selector_legend_unavailable"
      class="vulture_selector_legend_x"
      v-text="'Unavailable'"
      color="#585858"
    ></Label>
    <Label
      id="vulture_selector_legend_fault"
      class="vulture_selector_legend_x"
      v-text="'Requires Attention'"
      color="#FF006B"
    ></Label>
    <Label
      id="vulture_selector_legend_ready"
      class="vulture_selector_legend_x"
      v-text="'Ready'"
      color="#0500FF"
    ></Label>
    <Label
      id="vulture_selector_legend_active"
      class="vulture_selector_legend_x"
      v-text="'Active'"
      color="#00FFF0"
    ></Label>
    <div v-if="!isMobile" id="vulture_selector_ln_container">
      <div id="vulture_selector_ln_0" class="ln ln_h"></div>
      <div id="vulture_selector_ln_1" class="ln ln_h"></div>
      <div id="vulture_selector_ln_2" class="ln ln_v"></div>
      <div id="vulture_selector_ln_3" class="ln ln_v"></div>
      <div id="vulture_selector_ln_4" class="ln ln_v"></div>
      <div id="vulture_selector_ln_5" class="ln ln_h"></div>
      <div id="vulture_selector_ln_6" class="ln ln_h"></div>
    </div>
    <div id="vulture_selector_list">
      <VultureArrayLoadingDeco
        v-if="isDecoVisible"
        id="vulture_array_loading_deco"
        class="animation_group_0"
      />
      <TransitionGroup name="fade">
        <VultureVowListItem
          v-for="(vulture, index) in vulture_array_status"
          :key="vulture.vid"
          :vn="vulture.vn"
          :vid="vulture.vid"
          :isEmpty="vulture.empty"
          :selected_vn="selected_vn"
          :index="index"
          :color="color_from_status(vulture.status)"
          class="animation_group_0"
          @onVultureSelected="onVultureSelected"
          @hide_loading_deco_sig="hide_loading_deco_sig_handler"
        />
      </TransitionGroup>
    </div>
  </div>
</template>
<style scoped>
@keyframes vulture_selector_item_in {
  0% {
    transform: translateX(-4%);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes ui_section_fade_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.vulture_selector_item{
  animation: vulture_selector_item_in ease-in-out .1s;
}
.animation_group_0{
  animation: ui_section_fade_in ease-in-out .1s;
}
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
  transform: translateX(0);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-50%);
}

.fade-leave-active {
  position: absolute;
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
#vulture_selector_ln_2 {
  top: 12.685185185%;
  left: 24.739583333%;
  height: 1.851851852%;
}
#vulture_selector_ln_3 {
  top: 16.481481481%;
  left: 24.739583333%;
  height: 22.314814815%;
}
#vulture_selector_ln_4 {
  top: 40.601851852%;
  left: 24.739583333%;
  height: 3.703703704%;
}
#vulture_selector_ln_5 {
  top: 42.407407407%;
  left: 23.75%;
  width: 2.0833333333333vw;
}
#vulture_selector_ln_6 {
  top: 42.407407407%;
  left: 1.041666667%;
  width: 21.666666667%;
}
.vulture_selector_legend_x {
  font-size: 0.8vw;
  top: 39.877777778%;
}
#vulture_selector_legend_unavailable {
  border-top: solid 2px #585858;
  left: 3.958333333%;
}
#vulture_selector_legend_fault {
  border-top: solid 2px #ff006b;
  left: 8.177083333%;
}
#vulture_selector_legend_ready {
  border-top: solid 2px #0500ff;
  left: 14.791666667%;
}
#vulture_selector_legend_active {
  border-top: solid 2px #00fff0;
  left: 17.291666667%;
}

#vulture_selector_l {
  top: 14.351851852%;
  left: 0.78125%;
}
#vulture_array_loading_deco {
  top: 13.963963964%;
  left: 24.641148325%;
  width: 50.495215311%;
  height: 71.653153153%;
}
#vulture_selector_list {
  position: absolute;
  top: 18.481481481%;
  left: 0.78125%;
  width: 21.770833333%;
  height: 20.555555556%;
  overflow-y: scroll;
}
#vulture_selector_list {
  /* Foreground, Background */
  scrollbar-color: #999 #333;
}
#vulture_selector_list::-webkit-scrollbar {
  width: 0.9vh; /* Mostly for vertical scrollbars */
  height: 0.9vh; /* Mostly for horizontal scrollbars */
}

#vulture_selector_list::-webkit-scrollbar-thumb {
  /* Foreground */
  background: #000083;
}
#vulture_selector_list::-webkit-scrollbar-track {
  /* Background */
  background: #00008300;
}
@media only screen and (max-width: 800px) {
  #vulture_selector_l {
    top: 2.03125%;
    left: 5.833333333%;
    font-size: 5.6vw;
  }
  #vulture_selector_list {
    top: 8.75%;
    left: 2.5%;
    width: 95%;
    height: 77.8125%;
  }
  .vulture_selector_legend_x {
    top: calc(85.3125% + 3.3%);
    font-size: 1.84375vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #vulture_selector_legend_unavailable {
    left: 8.888888889%;
    width: 20.277777778%;
  }
  #vulture_selector_legend_fault {
    left: 31.388888889%;
    width: 33.055555556%;
  }
  #vulture_selector_legend_ready {
    left: 66.666666667%;
    width: 11.111111111%;
  }
  #vulture_selector_legend_active {
    left: 80%;
    width: 10.833333333%;
  }
  #vulture_selector_list::-webkit-scrollbar {
    width: 0.3vh; /* Mostly for vertical scrollbars */
    height: 0.3vh; /* Mostly for horizontal scrollbars */
  }
}
</style>