import express from 'express'
const router = express.Router()
import { UserModel } from '../models/userSchema';
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middlewares/verify';

router.put('/update/:id', verifyTokenAndAuthorization, async (req, res) => {
    const { error } = req.body
    if (error) return res.status(500).json(error)
    const { id } = req.params
    const data = req.body

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: data }, { new: true })
        if (!updatedUser) return res.status(504).send('Cannot updated database please try again later')
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).send(error)
    }

})

router.delete('/delete/:id', verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.params
    const { error } = req.body
    if (error) return res.status(500).json(error[0].message)
    try {
        const deletedUser = await UserModel.findByIdAndDelete(id)
        if (!deletedUser) return res.status(500).send('Cannot delete user try after some times')
        res.status(200).send(deletedUser)
    } catch (error) {
        res.status(500).send('user Id is not valid')
    }
})

router.get('/singleUser/:id', verifyTokenAndAdmin, async (req, res) => {
    const { id } = req.params
    try {
        const singleUser = await UserModel.findById(id)
        if (!singleUser) return res.status(500).json('there is no user with this id')
        res.status(200).json(singleUser)
    } catch (error) {
        res.status(200).json(error)
    }
})
router.get('/allUser', verifyTokenAndAdmin, async (req, res) => {
    try {
        const allUser = await UserModel.find()
        if (!allUser) return res.status(500).json('there are no users ')
        res.status(200).json(allUser)
    } catch (error) {
        res.status(200).json(error)
    }
})




export const user = router;