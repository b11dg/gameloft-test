import { useCart } from '@/store/cartStore'
import { Button } from '@/components/base/Button'
import { Modal } from '@/components/layout/Modal'
import { CartItem as CartItemComponent } from '@/components/ui/CartItem'
import { formatPrice } from '@/utils/calculateTotalWithDiscount'

interface CartModalProps {
    isOpen: boolean
    onClose: () => void
}

export const CartModal = ({ isOpen, onClose }: CartModalProps) => {
    const { items, clearCart, getSummary } = useCart()
    const summary = getSummary()

    const handleCheckout = () => {
        if (items.length === 0) return
        alert('Thanks for your purchase! This is a demo app. In a real app, payment integration would go here.')
        clearCart()
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Shopping Cart">
            {items.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">Your cart is empty</p>
                    <Button variant="primary" onClick={onClose}>
                        Continue Shopping
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-1 pb-1 bg-white">
                        {items.map((item) => (
                            <CartItemComponent key={item.product.id} item={item} />
                        ))}
                    </div>

                    <div className="pt-4 space-y-2">
                        <div className="flex justify-between text-gray-700">
                            <span>Subtotal:</span>
                            <span>{formatPrice(summary.subtotal)}</span>
                        </div>

                        {summary.discountAmount > 0 && (
                            <div className="flex justify-between text-green-600 font-semibold">
                                <span>Discount (10% for qty &gt; 5):</span>
                                <span>-{formatPrice(summary.discountAmount)}</span>
                            </div>
                        )}

                        <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                            <span>Total:</span>
                            <span>{formatPrice(summary.total)}</span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="secondary" onClick={onClose} className="flex-1">
                            Continue Shopping
                        </Button>
                        <Button variant="primary" onClick={handleCheckout} className="flex-1">
                            Checkout
                        </Button>
                    </div>

                    {items.length > 0 && (
                        <button
                            onClick={() => {
                                clearCart()
                                onClose()
                            }}
                            className="w-full text-red-600 hover:text-red-700 text-sm py-2 transition-colors duration-200 cursor-pointer"
                        >
                            Clear Cart
                        </button>
                    )}
                </div>
            )}
        </Modal>
    )
}
