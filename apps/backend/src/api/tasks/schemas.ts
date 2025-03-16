import { z } from 'zod'
import { TASK_STATUS } from '../../entities/tasks.js'

export const CreateTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.nativeEnum(TASK_STATUS),
})
export type CreateTaskSchemaValues = z.infer<typeof CreateTaskSchema>

export const EditTaskSchema = CreateTaskSchema.extend({})
export type EditTaskSchemaValues = z.infer<typeof EditTaskSchema>
