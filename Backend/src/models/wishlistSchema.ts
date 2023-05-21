import mongoose, { Model, Schema } from "mongoose";
import { wishListInterface } from "../interfaces/All";
const wishListSchema: Schema<wishListInterface> = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    wishList: [
        {
            title: { type: String, required: true },
            description: { type: String, required: true },
            image: { type: String, required: true },
            categories: { type: Array, required: true },
            size: { type: Number, required: true },
            color: { type: String, required: true },
            prize: { type: Number, required: true },
            brand: { type: String, required: true },
            quantity: { type: Number, required: true }
        }
    ]
}, { timestamps: true })

export const wishListModel: Model<wishListInterface> = mongoose.model<wishListInterface>('wishList', wishListSchema)
