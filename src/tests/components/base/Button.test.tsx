import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/base/Button'

describe('Button', () => {
    it('renders children text', () => {
        render(<Button>Click me</Button>)
        expect(screen.getByText('Click me')).toBeTruthy()
    })

    it('calls onClick on click', () => {
        const onClick = vi.fn()
        render(<Button onClick={onClick}>Tap</Button>)
        fireEvent.click(screen.getByText('Tap'))
        expect(onClick).toHaveBeenCalledTimes(1)
    })
})
