import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from './base.js'
import { UserEntity } from './users.js'

export enum TASK_STATUS {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity({
  name: 'tasks',
})
export class TaskEntity extends BaseEntity {
  @Column()
  title: string

  @Column()
  description: string

  @Column({
    type: 'enum',
    enum: TASK_STATUS,
    default: TASK_STATUS.TO_DO,
  })
  status: TASK_STATUS

  @Column()
  userId: number

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity
}