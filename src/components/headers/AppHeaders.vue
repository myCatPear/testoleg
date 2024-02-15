<script setup lang="ts">
import { ref } from 'vue'
import TodoEditorDialog from '@/components/dialogs/TodoEditorDialog.vue'

const isShowdialog = ref(false)
</script>

<template>
  <TodoEditorDialog v-if="isShowdialog" v-model="isShowdialog" />

  <header class="app-header">
    <h1><router-link to="/" class="app-logo">Todolist</router-link></h1>
    <v-btn color="primary" @click="isShowdialog = true"> Add todo </v-btn>
  </header>
</template>

<style scoped lang="scss">
.app {
  &-logo {
    text-decoration: none;
  }

  &-header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
