import { Document } from "mongoose"

export interface orderInterface extends Document {
    userId: string,
    orders: orderArray[]
    products: productsArray[]
    amount: number,
    status: string
}
interface productsArray {
    title: string,
    description: string,
    image: string,
    categories: category[]
    size: number,
    color: string,
    prize: number,
    brand: string,
    quantity: number
    _id: string
}
interface orderArray {
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    pincode: number,
    locality: string,
    address: string,
    city: string,
    state: string,
    landmark: String,
    alternativePhone: Number,
}
interface category {
    categories: string,
    categoryImg: string
}