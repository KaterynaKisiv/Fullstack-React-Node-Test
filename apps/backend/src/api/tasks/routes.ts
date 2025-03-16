import { Router } from 'express'
import * as service from './service.js'

const route = Router()
const tasks = Router()

tasks.get('/', service.getTasks)

tasks.post('/', service.createTask)

tasks.put('/:taskId', service.editTaskById)

tasks.delete('/:taskId', service.deleteTaskById)

route.use('/tasks', tasks)

export default route
