type TodoStatusType = 'all' | 'todo' | 'progress' | 'done'

type TodoInfoType = {
  id: string
  title: string
  status: TodoStatusType
  description?: string
}

type TodolistListType = TodoInfoType[]

type TodoEditType = {
  id: string
  title?: string
  description?: string
}

export { TodoStatusType, TodoInfoType, TodolistListType, TodoEditType }
