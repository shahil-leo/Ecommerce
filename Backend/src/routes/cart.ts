import { ObjectId } from 'mongodb';
import express from 'express'
import { verifyTokenAndAuthorization } from '../middlewares/verify';
import { cartModel } from '../models/cartSchema';
import { CartInterface } from '../interfaces/cart';
const router = express.Router();

// creating a cart
router.post('/create/:id/:productId', verifyTokenAndAuthorization, async (req, res) => {
    const newC = new cartModel<CartInterface>({
        userId: req.params.id,
        carts: req.body.item
    })
    const isCart: CartInterface[] = await cartModel.find({ userId: req.params.id })
    if (!(isCart)) {
        try {
            const newCart = await newC.save()
            if (!newCart) return res.status(500).json('cart not added to the db')
            return res.status(200).json(newCart)
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        const findUserCart: any = await cartModel.findOne(
            { "userId": new ObjectId(req.params.id), "carts._id": new ObjectId(req.params.productId) },
            { "carts.$": 1 }
        )
        if (findUserCart) {
            const updateUser = await cartModel.updateOne(
                { "userId": new ObjectId(req.params.id), "carts._id": new ObjectId(req.params.productId) },
                { $inc: { "carts.$.quantity": 1 } }
            )
            if (!updateUser) return res.status(500).json('no cart found')
            return res.status(200).json(updateUser)
        }
        const pushNewCart = await cartModel.findOneAndUpdate(
            { userId: req.params.id },
            { $push: { carts: req.body.item } },
            { new: true })
        if (!pushNewCart) return res.status(500).json('no new data added')
        return res.status(200).json(pushNewCart)
    }
})

router.post('/updateNumber/:id/:productId', verifyTokenAndAuthorization, async (req, res) => {
    const updatedQuantity: number | undefined = req.body.number
    const productId = req.params.productId
    const userId = req.params.id
    if (!(req.body.number)) {
        const findUserCart: CartInterface | null = await cartModel.findOne<CartInterface>(
            { "userId": new ObjectId(userId), "carts._id": new ObjectId(productId) },
            { "carts.$": 1 }
        )
        if (findUserCart) {
            const updateUser = await cartModel.updateOne<CartInterface>(
                { "userId": new ObjectId(userId), "carts._id": new ObjectId(productId) },
                { $inc: { "carts.$.quantity": 1 } }
            )
            if (!updateUser) return res.status(500).json('no cart found')
            return res.status(200).json(updateUser)
        }
    } else {
        const updateUser = await cartModel.updateOne<CartInterface>(
            { "userId": new ObjectId(userId), "carts._id": new ObjectId(productId) },
            { $set: { "carts.$.quantity": updatedQuantity } }
        )
        if (!updateUser) return res.status(500).json('no quantity updated ')
        res.status(200).json(updateUser)
    }
})

router.delete('/delete/:id/:productId', verifyTokenAndAuthorization, async (req, res) => {
    const { id, productId } = req.params
    try {
        const deletedProduct = await cartModel.updateOne({ "userId": new ObjectId(id) },
            { $pull: { "carts": { "_id": new ObjectId(productId) } } })
        if (!deletedProduct) return res.status(500).json('no cart is deleted')
        return res.status(200).json(deletedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/deleteAll/:id', verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.params
    try {
        const deleteAll = await cartModel.deleteOne({ userId: id })
        if (!deleteAll) return res.status(502).json('cannot delete full array')
        return res.status(200).json(deleteAll)
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get('/getCart/:id', verifyTokenAndAuthorization, async (req, res) => {
    const { id } = req.params
    try {
        const getCart = await cartModel.findOne<CartInterface>({ userId: id })
        if (!getCart) return res.status(500).json(getCart)
        res.status(200).json(getCart)
    } catch (e) {
        return res.status(500).json(e)
    }
})


export const cart = router