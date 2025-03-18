import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string()
})
export type LoginSchemaValues = z.infer<typeof LoginSchema>

export const RegisterSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters")
})
export type RegisterSchemaValues = z.infer<typeof RegisterSchema>
