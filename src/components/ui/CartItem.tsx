import { useEffect, useRef, useState } from 'react'
import type { CartItem as CartItemType } from '@/types'
import { useCart } from '@/store/cartStore'
import { PriceDisplay } from '@/components/ui/PriceDisplay'
import { IconButton } from '@/components/base/IconButton'
import trashIcon from '@/assets/icons/trash.svg'
import { animateCartItemEnter, animateCartItemExit } from '@/utils/animations.ts'

interface CartItemProps {
    item: CartItemType
}

export const CartItem = ({ item }: CartItemProps) => {
    const { updateQuantity, removeItem } = useCart()
    const itemTotal = item.product.price * item.quantity
    const discountedTotal = item.quantity > 5 ? itemTotal * 0.9 : itemTotal
    const itemRef = useRef<HTMLDivElement>(null)
    const [isRemoving, setIsRemoving] = useState(false)
    type CartItemTween = ReturnType<typeof animateCartItemEnter>
    const enterTweenRef = useRef<CartItemTween | null>(null)
    const exitTweenRef = useRef<CartItemTween | null>(null)

    useEffect(() => {
        if (!itemRef.current) return
        enterTweenRef.current = animateCartItemEnter(itemRef.current)

        return () => {
            enterTweenRef.current?.kill()
            exitTweenRef.current?.kill()
        }
    }, [])

    const handleRemove = () => {
        if (isRemoving) return
        setIsRemoving(true)

        if (!itemRef.current) return

        exitTweenRef.current?.kill()
        exitTweenRef.current = animateCartItemExit(itemRef.current, () => removeItem(item.product.id))
    }

    return (
        <div
            ref={itemRef}
            className="flex gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
            <div className="flex-shrink-0 self-center">
                <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded"
                />
            </div>

            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">{item.product.title}</h4>
                <p className="text-sm text-gray-600">
                    {item.quantity > 5 && <span className="text-green-600 font-semibold">10% discount applied</span>}
                </p>

                <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden divide-x divide-gray-200 h-10">
                        <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2.5 h-full text-gray-600 hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>
                        <span className="px-3 h-full min-w-[32px] flex items-center justify-center text-center font-semibold">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2.5 h-full text-gray-600 hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-end gap-2">
                <PriceDisplay
                    price={discountedTotal}
                    originalPrice={item.quantity > 5 ? itemTotal : undefined}
                    size="sm"
                />
                <IconButton
                    onClick={handleRemove}
                    label={`Remove ${item.product.title} from cart`}
                    className="p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50"
                    icon={<img src={trashIcon} alt="" className="w-5 h-5" />}
                />
            </div>
        </div>
    )
}
