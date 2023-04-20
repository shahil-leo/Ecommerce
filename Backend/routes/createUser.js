const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

// creating a user
router.post('/register', check, async (req, res) => {
    // salting password
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(req.body.password, salt)

    const user = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPass
    })
    try {
        const newUser = await userModel.create(user)
        res.status(200).send(newUser)
    } catch (e) {
        res.status(500).send(e)
    }

})
// checking email id is registered or not
async function check(req, res, next) {
    const userEmail = await userModel.findOne({ email: req.body.email })
    if (userEmail) {
        return res.status(500).send('User already existed')
    }
    next()
}

router.post('/login', async (req, res) => {
    console.log(req.body)
    const userOne = await userModel.findOne({ email: req.body.email })
    if (!userOne) return res.status(404).send("You are not registered")

    const decryptedHashedPass = await bcrypt.compare(req.body.password, userOne.password)
    if (!decryptedHashedPass) return res.status(406).send('Password is wrong')
    res.status(200).send(userOne)
})

module.exports = router


