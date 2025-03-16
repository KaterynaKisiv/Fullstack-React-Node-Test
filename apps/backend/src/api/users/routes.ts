import { Router, Request, Response } from 'express'

const route = Router()
const users = Router()

users.get('/:id', (req: Request, res: Response) => {
  res.send('user here').status(200)
})

route.use('/users', users)

export default route