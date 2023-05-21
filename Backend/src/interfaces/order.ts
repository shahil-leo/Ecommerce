export interface orderInterface {
    userId: string;
    orders: orderArray[];
    amount: number;
    status: string;
}


interface orderArray {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    pincode: number;
    locality: string;
    address: string;
    city: string;
    state: string;
    landmark: string;
    alternativePhone: number;
    products: productsArray[];
}

export interface productsArray {
    title: string;
    description: string;
    image: string;
    categories: string[];
    size: number;
    color: string;
    prize: number;
    brand: string;
    quantity: number;
    _id: string;
}
