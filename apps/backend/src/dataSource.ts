import { DataSource } from 'typeorm'
import { BaseEntity } from './entities/base.js'
import { TaskEntity } from './entities/tasks.js'

export default new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    entities: [BaseEntity, TaskEntity],
    migrations: [
        "./dist/migrations/*"
    ],
});
