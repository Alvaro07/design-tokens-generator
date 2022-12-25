<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/themes'

const router = useRouter()
const store = useThemeStore()

function createFirstTheme() {
  router.push({ name: 'add-theme' })
}
</script>

<template>
  <header class="header">
    <h1 class="header__title">Create your design tokens</h1>
    <p class="header__description">
      Create and manage your token library in the easiest way possible,
      assigning the value live and exporting to the format you want, being able
      to create the themes you want, and infinite values.
    </p>
    <el-button
      type="primary"
      plain
      @click="createFirstTheme"
      :disabled="store.themes.length > 0">
      Create theme
    </el-button>
    <!-- <el-button :disabled="store.themes.length > 0">Import json</el-button> -->
  </header>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  padding: 24px 0;
  text-align: center;

  &__title {
    margin-bottom: 12px;

    font-family: var(--secondary-font);
    font-weight: 700;
    font-size: rem(24);
  }

  &__description {
    position: relative;
    max-width: 680px;
    margin: 0 auto;
    padding: 12px 0 24px 0;

    font-size: rem(14);
    border-top: 1px solid #e7e7e7;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      width: 100%;
      position: absolute;
      border-top: 1px solid white;
    }
  }
}
</style>
