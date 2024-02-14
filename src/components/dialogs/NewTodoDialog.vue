<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useTodolistStore } from '@/stores/useTodolistStore'
import { v4 as uuidv4 } from 'uuid';
import type { TodolistInfoType } from '@/assets/types/todolist'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  }
})

const emits = defineEmits<{
  (e: 'update:modelValue')
}>()

const { addNewTodo } = useTodolistStore()

// Флаг показа диалогового окна добавления туду
const isShowAddTodoDialog = computed({
  get() {
    return props.modelValue
  },
  set() {
    emits('update:modelValue')
  }
})

// Значение заголовка нового туду
const titleValue = ref('')
// Значение описания нового туду
const descriptionValue = ref('')

/**
 * Состояние блокировки кнопки "Add"
 */
const isDisabledAddButton = computed(() => titleValue.value.trim().length === 0)

/**
 * Действие при клике на кнопку добавления туду "Add"
 */
const onAddTaskButtonClick = () => {
  const newTodoId = uuidv4();

  const newTodoParams: TodolistInfoType = {
    id: newTodoId,
    status: 'todo',
    title: titleValue.value.trim(),
    description: descriptionValue.value.trim(),
  }

  addNewTodo(newTodoParams)
  emits('update:modelValue')
}



</script>

<template>
  <v-dialog v-model="isShowAddTodoDialog" class="new-todo-dialog">
    <template #default>
      <v-card title="Add Task">
        <v-card-text>
          <v-text-field label="Title" v-model="titleValue" />
          <v-textarea label="Description" v-model="descriptionValue"></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Add" :disabled="isDisabledAddButton" @click="onAddTaskButtonClick" />
          <v-btn text="Close Dialog" @click=" emits('update:modelValue')"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped lang="scss">
.new-todo-dialog {
  max-width: var(--tdr-dialog-initial-width);

  @media screen and (max-width: 1000px) {
    max-width: var(--tdr-dialog-full-width)
  }
}
</style>
