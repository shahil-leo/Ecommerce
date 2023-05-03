
import express, { json, text } from 'express'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
const router = express.Router()
import bcrypt from 'bcrypt'
import { UserModel } from "../models/userSchema";
import { checkEmail } from '../middlewares/verify';
import dotenv from 'dotenv'
import { User, fullUser, recoveryUser } from '../interfaces/user';
import jwt from 'jsonwebtoken'
dotenv.config()


let recoveryEmail: string
let recoveryPass: string
let emailId: string

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
    emailId = req.body.email
    console.log(emailId)
    try {
        const user: any = await UserModel.findOne({ email: emailId })
        console.log(user)
        if (!user) return res.status(500).json('not user found')
        // code generation for unique user
        const code = generateCode()
        console.log(code)
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mshahilk28@gmail.com',
                pass: 'owqycyrmlhtsqpbv'
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
                console.log(error);
            } else {
                recoveryEmail()
                async function recoveryEmail() {
                    const addRecoverCode = await UserModel.findByIdAndUpdate<recoveryUser>(user.id,
                        {
                            $set: {

                                recoveryCode: code
                            }
                        }, { new: true })
                    if (!addRecoverCode) return res.status(500).json('No recovery code is set to backend')
                    console.log(user.id)
                    return res.status(200).json(addRecoverCode)
                }
            }
        });
    } catch (error) {
        return res.status(500).json(error)
    }

})
router.post('/check/', async (req, res) => {

    const codes = req.body.codes
    if (codes) {
        // const user = await UserModel.findOne<recoveryUser>({ email: emailId })
        // if (!user) return res.status(500).json('not user found')
        // return res.status(200).json(user.email)
    } else {
        res.status(500).json('you are not verified to that')
    }

})


export const auth = router