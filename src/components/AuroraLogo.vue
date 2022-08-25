

<script lang="ts">
export default {
    props: {
        id: {default: ''}
    }
}
</script>

<template>
<svg :id="id" class="logo" width="167" height="32" viewBox="0 0 167 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="37.1783" y="1.3735" width="0.978375" height="28.9157" fill="#0000FF"/>
    <rect x="37.1783" y="31.253" width="0.963855" height="18.0999" transform="rotate(-90 37.1783 31.253)" fill="#0000FF"/>
    <rect x="56.7458" y="1.3735" width="0.978375" height="24.5783" fill="#0000FF"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M57.735 25.9518V29.3691V29.6314L57.5192 29.7805L55.754 31H53.9948L56.735 29.1068V25.9518H57.735Z" fill="#0000FF"/>
    <rect x="63.5944" y="1.3735" width="0.978375" height="29.8795" fill="#0000FF"/>
    <rect x="63.5944" y="2.33734" width="0.963855" height="15.1648" transform="rotate(-90 63.5944 2.33734)" fill="#0000FF"/>
    <rect x="118.873" y="1.3735" width="0.978375" height="29.8795" fill="#0000FF"/>
    <rect x="118.873" y="2.33734" width="0.963855" height="15.1648" transform="rotate(-90 118.873 2.33734)" fill="#0000FF"/>
    <path d="M112.013 16.3133C112.013 24.2811 105.455 30.753 97.3484 30.753C89.2421 30.753 82.6835 24.2811 82.6835 16.3133C82.6835 8.34543 89.2421 1.8735 97.3484 1.8735C105.455 1.8735 112.013 8.34543 112.013 16.3133Z" stroke="#0000FF"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6476 0.409637L30.127 31H31.2065L16.7271 0.409637H15.6476Z" fill="#0000FF"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1062 0.409637L0.62677 31H1.7063L16.1857 0.409637H15.1062Z" fill="#0000FF"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M151.153 0.409637L165.632 31H166.711L152.232 0.409637H151.153Z" fill="#0000FF"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M150.611 0.409637L136.132 31H137.211L151.691 0.409637H150.611Z" fill="#0000FF"/>
</svg>
</template>
<style scoped>
.logo{
    position: absolute;
    width: 14%;
    height: 8%;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2){
    .logo{
        display: block;
        position: absolute;
        width: 65.279611111%;
    }
}
@media only screen and (max-width: 1070px) and (min-height: 550px) and (max-height: 800px) and (-webkit-max-device-pixel-ratio: 2) {
  .logo {
    width: 28.020833333%;
    height: 7%;
  }
}
@media only screen and (max-width: 1500px) and (min-height: 850px) and (-webkit-max-device-pixel-ratio: 2) {
  .logo {
    width: 28.020833333%;
    height: 7%;
  }
}
@media only screen and (max-width: 1996.8px) and (min-height: 1200px) and (-webkit-max-device-pixel-ratio: 1) {
  .logo {
    width: 28.020833333%;
    height: 7%;
  }
}
</style>