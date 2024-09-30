import express, { Express } from 'express'
import 'dotenv/config'
import NBAController from './src/controllers/NBAController'

const app: Express = express()

const PORT: number = 1234

app.use(express.json())
 
 app.use('/api',NBAController)

app.listen(process.env.PORT, (): void => {
    console.log(`server started on port : ${process.env.PORT} visit http://localhost:${process.env.PORT} `);
})