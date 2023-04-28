import express from 'express'
const app = express()
app.use(express.json())

import dotenv from 'dotenv'
dotenv.config()


import mongoose from 'mongoose'
const mongoPass = process.env.mongoPass
const mongoUrl = `mongodb+srv://shahil_kv:${mongoPass}@securepass.ltjt1vx.mongodb.net/Ecommerce`

mongoose.connect(mongoUrl).then(() => {
    app.listen(4000, () => {
        console.log("Server connected to port 4000")
    })
    console.log('Database connected')
}).catch((e: Error) => {
    console.log(e)
})

// console.log('shdahi');
