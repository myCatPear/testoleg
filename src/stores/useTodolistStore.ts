import { computed, ref } from 'vue'
import type {
  TodolistListType,
  TodolistStatusType,
  TodolistInfoType
} from '@/assets/types/todolist'

// Список тудулистов
const todolistList = ref<TodolistListType>([])

export function useTodolistStore() {
  // Текущий статус сортировки
  const currentStatusFilter = ref<TodolistStatusType>('all')

  // Получить все тудулисты
  const getAllTodolist = computed(() => {
    return todolistList.value
  })

  // Получить список тудулистов по текущему значению фильтра currentStatusFilter
  const getTodolistByFilter = computed(() => {
    return todolistList.value.filter((todo) => todo.status === currentStatusFilter.value)
  })

  // Добавить новый тудулист
  const addNewTodo = (newTodoData: TodolistInfoType) => {
    console.log('asdas')
    todolistList.value.push(newTodoData)
  }

  // Изменить статус выполнения туду
  const changeTodoStatus = (changedTodo: TodolistInfoType, newStatus: TodolistStatusType) => {
    const findTodo = todolistList.value.find((todo) => todo.id === changedTodo.id)

    if (findTodo) {
      findTodo.status = newStatus
    }
  }

  // Удалить тудулист
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
    getAllTodolist
  }
}
