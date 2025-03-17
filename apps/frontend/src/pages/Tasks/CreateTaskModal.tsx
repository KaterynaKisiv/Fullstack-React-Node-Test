import React, { useCallback } from 'react'
import { CreateTask } from '../../types/task'
import TaskModal from '../../components/TaskModal'

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (task: CreateTask) => void
}

const CreateTaskModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateTaskModalProps) => {
  if (!isOpen) {
    return
  }

  const initialValues = {
    title: '',
    description: '',
    status: null,
  }

  const handleSubmit = useCallback(async (task: CreateTask) => {
    onSubmit(task)
  }, [onSubmit])

  return (
    <TaskModal
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmit}
      initialValues={initialValues}
    />
  )
};

export default CreateTaskModal
