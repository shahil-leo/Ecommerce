import { orderInterface } from '../interfaces/order';
import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
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
        alternativePhone: Number
    }],
    amount: {
        type: Number,
        required: true
    },
    status: { type: String, required: true, default: 'pending' },
}, { timestamps: true })

export const orderModel = mongoose.model('orders', orderSchema)

// Address
// : 
// "Asherikandi parambu p.o arakkinar"
// alternativePhone
// : 
// ""
// city
// : 
// "Kozhikode"
// email
// : 
// "shahilkv123@proton.me"
// firstName
// : 
// "muhamme"
// landmark
// : 
// ""
// lastName
// : 
// "k.v"
// locality
// : 
// "Asherikandi parambu p.o arakkinar"
// phone
// : 
// 9846786928
// pincode
// : 
// 673028
// state
// : 
// "kerala"