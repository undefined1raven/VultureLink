<script setup lang="ts">
import BaseLabel from "@/components/BaseLabel.vue";
import VerticalLine from "@/components/VerticalLine.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";

import isMobile from "@/composables/isMobile.ts";
import percentage from "@/composables/percentage.ts";
import rangeScaler from "@/composables/rangeScaler.ts";
import { tSParenthesizedType } from "@babel/types";
</script>


<script lang="ts">
export default {
  props: {
    width: { default: "66.875%" },
    height: { default: "50.5%" },
  },
  methods: {
    onRoleSelected(role_id: string) {
      this.$emit("onRoleSelected", { role_id: role_id });
    },
  },
};
</script>

<template>
  <Transition name="ani">
    <div
      :style="`width: ${width}; height: ${height};`"
      class="mobile_cmd_role_selector_container"
    >
      <BaseLabel id="vulture_name_l" v-text="'Void Ray'"></BaseLabel>
      <BaseLabel
        color="#AAA"
        id="role_selector_l"
        v-text="'Role Selector'"
      ></BaseLabel>
      <HorizontalLine id="role_selector_ln" color="#0500FF"></HorizontalLine>
      <VerticalLine id="role_selector_ln_1" color="#0500FF"></VerticalLine>
      <div
        @click="onRoleSelected('observer')"
        class="role_btn"
        id="observer_role_btn"
      >
        <BaseLabel class="role_l" v-text="'Observer'"></BaseLabel>
        <BaseLabel
          class="role_description_l"
          v-text="'Access to live telemetry'"
        ></BaseLabel>
      </div>
      <div
        @click="onRoleSelected('pilot')"
        class="role_btn"
        id="pilot_role_btn"
      >
        <BaseLabel class="role_l" v-text="'Pilot'"></BaseLabel>
        <BaseLabel
          class="role_description_l"
          v-text="'Operational Command'"
        ></BaseLabel>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.role_description_l {
  font-size: 3.5vh;
  top: 60%;
}
.role_l {
  font-size: 5vh;
  top: 13.333333333%;
}
#observer_role_btn {
  left: 15.186915888%;
}
.role_btn {
  position: absolute;
  top: 42.391304348%;
  width: 28.037383178%;
  height: 40.760869565%;
  border: solid 1px #0500ff;
  background-color: #0500ff20;
  display: flex;
  justify-content: center;
  align-items: center;
}
#pilot_role_btn {
  left: 57.009345794%;
}
#role_selector_l {
  top: 22.826086957%;
  left: 2.336448598%;
  font-size: 4vh;
}
#vulture_name_l {
  top: 3.260869565%;
  left: 2.336448598%;
  font-size: 5vh;
}
#role_selector_ln {
  top: 19.02173913%;
  left: 0%;
  width: 100%;
}
#role_selector_ln_1 {
  top: 42.391304348%;
  height: 40.760869565%;
}
.mobile_cmd_role_selector_container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000bb;
}
.ani-move,
.ani-enter-active,
.ani-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  transform: translateX(0);
}

.ani-enter-from,
.ani-leave-to {
  opacity: 0;
  transform: translateX(-50%);
}

.ani-leave-active {
  position: absolute;
}
</style>