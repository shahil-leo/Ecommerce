
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import dotenv from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import nodemailer from 'nodemailer'
import { recovery } from '../interfaces/All'
import { User, fullUser, recoveryUser, registerUser } from '../interfaces/user'
import { checkEmail } from '../middlewares/verify'
import { UserModel } from "../models/userSchema"
dotenv.config()

const router = express.Router()
let code: string
// generating random codes for reset  password and send the code to mail
function generateCode(): string {
    const code = crypto.randomBytes(3).toString('hex');
    return code;
}
// creating user 
router.post('/register', checkEmail, async (req, res) => {
    const saltRounds = await bcrypt.genSalt(10)
    const encryptedPass = await bcrypt.hash(req.body.password, saltRounds)
    const { firstName, lastName, email } = req.body
    const user = new UserModel<registerUser>({
        firstName: firstName as string,
        lastName: lastName as string,
        email: email as string,
        password: encryptedPass as string,
    })
    try {
        const users = await user.save()
        if (!users) return res.status(500).json('failed to create user problem in DB')
        return res.status(200).send(users)
    } catch (e) {
        if (!user) return res.status(504).json(e)
    }
})
// todo do the recovery of password for every user using this 
function emailAndPassForRecover(email: string, password: string): recovery {
    return { email, password }
}
// login user
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
    }, secretJwt, { expiresIn: '5d' })
    const { password, ...others } = user._doc
    res.status(200).json({ ...others, accessToken })
})

// forgot password sending code using node mailer and checking the code is same or not
router.post('/forgot', async (req, res) => {
    const emailId = req.body.email
    try {
        const user: User | any = await UserModel.findOne({ email: emailId })
        if (!user) return res.status(500).json('no user found with this email id')
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
// check the user recovery code from the DB and the code saved locally if the 2 is same then we are updating the user
router.post('/check', async (req, res) => {
    const { email, code } = req.body
    const user: any = await UserModel.findOne<recoveryUser>({ email: email })
    if (!user) return res.status(500).json('not user found')
    if (code === user.recoveryCode) {
        return res.status(200).json(user)
    } else {
        return res.status(500).json('you are not that user')
    }
})


export const auth = router