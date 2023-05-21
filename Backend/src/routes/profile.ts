import { Router } from "express";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/verify";
import { UserModel } from "../models/userSchema";

const router = Router()

router.get('/get/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const User = await UserModel.findById(req.params.id)
        if (!User) return res.status(500).json('No User found')
        return res.status(200).send(User)
    } catch (error) {
        return res.status(500).json(error)
    }

})
router.get('/getAll/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const everyUser = await UserModel.find()
        if (!everyUser) return res.status(500).json('NO users are logged in all')
        return res.status(200).json(everyUser)
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.delete('/delete/:id', verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.params
    try {
        const profileDeleted = await UserModel.findByIdAndDelete(id)
        if (!profileDeleted) return res.status(500).json('No user deleted')
        return res.status(200).json(profileDeleted)
    } catch (errors) {
        return res.status(500).json(errors)
    }
})

router.delete('/deleteEvery', verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedEvery = await UserModel.deleteMany()
        if (!deletedEvery) return res.status(500).json('every user cannot delete')
        return res.status(200).json()
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.put('/update/:id', verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.params
    try {
        const updated = await UserModel.findByIdAndUpdate(id, { $set: { email: req.body.email } })
        if (!updated) return res.status(500).json('every user cannot delete')
        return res.status(200).json(updated)
    } catch (error) {
        return res.status(500).json(error)
    }
})
export const profile = router;