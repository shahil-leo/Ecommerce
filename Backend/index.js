const express = require('express')
const app = express()
app.use(express.json())
const CreateUser = require('./routes/createUser')


const dotenv = require('dotenv')
dotenv.config()


const mongoose = require('mongoose')
const mongoPass = process.env.mongoPass
const mongoUrl = `mongodb+srv://shahil_kv:${mongoPass}@securepass.ltjt1vx.mongodb.net/Ecommerce`

mongoose.connect(mongoUrl).then(() => {
    app.listen(4000, () => {
        console.log("Server connected to port 4000")
    })
    console.log('Database connected')
}).catch((e) => {
    console.log(e)
})

app.use('/user', CreateUser)