import Stripe from 'stripe'
import express from 'express'
const router = express.Router()
import { orderModel } from '../models/orderSchema'
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middlewares/verify'
import { orderInterface } from '../interfaces/order'
import dotenv from 'dotenv'
dotenv.config()
const stripeKey: any = process.env.stripe_key
const stripe = new Stripe(stripeKey, {
    apiVersion: '2022-08-01'
});


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
router.post('/stripe/:id', verifyTokenAndAuthorization, async (req, res) => {
    console.log(req.body)
    try {
        const session = await stripe.checkout.sessions.create({

            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'inr',
                        },
                        display_name: 'Free shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 4900,
                            currency: 'inr',
                        },
                        display_name: 'Next day air',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 1,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 1,
                            },
                        },
                    },
                },
            ],
            line_items: req.body.productArray.map((item: any) => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.title,
                        images: [item.product]
                    },
                    unit_amount: item.prize * 100
                },
                quantity: item.quantity
            })),
            mode: 'payment',
            success_url: 'http://localhost:4000/success.html',
            cancel_url: 'http://localhost:4000/cancel.html',
        });
        console.log(session)
        return res.status(200).json(session)
    } catch (error) {
        return res.status(500).json(error)
    }
})

export const order = router