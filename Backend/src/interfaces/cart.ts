import { Document } from "mongoose";

export interface CartInterface extends Document {
    userId: string,
    carts: CartItem[];
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



