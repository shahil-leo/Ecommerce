import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { user } from './routes/user'
const app = express()
app.use(express.json())
dotenv.config()
const mongoPass = process.env.mongoPass
const mongoUrl: string = `mongodb+srv://shahil_kv:${mongoPass}@securepass.ltjt1vx.mongodb.net/Ecommerce`

mongoose.connect(mongoUrl).then(() => {
    app.listen(4000, () => {
        console.log("Server connected to port 4000")
    })
    console.log('Database connected')
}).catch((e: Error) => {
    console.log(e)
})

app.use('/user', user)
