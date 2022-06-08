
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
      v-text="'Vulture Selector'"
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
    <div id="vulture_selector_ln_container">
      <div id="vulture_selector_ln_0" class="ln ln_h"></div>
      <div id="vulture_selector_ln_1" class="ln ln_h"></div>
      <div id="vulture_selector_ln_2" class="ln ln_v"></div>
      <div id="vulture_selector_ln_3" class="ln ln_v"></div>
      <div id="vulture_selector_ln_4" class="ln ln_v"></div>
      <div id="vulture_selector_ln_5" class="ln ln_h"></div>
      <div id="vulture_selector_ln_6" class="ln ln_h"></div>
    </div>
    <div :id="id">
      <VultureArrayLoadingDeco
        v-if="isDecoVisible"
        id="vulture_array_loading_deco"
      />
      <VultureVowListItem
        v-for="(vulture, index) in vulture_array_status"
        :key="vulture.vid"
        :vn="vulture.vn"
        :vid="vulture.vid"
        :isEmpty="vulture.empty"
        :selected_vn="selected_vn"
        :index="index"
        :color="color_from_status(vulture.status)"
        @onVultureSelected="onVultureSelected"
        @hide_loading_deco_sig="hide_loading_deco_sig_handler"
      />
    </div>
  </div>
</template>
<style scoped>
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
</style>