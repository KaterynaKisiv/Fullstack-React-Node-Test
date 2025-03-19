import React, { useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, TextField, Typography } from '@mui/material'
import { Field, Form } from 'react-final-form'
import styled from '@emotion/styled'
import PATHS from '../../constants/paths'
import { handleFormErrors } from '../../utils/formErrorHandler'
import { AuthValidationSchema, Login } from '../../types/auth'
import { register } from '../../api/authApi'
import { ValidationErrors } from 'final-form'
import { validate } from '../../utils/validateFormValues'

const RegisterPage = () => {
  const navigate = useNavigate()

  const handleSubmit = useCallback(async (values: Login) => {
    try {
      await register(values)
      navigate(PATHS.TASKS)
    } catch (error: any) {
      return handleFormErrors(error)
    }
  }, [navigate])

  const validateRegister = useCallback((values: Record<string, any>): ValidationErrors | undefined => {
    return validate(values, AuthValidationSchema)
  }, [])

  return (
    <LoginContainer>
      <Typography variant='h5'>Register</Typography>
      <Form
        onSubmit={handleSubmit}
        validate={validateRegister}
        render={({handleSubmit, submitting, submitError}) => {
          return (
            <FormWrapper onSubmit={handleSubmit}>
              {submitError && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {submitError}
                </Typography>
              )}

              <FieldWrapper>
                <Field name="email">
                  {({input, meta}) => (
                    <TextField
                      label="Email"
                      value={input.value}
                      onChange={input.onChange}
                      error={meta.submitError || (meta.touched && meta.error)}
                      helperText={meta.submitError || (meta.touched && meta.error)}
                    />
                  )}
                </Field>
              </FieldWrapper>

              <FieldWrapper>
                <Field name="password">
                  {({input, meta}) => (
                    <TextField
                      type="password"
                      label="Password"
                      value={input.value}
                      onChange={input.onChange}
                      error={meta.submitError || (meta.touched && meta.error)}
                      helperText={meta.submitError || (meta.touched && meta.error)}
                    />
                  )}
                </Field>
              </FieldWrapper>

              <ButtonBlock>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  loading={submitting}
                >
                  Register
                </Button>
                <Button>
                  <Link to={PATHS.LOGIN}>Login</Link>
                </Button>
              </ButtonBlock>
            </FormWrapper>
          )
        }}
      />
    </LoginContainer>
  )
}

export default RegisterPage

const LoginContainer  = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
`

const FormWrapper = styled.form`
  width: 270px;
`

const FieldWrapper = styled.div`
  margin-bottom: 24px;

  .MuiTextField-root {
    width: 100%;
  }
`

const ButtonBlock = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`
