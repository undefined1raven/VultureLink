

<script setup>
import Label from "@/components/Label.vue";
import HorizontalLine from "@/components/HorizontalLine.vue";
import VerticalLine from "@/components/VerticalLine.vue";
</script>

<template>
  <Label class="r" v-text="'fml'"></Label>
</template>
<style scoped>
@media only screen and (max-width: 800) {
  .r {
    font-size: 5vw;
  }
}
</style>