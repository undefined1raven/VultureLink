
<script>
export default {
  props: {
    id: "",
    system_label: "",
    stroke: "",
  },
  data() {
    return {
      overview_btn_backgroundColor: "",
      cursor_on_label: false,
    };
  },
  methods: {
    overview_btn_onMouseEnter(e) {
      this.overview_btn_backgroundColor = `${this.stroke}20`;
      this.cursor_on_label = false;
      e.target.style.transform = "scaleY(1.05) perspective(1px)";
    },
    overview_btn_onMouseLeave(e) {
      setTimeout(() => {
        if (!this.cursor_on_label) {
          this.overview_btn_backgroundColor = `${this.stroke}00`;
          e.target.style.transform = "scaleY(1) perspective(1px)";
        }
      }, 50);
    },
    label_onMouseEnter() {
      this.cursor_on_label = true;
    },
  },
};
</script>

<template>
  <div :id="id" class="overview_button_container">
    <svg
      @mouseenter="overview_btn_onMouseEnter"
      @mouseleave="overview_btn_onMouseLeave"
      class="overview_btn"
      width="475"
      height="169"
      viewBox="0 0 475 169"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="path"
        d="M1 83.5L70 1H405L474 85.5L405 168H70L1 83.5Z"
        :fill="overview_btn_backgroundColor"
        fill-opacity="1"
        :stroke="stroke"
      />
    </svg>
    <div @mouseenter="label_onMouseEnter" class="system_label">
      {{ this.system_label }}
    </div>
  </div>
</template>
<style scoped>
.overview_btn {
  width: 100%;
  height: 100%;
  transition: transform ease-in 0.1s;
}
.overview_button_container {
  position: absolute;
  width: 41.380999021%;
  height: 15.581599124%;
}
.path {
  transition: stroke linear 0.1s, fill linear 0.1s;
}
.system_label {
  user-select: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: "Titillium Web", sans-serif;
  color: #fff;
  font-size: 2.2vh;
}
</style>