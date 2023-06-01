
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import dotenv from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import { transport } from '../configs/nodeMailer.config'
import { recovery } from '../interfaces/All'
import { User, fullUser, recoveryUser, registerUser } from '../interfaces/user'
import { checkEmail } from '../middlewares/verify'
import { UserModel } from "../models/userSchema"
dotenv.config()
const router = express.Router()

let code: string

// generating random numbers for the forgot password and sending the code to mail
function generateCode(): string {
    const code = crypto.randomBytes(3).toString('hex');
    return code;
}

// creating user 
router.post('/register', checkEmail, async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body

        const saltRounds = await bcrypt.genSalt(10)
        const encryptedPass = await bcrypt.hash(req.body.password, saltRounds)

        const user = new UserModel<registerUser>({
            firstName,
            lastName,
            email,
            password: encryptedPass as string,
        })

        const createdUser = await user.save()

        if (!createdUser) {
            return res.status(500).json('Failed to create user.There was a problem in the database')
        }

        return res.status(200).send(createdUser)
    } catch (error) {
        return res.status(500).json(error)
    }
})

function emailAndPassForRecover(email: string, password: string): recovery {
    return { email, password }
}

// login user
router.post('/login', async (req, res) => {

    try {
        const { email } = req.body

        const user: fullUser | null = await UserModel.findOne({ email: email })

        if (!user) {
            return res.status(500).json('no user found with this email id')
        }

        const RealPassword: boolean = await bcrypt.compare(req.body.password, user._doc.password)

        if (!RealPassword) {
            return res.status(501).json('Invalid password')
        }

        const secretKeyJwt = process.env.jwtKey as string

        // creating accessToken with userId and isAdmin property
        const accessToken = jwt.sign({
            id: user._doc._id,
            isAdmin: user._doc.isAdmin
        }, secretKeyJwt, { expiresIn: '5d' })

        const { password, ...userWithoutPassword } = user._doc

        res.status(200).json({ ...userWithoutPassword, accessToken })
    } catch (error) {
        res.status(500).json(error)
    }
})

// forgot password sending code using node mailer and checking the code is same or not
router.post('/forgot', async (req, res) => {
    try {
        const emailId = req.body.email

        const user: User | null = await UserModel.findOne({ email: emailId })

        if (!user) {
            return res.status(500).json('no user found with this email id')
        }
        // generate random codes 
        code = generateCode()

        const message = {
            from: 'mshahilk28@gmail.com',
            to: `${emailId}`,
            subject: 'Verify your email',
            text: 'Please verify your email address ',
            html: `<p>Your verification code is ${code} do not share with anyone </a>`
        }

        transport.sendMail(message, (error: Error | null) => {

            if (error) {
                return res.status(500).json('An error occurred while sending the email')
            } else {

                recoveryEmail()

                async function recoveryEmail() {

                    const addRecoverCode = await UserModel.updateOne<recoveryUser>(
                        { _id: new ObjectId(user?.id) },
                        { $set: { recoveryCode: code } },
                        { new: true })

                    if (!addRecoverCode) {
                        return res.status(500).json('No recovery code is set to backend')
                    }

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