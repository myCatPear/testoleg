export type TodolistStatus = 'todo' | 'progress' | 'done'

export type TodolistInfo = {
  title: string
  status: TodolistStatus
  description?: string
}

export type Todolist = {
  [id: string]: TodolistInfo
}

export type TodolistInfoWithKey = TodolistInfo & {
  id: string
}
