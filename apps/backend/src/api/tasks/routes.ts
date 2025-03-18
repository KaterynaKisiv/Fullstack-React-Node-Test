import { Router } from 'express'
import * as service from './service.js'
import { authMiddleware } from '../../middleware/authMiddleware.js'

const route = Router()
const tasks = Router()

tasks.use(authMiddleware)

tasks.get('/', service.getTasks)

tasks.post('/', service.createTask)

tasks.put('/:taskId', service.editTaskById)

tasks.delete('/:taskId', service.deleteTaskById)

route.use('/tasks', tasks)

export default route
