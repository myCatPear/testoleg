import { computed, ref } from 'vue'
import type {
  Todolist,
  TodolistInfoWithKey,
  TodolistStatus,
  TodolistInfo
} from '@/assets/types/todolist'

// Список тудулистов
const todoList: Todolist = {}
// Текущий статус сортировки
const currentStatusFilter = ref<TodolistStatus>('todo')

// Получить все тудулисты
const getAllTodolist = computed(() => {
  const list: TodolistInfoWithKey[] = []
  for (const key in todoList) {
    list.push({ id: key, ...todoList[key] })
  }
  return list
})

// Получить список тудулистов по текущему значению фильтра currentStatusFilter
const filterTodolist = computed(() => {
  return getAllTodolist.value.filter((todo) => todo.status === currentStatusFilter.value)
})

// Добавить новый тудулист
const addNewTodo = (newTodoId: string, newTodoData: TodolistInfo) => {
  todoList[newTodoId] = { ...newTodoData }
}

// Удалить тудулист
const deleteTodo = (todoId: string) => {
  if (todoList[todoId]) {
    delete todoList[todoId]
    return true
  }
  return false
}

export { getAllTodolist, filterTodolist, currentStatusFilter, addNewTodo, deleteTodo }
