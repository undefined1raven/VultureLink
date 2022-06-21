
<script setup>
import Label from "@/components/Label.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import VultureHardwareStatusIssuesListItem from "@/components/AT_VultureHardwareStatusIssuesListItem.vue";
</script>

<script>
export default {
  props: {
    issues_array: "",
    isMobile: "",
  },
  methods: {
    onIssueSelectedHandler(args) {
      this.$emit("onIssueSelected", args);
    },
  },
  mounted() {},
};
</script>

<template>
  <div id="hardware_status_issues_list_container">
    <div id="column_type_container" v-if="isMobile">
      <Label
        class="column_label"
        id="issues_list_system_id_l"
        color="#B7B7B7"
        v-text="'System'"
      ></Label>
      <Label
        class="column_label"
        id="issues_list_part_id_l"
        color="#B7B7B7"
        v-text="'Component'"
      ></Label>
      <Label
        class="column_label"
        id="issues_list_status_l"
        color="#B7B7B7"
        v-text="'Status'"
      ></Label>
    </div>
    <HorizontalLine id="issues_list_ln" color="#FF006B" />
    <div id="hardware_issues_list">
      <VultureHardwareStatusIssuesListItem
        v-for="(issue, index) in issues_array"
        @onIssueSelected="onIssueSelectedHandler"
        :key="index"
        :issue_obj="issue"
        :isMobile="isMobile"
      ></VultureHardwareStatusIssuesListItem>
    </div>
  </div>
</template>
<style scoped>
#hardware_status_issues_list_container {
  position: absolute;
  top: calc(17.97752809% + 3.837216234%);
  left: 14.0969163%;
  width: 85.9030837%;
  height: 77.528089888%;
}
#hardware_issues_list {
  height: 100%;
  display: flex;
  flex-direction: row;
}
@media only screen and (max-width: 800px) {
  #hardware_issues_list {
    position: absolute;
    top: 11.734693878%;
    left: 0%;
    width: 100%;
    height: 64.552238806%;
  }
  #hardware_status_issues_list_container {
    top: 26.865671642%;
    left: 0%;
    width: 99.8%;
    height: 88.265306122%;
    display: flex;
  }
  .column_label {
    top: 0%;
    font-size: 4.5vw;
  }
  #issues_list_system_id_l {
    left: 0.92879257%;
  }
  #issues_list_part_id_l {
    left: 33.436532508%;
  }
  #issues_list_status_l {
    left: 73.06501548%;
  }
  #issues_list_ln {
    top: 11.224489796%;
    left: 0%;
    width: 100%;
  }
}
</style>