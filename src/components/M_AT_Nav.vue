
<script setup>
import Label from "@/components/Label.vue";
import DockDeco from "@/components/DockDeco.vue";
import VultureDetailedDeco from "@/components/VultureDetailedDeco.vue";
import VultureSystemsDeco from "@/components/VultureSystemsDeco.vue";
</script>

<script>
export default {
  data() {
    return {
      isMenuVisible: false,
      menu_btn_l: "Menu",
    };
  },
  methods: {
    menu_btn_onClick() {
      this.isMenuVisible = !this.isMenuVisible;
      this.$emit("m_menu_onVisibilityChange", this.isMenuVisible);
      if (this.isMenuVisible) {
        this.menu_btn_l = "Back";
      } else {
        this.menu_btn_l = "Menu";
      }
    },
  },
};
</script>

<template>
  <div class="mobile_nav_container">
    <Transition name="menu_fading_t">
      <div v-if="isMenuVisible" id="menu_container">
        <div id="dock_status_btn_container" class="square_menu_btn">
          <Label class="square_menu_l" v-text="'Dock Status'"></Label>
          <DockDeco
            id="dock_deco"
            class="square_menu_deco"
            color="#0500FF"
          ></DockDeco>
        </div>
        <div id="vulture_status_btn_container" class="square_menu_btn">
          <Label class="square_menu_l" v-text="'Vulture Status'"></Label>
          <VultureDetailedDeco
            id="vulture_deco"
            class="square_menu_deco"
          ></VultureDetailedDeco>
        </div>
        <div id="vulture_systems_btn" class="menu_btn">
            <Label class="menu_l" v-text="'Vulture Systems'"></Label>
            <VultureSystemsDeco id="vulture_systems_deco"></VultureSystemsDeco>
        </div>
      </div>
    </Transition>
    <Label
      @click="menu_btn_onClick"
      id="main_menu_btn"
      v-text="menu_btn_l"
      color="#FFF"
    ></Label>
  </div>
</template>
<style scoped>
#vulture_systems_deco{
    left: 58.064516129%;
}
#vulture_systems_btn{
    top: 41.765704584%;
}
.menu_btn {
  position: absolute;
  width: 86.111111111%;
  height: 9.337860781%;
  border: solid 1px #0500ff;
  display: flex;
  align-items: center;
  justify-content: center;
}
#dock_deco {
  height: 35.885714286%;
  width: 30%;
}
#vulture_deco {
  top: 37.142857143%;
}
.square_menu_deco {
  top: 41.178571429%;
}
.menu_l{
  left: 3.225806452%;
  font-size: 4.6vw;
}
.square_menu_l {
  top: 5.714285714%;
  font-size: 4.6vw;
}
.square_menu_btn {
  top: 12.903225806%;
  position: absolute;
  width: 38.888888889%;
  height: 21.875%;
  border: solid 1px #0500ff;
  display: flex;
  align-items: center;
  justify-content: center;
}
#dock_status_btn_container {
  left: 6.944444444%;
}
#vulture_status_btn_container {
  left: 54.166666667%;
}
.square_menu_btn:hover, .menu_btn:hover {
  background-color: #000aff20;
}

.menu_fading_t-enter-active,
.menu_fading_t-leave-active {
  transition: opacity linear 0.05s;
}
.menu_fading_t-enter-from,
.menu_fading_t-leave-to {
  opacity: 0;
}
#menu_container {
  position: absolute;
  top: 0;
  left: 0;
  width: 99.9%;
  height: 92.03125%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
#main_menu_btn {
  top: 92.03125%;
  left: 0;
  width: 99.9%;
  height: 7.8125%;
  background-color: #0500ff20;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: solid 1px #0500ff;
  font-size: 4.8vw;
}
</style>