<script setup lang="ts">
import { computed, ref } from 'vue'
import 'vue-code-highlight/themes/prism-tomorrow.css'
import { useThemeStore } from '@/stores/themes'

const store = useThemeStore()
let numberKey = 0
const copied = ref(false)

interface Prop {
  name: string
  value: string
  type: string
}

interface Theme {
  title: string
  name: string
  properties: any
}

function codeBlockShow(Theme: Theme) {
  const fillProps = Object.values(Theme.properties).filter(
    (prop: any) => prop.value.length,
  )
  return fillProps && fillProps.length
}

function generateCssCode(Theme: Theme) {
  numberKey++
  const properties: { name: string; value: string; type: string }[] =
    Object.values(Theme.properties)

  const hasCssProps = properties.filter((prop) => prop.type === 'css')

  return hasCssProps.length > 0
    ? `:root {${properties
        .map((prop: Prop, i: number) => {
          const idProp = Object.keys(Theme.properties)[i]
          const initPropName = store.themes[0].properties[idProp].name
          const cssProp =
            prop.type === 'css' && `${initPropName}: ${prop.value}`

          return initPropName && prop.value && cssProp && `\n \t${cssProp};`
        })
        .filter(Boolean)
        .join('')}${'\n}\n\n'}`
    : null
}

function generateScssCode(Theme: Theme) {
  numberKey++
  const properties: { name: string; value: string; type: string }[] =
    Object.values(Theme.properties)

  return properties
    .map((prop: Prop, i: number) => {
      const idProp = Object.keys(Theme.properties)[i]
      const initPropName = store.themes[0].properties[idProp].name
      const cssProp = prop.type === 'scss' && `${initPropName}: ${prop.value}`

      return (
        initPropName &&
        prop.value &&
        cssProp &&
        `${i > 0 ? '\n' : ''} $${cssProp};`
      )
    })
    .filter(Boolean)
    .join('')
}

async function copyCode(Theme: Theme) {
  copied.value = true
  const code = `${generateCssCode(Theme)}${generateScssCode(Theme)}`
  await navigator.clipboard.writeText(code)

  setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
  <section class="code-block" v-if="store.themes.length">
    <div
      v-highlight
      class="code-block__highlight"
      v-for="Theme in store.themes"
      :key="numberKey">
      <section v-if="codeBlockShow(Theme)">
        <h3 class="code-block__title">
          <el-icon><Brush /></el-icon>
          {{ Theme.title }}
        </h3>

        <el-tooltip
          :content="!copied ? 'Copy' : 'Copied!'"
          placement="top"
          effect="light">
          <span class="code-block__copy-icon" @click="copyCode(Theme)">
            <el-icon><CopyDocument /></el-icon>
          </span>
        </el-tooltip>

        <pre
          class="language-css"
          copy><code>{{ generateCssCode(Theme) }}{{ generateScssCode(Theme) }}</code></pre>
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
    position: relative;
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

  &__copy-icon {
    position: absolute;
    right: 16px;
    top: 42px;
    z-index: 2;
    color: white;
    cursor: pointer;
    transition: 0.3s all ease;

    &:hover {
      color: var(--color-light-blue);
    }
  }
}
</style>
