<script lang="ts">
export default {
  expose: [],
  props: {
    side: { default: "left" },
    id: { default: "" },
  },
  mounted() {
    setInterval(() => {
      console.log(this.$refs.lower_lateral_left_ui_bkg.getBBox().width);
    }, 1000);
  },
};
</script>

<template>
  <svg
    v-if="side == 'left'"
    :id="id"
    class="lower_lateral_console_bkg"
    width="729"
    height="137"
    viewBox="0 0 729 137"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      ref="lower_lateral_left_ui_bkg"
      d="M525.943 1.00003L726.468 1.00003L496.353 161L293 161L29.5 161L-193 1.00003L90.1562 1.00003L261.734 1.00003L525.943 1.00003Z"
      fill="url(#paint0_diamond_102_4207)"
      stroke="#242424"
    />
    <defs>
      <radialGradient
        id="paint0_diamond_102_4207"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(-16.7862 145.577) rotate(-12.81) scale(2083.31 16382.4)"
      >
        <stop stop-opacity="0.8" />
        <stop stop-opacity="0.2" />
        <stop offset="0.0001" />
        <stop offset="0.318996" stop-opacity="0.611716" />
        <stop offset="0.433007" stop-opacity="0.2" />
      </radialGradient>
    </defs>
  </svg>
  <svg
    ref="lower_lateral_right_ui_bkg"
    v-if="side == 'right'"
    :id="id"
    class="lower_lateral_console_bkg"
    width="708"
    height="137"
    viewBox="0 0 708 137"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M202.526 1L2 1L247.5 161L435.469 161L698.97 161L921.47 1L638.313 1L466.735 1L202.526 1Z"
      fill="url(#paint0_diamond_102_4209)"
      stroke="#242424"
    />
    <defs>
      <radialGradient
        id="paint0_diamond_102_4209"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(745.256 145.577) rotate(-167.19) scale(2083.31 16382.4)"
      >
        <stop stop-opacity="0.8" />
        <stop stop-opacity="0.2" />
        <stop offset="0.0001" />
        <stop offset="0.318996" stop-opacity="0.611716" />
        <stop offset="0.433007" stop-opacity="0.2" />
      </radialGradient>
    </defs>
  </svg>
</template>

<style scoped>
#console_lower_right_side_bkg {
  top: 87.407407407%;
  left: 60.98125%;
}
#console_lower_left_side_bkg {
  top: 87.407407407%;
  left: -10.052083333%;
}
.lower_lateral_console_bkg {
  position: absolute;
  height: 14.814814815%; /*14.814814814814815vh */
  width: 47.8890625%; /*85.1361111111111vh */
}
</style>