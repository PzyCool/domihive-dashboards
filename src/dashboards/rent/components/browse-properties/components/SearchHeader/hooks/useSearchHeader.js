import { useState, useEffect, useRef } from 'react';

export const useSearchHeader = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);
  const [scrollDirection, setScrollDirection] = useState('down');
  const headerRef = useRef(null);
  const lastScrollY = useRef(0);
  
  // Handle scroll for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const headerHeight = headerRef.current?.offsetHeight || 0;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      // Update last scroll position
      lastScrollY.current = currentScrollY;
      
      // Make sticky when scrolled past 100px
      if (currentScrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
      
      // Optional: Hide header on scroll down, show on scroll up
      // Uncomment if you want this behavior:
      // if (currentScrollY > 200 && scrollDirection === 'down') {
      //   setShouldShow(false);
      // } else if (scrollDirection === 'up') {
      //   setShouldShow(true);
      // }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollDirection]);
  
  // Check if we're on a browse page
  useEffect(() => {
    const checkBrowsePage = () => {
      // This is a simple check - you might want to enhance it
      const isBrowsePage = window.location.pathname.includes('/browse');
      setShouldShow(isBrowsePage);
    };
    
    checkBrowsePage();
    
    // Optional: Listen for route changes
    const handleRouteChange = () => {
      setTimeout(checkBrowsePage, 100); // Small delay for route to update
    };
    
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);
  
  return {
    headerRef,
    isSticky,
    shouldShow,
    scrollDirection
  };
};