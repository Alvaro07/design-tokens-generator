<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useThemeStore } from '../../stores/themes'

const router = useRouter()
const store = useThemeStore()

const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
  if (action === 'add') {
    router.push({ name: 'add-theme' })
  } else if (action === 'remove') {
    store.removeTheme({ name: targetName })
  }
}
</script>

<template>
  <el-tabs
    v-if="store.themes.length"
    v-model="store.activeTheme"
    type="border-card"
    editable
    @edit="handleTabsEdit">
    <el-tab-pane
      v-for="{ name, title } in store.themes"
      :key="name"
      :label="title"
      :name="name" />
  </el-tabs>
</template>
