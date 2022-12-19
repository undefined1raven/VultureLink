<script lang="ts">
export default {
    props: {
        width: {default: "12.135416667%"},
        height: {default: "17.685185185%"},
    }   
}
</script>

<template>
    <div :style="`width: ${width}; height: ${height};`" class="cmd_menu_container"></div>    
</template>


<style scoped>
.cmd_menu_container{
    position: absolute;
    background-color: #000000aa;
}
</style>