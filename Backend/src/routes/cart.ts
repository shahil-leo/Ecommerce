import { ObjectId } from 'mongodb';
import express from 'express'
import { verifyTokenAndAuthorization } from '../middlewares/verify';
import { cartModel } from '../models/cartSchema';
import { cartInterface } from '../interfaces/cart';
const router = express.Router();


router.post('/create/:id', verifyTokenAndAuthorization, async (req, res) => {
    const id = req.params.id
    const newCart = new cartModel<cartInterface>({
        userId: id,
        products: [
            {
                productId: req.body.products[0].productId,
                quantity: req.body.products[0].quantity
            }
        ]
    })
    const newProduct = { productId: req.body.products[0].productId, quantity: req.body.products[0].quantity }
    const cart = await cartModel.find({ userId: id })
    try {
        if (cart.length === 0) {
            const cartCreate = await newCart.save()

            if (!cartCreate) return res.status(500).json('DB error cannot create cart')
            return res.status(200).json(cartCreate)
        } else {
            const insertProduct = await cartModel.updateOne({ userId: id },
                { $push: { products: newProduct } })
            if (!insertProduct) res.status(500).json('products not addd')
            return res.status(200).json(insertProduct)
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.post('/delete/:id/:productId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deletedProduct = await cartModel.updateOne({ userId: req.params.id },
            { $pull: { products: { productId: req.params.productId } } })
        res.send(deletedProduct)
    } catch (error) {
        res.status(500).json(error)
    }

})


router.post('/deleteAll/:id', verifyTokenAndAuthorization, async (req, res) => {
    console.log(req.params.id)
    try {
        const deleteAll = await cartModel.deleteOne({ userId: req.params.id })
        if (!deleteAll) return res.status(502).json('cannot delete full array')
        return res.status(200).json(deleteAll)
    } catch (error) {
        return res.status(500).json(error)
    }
})



export const cart = router