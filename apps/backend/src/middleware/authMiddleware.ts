import { NextFunction, Request, Response } from 'express'
import dataSource from '../dataSource.js'
import { SessionEntity } from '../entities/sessions.js'
import { UserEntity } from '../entities/users.js'

export async function authMiddleware (req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token

  if (!token) {
    res.status(401).send("Unauthorized")
    res.clearCookie("token")
    return
  }

  const session = await dataSource
    .getRepository(SessionEntity)
    .createQueryBuilder("session")
    .leftJoin("session.user", "user")
    .select(['session.id', 'user.id', 'user.email'])
    .where("session.id = :token", { token })
    .getOne()

  if (!session) {
    res.status(401).send("Invalid or expired token" )
    res.clearCookie("token")
    return
  }

  req['user'] = session.user

  next()
}

declare module "express-serve-static-core" {
  interface Request {
    user?: Partial<UserEntity>
  }
}