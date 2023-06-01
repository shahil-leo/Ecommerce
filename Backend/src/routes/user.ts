import express from 'express';
import { User } from '../interfaces/user';
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middlewares/verify';
import { UserModel } from '../models/userSchema';
const router = express.Router()

// delete a user from the admin panel
router.delete('/delete/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const { id } = req.params

        const deletedUser: User | null = await UserModel.findByIdAndDelete<User>(id)

        if (!deletedUser) {
            return res.status(500).send('Cannot delete user Please try again later')
        }

        res.status(200).send(deletedUser)
    } catch (error) {
        res.status(500).send('user Id is not valid')
    }
})

// show all the users in the admin
router.get('/allUser', verifyTokenAndAdmin, async (req, res) => {
    try {
        const allUser: User[] = await UserModel.find()

        if (!allUser) {
            return res.status(500).json('No users found ')
        }

        res.status(200).json(allUser)
    } catch (error) {
        res.status(500).json(error)
    }
})
// get single user for the logged user in the profile module
router.get('/single/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const singleUser: User | null = await UserModel.findById<User>(req.params.id)

        if (!singleUser) {
            return res.status(500).json('User not found')
        }

        res.status(200).json(singleUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

export const user = router;