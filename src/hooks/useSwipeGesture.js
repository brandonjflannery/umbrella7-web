import { useEffect, useRef } from 'react';

export const useSwipeGesture = (onSwipeLeft, onSwipeRight) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartX.current = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      touchEndX.current = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const swipeDistance = touchEndX.current - touchStartX.current;

      if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (swipeDistance < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight]);
};