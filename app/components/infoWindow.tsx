import React, {useState} from 'react';
import {gsap} from 'gsap';

interface Props {
  children?: React.ReactNode;
  color?: string;
}

const InfoWindow: React.FC<Props> = ({children, color}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const animationDuration = 300; // ms

  const handleInfoClick = () => {
    if (isVisible) {
      gsap.to('.infoWindow', {
        transform: 'translateY(-100%)',
        opacity: 0,
        stagger: 0.1,
        duration: 0.3,
        ease: 'power2.in',
      });
    } else {
      gsap.to('.infoWindow', {
        transform: 'translateY(0%)',
        opacity: 1,
        stagger: 0.1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div className="absolute top-5 right-5 z-20">
        <button className="hover:cursor-pointer" onClick={handleInfoClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke={color || 'var(--icon-color)'}
            strokeWidth={1}
            strokeLinecap="round"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              width: '26px',
              height: '26px',
              transition: `all ${animationDuration}ms ease-in-out`,
              transform: isHovered ? 'scale(1.2)' : 'scale(1)',
            }}
          >
            <circle
              cx="12"
              cy="12"
              r="11"
              strokeWidth={1.5}
              stroke={isVisible ? 'transparent' : color || 'var(--icon-color)'}
              fill="transparent"
              style={{
                transition: `all ${animationDuration}ms ease-in-out`,
              }}
            />
            <circle
              cx="12"
              cy="6"
              r="1.4"
              fill={color || 'var(--icon-color)'}
              style={{
                transition: `transform ${animationDuration}ms ease-in-out`,
                transformOrigin: 'center',
                transform: isVisible ? 'scale(0)' : 'scale(1)',
              }}
            />
            <line
              x1="12"
              y1="3"
              x2="12"
              y2="21"
              style={{
                transition: `all ${animationDuration}ms ease-in-out`,
                transformOrigin: 'center',
                transform: isVisible
                  ? 'rotate(45deg) scale(1)'
                  : 'rotate(0deg) translateY(3px) scale(0.4)',
                strokeWidth: isVisible ? 2 : 4,
              }}
            />
            <line
              x1="12"
              y1="3"
              x2="12"
              y2="21"
              style={{
                transition: `all ${animationDuration}ms ease-in-out`,
                transformOrigin: 'center',
                transform: isVisible
                  ? 'rotate(-45deg) scale(1)'
                  : 'rotate(0deg) translateY(3px) scale(0.4)',
                strokeWidth: isVisible ? 2 : 8,
              }}
            />
          </svg>
        </button>
      </div>
      <div
        className="infoWindow absolute top-0 right-0 opacity-0 -translate-y-full w-screen flex flex-col items-center justify-center px-4 pt-25 pb-10 border-b border-(--icon-color) bg-[hsla(var(--bg-hsl),0.95)] z-10"
        style={{
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default InfoWindow;
