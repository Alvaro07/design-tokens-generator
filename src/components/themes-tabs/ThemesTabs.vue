<script setup lang="ts">
import { ref, watch } from 'vue'

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const editableTabsValue = ref(null)
const editableTabs = ref([])

const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
  if (action === 'add') {
    router.push({ name: 'add-theme' })
    // const newTabName = `${++tabIndex}`
    // editableTabs.value.push({
    //   title: 'New Tab',
    //   name: newTabName,
    // })
    // editableTabsValue.value = newTabName
  } else if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (activeName === targetName) {
      tabs.forEach((tab: { name: string }, index) => {
        if (tab.name === targetName) {
          const nextTab: { name: string } = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }

    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab: { name }) => tab.name !== targetName)
  }
}

// function addTab(name: string) {
//   editableTabs.value.push({ title: name, name: name })
//   editableTabsValue.value = name
// }

watch(
  () => route.params.name,
  async (name) => {
    // editableTabs.value.push({ title: name, name })
  },
)
</script>

<template>
  <el-tabs
    v-if="editableTabs.length"
    v-model="editableTabsValue"
    type="border-card"
    editable
    @edit="handleTabsEdit">
    <el-tab-pane
      v-for="{ name, title } in editableTabs"
      :key="name"
      :label="title"
      :name="name"></el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss"></style>
