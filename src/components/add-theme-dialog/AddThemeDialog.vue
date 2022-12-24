<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '../../stores/themes'

const router = useRouter()
const store = useThemeStore()

const dialogVisible = ref(true)
const themeName = ref('')

const repeatNameTheme = computed(() =>
  store.themes.some((theme) => theme.title === themeName.value),
)

function addTheme() {
  store.addTheme({ title: themeName })
  router.push({ name: 'home' })
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="Add new theme for your tokens"
    :width="420"
    :show-close="false"
    align-center
    :close-on-click-modal="false"
    class="custom-dialog">
    <div class="add-theme-form">
      <label class="add-theme-form__label">Theme name:</label>
      <el-input v-model="themeName" />
      <p class="add-theme-form__error" v-if="repeatNameTheme">
        Name no allowed repeat
      </p>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="router.push({ name: 'home' })">Cancel</el-button>
        <el-button
          type="primary"
          :disabled="!themeName.length || repeatNameTheme"
          @click="addTheme">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.add-theme-form {
  position: relative;

  &__label {
    display: inline-block;
    margin-bottom: 6px;
    font-size: rem(12);
  }

  &__error {
    position: absolute;
    top: calc(100% + 6px);
    font-size: rem(10);
    color: var(--color-error);
  }
}
</style>
