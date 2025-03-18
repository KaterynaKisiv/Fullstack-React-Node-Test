import { ValidationErrors } from 'final-form'
import { ZodObject } from 'zod'

export const validate = (values: Record<string, any>, schema: ZodObject<any>): ValidationErrors => {
  const result = schema.safeParse(values)

  if (!result.success) {
    return result.error.flatten().fieldErrors
  }
}