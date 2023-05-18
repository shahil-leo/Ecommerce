
import express, { json, text } from 'express'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { ObjectId } from 'mongodb'
const router = express.Router()
import bcrypt from 'bcrypt'
import { UserModel } from "../models/userSchema";
import { checkEmail } from '../middlewares/verify';
import dotenv from 'dotenv'
import { User, fullUser, recoveryUser } from '../interfaces/user';
import jwt from 'jsonwebtoken'
dotenv.config()

let code: string

function generateCode(): string {
    const code = crypto.randomBytes(3).toString('hex');
    return code;
}

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

function emailAndPassForRecover(email: string, password: string) {
    return { email, password }
}

router.post('/login', async (req, res) => {
    const { error } = req.body
    // const recoveryData = emailAndPassForRecover()
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
    res.status(200).json({ ...others, accessToken })
})

// forgot password
router.post('/forgot', async (req, res) => {
    const emailId = req.body.email
    try {
        const user: any = await UserModel.findOne({ email: emailId })
        if (!user) return res.status(500).json('not user found')
        // code generation for unique user
        code = generateCode()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mshahilk28@gmail.com',
                pass: `${process.env.node_mailer}`
            }
        })
        const message = {
            from: 'mshahilk28@gmail.com',
            to: `${emailId}`,
            subject: 'Verify your email',
            text: 'Please verify your email address ',
            html: `<p>Your verification code is ${code}</a>`
        }
        transport.sendMail(message, (error: any, info: any) => {
            if (error) {
                return res.status(500).json('Mail not working')
            } else {
                recoveryEmail()
                async function recoveryEmail() {
                    const addRecoverCode = await UserModel.updateOne<recoveryUser>({ _id: new ObjectId(user._id) },

                        {
                            $set: {
                                recoveryCode: code
                            }
                        }, { new: true })
                    if (!addRecoverCode) return res.status(500).json('No recovery code is set to backend')
                    return res.status(200).json(addRecoverCode)
                }
            }
        });
    } catch (error) {
        return res.status(500).json(error)
    }

})
router.post('/check', async (req, res) => {
    const emailId = req.body.email
    const code = req.body.code
    const user: any = await UserModel.findOne<recoveryUser>({ email: emailId })
    if (!user) return res.status(500).json('not user found')
    if (code === user.recoveryCode) {
        return res.status(200).json('yeah i got you')
    } else {
        return res.status(500).json('you are not that user')
    }
})


export const auth = router