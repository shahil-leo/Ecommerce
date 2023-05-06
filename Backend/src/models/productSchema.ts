import { productInterface } from '../interfaces/product';
import mongoose from "mongoose";

const productSchema = new mongoose.Schema<productInterface>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    categories: {
        type: [],
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    prize: {
        type: Number,
        required: true
    },
    brand: {
        type: String,

    }
}, { timestamps: true })

export const productModel = mongoose.model('products', productSchema)