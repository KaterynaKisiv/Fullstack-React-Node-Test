import { EditTask, Task } from '../../types/task'

export enum ActionType {
  GET = 'GET',
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
  HANDLE_MODAL = 'HANDLE_MODAL',
}

export enum ModalTypes {
  DELETE = 'DELETE',
  EDIT = 'EDIT',
  CREATE = 'CREATE',
}

// types for actions
type GetTasksAction = {
  type: ActionType.GET
  payload: Task[]
}

type CreateTaskAction = {
  type: ActionType.CREATE
  payload: Task
}

type EditTaskAction = {
  type: ActionType.EDIT
  payload: EditTask
}

type DeleteTaskAction = {
  type: ActionType.DELETE
}

type HandleModalAction = {
  type: ActionType.HANDLE_MODAL
  payload: {
    modalType: ModalTypes | null
    selectedTask: number | null
  }
}

type State = {
  tasks: Task[],
  activeModal: ModalTypes | null
  selectedTask: Task | null,
}
type Action = GetTasksAction | CreateTaskAction | EditTaskAction | DeleteTaskAction | HandleModalAction

export const initialState: State = {
  tasks: [],
  activeModal: null,
  selectedTask: null
}

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.GET: {
      return {
        ...state,
        tasks: action.payload
      }
    }

    case ActionType.CREATE: {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          action.payload
        ]
      }
    }

    case ActionType.EDIT: {
      const { title, description, status} = action.payload

      return {
        ...state,
        tasks: state.tasks.map(task => task.id === state.selectedTask?.id ? {...task, title, description, status} : task)
      }
    }

    case ActionType.DELETE: {
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== state.selectedTask?.id)
      }
    }

    case ActionType.HANDLE_MODAL: {
      const { modalType, selectedTask } = action.payload
      return {
        ...state,
        activeModal: modalType,
        selectedTask: state.tasks.find(({ id }) => id === selectedTask) || null
      }
    }
  }
}