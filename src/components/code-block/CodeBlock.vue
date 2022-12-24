<script setup lang="ts">
import { computed } from 'vue'
import 'vue-code-highlight/themes/prism-tomorrow.css'
import { useThemeStore } from '@/stores/themes'

const store = useThemeStore()
let numberKey = 0

const hasProperties = computed(
  () => Object.values(store.themes[0].properties).length,
)

function generateCssCode(Theme: any) {
  numberKey++
  const properties: { name: string; value: string; type: string }[] =
    Object.values(Theme.properties)

  return `:root {${properties
    .map((prop: any, i: number) => {
      const idProp = Object.keys(Theme.properties)[i]
      const initPropName = store.themes[0].properties[idProp].name
      const cssProp = prop.type === 'css' && `${initPropName}: ${prop.value}`

      return initPropName && prop.value && `\n \t${cssProp};`
    })
    .filter(Boolean)
    .join('')}${'\n}\n\n'}`
}

function codeBlockShow(Theme: any) {
  const fillProps = Object.values(Theme.properties).filter(
    (prop: any) => prop.name && prop.value.length,
  )
  return fillProps && fillProps.length
}

// const scssTemplate = computed(() => {
//   return store.sassCode
//     .map((css, i) => {
//       return `$${css}${store.cssCode.length === i + 1 ? ';' : ';\n'}`
//     })
//     .join('')
// })
</script>

<template>
  <section class="code-block" v-if="store.themes.length">
    <!-- <div class="code-block__actions">
      <el-button type="success" :disabled="!hasProperties">
        Generate code
      </el-button>
      <el-button :disabled="!hasProperties">Export json</el-button>
    </div> -->

    <div
      v-highlight
      class="code-block__highlight"
      v-for="(Theme, index) in store.themes"
      :key="numberKey">
      <section v-if="codeBlockShow(Theme)">
        <h3 class="code-block__title">
          <el-icon><Brush /></el-icon>
          {{ Theme.title }}
        </h3>
        <pre class="language-css"><code>{{ generateCssCode(Theme) }}</code>
        </pre>
      </section>
    </div>
  </section>
</template>

<style scoped lang="scss">
.code-block {
  padding: 24px 0;
  text-align: center;

  &__actions {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }

  &__highlight {
    max-width: 960px;
    margin: 0 auto 12px auto;

    :deep(pre) {
      position: relative;
      border-radius: 2px;
      font-size: 12px;
      margin: 0;

      box-shadow: 6px 6px #dddddd;
      z-index: 1;
    }

    :deep(code) {
      tab-size: 2;
    }
  }

  &__title {
    display: inline-flex;
    align-items: center;
    gap: 6px;

    padding: 6px 12px;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;

    background: #2d2d2d;
    font-size: 14px;
    font-weight: 500;
    color: white;

    box-shadow: 6px 6px #dddddd;
    z-index: 0;
  }
}
</style>
