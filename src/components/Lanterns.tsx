import { FC } from 'react';
import { useScreenSize } from '../hooks/useScreenSize';

interface LanternProps {
  count?: number;
}

export const Lanterns: FC<LanternProps> = ({ count = 3 }) => {
  const screenSize = useScreenSize();
  
  // Adjust lantern count based on screen size
  const getLanternCount = () => {
    switch(screenSize) {
      case 'xs':
        return 2;
      case 'sm':
        return 2;
      case 'md':
        return 3;
      case 'lg':
      case 'xl':
      case '2xl':
        return count;
      default:
        return 3;
    }
  };

  return (
    <div className="lanterns">
      {Array.from({ length: getLanternCount() }).map((_, index) => (
        <div 
          key={`lantern-${index}`} 
          className="lantern"
          style={{
            animationDelay: `${index * 0.2}s`
          }}
        />
      ))}
    </div>
  );
}; 