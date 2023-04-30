import { cartInterface } from './../interfaces/cart';
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema<cartInterface>({
    userId: {
        type: String,
        required: true
    },
    products: [
        {

            productId: {
                type: String,
                unique: true,
                required: true,
            },

            quantity: {
                type: Number,
                default: 1,
                required: true
            }
        }




    ]
}, { timestamps: true })

export const cartModel = mongoose.model('cart', cartSchema)