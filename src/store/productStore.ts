import { create } from 'zustand';
import type { Product } from '@/types';

const DEMO_PRODUCTS: Product[] = [
    {
        id: '1',
        title: 'Premium Wireless Headphones',
        description:
            'High-quality sound with noise cancellation. Perfect for music lovers.',
        price: 4999,
        image:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    },
    {
        id: '2',
        title: 'Smart Watch Pro',
        description:
            'Monitor your health with advanced sensors and all-day battery life.',
        price: 8999,
        image:
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    },
    {
        id: '3',
        title: 'Ultra HD Camera',
        description:
            'Capture stunning 4K video with professional-grade stabilization.',
        price: 12999,
        image:
            'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop',
    },
    {
        id: '4',
        title: 'Portable Speaker',
        description:
            'Crystal clear sound in a compact design. Water-resistant and durable.',
        price: 2499,
        image:
            'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
    },
    {
        id: '5',
        title: 'Gaming Laptop',
        description:
            'High-performance machine for gaming and professional work.',
        price: 89999,
        image:
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop',
    },
    {
        id: '6',
        title: 'Wireless Charger',
        description:
            'Fast charging for all compatible devices. Sleek minimalist design.',
        price: 1999,
        image:
            'https://images.unsplash.com/photo-1580894908361-967195033215?w=400&h=300&fit=crop',
    },
];

interface ProductStore {
    products: Product[];
    getProducts: () => Product[];
    getProductById: (id: string) => Product | undefined;
}

export const useProducts = create<ProductStore>(() => ({
    products: DEMO_PRODUCTS,

    getProducts: () => DEMO_PRODUCTS,

    getProductById: (id: string) => {
        return DEMO_PRODUCTS.find(product => product.id === id);
    },
}));
