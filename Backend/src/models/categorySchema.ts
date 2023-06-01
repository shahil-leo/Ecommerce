import mongoose, { Model, Schema } from 'mongoose';
export interface categoryInterface {
    categories: string
    categoryImg: string
}

const categorySchema: Schema<categoryInterface> = new mongoose.Schema({
    categories: {
        type: String,
        required: true
    },
    categoryImg: {
        type: String,
        required: true
    }
})

export const categoryModel: Model<categoryInterface> = mongoose.model<categoryInterface>('Category', categorySchema);
