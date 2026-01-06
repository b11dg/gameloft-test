import { useCart } from '@/store/cartStore'
import { IconButton } from '@/components/base/IconButton'
import cartIcon from '@/assets/icons/cart.svg'

interface HeaderProps {
    onCartClick: () => void
}

export const Header = ({ onCartClick }: HeaderProps) => {
    const cartCount = useCart((state) => state.getCartCount())

    return (
        <header
            className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm"
            style={{ backgroundColor: '#ffffff' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Gameloft</h1>

                <IconButton
                    icon={
                        <div className="relative overflow-visible">
                            <img src={cartIcon} alt="" className="w-6 h-6 block" style={{ overflow: 'visible' }} />
                            {cartCount > 0 && (
                                <span
                                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                                    aria-label={`${cartCount} items in cart`}
                                >
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    }
                    label="Open shopping cart"
                    onClick={onCartClick}
                />
            </div>
        </header>
    )
}
