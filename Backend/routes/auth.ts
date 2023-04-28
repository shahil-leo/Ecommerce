import express from 'express'
const router = express.Router()
import bcrypt from 'bcrypt'
import { UserModel } from "../models/userSchema";
import { checkEmail } from '../middlewares/verify';
import dotenv from 'dotenv'
import { fullUser } from '../interfaces/user';
import jwt from 'jsonwebtoken'
dotenv.config()

router.post('/register', checkEmail, async (req, res) => {
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

router.post('/login', async (req, res) => {
    const { error } = req.body
    if (error) return res.status(504).send(error[0].message)
    const user = await UserModel.findOne<fullUser>({ email: req.body.email })
    if (!user) return res.status(500).send('There is no user with this email id')
    const RealPassword = await bcrypt.compare(req.body.password, user._doc.password)
    if (!RealPassword) return res.status(501).send('Password is wrong')

    const secretJwt = process.env.jwtKey as string
    const accessToken = jwt.sign({
        id: user._doc._id,
        isAdmin: user._doc.isAdmin
    }, secretJwt, { expiresIn: '1d' })
    const { password, ...others } = user._doc
    res.status(200).json({ others, accessToken })
})

export const auth = router