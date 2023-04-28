import express from 'express'
const router = express.Router()
import bcrypt from 'bcrypt'
import { UserModel } from "../models/userSchema";
import { checkEmail } from '../middlewares/verify';
import dotenv from 'dotenv'
dotenv.config()

router.get('/register', checkEmail, async (req, res) => {
    const saltRounds = await bcrypt.genSalt(10)
    const encryptedPass = await bcrypt.hash(req.body.password, saltRounds)
    const user = new UserModel({
        firstName: req.body.password,
        lastName: req.body.lastName,
        email: req.body.email,
        password: encryptedPass,
    })
    try {
        const users = await user.save()
        res.status(200).send(users)

    } catch (e) {
        if (!user) return res.status(504).json(e)
    }
})

export const user = router