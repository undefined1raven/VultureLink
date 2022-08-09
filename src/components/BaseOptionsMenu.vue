
<script setup lang="ts">
import Label from "@/components/Label.vue";
import BaseDotsDeco from "@/components/BaseDotsDeco.vue";
import BaseXDeco from "@/components/BaseXDeco.vue";
import BaseOptionsMenuListItem from "@/components/BaseOptionsMenuListItem.vue";
</script>

<script lang="ts">
export default {
  mounted() {
    document.addEventListener("click", (e) => {
        if (e.target != this.$refs.options_menu_btn) {
          this.isExpanded = false;
        }
    });
  },
  unmounted() {
    document.removeEventListener("click", () => {});
  },
  methods: {
    OptionsMenuOnUpdate(args: Object) {
      this.$emit("update", args);
    },
    OptionsMenuButtonOnClick() {
      this.isExpanded = !this.isExpanded;
    },
    OptionsMenuButtonOnMouseEnter() {
      this.optionsMenuButtonBackgroundColor = "background-color: #0500FF40;";
    },
    OptionsMenuButtonOnMouseLeave() {
      this.optionsMenuButtonBackgroundColor = "background-color: #0500FF00;";
    },
  },
  props: {
    height: { default: "31.155778894%" },
    width: { default: "30.028735632%" },
    menuItems: { default: [] },
  },
  data() {
    return {
      isExpanded: false,
      optionsMenuButtonBackgroundColor: "background-color: #0500FF00;",
    };
  },
};
</script>

<template>
  <div
    class="options_menu_container"
    :style="`width: ${width}; height: ${height};`"
  >
    <div
      ref="options_menu_btn"
      class="options_menu_btn"
      :style="optionsMenuButtonBackgroundColor"
      @click="OptionsMenuButtonOnClick"
      @mouseenter="OptionsMenuButtonOnMouseEnter"
      @mouseleave="OptionsMenuButtonOnMouseLeave"
    >
      <Transition name="base_dots_deco_transition">
        <BaseDotsDeco
          id="dots_deco"
          v-if="!isExpanded"
        ></BaseDotsDeco>
      </Transition>
      <Transition name="base_x_deco_transition">
        <BaseXDeco id="x_deco" v-if="isExpanded"></BaseXDeco>
      </Transition>
    </div>
    <div v-if="isExpanded" class="options_menu_list_container">
      <TransitionGroup name="menu_list_transition">
        <BaseOptionsMenuListItem
          v-for="(ListItem, index) in menuItems"
          :key="index"
          :menuItem="ListItem"
          :isFirst="index == 0"
          @update="OptionsMenuOnUpdate"
        ></BaseOptionsMenuListItem>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
#dots_deco{
  z-index: -1;
}
.menu_list_transition-move, /* apply transition to moving elements */
.menu_list_transitionlist-enter-active,
.menu_list_transition-leave-active {
  transition: all 0.5s ease;
}

.menu_list_transition-enter-from,
.menu_list_transition-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.menu_list_transition-leave-active {
  position: absolute;
}
.options_menu_list_container {
  top: 0%;
  left: 0%;
  width: 83.253588517%;
  height: 100%;
  padding: 0;
  margin: 0;
}
.base_dots_deco_transition-enter-active,
.base_x_deco_transition-enter-active {
  transition: all 0.11s cubic-bezier(0.55, 0, 0.1, 1);
}
.base_dots_deco_transition-leave-active,
.base_x_deco_transition-leave-active {
  transition: none;
}
.base_dots_deco_transition-enter-from,
.base_dots_deco_transition-leave-to,
.base_x_deco_transition-enter-from,
.base_x_deco_transition-leave-to {
  transform: scaleY(0.2);
}
.options_menu_container {
  position: relative;
}
.options_menu_btn {
  position: absolute;
  top: 0%;
  left: calc(83.253588517% + 3px);
  width: 1.8229166666667vw;
  height: 1.8229166666667vw;
  border: solid 1px #0500ff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all linear 0.1s;
}
</style>