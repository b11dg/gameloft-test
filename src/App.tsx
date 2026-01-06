import { useState } from 'react'
import { Header } from './components/layout/Header'
import { ProductCarousel } from '@/components/ui/ProductCarousel'
import { CartModal } from './components/ui/CartModal'

function App() {
    const [isCartOpen, setIsCartOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50">
            <Header onCartClick={() => setIsCartOpen(true)} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
                    <ProductCarousel />
                </section>
            </main>

            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            <footer className="bg-gray-900 text-gray-100 py-8 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm sm:text-base font-medium leading-relaxed">
                        &copy; 2025 Gameloft. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default App
