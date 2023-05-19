import express from 'express'
const router = express.Router()
import { orderModel } from '../models/orderSchema'
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middlewares/verify'
import { orderInterface } from '../interfaces/order'



router.post('/create/:id', verifyTokenAndAuthorization, async (req, res) => {
    const { amount } = req.body
    const userId = req.params.id
    const create: any = new orderModel({
        userId: userId,
        orders: req.body.orders,
        amount: amount
    })
    try {
        const order = await create.save()
        if (!order) return res.status(500).json('Order not done')
        return res.status(200).json(order)
    } catch (error) {
        return res.status(500).json(error)
    }
})


router.put('/update/:id/:orderId', verifyTokenAndAdmin, async (req, res) => {
    const data = 'success'
    const id = req.params.orderId
    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(id, { $set: { status: data } })
        if (!updatedOrder) return res.status(500).json('order not changed to approved')
        return res.status(200).json(updatedOrder)
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.delete('/delete/:id/:orderId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedOrder = await orderModel.findByIdAndDelete(req.params.orderId)
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