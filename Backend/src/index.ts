import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { auth } from './routes/auth'
import { user } from './routes/user'
import { product } from './routes/product'
import { cart } from './routes/cart'
import { order } from './routes/order'
import { category } from './routes/category'
const app = express()
app.use(cors())
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

app.use('/auth', auth)
app.use('/user', user)
app.use('/product', product)
app.use('/cart', cart)
app.use('/order', order)
app.use('/category', category)