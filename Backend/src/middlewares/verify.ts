import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../interfaces/user";
import { UserModel } from "../models/userSchema";


export async function checkEmail(req: any, res: Response, next: NextFunction) {
    const UserEmail: string = req.body.email
    const user: User | null = await UserModel.findOne({ email: UserEmail })
    if (user) return res.status(502).send('Email id already existed')
    next()
}

export function verifyToken(req: any, res: Response, next: NextFunction): void {
    const authHeader = req.headers.token as string
    const jwtKey = process.env.jwtKey as string
    if (authHeader) {
        jwt.verify(authHeader, jwtKey, (err, token: any) => {
            if (err) return res.status(503).send('token is not there')
            req.user = token
            next()
        })
    } else {
        res.status(500).json('No token')
    }
}

export function verifyTokenAndAuthorization(req: any, res: Response, next: NextFunction): void {
    verifyToken(req, res, () => {
        if (req.user && (req.user.id === req.params.id || req.user.isAdmin)) {
            next()
        } else {
            res.status(500).json('token and id is not matching the same user')
        }
    })
}
export function verifyTokenAndAdmin(req: any, res: Response, next: NextFunction): void {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(500).json('you are not a admin')
        }
    })
}



