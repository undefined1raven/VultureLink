
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
@media only screen and (max-width: 1500px) and (min-height: 850px) {
  #desktop_background{
    width: auto;
  }
}
@media only screen and (max-width: 683px) and (min-height: 550px) {
  #desktop_background{
    width: auto;
  }
}
</style>
