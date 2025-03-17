export enum TASK_STATUS {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface Task {
  id: number
  title: string
  description: string
  status: TASK_STATUS
  createdAt: string
  updatedAt: string
}

export interface CreateTask {
  title: string
  description: string
  status: TASK_STATUS
}

export interface EditTask {
  title: string
  description: string
  status: TASK_STATUS
}
