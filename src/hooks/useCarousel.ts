import { useState, useEffect, useCallback, TouchEvent } from 'react';

export function useCarousel(
  totalItems: number,
  getCardsPerView: (width: number) => number,
  intervalMs: number = 3000,
  isPausedExternally: boolean = false
) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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

  const onTouchStart = useCallback((e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsHovering(true);
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEndEvent = useCallback(() => {
    setIsHovering(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  }, [touchStart, touchEnd, nextSlide, prevSlide]);

  return {
    carouselIndex,
    cardsPerView,
    setIsHovering,
    handleNext: nextSlide,
    handlePrev: prevSlide,
    swipeHandlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd: onTouchEndEvent,
    }
  };
}
