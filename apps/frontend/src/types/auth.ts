import { z } from 'zod'

export interface Login {
  email: string
  password: string
}

export interface Register extends Login {}

export const AuthValidationSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters")
})
