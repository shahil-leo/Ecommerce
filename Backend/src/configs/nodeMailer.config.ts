import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
dotenv.config()

export const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mshahilk28@gmail.com',
        pass: `${process.env.node_mailer}`
    }
})