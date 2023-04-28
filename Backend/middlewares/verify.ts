import { NextFunction, Request, Response, } from "express";
import { UserModel } from "../models/userSchema";

export async function checkEmail(req: Request, res: Response, next: NextFunction) {
    const UserEmail = req.body.email
    const user = await UserModel.findOne({ email: UserEmail })
    if (user) return res.status(502).send('Email id already existed')
    next()
}



