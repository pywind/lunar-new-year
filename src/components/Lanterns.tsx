import { FC } from 'react';
import { useScreenSize } from '../hooks/useScreenSize';

interface LanternProps {
  count?: number;
}

export const Lanterns: FC<LanternProps> = ({ count = 3 }) => {
  const screenSize = useScreenSize();
  
  const getLanternCount = () => {
    if (screenSize === 'xs' || screenSize === 'sm') return 2;
    return count;
  };

  return (
    <div 
      className="lanterns-wrapper" 
      style={{
        position: 'fixed',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
      }}
    >
      {Array.from({ length: getLanternCount() }).map((_, index) => (
        <div 
          key={`lantern-${index}`} 
          className="lantern"
          style={{
            animationDelay: `${index * 0.2}s`,
            opacity: 1,
            visibility: 'visible',
            WebkitTransform: 'translate3d(0,0,0)',
            transform: 'translate3d(0,0,0)',
          }}
        />
      ))}
    </div>
  );
}; 