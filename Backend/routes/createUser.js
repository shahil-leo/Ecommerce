const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
    const userOne = await userModel.findOne({ email: req.body.email })
    if (!userOne) return res.status(404).send("You are not registered")

    const decryptedHashedPass = await bcrypt.compare(req.body.password, userOne.password)
    if (!decryptedHashedPass) return res.status(406).send('Password is wrong')
    const data = { id: userOne.id }
    const token = jwt.sign(data, process.env.private_json, { expiresIn: '3d' })
    res.status(200).send({ userOne, token })
})

router.post('/verifyToken', (req, res) => {
    const token = req.body.token
    if (token) {
        try {
            const secret = process.env.private_json;
            const decodedToken = jwt.verify(token, secret);
            return res.status(200).send(true)
        } catch {
            return res.status(500).send('leo');
        }
    } else {
        return res.status(500).send('shah')
    }
})

module.exports = router


