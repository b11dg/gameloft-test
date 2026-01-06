import { forwardRef, type ReactNode } from 'react'

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode
    label: string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ icon, label, className = '', ...props }, ref) => {
        return (
            <button
                ref={ref}
                aria-label={label}
                className={`p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
                {...props}
            >
                {icon}
            </button>
        )
    }
)

