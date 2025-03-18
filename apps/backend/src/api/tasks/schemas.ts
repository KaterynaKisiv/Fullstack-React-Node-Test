import { z } from 'zod'
import { TASK_STATUS } from '../../entities/tasks.js'

export const CreateTaskSchema = z.object({
  title: z.string().min(3, 'Title must contain at least 3 characters'),
  description: z.string().min(3, 'Description must contain at least 3 characters'),
  status: z.nativeEnum(TASK_STATUS),
})
export type CreateTaskSchemaValues = z.infer<typeof CreateTaskSchema>

export const EditTaskSchema = CreateTaskSchema.extend({})
export type EditTaskSchemaValues = z.infer<typeof EditTaskSchema>
