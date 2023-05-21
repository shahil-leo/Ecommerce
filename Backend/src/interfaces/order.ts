
export interface orderInterface {
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
    categories: []
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
