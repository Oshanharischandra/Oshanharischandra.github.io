import { useState, useEffect, useCallback } from 'react';

export function useCarousel(
  totalItems: number,
  getCardsPerView: (width: number) => number,
  intervalMs: number = 3000,
  isPausedExternally: boolean = false
) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(1);

  // Responsive cards per view logic
  useEffect(() => {
    const handleResize = () => setCardsPerView(getCardsPerView(window.innerWidth));
    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getCardsPerView]);

  const nextSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev + cardsPerView >= totalItems ? 0 : prev + cardsPerView));
  }, [cardsPerView, totalItems]);

  const prevSlide = useCallback(() => {
    setCarouselIndex((prev) => (prev - cardsPerView < 0 ? Math.max(0, totalItems - cardsPerView) : prev - cardsPerView));
  }, [cardsPerView, totalItems]);

  // Bulletproof autoplay interval
  useEffect(() => {
    // If hovering, paused by modal, or not enough items to slide, pause the timer
    if (isHovering || isPausedExternally || totalItems <= cardsPerView) return;
    
    const timer = setInterval(() => {
      // Functional state update avoids stale closures
      setCarouselIndex((prev) => (prev + cardsPerView >= totalItems ? 0 : prev + cardsPerView));
    }, intervalMs);
    
    // Cleanup interval on unmount or dependency change
    return () => clearInterval(timer);
  }, [isHovering, isPausedExternally, totalItems, cardsPerView, intervalMs]);

  return {
    carouselIndex,
    cardsPerView,
    setIsHovering,
    handleNext: nextSlide,
    handlePrev: prevSlide,
  };
}
