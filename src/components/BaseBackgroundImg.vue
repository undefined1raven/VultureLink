<script>
export default {};
</script>

<template>
  <img
  draggable="false"
    src="../assets/visual_assets/a_t_desktop_bkg.png"
    id="desktop_background"
    alt="bkg"
  />
</template>

<style>
img {
  user-select: none;
  pointer-events: none;
}
#desktop_background {
  position: absolute;
  display: flex;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
}
@media only screen and (max-width: 768px) {
  #desktop_background {
    display: none;
  }
}
</style>
