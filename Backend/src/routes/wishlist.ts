import { Router } from "express";
import { ObjectId } from 'mongodb';
import { wishListInterface } from "../interfaces/All";
import { verifyTokenAndAuthorization } from "../middlewares/verify";
import { wishListModel } from "../models/wishlistSchema";

const router = Router()

router.post('/create/:id/:productId', verifyTokenAndAuthorization, async (req, res) => {
    const { id, productId } = req.params
    const { item } = req.body
    const newWish = new wishListModel<wishListInterface>({
        userId: id,
        wishList: item
    })

    const isCart: wishListInterface[] = await wishListModel.find({ userId: id })
    if (isCart.length === 0) {
        try {
            const newCart = await newWish.save()
            if (!newCart) return res.status(500).json('wishlist item not added to the db')
            return res.status(200).json(newCart)
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        const findUserCart: any = await wishListModel.findOne(
            { "userId": new ObjectId(id), "wishList._id": new ObjectId(productId) },
            { "wishList.$": 1 }
        )
        if (findUserCart) {
            return res.status(500).json('already added to wishlist')
        } else {
            const pushNewCart = await wishListModel.findOneAndUpdate(
                { userId: id },
                { $push: { wishList: item } },
                { new: true })
            if (!pushNewCart) return res.status(500).json('no new data added')
            return res.status(200).json(pushNewCart)
        }
    }

})

router.get('/get/:id', verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.params
    try {
        const getCart = await wishListModel.findOne<wishListInterface>({ userId: id })
        if (!getCart) return res.status(500).json(getCart)
        res.status(200).json(getCart)
    } catch (e) {
        return res.status(500).json(e)
    }
})
router.delete('/delete/:id/:productId', verifyTokenAndAuthorization, async (req, res) => {
    const { id, productId } = req.params
    try {
        const deletedProduct = await wishListModel.updateOne({ "userId": new ObjectId(id) },
            { $pull: { "wishList": { "_id": new ObjectId(productId) } } })
        if (!deletedProduct) return res.status(500).json('no cart is deleted')
        return res.status(200).json(deletedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/deleteAll/:id', verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.params
    try {
        const deleteAll = await wishListModel.deleteOne({ userId: id })
        if (!deleteAll) return res.status(502).json('cannot delete full array')
        return res.status(200).json(deleteAll)
    } catch (error) {
        return res.status(500).json(error)
    }
})
export const wishlist = router