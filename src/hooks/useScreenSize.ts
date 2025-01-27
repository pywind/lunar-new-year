import { useState, useEffect } from 'react';

export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>('xs');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width >= breakpoints['2xl']) {
        setScreenSize('2xl');
      } else if (width >= breakpoints.xl) {
        setScreenSize('xl');
      } else if (width >= breakpoints.lg) {
        setScreenSize('lg');
      } else if (width >= breakpoints.md) {
        setScreenSize('md');
      } else if (width >= breakpoints.sm) {
        setScreenSize('sm');
      } else {
        setScreenSize('xs');
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};
