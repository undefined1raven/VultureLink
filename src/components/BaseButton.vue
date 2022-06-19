

<script>
export default {
    props: {
        id: "",
    }
}
</script>
<template>
    <div :id="id" class="menu_btn"></div>
</template>
<style scoped>
.menu_btn{
  position: absolute;
  user-select: none;
  width: 17.5%;
  height: 5.37037037%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  font-size: 1vw;
  font-family: "Titillium Web", sans-serif;
  border: solid 1px #1900FF;
  background-color: #1900FF00;
}
.menu_btn:hover{
  background-color: #1900FF20;
}
</style>