export type TodolistStatusType = 'all' | 'todo' | 'progress' | 'done'

export type TodolistInfoType = {
  id: string
  title: string
  status: TodolistStatusType
  description?: string
}

export type TodolistListType = TodolistInfoType[]
