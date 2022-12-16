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
    class="custom-dialog">
    <el-form>
      <el-form-item label="Theme name:">
        <el-input v-model="themeName" />
        <p v-if="repeatNameTheme">Name no allowed repeat</p>
      </el-form-item>
    </el-form>

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

<style scoped lang="scss"></style>
