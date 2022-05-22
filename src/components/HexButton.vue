
<script>
export default {
    props: {
        id: "",
        label: "",
        fill_color: "",
        stroke_color: ""
    }
}
</script>


<template>
<svg :id="id" class="btn" width="269" height="76" viewBox="0 0 269 76" fill="none" xmlns="http://www.w3.org/2000/svg">
<text fill="white" xml:space="preserve" style="white-space: pre" font-family="Titillium Web" font-size="22" letter-spacing="0em"><tspan x="45.1787" y="46.695">{{this.label}}</tspan></text>
<path class="btn_path" d="M38 1L1 38L38 75H231.358L268 38L231.358 1H38Z" :stroke="stroke_color" :fill="fill_color" fill-opacity="1"/>
</svg>
</template>

<style scoped>
.btn{
    position: absolute;
}
.btn_path{
    transition: stroke linear 0.1s, fill linear 0.1s;
}
</style>