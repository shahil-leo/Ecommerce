import { orderInterface } from './../interfaces/order';

import mongoose, { Model, Schema } from 'mongoose'

const orderSchema: Schema<orderInterface> = new mongoose.Schema({
    userId: { type: String, required: true },
    orders: [{
        firstName: { type: String },
        lastName: { type: String, requried: true },
        email: { type: String, requried: true },
        phone: { type: Number, requried: true },
        pincode: { type: Number, requried: true },
        locality: { type: String, requried: true },
        address: { type: String, requried: true },
        city: { type: String, requried: true },
        state: { type: String, requried: true },
        landmark: String,
        alternativePhone: Number,
        products: [{
            title: { type: String, required: true },
            description: { type: String, requried: true },
            image: { type: String, requried: true },
            categories: [],
            size: { type: Number },
            color: { type: String },
            prize: { type: Number },
            brand: { type: String },
            quantity: { type: Number },
            _id: { type: String },
        }]
    }],
    amount: {
        type: Number,
        required: true
    },
    status: { type: String, required: true, default: 'pending' },
}, { timestamps: true })

export const orderModel: Model<orderInterface> = mongoose.model<orderInterface>('orders', orderSchema)
