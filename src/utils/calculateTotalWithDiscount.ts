import type { CartItem, CartSummary } from '@/types';

const DISCOUNT_THRESHOLD = 5;
const DISCOUNT_PERCENTAGE = 0.1;

export function calculateTotalWithDiscount(items: CartItem[]): CartSummary {
    let subtotal = 0;
    let discountAmount = 0;

    items.forEach(item => {
        const itemTotal = item.product.price * item.quantity;

        if (item.quantity > DISCOUNT_THRESHOLD) {
            const discountedTotal = itemTotal * (1 - DISCOUNT_PERCENTAGE);
            const itemDiscount = itemTotal - discountedTotal;
            discountAmount += itemDiscount;
            subtotal += discountedTotal;
        } else {
            subtotal += itemTotal;
        }
    });

    const total = subtotal;
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
        subtotal: subtotal + discountAmount,
        discountAmount,
        total,
        itemCount,
    };
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('uk-UA', {
        style: 'currency',
        currency: 'UAH',
        maximumFractionDigits: 2,
    }).format(price);
}
