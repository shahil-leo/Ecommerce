import { Router } from "express";
import { User } from "../interfaces/user";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/verify";
import { UserModel } from "../models/userSchema";

const router = Router()

// get the current user
router.get('/get/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const User = await UserModel.findById<User>(req.params.id)

        if (!User) {
            throw new Error("no user found");
        }

        return res.status(200).send(User)

    } catch (error) {
        return res.status(500).json(error)
    }
})

// getAll users
router.get('/getAll/', verifyTokenAndAdmin, async (req, res) => {

    try {
        const everyUser = await UserModel.find()

        if (!everyUser) {
            throw new Error("No user is logged in");
        }

        return res.status(200).json(everyUser)

    } catch (error) {
        return res.status(500).json(error)
    }
})

// delete user
router.delete('/delete/:id', verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.params
    try {

        const profileDeleted = await UserModel.findByIdAndDelete(id)

        if (!profileDeleted) {
            throw new Error("No user deleted");
        }
        return res.status(200).json(profileDeleted)

    } catch (errors) {
        return res.status(500).json(errors)
    }
})

export const profile = router;