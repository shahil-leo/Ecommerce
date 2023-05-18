import mongoose from 'mongoose'
import { categoryInterface } from '../interfaces/product'

const categorySchema = new mongoose.Schema<categoryInterface>({
    categories: {
        type: String,
        required: true
    },
    categoryImg: {
        type: String,
        required: true
    }
})

export const categoryModel = mongoose.model('categories', categorySchema)
