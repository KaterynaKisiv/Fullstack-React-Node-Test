import React from 'react'
import { Field, Form } from 'react-final-form'
import CustomModal from './CustomModal'
import { CreateTask, EditTask, TASK_STATUS } from '../types/task'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import styled from '@emotion/styled'
import Spinner from './Spinner'

interface InitialValues {
  title: string,
  description: string,
  status: TASK_STATUS | null,
}

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  handleSubmit: (task: CreateTask | EditTask) => void
  initialValues: InitialValues
}

const TaskModal = ({
  isOpen,
  onClose,
  handleSubmit,
  initialValues
}: TaskModalProps) => {
  if (!isOpen) {
    return
  }

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      width="396px"
      padding="24px"
    >
      <HeaderWrapper variant="h5">Create task</HeaderWrapper>
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        render={({handleSubmit, submitting}) => {
          if (submitting) {
            return <Spinner/>
          }

          return (
            <>
              <FieldWrapper>
                <Field name="title">
                  {({input, meta}) => (
                    <TextField
                      label="Title"
                      value={input.value}
                      onChange={input.onChange}
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
                      >
                        {Object.values(TASK_STATUS).map((status) => (
                          <MenuItem key={status} value={status}>
                            {status.replace("_", " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                          </MenuItem>
                        ))}
                      </Select>
                    </SelectWrapper>
                  )}
                </Field>
              </FieldWrapper>

              <ButtonBlock>
                <Button onClick={onClose} size="large" variant="text">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  size="large"
                  variant="contained"
                >
                  Submit
                </Button>
              </ButtonBlock>
            </>
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
