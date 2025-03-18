import React, { useCallback } from 'react'
import { Field, Form } from 'react-final-form'
import CustomModal from './CustomModal'
import { CreateTask, EditTask, Task, TASK_STATUS, TaskValidationSchema } from '../types/task'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import styled from '@emotion/styled'
import Spinner from './Spinner'
import { ValidationErrors } from 'final-form'

interface InitialValues {
  title: string,
  description: string,
  status: TASK_STATUS | null,
}

interface TaskModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  handleSubmit: (task: CreateTask | EditTask) => void
  task?: Task
}

const TaskModal = ({
  title,
  isOpen,
  onClose,
  handleSubmit,
  task
}: TaskModalProps) => {
  const initialValues: InitialValues = {
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || TASK_STATUS.TO_DO,
  }

  const validateTask = useCallback((values: Record<string, any>): ValidationErrors | undefined => {
    const result = TaskValidationSchema.safeParse(values)

    if (!result.success) {
      return result.error.flatten().fieldErrors
    }

    return undefined
  }, [])

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      width="396px"
      padding="24px"
    >
      <HeaderWrapper variant="h5">{title}</HeaderWrapper>
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validateTask}
        render={({handleSubmit, submitting, submitError}) => {
          if (submitting) {
            return <Spinner/>
          }

          return (
            <form onSubmit={handleSubmit}>
              {submitError && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {submitError}
                </Typography>
              )}

              <FieldWrapper>
                <Field name="title">
                  {({input, meta}) => (
                    <TextField
                      label="Title"
                      value={input.value}
                      onChange={input.onChange}
                      error={meta.submitError || meta.touched && meta.error}
                      helperText={meta.submitError || meta.touched && meta.error}
                    />
                  )}
                </Field>
              </FieldWrapper>

              <FieldWrapper>
                <Field name="description">
                  {({input, meta}) => (
                    <TextField
                      label="Description"
                      value={input.value}
                      onChange={input.onChange}
                      error={meta.submitError || meta.touched && meta.error}
                      helperText={meta.submitError || meta.touched && meta.error}
                    />
                  )}
                </Field>
              </FieldWrapper>

              <FieldWrapper>
                <Field name="status" component="select">
                  {({input, meta}) => (
                    <SelectWrapper>
                      <InputLabel id="status">Status</InputLabel>
                      <Select
                        labelId='status'
                        value={input.value}
                        label="Status"
                        onChange={input.onChange}
                        error={meta.touched && !!meta.error}
                      >
                        {Object.values(TASK_STATUS).map((status) => (
                          <MenuItem key={status} value={status}>
                            {status.replace("_", " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                          </MenuItem>
                        ))}
                      </Select>
                      {meta.submitError || (meta.touched && meta.error)
                        ? <Typography color="error">{meta.submitError || meta.error}</Typography>
                        : null
                      }
                    </SelectWrapper>
                  )}
                </Field>
              </FieldWrapper>

              <ButtonBlock>
                <Button onClick={onClose} size="large" variant="text">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                >
                  Submit
                </Button>
              </ButtonBlock>
            </form>
          )
        }}
      />
    </CustomModal>
  )
};

export default TaskModal

const HeaderWrapper = styled(Typography)`
  text-align: center;
`

const ButtonBlock = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`

const FieldWrapper = styled.div`
  margin-top: 24px;
`

const SelectWrapper = styled(FormControl)`
  width: 50%;
`
