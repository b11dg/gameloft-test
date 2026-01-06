import { forwardRef, type ReactNode } from 'react'
import { BUTTON_SIZE_CLASS } from '@/enums/sizes'
import { BUTTON_VARIANT_CLASS } from '@/enums/button'

type ButtonVariant = keyof typeof BUTTON_VARIANT_CLASS
type ButtonSize = keyof typeof BUTTON_SIZE_CLASS

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    isLoading?: boolean
    children: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { variant = 'primary', size = 'md', isLoading = false, children, className = '', ...props },
        ref
    ) => {
        const baseClasses =
            'font-semibold transition-colors duration-200 rounded-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed'
        const sizeClasses = BUTTON_SIZE_CLASS[size]
        const variantClass = BUTTON_VARIANT_CLASS[variant]

        return (
            <button
                ref={ref}
                className={`${baseClasses} ${sizeClasses} ${variantClass} ${className}`}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                        Loading...
                    </span>
                ) : (
                    children
                )}
            </button>
        )
    }
)
