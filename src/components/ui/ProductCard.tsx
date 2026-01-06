import { useState } from 'react'
import type { Product } from '@/types'
import { useCart } from '@/store/cartStore'
import { Button } from '@/components/base/Button'
import { PriceDisplay } from '@/components/ui/PriceDisplay'

interface ProductCardProps {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const [quantity, setQuantity] = useState(1)
    const addItem = useCart((state) => state.addItem)

    const handleAddToCart = () => {
        addItem(product, quantity)
        setQuantity(1)
    }

    return (
        <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden h-full flex flex-col">
            <div className="relative bg-gray-200 aspect-square overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{product.description}</p>
                <div className="mb-4">
                    <PriceDisplay price={product.price} />
                </div>
                <div className="flex gap-2 items-stretch">
                    <div className="flex items-center border border-gray-300 rounded-lg h-11 bg-white overflow-hidden divide-x divide-gray-200">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-3 h-full text-gray-600 hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>
                        <span className="px-3 h-full min-w-[40px] flex items-center justify-center text-center font-semibold">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-3 h-full text-gray-600 hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>
                    <Button
                        variant="primary"
                        size="md"
                        onClick={handleAddToCart}
                        className="flex-1 h-11"
                        aria-label={`Add ${quantity} ${product.title} to cart`}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
        </article>
    )
}
