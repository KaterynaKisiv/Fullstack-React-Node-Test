import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { UserEntity } from './users.js'
@Entity({
  name: 'sessions',
})
export class SessionEntity {
  @PrimaryColumn()
  id: string

  @Column()
  userId: number

  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity
}
