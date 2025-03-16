import { Column, Entity } from 'typeorm'
import { BaseEntity } from './base.js'

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
}