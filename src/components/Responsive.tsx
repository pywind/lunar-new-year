import { FC, ReactNode } from 'react';
import { useScreenSize, ScreenSize } from '../hooks/useScreenSize';

interface ResponsiveProps {
  children: ReactNode;
  breakpoints: Partial<Record<ScreenSize, ReactNode>>;
}

export const Responsive: FC<ResponsiveProps> = ({ children, breakpoints }) => {
  const currentSize = useScreenSize();
  
  // Find the closest matching breakpoint
  const sizes: ScreenSize[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
  const activeBreakpoint = sizes.find(size => {
    const index = sizes.indexOf(size);
    return breakpoints[size] !== undefined && 
           sizes.indexOf(currentSize) <= index;
  });

  return (
    <>
      {activeBreakpoint ? breakpoints[activeBreakpoint] : children}
    </>
  );
}; 
