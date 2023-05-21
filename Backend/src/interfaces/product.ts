
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
export interface categoryInterface extends Document {
    categories: string
    categoryImg: string
}

