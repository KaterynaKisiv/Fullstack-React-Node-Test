import React, { useState, useCallback, useMemo, useEffect, useReducer } from 'react'
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import Paper from '@mui/material/Paper'
import { CreateTask, EditTask, Task } from '../../types/task'
import { createTask, deleteTask, editTask, getTasks } from '../../api/taskApi'
import ConfirmModal from '../../components/ConfirmModal'
import { Button, Toolbar } from '@mui/material'
import styled from '@emotion/styled'
import Spinner from '../../components/Spinner'
import { initialState, reducer, ActionType, ModalTypes } from './state'
import { handleFormErrors } from '../../utils/formErrorHandler'
import TaskModal from '../../components/TaskModal'
import { logout } from '../../api/authApi'
import { useNavigate } from 'react-router-dom'
import PATHS from '../../constants/paths'

const paginationModel = { page: 0, pageSize: 5 }

const TasksPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [state, dispatch] = useReducer(reducer, initialState)
  const navigate = useNavigate()

  const handleOpenModal = useCallback((type: ModalTypes, id: number | null) => () => {
    dispatch({
      type: ActionType.HANDLE_MODAL,
      payload: { modalType: type, selectedTask: id }
    })
  }, [])

  const handleCloseModal = useCallback(() => {
    dispatch({
      type: ActionType.HANDLE_MODAL,
      payload: { modalType: null, selectedTask: null }
    })
  }, [])

  const handleDeleteTask = useCallback(async () => {
    try {
      if (state.selectedTask) {
        await deleteTask(state.selectedTask.id)
        dispatch({ type: ActionType.DELETE })
        handleCloseModal()
      }
    } catch (err) {
      console.log('error: ', err)
    }
  }, [state.selectedTask])

  const handleEditTask = useCallback(async (task: EditTask) => {
    try {
      if (state.selectedTask) {
        await editTask(state.selectedTask.id, task)
        dispatch({ type: ActionType.EDIT, payload: task })
        handleCloseModal()
      }
    } catch (error: any) {
      return handleFormErrors(error)
    }
  }, [state.selectedTask])

  const handleCreateTask = useCallback(async (task: CreateTask) => {
    try {
      const createdTask = await createTask(task)
      dispatch({ type: ActionType.CREATE, payload: createdTask })
      handleCloseModal()
    } catch (error: any) {
      return handleFormErrors(error)
    }
  }, [state.selectedTask])

  const fetchTasks = useCallback(async () => {
    setIsLoading(true)
    try {
      const tasks = await getTasks()
      dispatch({ type: ActionType.GET, payload: tasks })
    } catch (err) {
      console.log('err: ', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleLogout = useCallback(async () => {
    await logout()
    navigate(PATHS.LOGIN)
  }, [])

  const columns: GridColDef[] = useMemo(() => ([
    { field: 'id', type: 'number', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'status', headerName: 'Status', width: 90 },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleOpenModal(ModalTypes.DELETE, params.id as number)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={handleOpenModal(ModalTypes.EDIT, params.id as number)}
        />,
      ],
    },
  ]), [])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <ToolbarWrapper>
        <Button
          onClick={handleOpenModal(ModalTypes.CREATE, null)}
          size="large"
          variant="contained"
        >
          Add Task
        </Button>
        <Button
          onClick={handleLogout}
          size="large"
          variant="contained"
        >
          Logout
        </Button>
      </ToolbarWrapper>
      <DataGrid
        rows={state.tasks}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
      />
      <ConfirmModal
        isOpen={state.activeModal === ModalTypes.DELETE}
        onClose={handleCloseModal}
        onSubmit={handleDeleteTask}
        title='Delete task'
        description='Are you sure you want to delete selected task?'
      />
      <TaskModal
        title='Edit task'
        isOpen={state.activeModal === ModalTypes.EDIT}
        onClose={handleCloseModal}
        handleSubmit={handleEditTask}
        task={state.selectedTask as Task}
      />
      <TaskModal
        title='Create task'
        isOpen={state.activeModal === ModalTypes.CREATE}
        onClose={handleCloseModal}
        handleSubmit={handleCreateTask}
      />
    </Paper>
  )
}

export default TasksPage

const ToolbarWrapper = styled(Toolbar)`
  justify-content: end;
  gap: 10px;
`