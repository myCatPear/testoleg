<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTodolistStore } from '@/stores/useTodolistStore'
import Todo from '@/components/ui/Todo.vue'
import type { TodoInfoType, TodoStatusType } from '@/assets/types/todolist'
import router from '@/router'
import { TODO_INFO_PATH_NAME } from '@/assets/constants/routes'
import TodoEditorDialog from '@/components/dialogs/TodoEditorDialog.vue'

// Получить управление и список тудулистов
const { getAllTodolist, changeTodoStatus, deleteTodo, currentStatusFilter, getTodolistByFilter } =
  useTodolistStore()

// Флаг показа диалогового окна редактирования туду
const isShowdialog = ref(false)

// Информация о туду для редактирования
const todoInfo = ref()

// Получить и отрисовать туду в зависимости от выбранного фильтра
const getTodolists = computed(() => {
  if (currentStatusFilter.value === 'all') return getAllTodolist.value
  return getTodolistByFilter.value
})

// Изменился статус выполнения туду
const changedTodoStatus = (todo: TodoInfoType, newStatus: TodoStatusType) => {
  console.log('changedTodoStatus')
  changeTodoStatus(todo, newStatus)
}

// Произошёл клик по иконке редактировать туду
const onEditTodoButtonClick = (todo: TodoInfoType) => {
  console.log('edit')
  todoInfo.value = todo
  isShowdialog.value = true
}

// Произошёл клик по иконке удалить туду
const onDeleteTodoIconClick = (todo: TodoInfoType) => {
  console.log('onDeleteTodoIconClick')

  deleteTodo(todo.id)
}

// Произошёл клик по туду
const onTodoClick = (todo: TodoInfoType) => {
  console.log('onTodoClick')

  router.push({ name: TODO_INFO_PATH_NAME, params: { id: todo.id } })
}
</script>

<template>
  <TodoEditorDialog v-if="isShowdialog" v-model="isShowdialog" :action="'edit'" :todo="todoInfo" />

  <p>Set filter:</p>
  <v-radio-group v-model="currentStatusFilter" inline :disabled="getAllTodolist.length === 0">
    <v-radio label="All" value="all"></v-radio>
    <v-radio label="Todo" value="todo"></v-radio>
    <v-radio label="In progress" value="progress"></v-radio>
    <v-radio label="Done" value="done"></v-radio>
  </v-radio-group>
  <v-card class="todolists">
    <Todo
      v-for="item in getTodolists"
      :todo="item"
      @changed-todo-status="changedTodoStatus"
      @edit="onEditTodoButtonClick(item)"
      @delete="onDeleteTodoIconClick"
      @click="onTodoClick"
    />
  </v-card>
</template>

<style scoped lang="scss">
.todolists {
  min-height: 10rem;
  padding: 0.4rem;
}
</style>
