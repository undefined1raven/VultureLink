
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
  },
  methods: {
  },
  mounted() {},
};
</script>

<template>
  <div id="hardware_status_issues_list_container">
    <Label
      class="column_label"
      id="issues_list_system_id_l"
      color="#B7B7B7"
      v-text="'System ID'"
    ></Label>
    <Label
      class="column_label"
      id="issues_list_part_id_l"
      color="#B7B7B7"
      v-text="'Part ID'"
    ></Label>
    <Label
      class="column_label"
      id="issues_list_status_l"
      color="#B7B7B7"
      v-text="'Status'"
    ></Label>
    <HorizontalLine id="issues_list_ln" color="#FF006B" />
    <div id="hardware_issues_list">
    <VultureHardwareStatusIssuesListItem
      v-for="(issue, index) in issues_array"
      :key="index"
      :issue_obj="issue"
    ></VultureHardwareStatusIssuesListItem>
    </div>
  </div>
</template>
<style scoped>
#hardware_status_issues_list_container {
  position: absolute;
}

@media only screen and (max-width: 800px) {
  #hardware_issues_list{
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
    font-size: 4.8vw;
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