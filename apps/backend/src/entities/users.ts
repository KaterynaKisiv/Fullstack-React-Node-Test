import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base.js'

@Entity({
  name: 'users',
})
export class UserEntity extends BaseEntity {
  @Column()
  email: string

  @Column({ select: false })
  password: string
}