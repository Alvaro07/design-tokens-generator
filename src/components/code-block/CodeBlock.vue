<script setup lang="ts">
import { computed } from 'vue'
import CodeHighlight from 'vue-code-highlight/src/CodeHighlight.vue'
import 'vue-code-highlight/themes/prism-tomorrow.css'
import { useThemeStore } from '@/stores/themes'

const store = useThemeStore()
const hasProperties = computed(
  () => Object.values(store.themes[0].properties).length,
)
</script>

<template>
  <section class="code-block" v-if="store.themes.length">
    <div class="code-block__actions">
      <el-button type="success" :disabled="!hasProperties">
        Generate code
      </el-button>
      <el-button :disabled="!hasProperties">Export json</el-button>
    </div>

    <!-- prettier-ignore -->
    <code-highlight language="css" class="code-block__highlight" v-if="false">
      .class {
        overflow: hidden
      }
    </code-highlight>
  </section>
</template>

<style scoped lang="scss">
.code-block {
  padding: 24px 0;

  &__actions {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }

  &__highlight {
    pre:deep {
      border-radius: 4px;
    }
  }
}
</style>
