<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '../../stores/themes'

const router = useRouter()
const store = useThemeStore()
const options = reactive([
  {
    value: 'css',
    label: 'custom properties',
  },
  {
    value: 'scss',
    label: 'scss',
  },
])

const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
  if (action === 'add') {
    router.push({ name: 'add-theme' })
  } else if (action === 'remove') {
    store.removeTheme({ name: targetName })
  }
}
</script>

<template>
  <main class="main-wrap">
    <el-tabs
      v-if="store.themes.length"
      v-model="store.activeTheme"
      type="border-card"
      editable
      @edit="handleTabsEdit">
      <el-tab-pane
        v-for="(Theme, index) in store.themes"
        :key="Theme.name"
        :label="Theme.title"
        :name="Theme.name">
        <section class="theme-content">
          <main>
            <ul>
              <li
                v-for="(property, i) in Object.entries(Theme.properties)"
                :key="i"
                class="theme-content__item">
                <el-input
                  placeholder="Name"
                  v-model="store.themes[0].properties[property[0]].name"
                  :disabled="index !== 0" />
                <el-input
                  placeholder="Value"
                  v-model="store.themes[index].properties[property[0]].value" />
                <el-select
                  v-model="store.themes[0].properties[property[0]].type"
                  :disabled="index !== 0">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
                <el-icon
                  v-if="index === 0"
                  class="icon-link"
                  @click="store.removeProperty(property[0])">
                  <Delete />
                </el-icon>
              </li>
            </ul>
            <div class="theme-content__actions" v-if="index === 0">
              <el-button type="primary" @click="store.addProperty">
                Add property
              </el-button>
            </div>
          </main>
        </section>
      </el-tab-pane>
    </el-tabs>
  </main>
</template>

<style scope lang="scss">
.main-wrap {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.theme-content {
  &__actions {
    text-align: center;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;

    & > div {
      flex: 1;
    }
  }

  &__var-icon.el-icon {
    color: var(--color-medium-grey);
  }
}
</style>
