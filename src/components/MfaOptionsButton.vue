
<script>
export default {
    props: {
        id: "",
        label: ""
    }
}
</script>

<template>
    <div :id="id" class="btn">{{this.label}}</div>
</template>
<style scoped>
.btn{
    position: absolute;
    width: 10.625%;
    height: 5.833333333%;
    color: #FFF;
    border: solid 1px #0029FF;
    font-size: 0.9vw;
    font-family: 'Titillium Web', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0029FF00;
}
.btn:hover{
    background-color: #000AFF20;
}
</style>