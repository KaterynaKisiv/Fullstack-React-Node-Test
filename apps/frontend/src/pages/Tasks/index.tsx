import React, { useState, useCallback, useMemo, useEffect, useReducer } from 'react'
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import Paper from '@mui/material/Paper'
import { CreateTask, EditTask, Task } from '../../types/task'
import { createTask, deleteTask, editTask, getTasks } from '../../api/taskApi'
import ConfirmModal from '../../components/ConfirmModal'
import EditTaskModal from './EditTaskModal'
import { Button, Toolbar } from '@mui/material'
import styled from '@emotion/styled'
import CreateTaskModal from './CreateTaskModal'
import Spinner from '../../components/Spinner'
import { initialState, reducer, ActionType, ModalTypes } from './state'

const paginationModel = { page: 0, pageSize: 5 }

const Tasks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [state, dispatch] = useReducer(reducer, initialState)

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
      }
    } catch (err) {
      console.log('error: ', err)
    }

    dispatch({ type: ActionType.DELETE })
    handleCloseModal()
  }, [state.selectedTask])

  const handleEditTask = useCallback(async (task: EditTask) => {
    try {
      if (state.selectedTask) {
        await editTask(state.selectedTask.id, task)
      }
    } catch (err) {
      console.log('error: ', err)
    }

    dispatch({ type: ActionType.EDIT, payload: task })
    handleCloseModal()
  }, [state.selectedTask])

  const handleCreateTask = useCallback(async (task: CreateTask) => {
    try {
      const createdTask = await createTask(task)
      dispatch({ type: ActionType.CREATE, payload: createdTask })
    } catch (err) {
      console.log('error: ', err)
    }

    handleCloseModal()
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
      <Toolbar>
        <AddTaskButton
          onClick={handleOpenModal(ModalTypes.CREATE, null)}
          size="large"
          variant="contained"
        >
          Add Task
        </AddTaskButton>
      </Toolbar>
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
      <EditTaskModal
        isOpen={state.activeModal === ModalTypes.EDIT}
        onClose={handleCloseModal}
        onSubmit={handleEditTask}
        task={state.selectedTask as Task}
      />
      <CreateTaskModal
        isOpen={state.activeModal === ModalTypes.CREATE}
        onClose={handleCloseModal}
        onSubmit={handleCreateTask}
      />
    </Paper>
  )
}

export default Tasks

const AddTaskButton = styled(Button)`
  margin-left: auto;
`