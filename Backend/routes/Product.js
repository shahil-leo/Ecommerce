const express = require('express')
const router = express.Router()
const productModel = require('../models/productModel')
const { ObjectId } = require('mongodb');
// creating user
router.post('/create', async (req, res) => {
    const product = new productModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        categories: req.body.categories,

    })
    try {
        const savedProduct = await product.save()
        if (!savedProduct) return res.status(400).send("erroring in saving db")
        res.status(200).send(savedProduct)
    } catch (e) {
        console.log(e)
    }
})




module.exports = router