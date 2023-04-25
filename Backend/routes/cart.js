const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')
const { ObjectId } = require('mongodb')
const productModel = require('../models/productModel')

let cartProductsArray = [];
router.post('/create/:userId/:Id', async (req, res) => {
    const id = req.params.Id
    const userId = req.params.userId
    console.log({ id, userId })
    const addCart = await userModel.updateOne(
        { _id: new ObjectId(userId) },
        { $push: { cart: id } }
    )
    if (!addCart) return res.status(505).send('Not setted')
    res.status(200).send(addCart)
})
router.get('/every/:userId', async (req, res) => {
    const userId = req.params.userId
    const CartUser = await userModel.findOne({ _id: new ObjectId(userId) }, { cart: 1 })
    if (!CartUser) return res.status(505).send('no cart available')
    res.status(200).send(CartUser)
})

router.get('/delete/:userId/:id', async (req, res) => {
    const userId = req.params.userId
    const ids = req.params.id
    const DeleteCart = await userModel.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { cart: ids } }
    )
    if (!DeleteCart) return res.status(505).send('Cannot delete object')
    res.status(200).send(DeleteCart)
})

router.get('/single/:userId', async (req, res) => {
    const userId = req.params.userId
    const singleUser = await userModel.findOne({ _id: new ObjectId(userId) }, { cart: 1 })
    if (!singleUser) return res.status(500).send('No cart available to show')
    for (let index = 0; index < singleUser.cart.length; index++) {
        const element = singleUser.cart[index];
        const singleProduct = await productModel.findById(element)
        if (!singleProduct) return res.status(500).send('no such products')
        cartProductsArray.push(singleProduct)
    }
    console.log(cartProductsArray);
    res.status(200).send(cartProductsArray)
})

module.exports = router