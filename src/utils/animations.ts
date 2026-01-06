import { gsap } from 'gsap'

export const animateModalOpen = (overlayEl: HTMLElement, panelEl: HTMLElement) => {
    const tl = gsap.timeline()
    tl.fromTo(
        overlayEl,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' },
        0
    )
    tl.fromTo(
        panelEl,
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' },
        0
    )
    return tl
}

export const animateModalClose = (
    overlayEl: HTMLElement,
    panelEl: HTMLElement,
    onComplete?: () => void
) => {
    const tl = gsap.timeline({ onComplete })
    tl.to(overlayEl, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 0)
    tl.to(
        panelEl,
        { opacity: 0, y: 10, scale: 0.98, duration: 0.25, ease: 'power2.in' },
        0
    )
    return tl
}

export const animateCartItemEnter = (element: HTMLElement) => {
    return gsap.fromTo(
        element,
        { opacity: 0, y: 12, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out' }
    )
}

export const animateCartItemExit = (element: HTMLElement, onComplete?: () => void) => {
    return gsap.to(element, {
        opacity: 0,
        y: 10,
        scale: 0.98,
        duration: 0.2,
        ease: 'power2.in',
        onComplete,
    })
}
