
export interface CartInterface {
    id?: string
    userId: string,
    carts: CartItem[];
    createdAt?: number
    updatedAt?: number
}
interface CartItem {
    title: string;
    description: string;
    image: string;
    categories: string[];
    size: number;
    color: string;
    prize: number;
    brand: string;
    quantity: number;
}





