import { useEffect, useRef, useState, type ReactNode } from 'react'
import { animateModalClose, animateModalOpen } from '@/utils/animations.ts'
import closeIcon from '@/assets/icons/close.svg'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: ReactNode
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)
    type ModalTimeline = ReturnType<typeof animateModalOpen>
    const animationRef = useRef<ModalTimeline | null>(null)
    const [shouldRender, setShouldRender] = useState(isOpen)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') {
            onClose()
        }
    }

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true)
        }
    }, [isOpen])

    useEffect(() => {
        if (!shouldRender) return

        const overlayEl = overlayRef.current
        const panelEl = panelRef.current

        if (!overlayEl || !panelEl) return

        if (animationRef.current) {
            animationRef.current.kill()
        }

        animationRef.current = isOpen
            ? animateModalOpen(overlayEl, panelEl)
            : animateModalClose(overlayEl, panelEl, () => setShouldRender(false))

        return () => {
            animationRef.current?.kill()
        }
    }, [isOpen, shouldRender])

    useEffect(() => {
        if (isOpen) {
            modalRef.current?.focus()
        }
    }, [isOpen])

    if (!shouldRender) return null

    return (
        <>
            <div
                ref={overlayRef}
                className="fixed inset-0 z-40 bg-slate-900/75 backdrop-blur-sm transition-opacity duration-200"
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                ref={modalRef}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                role="dialog"
                aria-labelledby="modal-title"
                aria-modal="true"
                tabIndex={-1}
                onKeyDown={handleKeyDown}
            >
                <div
                    ref={panelRef}
                    className="bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-900/20 max-w-2xl w-full max-h-[90vh] overflow-auto"
                    style={{ backgroundColor: '#ffffff' }}
                >
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            aria-label="Close modal"
                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded-lg p-1 cursor-pointer"
                        >
                            <img src={closeIcon} alt="" className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="px-6 py-4 bg-white">{children}</div>
                </div>
            </div>
        </>
    )
}
