import { Router } from 'express'
import tasks from './tasks/routes.js'
import auth from './auth/routes.js'

const app = Router()

app.get('/health', (req, res) => {
  res.send('ok')
})

const api = Router()
api.use(tasks)
api.use(auth)

export default app.use('/api', api)