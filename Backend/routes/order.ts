import express from 'express'
const router = express.Router()
import { orderModel } from '../models/orderSchema'
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middlewares/verify'
import { orderInterface } from '../interfaces/order'

router.post('/create/:id', verifyTokenAndAuthorization, async (req, res) => {
    const createOrder = new orderModel<orderInterface>({
        userId: req.params.id,
        products: req.body.products,
        address: req.body.address,
        amount: req.body.amount,
        status: req.body.status
    })
    try {

        const product = await createOrder.save()
        if (!product) return res.status(500).json('Order not done')
        return res.status(200).json(product)
    } catch (error) {
        return res.status(502).json(error)
    }

})

router.put('/update/:id', verifyTokenAndAdmin, async (req, res) => {
    const data = req.body
    console.log(data)
    try {
        const updatedOrder = await orderModel.updateOne(
            { userId: req.params.id },
            { $set: data }
        )
        if (!updatedOrder) return res.status(500).json('orders not updated')
        return res.status(200).json(updatedOrder)
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.delete('/delete/:id', verifyTokenAndAdmin, async (req, res) => {
    try {

        const deletedOrder = await orderModel.deleteOne({ userId: req.params.id })
        if (!deletedOrder) return res.status(500).json('did not deleted the order')
        return res.status(200).json(deletedOrder)
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get('/user/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const getOneUser = await orderModel.find({ userId: req.params.id })
        if (!getOneUser) return res.status(500).json('no orders')
        return res.status(200).json(getOneUser)
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get('/all', verifyTokenAndAdmin, async (req, res) => {
    try {
        const allOrders = await orderModel.find()
        if (!allOrders) return res.status(400).json('no orders found')
        return res.status(200).json(allOrders)
    } catch (error) {
        return res.status(500).json(error)
    }
})

export const order = router