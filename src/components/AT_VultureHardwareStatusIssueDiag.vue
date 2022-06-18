<script setup>
import Label from "@/components/Label.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
</script>

<script>
export default {
  props: {
    issue_obj_pkg: "",
  },
  computed: {
    issue_diags_title() {
      return `${
        this.issue_obj_pkg.system_id_dictionary[
          this.issue_obj_pkg.issue_obj.system_id
        ]
      } > ${
        this.issue_obj_pkg.component_id_dictionary[
          this.issue_obj_pkg.issue_obj.component_id
        ]
      }`;
    },
  },
  methods: {
    onBackButtonClicked(e) {
      setTimeout(() => {
        this.$emit("onBackButtonClicked");
      }, 150);
    },
  },
};
</script>

<template>
  <div id="issue_diagnostics_container">
    <div @click="onBackButtonClicked" id="issue_diags_back_btn_container">
      <div id="back_btn_indi"></div>
    </div>
    <Label
      id="issue_diags_title_l"
      color="#FFF"
      v-text="issue_diags_title"
    ></Label>
    <HorizontalLine id="issue_diags_ln_0" color="#0500FF"/>
  </div>
</template>
<style scoped>
@media only screen and (max-width: 800px) {
  #issue_diags_ln_0 {
    top: 17.435897436%;
    left: 0%;
    width: 100%;
  }
  #issue_diags_title_l {
    position: absolute;
    top: 1.025641026%;
    left: 21.362229102%;
    width: calc(78.637770898% - 5%);
    height: 15.384615385%;
    padding-left: 5%;
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 4.5vw;
  }
  #issue_diagnostics_container {
    position: absolute;
    top: 27.23880597%;
    left: 0;
    width: 100%;
    height: 72.76119403%;
  }
  #issue_diags_back_btn_container {
    position: absolute;
    top: 1.025641026%;
    left: 0%;
    width: calc(21.052631579% - 3%);
    height: 15.384615385%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: solid 1px #0500ff;
    transition: background-color linear 0.1s;
    background-color: #000aff20;
    padding-left: 3%;
  }
  #issue_diags_back_btn_container:hover {
    background-color: #000aff40;
  }
  #back_btn_indi {
    width: 2.6vh;
    height: 2.6vh;
    border-top: solid 1px #0500ff;
    border-left: solid 1px #0500ff;
    transform: rotate(-45deg);
  }
}
</style>