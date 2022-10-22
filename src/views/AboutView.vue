<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
<style scoped>
@media (min-width: 1024px) {
  main {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
