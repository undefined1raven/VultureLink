
<script setup>
import OverviewButton from "@/components/AT_OverviewButton.vue";
import Label from "@/components/Label.vue";
</script>
<template>
    <div id="system_overview_ln_container">
    <div id="system_menu_ln_0" class="ln ln_h"></div>
    <div id="system_menu_ln_1" class="ln ln_h"></div>
  </div>
  <div id="system_overview_container">
    <Label id="system_menu_l" v-text="'Vulture Systems'"></Label>
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
      id="autonomy_overview_btn"
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
  </div>
</template>
<style scoped>
#system_menu_ln_0 {
  top: 12.685185185%;
  left: 48.854166667%;
  width: 50.104166667%;
}
#system_menu_ln_1 {
  top: 96.944444444%;
  left: 48.854166667%;
  width: 50.104166667%;
}
#system_menu_l {
  top: 2.081051479%;
  left: 4.799216454%;
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
#system_overview_container {
  position: absolute;
  top: 12.777777778%;
  left: 46.822916667%;
  width: 53.177083333%;
  height: 84.537037037%;
}
#sonar_array_overview_btn,
#nav_overview_btn,
#network_overview_btn,
#optical_array_overview_btn {
  top: 8.502242152%;
  left: 53.085210578%;
}
#dynamics_overview_btn,
#power_overview_btn,
#autonomy_overview_btn,
#propulsion_overview_btn {
  top: 8.502242152%;
  left: calc(5.484818805%);
}
#nav_overview_btn,
#power_overview_btn {
  top: calc(10.502242152% + (17.040358745% * 1));
}
#network_overview_btn,
#propulsion_overview_btn {
  top: calc(12.502242152% + (17.040358745% * 2));
}
#optical_array_overview_btn,
#autonomy_overview_btn {
  top: calc(14.502242152% + (17.040358745% * 3));
}
</style>