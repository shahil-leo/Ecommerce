import { NextFunction, Request, Response, } from "express";
import { UserModel } from "../models/userSchema";
import jwt from "jsonwebtoken";


export async function checkEmail(req: Request, res: Response, next: NextFunction) {
    const UserEmail = req.body.email
    const user = await UserModel.findOne({ email: UserEmail })
    if (user) return res.status(502).send('Email id already existed')
    next()
}

export function verifyToken(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers.token as string
    const jwtKey = process.env.jwtKey as string
    if (authHeader) {
        jwt.verify(authHeader, jwtKey, (err, token: any) => {
            if (err) return res.status(503).send('token is not there')
            req.user = token
            next()
        })
    } else {
        return res.status(500).json('No token')
    }
}

export function verifyTokenAndAuthorization(req: any, res: Response, next: NextFunction) {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.status(500).json('token and id is not matching the same user')
        }
    })
}
export function verifyTokenAndAdmin(req: any, res: Response, next: NextFunction) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(500).json('you are not a admin')
        }
    })
}



