import {NextFunction, Request, Response} from 'express'
import dataSource from '../../dataSource.js'
import { TaskEntity } from '../../entities/tasks.js'
import * as schemas from './schemas.js'
import { ZodError } from 'zod'

export const getTasks = async (req: Request, res: Response) => {
  const userId = req.user?.id

  const result = await dataSource
    .getRepository(TaskEntity)
    .createQueryBuilder("tasks")
    .where("tasks.userId = :userId", { userId })
    .getMany()

  res.status(200).send(result)
}

export const deleteTaskById = async (req: Request, res: Response) => {
  const userId = req.user?.id
  const { taskId } = req.params

  const deletedRepository = await dataSource
    .createQueryBuilder()
    .delete()
    .from(TaskEntity)
    .where("id = :taskId AND userId = :userId", { taskId, userId })
    .execute()

  if (deletedRepository.affected !== 1) {
    res.status(400).send(`Task with given id ${taskId} was not deleted`)
    return
  }

  res.status(200).send('Successfully deleted')
}

export const editTaskById = async (req: Request, res: Response, next: NextFunction) => {
  let schemaResult: schemas.EditTaskSchemaValues
  try {
    schemaResult = schemas.EditTaskSchema.parse(req.body)
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error.flatten())
      return
    }
    next(error)
    return
  }

  const userId = req.user?.id
  const { taskId } = req.params

  const updatedTask = await dataSource
    .createQueryBuilder()
    .update(TaskEntity)
    .set(schemaResult)
    .where("id = :taskId  AND userId = :userId", { taskId, userId })
    .execute()

  if (updatedTask.affected !== 1) {
    res.status(400).send(`Task with given id ${taskId} was not updated`)
    return
  }

  res.status(200).send('Successfully updated')
}

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  let schemaResult: schemas.CreateTaskSchemaValues
  try {
    schemaResult = schemas.CreateTaskSchema.parse(req.body)
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error.flatten())
      return
    }
    next(error)
    return
  }

  const userId = req.user?.id
  if (!userId) {
    res.status(401).send("Unauthorized")
    return
  }

  const createdTask = await dataSource
    .createQueryBuilder()
    .insert()
    .into(TaskEntity)
    .values([{ ...schemaResult, userId }])
    .returning("*")
    .execute()

  res.status(200).send(createdTask.raw)
}