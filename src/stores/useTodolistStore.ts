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
  const currentStatusFilter = ref<TodolistStatusType>('todo')

  // Получить все тудулисты
  const getAllTodolist = computed(() => {
    return todolistList.value
  })

  // Получить список тудулистов по текущему значению фильтра currentStatusFilter
  const filterTodolist = computed(() => {
    return todolistList.value.filter((todo) => todo.status === currentStatusFilter.value)
  })

  // Добавить новый тудулист
  const addNewTodo = (newTodoData: TodolistInfoType) => {
    console.log('asdas')
    todolistList.value.push(newTodoData)
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
    getAllTodolist,
    currentStatusFilter,
    filterTodolist,
    addNewTodo,
    deleteTodo
  }
}
