<script setup lang="ts">
import { ref, computed, PropType } from 'vue'
import { useTodolistStore } from '@/stores/useTodolistStore'
import { v4 as uuidv4 } from 'uuid'
import type { TodoInfoType, TodoEditType } from '@/assets/types/todolist'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  action: {
    type: String as PropType<'edit' | 'new'>,
    default: 'new'
  },
  todo: {
    type: Object as PropType<TodoInfoType>,
    default: () => {}
  }
})

const emits = defineEmits<{
  (e: 'update:modelValue')
  (e: 'done')
}>()

const { addNewTodo, editTodo } = useTodolistStore()

// Флаг показа диалогового окна добавления туду
const isShowAddTodoDialog = computed({
  get() {
    return props.modelValue
  },
  set() {
    emits('update:modelValue')
  }
})

// Значение заголовка туду
const titleValue = ref('')
// Значение описания туду
const descriptionValue = ref('')
// Сформировать заголовок диалогового окна
const getDialogTitle = () => {
  if (props.action === 'new') {
    return 'Add todo'
  }
  return 'Edit todo'
}

/**
 * Состояние блокировки кнопки "Add"
 */
const isDisabledAddButton = computed(() => titleValue.value.trim().length === 0)

/**
 * Действие при клике на кнопку добавления туду "Add"
 */
const onAddTaskButtonClick = () => {
  const newTodoId = uuidv4()

  const newTodoParams: TodoInfoType = {
    id: newTodoId,
    status: 'todo',
    title: titleValue.value.trim(),
    description: descriptionValue.value.trim()
  }

  addNewTodo(newTodoParams)
  emits('update:modelValue')
  emits('done')
}

/**
 * Действие при клике на кнопку редактирования туду "Add"
 */
const onEditTaskButtonClick = () => {
  const newTodoInfo: TodoEditType = {
    id: props.todo.id,
    description: descriptionValue.value,
    title: titleValue.value
  }
  editTodo(newTodoInfo)
  emits('update:modelValue')
  emits('done')

}

const setInitialTodoInfo = () => {
  if (props.action === 'edit') {
    descriptionValue.value = props.todo.description
    titleValue.value = props.todo.title
  }
}

setInitialTodoInfo()
</script>

<template>
  <v-dialog v-model="isShowAddTodoDialog" class="new-todo-dialog">
    <template #default>
      <v-card :title="getDialogTitle()">
        <v-card-text>
          <v-text-field label="Title" v-model="titleValue" />
          <v-textarea label="Description" v-model="descriptionValue"></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="action === 'new'"
            text="Add"
            :disabled="isDisabledAddButton"
            @click="onAddTaskButtonClick"
          />
          <v-btn
            v-if="action === 'edit'"
            text="Edit"
            :disabled="isDisabledAddButton"
            @click="onEditTaskButtonClick"
          />

          <v-btn text="Close Dialog" @click="emits('update:modelValue')"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped lang="scss">
.new-todo-dialog {
  max-width: var(--tdr-dialog-initial-width);

  @media screen and (max-width: 1000px) {
    max-width: var(--tdr-dialog-full-width);
  }
}
</style>
