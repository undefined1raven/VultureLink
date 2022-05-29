<script setup>
import OverviewButton from "@/components/AT_OverviewButton.vue";
import Label from "@/components/Label.vue";
</script>

<script>
export default {};
</script>

<template>
  <div id="system_overview_container">
    <OverviewButton
      id="sonar_array_overview_btn"
      system_label="SONAR ARRAY"
      stroke="#00FFF0"
    ></OverviewButton>
    <OverviewButton
      id="power_overview_btn"
      system_label="POWER"
      stroke="#00FFF0"
    ></OverviewButton>
    <OverviewButton
      id="propulsion_overview_btn"
      system_label="PROPULSION"
      stroke="#00FFF0"
    ></OverviewButton>

    <OverviewButton
      id="dynamics_overview_btn"
      system_label="DYNAMICS"
      stroke="#00FFF0"
    ></OverviewButton>
    <OverviewButton
      id="optical_array_overview_btn"
      system_label="OPTICAL ARRAY"
      stroke="#00FFF0"
    ></OverviewButton>
    <OverviewButton
      id="autonomoy_overview_btn"
      system_label="AUTONOMY"
      stroke="#00FFF0"
    ></OverviewButton>

    <OverviewButton
      id="nav_overview_btn"
      system_label="NAVIGATION"
      stroke="#00FFF0"
    ></OverviewButton>
    <OverviewButton
      id="network_overview_btn"
      system_label="NETWORK"
      stroke="#00FFF0"
    ></OverviewButton>
    <OverviewButton
      id="diagnostics_overview_btn"
      system_label="DIAGNOSTICS"
      stroke="#00FFF0"
    ></OverviewButton>
    <Label id="overview_l" v-text="'Systems Overview'" color="#FFF"></Label>
  </div>
</template>
<style scoped>
#overview_l{
    top: -4.820627803%;
    left: 0;
    font-size: 1.2vw;
}
#system_overview_container {
  position: absolute;
  top: 12.777777778%;
  left: 25.989583333%;
  width: 73.90625%;
  height: 82.592592593%;
  border-top: solid 1px #2400FF;
}
#sonar_array_overview_btn,
#power_overview_btn,
#propulsion_overview_btn {
  top: 6.950672646%;
  left: 32.628611698%;
}
#power_overview_btn {
  top: 34.304932735%;
}
#propulsion_overview_btn {
  top: 61.659192825%;
}
#dynamics_overview_btn,
#optical_array_overview_btn,
#autonomoy_overview_btn {
  top: 20.627802691%;
  left: 0.070472163%;
}
#nav_overview_btn,
#network_overview_btn,
#diagnostics_overview_btn {
  top: 20.627802691%;
  left: 65.186751233%;
}
#optical_array_overview_btn,
#network_overview_btn {
  top: 47.98206278%;
}
#autonomoy_overview_btn,
#diagnostics_overview_btn {
  top: 75.33632287%;
}
</style>