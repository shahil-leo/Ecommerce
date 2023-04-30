import express from 'express'
import { verifyToken, verifyTokenAndAuthorization } from '../middlewares/verify';
import { cartModel } from '../models/cartSchema';
import { ObjectId } from 'mongodb'
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



export const cart = router