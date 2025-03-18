import { Router } from 'express'
import * as service from './service.js'

const route = Router()
const auth = Router()

auth.post('/login', service.login)

auth.post('/register', service.register)

auth.post('/logout', service.logout)

route.use('/', auth)

export default route