import { ObjectId } from 'mongodb';
import express from 'express'
import { verifyToken, verifyTokenAndAuthorization } from '../middlewares/verify';
import { cartModel } from '../models/cartSchema';
import { cartInterface } from '../interfaces/cart';
import { productModel } from '../models/productSchema';
const router = express.Router();


router.post('/create/:id/:productId', verifyTokenAndAuthorization, async (req, res) => {
    const id: string = req.params.id
    const quantity = req.body.Number
    // this is the new creation of the data using the userId and the userId is the id for the user and the products array contains of all the products in them
    // this is the cart for the every new cart in the model everytime a user creates a new cart he will have a new cart like this
    const newCart = new cartModel<cartInterface>({
        userId: id,
        products: [
            {
                productId: req.params.productId,
                quantity: 1,
            },
        ]
    })
    // then after a cart is added then the next thing is new products we want to add into the new product section
    const newProduct = {
        productId: req.params.productId,
        quantity: 1,
    }
    // then we are doing the logic  hear
    // first we will check any cart is available for the user if there is then we will add new one  using the if condition if the cart is null we will create a new cart here
    const cart = await cartModel.findOne({ userId: id, })

    try {
        if (cart === null) {
            const cartCreate = await newCart.save()
            if (!cartCreate) return res.status(500).json('DB error cannot create cart')
            return res.status(200).json(cartCreate)
        } else {
            // if the user have a cart already then we will go to the next condition that is we will check that the 
            const product = await cartModel.findOne(
                {
                    userId: id,
                    "products.productId": req.params.productId
                },
                {
                    "products.$": 1
                }
            )
            console.log(product)
            if (product) {
                //  if there is a cart and one product inside this we will check it the productId is matching if the productId is matching we will increase the quantity
                const updatedQuantity = await productModel.updateOne(
                    { "_id": req.params.productId },
                    { $set: { quantity: quantity } }
                )
                if (!updatedQuantity) return res.status(500).json('not updated quantity')
                return res.status(200).json(updatedQuantity)
            } else {
                // if there is no product available then we will push we object into the products array as a new cart
                const insertProduct = await cartModel.updateOne({ userId: id },
                    { $push: { products: newProduct } })
                if (!insertProduct) res.status(500).json('products not add')
                const updatedQuantity = await productModel.updateOne(
                    { "_id": req.params.productId },
                    { $set: { quantity: quantity } }
                )
                if (!updatedQuantity) return res.status(500).json('not updated quantity')
                return res.status(200).json(updatedQuantity)

            }
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.delete('/delete/:id/:productId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deletedProduct = await cartModel.updateOne({ userId: req.params.id },
            { $pull: { products: { productId: req.params.productId } } })
        res.send(deletedProduct)
    } catch (error) {
        res.status(500).json(error)
    }

})


router.delete('/deleteAll/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deleteAll = await cartModel.deleteOne({ userId: req.params.id })
        if (!deleteAll) return res.status(502).json('cannot delete full array')
        return res.status(200).json(deleteAll)
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.get('/getCart/:id', verifyTokenAndAuthorization, async (req, res) => {
    console.log(req.params.id)
    try {
        const getCart = await cartModel.find({ userId: req.params.id })
        if (!getCart) return res.status(500).json(getCart)
        res.status(200).json(getCart)
    } catch (e) {
        console.log(e)
    }
})


export const cart = router