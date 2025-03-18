import { FORM_ERROR } from 'final-form'

export const handleFormErrors = (error: any) => {
  console.log("error: ", error)

  // Handle field errors
  if (error.response?.data?.fieldErrors) {
    const validationErrors: { [key: string]: string[] } = error.response.data.fieldErrors;

    return Object.fromEntries(
      Object.entries(validationErrors).map(([field, messages]) => [
        field,
        messages?.join(", "),
      ])
    )
  }

  // Handle general form errors
  if (error.response?.data?.formErrors?.length) {
    return { [FORM_ERROR]: error.response.data.formErrors.join(", ") }
  }

  // Handle unexpected errors
  return { [FORM_ERROR]: error.response?.data || "An unexpected error occurred. Please try again." }
}
