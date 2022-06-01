
<script setup>
import Label from "@/components/Label.vue";
import VultureVowListItem from "@/components/VultureVowListItem.vue";
</script>

<script>
export default {
  props: {
    vulture_array_status: "",
    id: "",
  },
  data(){
    return{
      selected_vn: '',
      target_vid: '',
      pvid: ''
    }
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
    onVultureSelected(vid, vn){
      this.selected_vn = vn;
      this.pvid = this.target_vid;
      this.target_vid = vid;
      this.$emit('new_target_vid_sig', this.pvid, vid);
    }
  },
};
</script>

<template>
  <div :id="id">
    <VultureVowListItem
      v-for="(vulture, index) in vulture_array_status"
      :key="vulture.vid"
      :vn="vulture.vn"
      :vid="vulture.vid"
      :selected_vn="selected_vn"
      :index="index"
      :color="color_from_status(vulture.status)"
      @onVultureSelected="onVultureSelected"
    />
  </div>
</template>
<style scoped>
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

#vulture_selector_list::-webkit-scrollbar-thumb { /* Foreground */
    background: #000083;
}
#vulture_selector_list::-webkit-scrollbar-track { /* Background */
    background: #00008360;
}

</style>