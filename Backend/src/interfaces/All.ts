export interface recovery {
    email: string,
    password: string
}

export interface wishListInterface {
    id?: string
    userId: string,
    wishList: wishListItem[];
    createdAt?: number
    updatedAt?: number
}
interface wishListItem {
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

