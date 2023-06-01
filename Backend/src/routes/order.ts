import dotenv from 'dotenv';
import express from 'express';
import { ObjectId } from 'mongodb';
import Stripe from 'stripe';
import { transport } from '../configs/nodeMailer.config';
import { orderInterface, productsArray } from '../interfaces/order';
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middlewares/verify';
import { orderModel } from '../models/orderSchema';
dotenv.config()

const router = express.Router()
const stripeKey = process.env.stripe_key as string
const stripe = new Stripe(stripeKey, {
    apiVersion: '2022-08-01'
});
// creating a order
router.post('/create/:id', verifyTokenAndAuthorization, async (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, email, phone, pincode, locality, Address, city, state, landmark, alternativePhone } = req.body.orders
    const orders = new orderModel<orderInterface>({
        userId: userId,
        orders: [
            {
                firstName,
                lastName,
                email,
                phone,
                pincode,
                locality,
                address: Address as string,
                city,
                state,
                landmark,
                alternativePhone: alternativePhone as number,
                products: req.body.products.map((product: productsArray) => ({
                    title: product.title,
                    description: product.description,
                    image: product.image,
                    categories: product.categories,
                    size: product.size,
                    color: product.color,
                    prize: product.prize,
                    brand: product.brand,
                    quantity: product.quantity,
                    _id: product._id,
                })),
            },
        ],
        amount: req.body.amount,
        status: 'pending',
    });

    try {
        const order = await orders.save();

        if (!order) {
            throw new Error('Order not done.Please wait server error')
        }

        return res.status(200).json(order);

    } catch (error) {
        return res.status(500).json(error);
    }
});

// update the order status to success or pending
router.put('/update/:id/:orderId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const { id, orderId } = req.params
        const { data } = req.body
        const updatedOrder = await orderModel.updateOne<orderInterface>(
            {
                _id: new ObjectId(orderId),
                userId: id
            },
            { $set: { status: data } }
        )

        if (!updatedOrder) {
            throw new Error('order not changed to approved')
        }

        return res.status(200).json(updatedOrder)

    } catch (error) {
        return res.status(500).json(error)
    }
})
// deleting one order
router.delete('/delete/:id/:orderId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const { orderId } = req.params

        const deletedOrder = await orderModel.findByIdAndDelete(orderId)

        if (!deletedOrder) {
            throw new Error('did not deleted the order')
        }

        return res.status(200).json(deletedOrder)

    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get('/user/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {

        const { id } = req.params

        const getOneUser = await orderModel.find({ userId: id })

        if (!getOneUser) {
            throw new Error('no orders')
        }

        return res.status(200).json(getOneUser)

    } catch (error) {
        return res.status(500).json(error)
    }
})

router.get('/oneProduct/:id', verifyTokenAndAdmin, async (req, res) => {
    const { id } = req.params
    try {
        const getOneUser = await orderModel.findOne({ _id: new ObjectId(id) })
        if (!getOneUser) return res.status(500).json('no orders')
        return res.status(200).json(getOneUser)
    } catch (error) {
        return res.status(500).json(error)
    }
})
// getting all the orders
router.get('/all', verifyTokenAndAdmin, async (req, res) => {
    try {

        const allOrders = await orderModel.find()

        if (!allOrders) {
            throw new Error("no orders found");
        }

        return res.status(200).json(allOrders)

    } catch (error) {
        return res.status(500).json(error)
    }
})
// getting some orders for the hero sections in the admin
router.get('/allSome', verifyTokenAndAdmin, async (req, res) => {
    try {

        const allOrders = await orderModel.find().limit(3)
        if (!allOrders) {
            throw new Error('no orders found')
        }

        return res.status(200).json(allOrders)

    } catch (error) {
        return res.status(500).json(error)
    }
})
router.post('/stripe/:id', verifyTokenAndAuthorization, async (req, res) => {
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
            line_items: req.body.productArray.map((item: productsArray) => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.title,
                        images: [item.image]
                    },
                    unit_amount: item.prize * 100
                },
                quantity: item.quantity
            })),
            mode: 'payment',
            success_url: 'http://localhost:4000/success.html',
            cancel_url: 'http://localhost:4000/cancel.html',
        });
        if (session) {
            const message = {
                from: 'mshahilk28@gmail.com',
                to: 'mshahilkv@gmail.com',
                subject: 'New Order',
                text: 'New order from zauj.web.app',
                html: ` a new person order some products go and checkout in the orders admin panel  </a>`
            }
            transport.sendMail(message, (error: any, info: any) => {
                if (error) {
                    return res.status(500).json('Mail not working')
                }
            });
        }
        return res.status(200).json(session)
    } catch (error) {
        return res.status(500).json(error)
    }
})

export const order = router