<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>

  <RouterView />
</template>

<style>

a.router-link-exact-active {
  color: var(--color-text);
}
a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
