<script setup lang="ts">
import Header from '@/components/header/Header.vue'
import ThemesTabs from '@/components/themes-tabs/ThemesTabs.vue'
</script>

<template>
  <main class="app-wrap">
    <Header />
    <ThemesTabs />
  </main>
  <RouterView />
</template>

<style lang="scss">
.app-wrap {
  width: 100%;
  height: 100vh;

  padding: 24px;
  margin: 0 auto;

  background-color: var(--color-light-grey);
  border: 12px solid white;
  border-radius: 24px;
}
</style>
