import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PriceDisplay } from '@/components/ui/PriceDisplay'

describe('PriceDisplay', () => {
    it('displays formatted price', () => {
        render(<PriceDisplay price={100} />)
        // formatPrice should render 100 UAH in some format
        expect(screen.getByText(/100/)).toBeTruthy()
    })

    it('shows original price with strikethrough when discounted', () => {
        const { container } = render(<PriceDisplay price={90} originalPrice={100} />)
        
        // Should have both prices: discounted and original
        const prices = container.querySelectorAll('span')
        expect(prices.length).toBe(2)
        expect(container.textContent).toContain('90')
        expect(container.textContent).toContain('100')
    })

    it('does not show original price when same as current price', () => {
        const { container } = render(<PriceDisplay price={100} originalPrice={100} />)
        
        // Should only have one price element
        const priceElements = container.querySelectorAll('span')
        expect(priceElements.length).toBe(1)
    })
})
