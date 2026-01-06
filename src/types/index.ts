export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartSummary {
    subtotal: number;
    discountAmount: number;
    total: number;
    itemCount: number;
}
