
<script lang="ts">
export default {
  props: {
    menuItem: { default: { label: "--", btn_id: "" } },
    isFirst: {default: false},
  },
  methods: {
    borderStyleParser(){
        if(this.isFirst){
            return 'border: solid 1px #0500FF;'
        }
        else{
            return 'border: solid 1px #0500FF; border-top: none;'
        }
    },
    baseOptionsMenuListItemOnClick() {
      this.$emit('update', {btn_id: this.menuItem.btn_id});
    },
  },
};
</script>

<template>
  <li
    class="base_options_menu_list_item"
    @click="baseOptionsMenuListItemOnClick"
    :style="borderStyleParser()"
    v-text="menuItem.label"
  ></li>
</template>

<style scoped>
@keyframes list_item_ani {
    0%{transform: translateX(10px) scaleY(0.8);}
    100%{transform: translateX(0) scaleY(1);}
}
.base_options_menu_list_item {
  width: 100%;
  height: 33.870967742%;
  background-color: #000000aa;
  border: solid 1px #0500ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: "Titillium Web", sans-serif;
  font-size: 0.9vw;
  user-select: none;
  animation: list_item_ani linear 0.1s;
  transition: all linear 0.1s;
}
.base_options_menu_list_item:hover{
    background-color: #020074aa;
}
</style>
