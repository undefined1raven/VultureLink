

<script>
export default {
    props: {
        fill: '',
        stroke: '',
        id: ''
    }
}
</script>

<template>
    <svg :id="id" class="indicator" width="174" height="80" viewBox="0 0 174 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="ic" d="M59.2887 74.141L39.5774 40L59.2887 5.85898H98.7113L118.423 40L98.7113 74.141H59.2887Z" :fill="fill" fill-opacity="1" :stroke="stroke"/>
        <path class="ic" d="M99.2887 74.141L79.5774 40L99.2887 5.85898H138.711L158.423 40L138.711 74.141H99.2887Z" :fill="fill" fill-opacity="1" :stroke="stroke"/>
        <path class="ic" d="M20.2887 74.141L0.57735 40L20.2887 5.85898H59.7113L79.4226 40L59.7113 74.141H20.2887Z" :fill="fill" fill-opacity="1" :stroke="stroke"/>
        <path class="ic" d="M74.2887 74.141L54.5774 40L74.2887 5.85898H113.711L133.423 40L113.711 74.141H74.2887Z" :fill="fill" fill-opacity="1" :stroke="stroke"/>
        <path class="ic" d="M114.289 74.141L94.5774 40L114.289 5.85898H153.711L173.423 40L153.711 74.141H114.289Z" :fill="fill" fill-opacity="1" :stroke="stroke"/>
        <path class="ic" d="M35.2887 74.141L15.5774 40L35.2887 5.85898H74.7113L94.4226 40L74.7113 74.141H35.2887Z" :fill="fill" fill-opacity="1" :stroke="stroke"/>
    </svg>  
</template>

<style scoped>
.indicator{
    position: absolute;
    width: 15%;
    height: 12.184259259%;
}
.ic{
    transition: fill linear 0.1s;
}
</style>