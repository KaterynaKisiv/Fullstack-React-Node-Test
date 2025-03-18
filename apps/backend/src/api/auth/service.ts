import { NextFunction, Request, Response } from 'express'
import dataSource from '../../dataSource.js'
import * as schemas from './schemas.js'
import { ZodError } from 'zod'
import { UserEntity } from '../../entities/users.js'
import { SessionEntity } from "../../entities/sessions.js"
import bcrypt from 'bcrypt'
import { generateRandomString } from '../../utils/generateRandomString.js'

const TOKEN_TTL_IN_SECONDS = 60 * 60 * 24 * 30

export const login = async (req: Request, res: Response, next: NextFunction) => {
  let schemaResult: schemas.LoginSchemaValues
  try {
    schemaResult = schemas.LoginSchema.parse(req.body)
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error.flatten())
      return
    }
    next(error)
    return
  }

  const { email, password} = schemaResult

  const user = await dataSource
    .getRepository(UserEntity)
    .createQueryBuilder("user")
    .select(["user.id", "user.email", "user.password"])
    .where("user.email = :email", { email })
    .getOne()

  if (!user) {
    res.status(401).send("Invalid credentials")
    return
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    res.status(401).send("Invalid credentials")
    return
  }

  // delete all old session with given user
  await dataSource
    .createQueryBuilder()
    .delete()
    .from(SessionEntity)
    .where("userId = :userId", { userId: user.id })
    .execute()

  // create new session for given user
  const token = generateRandomString()
  await dataSource
    .createQueryBuilder()
    .insert()
    .into(SessionEntity)
    .values([
      { id: token, userId: user.id },
    ])
    .execute()

  res.cookie("token", token, { maxAge: TOKEN_TTL_IN_SECONDS, secure: process.env.NODE_ENV === "production" })
  res.status(200).send('Successfully logged in')
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
  let schemaResult: schemas.RegisterSchemaValues
  try {
    schemaResult = schemas.RegisterSchema.parse(req.body)
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send(error.flatten())
      return
    }
    next(error)
    return
  }

  const { email, password } = schemaResult

  const isUserExist = await dataSource
    .getRepository(UserEntity)
    .createQueryBuilder("user")
    .where("user.email = :email", { email })
    .getOne()

  if (isUserExist) {
    res.status(400).send( 'User already exists' )
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await dataSource
    .createQueryBuilder()
    .insert()
    .into(UserEntity)
    .values([
      { email, password: hashedPassword },
    ])
    .execute()

  res.status(200).send('Successfully registered')
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  // delete all old session with given user
  await dataSource
    .createQueryBuilder()
    .delete()
    .from(SessionEntity)
    .where("userId = :userId", { userId: req.user?.id })
    .execute()

  res.clearCookie("token")
  res.status(200).send({ message: "Logged out successfully" })
}
