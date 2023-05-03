import { orderInterface } from '../interfaces/order';
import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema<orderInterface>({
    userId: { type: String, required: true },
    products: [{
        productId: { type: String, required: true },
        quantity: { type: Number, required: true }
    }],
    amount: {
        type: Number,
        required: true
    },
    address: { type: Object, required: true },
    status: { type: String, required: true, default: 'pending' }
})

export const orderModel = mongoose.model('orders', orderSchema)