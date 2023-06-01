import mongoose, { Model, Schema } from "mongoose";


export interface productInterface {
    title: string
    description: string
    image: string
    categories: string[]
    size: number
    color: string
    prize: number
    brand: string
    quantity: number
}




const productSchema: Schema<productInterface> = new mongoose.Schema({
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
        type: [String],
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

    },
    quantity: {
        type: Number,
        default: 1
    }

}, { timestamps: true })

export const productModel: Model<productInterface> = mongoose.model<productInterface>('products', productSchema)