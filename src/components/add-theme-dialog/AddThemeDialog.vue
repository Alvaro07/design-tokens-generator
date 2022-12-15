<script setup lang="ts">
import { react } from '@babel/types'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const dialogVisible = ref(true)
const formData = reactive({
  name: '',
})

function addTheme() {
  router.push({ name: 'home', params: { name: formData.name } })
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
    <el-form :model="formData">
      <el-form-item label="Theme name:">
        <el-input v-model="formData.name" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="router.push({ name: 'home' })">Cancel</el-button>
        <el-button
          type="primary"
          :disabled="!formData.name.length"
          @click="addTheme">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
