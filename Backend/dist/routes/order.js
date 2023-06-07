"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.order = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const stripe_1 = __importDefault(require("stripe"));
const nodeMailer_config_1 = require("../configs/nodeMailer.config");
const verify_1 = require("../middlewares/verify");
const orderSchema_1 = require("../models/orderSchema");
dotenv_1.default.config();
const router = express_1.default.Router();
const stripeKey = process.env.stripe_key;
const stripe = new stripe_1.default(stripeKey, {
    apiVersion: '2022-08-01'
});
// creating a order
router.post('/create/:id', verify_1.verifyTokenAndAuthorization, async (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, email, phone, pincode, locality, Address, city, state, landmark, alternativePhone } = req.body.orders;
    const orders = new orderSchema_1.orderModel({
        userId: userId,
        orders: [
            {
                firstName,
                lastName,
                email,
                phone,
                pincode,
                locality,
                address: Address,
                city,
                state,
                landmark,
                alternativePhone: alternativePhone,
                products: req.body.products.map((product) => ({
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
            throw new Error('Order not done.Please wait server error');
        }
        return res.status(200).json(order);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
// update the order status to success or pending
router.put('/update/:id/:orderId', verify_1.verifyTokenAndAdmin, async (req, res) => {
    try {
        const { id, orderId } = req.params;
        const { data } = req.body;
        const updatedOrder = await orderSchema_1.orderModel.updateOne({
            _id: new mongodb_1.ObjectId(orderId),
            userId: id
        }, { $set: { status: data } });
        if (!updatedOrder) {
            throw new Error('order not changed to approved');
        }
        return res.status(200).json(updatedOrder);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
// deleting one order
router.delete('/delete/:id/:orderId', verify_1.verifyTokenAndAdmin, async (req, res) => {
    try {
        const { orderId } = req.params;
        const deletedOrder = await orderSchema_1.orderModel.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            throw new Error('did not deleted the order');
        }
        return res.status(200).json(deletedOrder);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
router.get('/user/:id', verify_1.verifyTokenAndAuthorization, async (req, res) => {
    try {
        const { id } = req.params;
        const getOneUser = await orderSchema_1.orderModel.find({ userId: id });
        if (!getOneUser) {
            throw new Error('no orders');
        }
        return res.status(200).json(getOneUser);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
router.get('/oneProduct/:id', verify_1.verifyTokenAndAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        const getOneUser = await orderSchema_1.orderModel.findOne({ _id: new mongodb_1.ObjectId(id) });
        if (!getOneUser)
            return res.status(500).json('no orders');
        return res.status(200).json(getOneUser);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
// getting all the orders
router.get('/all', verify_1.verifyTokenAndAdmin, async (req, res) => {
    try {
        const allOrders = await orderSchema_1.orderModel.find();
        if (!allOrders) {
            throw new Error("no orders found");
        }
        return res.status(200).json(allOrders);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
// getting some orders for the hero sections in the admin
router.get('/allSome', verify_1.verifyTokenAndAdmin, async (req, res) => {
    try {
        const allOrders = await orderSchema_1.orderModel.find().limit(3);
        if (!allOrders) {
            throw new Error('no orders found');
        }
        return res.status(200).json(allOrders);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
router.post('/stripe/:id', verify_1.verifyTokenAndAuthorization, async (req, res) => {
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
            line_items: req.body.productArray.map((item) => ({
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
            };
            nodeMailer_config_1.transport.sendMail(message, (error, info) => {
                if (error) {
                    return res.status(500).json('Mail not working');
                }
            });
        }
        return res.status(200).json(session);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.order = router;
