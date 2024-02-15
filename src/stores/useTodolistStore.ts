import { computed, ref } from 'vue'
import type {
  TodolistListType,
  TodoStatusType,
  TodoInfoType,
  TodoEditType
} from '@/assets/types/todolist'

// Список тудулистов
const todolistList = ref<TodolistListType>([])

export function useTodolistStore() {
  // Текущий статус сортировки
  const currentStatusFilter = ref<TodoStatusType>('all')

  // Получить все тудулисты
  const getAllTodolist = computed(() => {
    return todolistList.value
  })

  // Получить список тудулистов по текущему значению фильтра currentStatusFilter
  const getTodolistByFilter = computed(() => {
    return todolistList.value.filter((todo) => todo.status === currentStatusFilter.value)
  })

  // Добавить новый туду
  const addNewTodo = (newTodoData: TodoInfoType) => {
    todolistList.value.push(newTodoData)
  }

  // Изменить статус выполнения туду
  const changeTodoStatus = (changedTodo: TodoInfoType, newStatus: TodoStatusType) => {
    const findTodo = todolistList.value.find((todo) => todo.id === changedTodo.id)

    if (findTodo) {
      findTodo.status = newStatus
    }
  }

  // Получить информацию о туду
  const getTodoInfo = (todoId: string) => {
    if (!todoId) return null
    const findTodo = todolistList.value.find((todo) => todo.id === todoId)
    if (findTodo) {
      return findTodo
    }
    return null
  }

  // Редактировать туду
  const editTodo = (newTodoValue: TodoEditType) => {
    if (!newTodoValue.id) return null

    const findIndex = todolistList.value.findIndex((todo) => todo.id === newTodoValue.id)

    if (findIndex || findIndex === 0) {
      const todo = todolistList.value[findIndex]
      todolistList.value[findIndex] = { ...todo, ...newTodoValue }
    }

    return null
  }

  // Удалить туду
  const deleteTodo = (todoId: string) => {
    if (todoId) {
      todolistList.value = todolistList.value.filter((todo) => todo.id !== todoId)
      return true
    }
    return false
  }

  return {
    addNewTodo,
    changeTodoStatus,
    currentStatusFilter,
    deleteTodo,
    getTodolistByFilter,
    getAllTodolist,
    getTodoInfo,
    editTodo
  }
}
