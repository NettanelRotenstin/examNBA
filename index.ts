import express, { Express } from 'express'
import 'dotenv/config'

const app: Express = express()

const PORT: number = 1234

app.use(express.json())
 
 app.use('/')

app.listen(process.env.PORT, (): void => {
    console.log(`server started on port : ${process.env.PORT} visit http://localhost:${process.env.PORT} `);
})