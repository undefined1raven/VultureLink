<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Vue from 'vue';
import socketio from 'socket.io';



</script>

<template>
  <RouterLink to="/"></RouterLink>
  <RouterLink to="/advanced_telemetry"></RouterLink>

  <RouterView />
</template>

<style>
body {
  background-color: #000;
}
</style>
