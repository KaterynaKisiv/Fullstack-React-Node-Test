import {NextFunction, Request, Response} from 'express'
import dataSource from '../../dataSource.js'
import { TaskEntity } from '../../entities/tasks.js'
import * as schemas from './schemas.js'
import { ZodError } from 'zod'

export const getTasks = async (req: Request, res: Response) => {
  const result = await dataSource
    .getRepository(TaskEntity)
    .createQueryBuilder("repository")
    .getMany()

  res.send(result).status(200)
}

export const deleteTaskById = async (req: Request, res: Response) => {
  const { taskId } = req.params

  const deletedRepository = await dataSource
    .createQueryBuilder()
    .delete()
    .from(TaskEntity)
    .where("id = :taskId", { taskId })
    .execute()

  if (deletedRepository.affected !== 1) {
    res.send(`Task with given id ${taskId} was not deleted`).status(400)
    return
  }

  res.send('Successfully deleted').status(200)
}

export const editTaskById = async (req: Request, res: Response, next: NextFunction) => {
  let schemaResult: schemas.EditTaskSchemaValues
  try {
    schemaResult = schemas.EditTaskSchema.parse(req.body)
  } catch (error) {
    if (error instanceof ZodError) {
      res.send(error.flatten()).status(400)
      return
    }
    next(error)
    return
  }

  const { taskId } = req.params

  const updatedTask = await dataSource
    .createQueryBuilder()
    .update(TaskEntity)
    .set(schemaResult)
    .where("id = :taskId", { taskId })
    .execute()

  if (updatedTask.affected !== 1) {
    res.send(`Task with given id ${taskId} was not updated`).status(400)
    return
  }

  res.send('Successfully updated').status(200)
}

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  let schemaResult: schemas.CreateTaskSchemaValues
  try {
    schemaResult = schemas.CreateTaskSchema.parse(req.body)
  } catch (error) {
    if (error instanceof ZodError) {
      res.send(error.flatten()).status(400)
      return
    }
    next(error)
    return
  }

  const createdTask = await dataSource
    .createQueryBuilder()
    .insert()
    .into(TaskEntity)
    .values([schemaResult])
    .returning("*")
    .execute()

  res.send(createdTask.raw).status(200)
}