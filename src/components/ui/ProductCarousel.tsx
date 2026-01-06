import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useProducts } from '@/store/productStore'
import { ProductCard } from '@/components/ui/ProductCard'
import chevronLeftIcon from '@/assets/icons/chevron-left.svg'
import chevronRightIcon from '@/assets/icons/chevron-right.svg'

export const ProductCarousel = () => {
    const products = useProducts((state) => state.getProducts())
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        skipSnaps: false,
    })
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(false)

    const scrollPrev = () => emblaApi?.scrollPrev()
    const scrollNext = () => emblaApi?.scrollNext()

    useEffect(() => {
        if (!emblaApi) return

        const onSelect = () => {
            setPrevBtnDisabled(!emblaApi.canScrollPrev())
            setNextBtnDisabled(!emblaApi.canScrollNext())
        }

        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
        onSelect()

        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', onSelect)
        }
    }, [emblaApi])

    return (
        <section
            className="w-full"
            aria-label="Product carousel"
            aria-roledescription="carousel"
        >
            <div className="relative group px-2 sm:px-3 lg:px-4">
                <div ref={emblaRef} className="overflow-hidden overflow-y-visible">
                    <div className="flex gap-0 -mx-2 sm:-mx-3 lg:-mx-3 pb-6 sm:pb-7 lg:pb-8">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="min-w-0 flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 px-2 sm:px-3 lg:px-3"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={scrollPrev}
                    disabled={prevBtnDisabled}
                    aria-label="Previous products"
                    className="absolute -left-5 sm:-left-7 lg:-left-10 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                >
                    <img src={chevronLeftIcon} alt="" className="w-6 h-6" />
                </button>

                <button
                    onClick={scrollNext}
                    disabled={nextBtnDisabled}
                    aria-label="Next products"
                    className="absolute -right-5 sm:-right-7 lg:-right-10 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
                >
                    <img src={chevronRightIcon} alt="" className="w-6 h-6" />
                </button>
            </div>
        </section>
    )
}
