import { DataSource } from 'typeorm'
import { BaseEntity } from './entities/base.js'
import { TaskEntity } from './entities/tasks.js'
import { UserEntity } from './entities/users.js'
import { SessionEntity } from './entities/sessions.js'

export default new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    entities: [BaseEntity, TaskEntity, UserEntity, SessionEntity],
    migrations: [
        "./dist/migrations/*"
    ],
});
