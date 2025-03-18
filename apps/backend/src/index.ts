import express from 'express'
import 'reflect-metadata'
import routes from './api/routes.js'
import AppDataSource from './dataSource.js'
import errorHandler from './middleware/errorHandler.js'
import cookieParser from 'cookie-parser'

const app = express()
const port = 8080

await AppDataSource.initialize()
console.log("Successfully initialized TypeORM DataSource.")

app.use(express.json())
app.use(cookieParser())
app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
}).on('error', (err) => {
  console.log('Unexpected error occurred: ', err)
})