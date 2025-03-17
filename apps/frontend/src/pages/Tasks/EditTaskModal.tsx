import React, { useCallback } from 'react'
import { EditTask, Task } from '../../types/task'
import TaskModal from '../../components/TaskModal'

interface EditTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (task: EditTask) => void
  task: Task
}

const EditTaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  task,
}: EditTaskModalProps) => {
  if (!isOpen) {
    return
  }

  const initialValues: EditTask = {
    title: task.title,
    description: task.description,
    status: task.status,
  }

  const handleSubmit = useCallback(async (task: EditTask) => {
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

export default EditTaskModal
