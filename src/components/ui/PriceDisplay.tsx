import { formatPrice } from '@/utils/calculateTotalWithDiscount'
import { PRICE_TEXT_SIZE_CLASS } from '@/enums/typography'

interface PriceDisplayProps {
    price: number
    originalPrice?: number
    size?: keyof typeof PRICE_TEXT_SIZE_CLASS
}

export const PriceDisplay = ({ price, originalPrice, size = 'md' }: PriceDisplayProps) => {
    return (
        <div className="flex flex-col gap-1">
            <span className={`font-bold text-blue-600 ${PRICE_TEXT_SIZE_CLASS[size]}`}>{formatPrice(price)}</span>
            {originalPrice && originalPrice !== price && (
                <span className="text-sm text-gray-500 line-through">{formatPrice(originalPrice)}</span>
            )}
        </div>
    )
}
