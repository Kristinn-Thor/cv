import React, {useEffect, useRef, useState} from 'react';
import {useTheme} from './themeContext';
import {gsap} from 'gsap';
import MorphSVGPlugin from 'gsap/MorphSVGPlugin';
gsap.registerPlugin(MorphSVGPlugin);

const ThemeButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const {theme, toggleTheme} = useTheme();
  const pathRef = useRef<SVGPathElement>(null);
  const hasRendered = useRef(false);

  const MoonPath =
    'M78 50C78 65.464 65.464 78 50 78C34.536 78 22 65.464 22 50C22 34.536 34.536 22 50 22C51.383 33.6559 62.4247 47.4289 78 50Z';
  const SunPath = 'M 50 50 m -15, 0 a 15,15 0 1,1 30,0 a 15,15 0 1,1 -30,0';

  useEffect(() => {
    if (pathRef.current) {
      if (!hasRendered.current) {
        // On first render, just set the path without animation & display sun rays if in dark mode(they initially hidden)
        hasRendered.current = true;
        if (theme === 'light') {
          pathRef.current.setAttribute('d', MoonPath);
        } else {
          pathRef.current.setAttribute('d', SunPath);
          document.getElementById('sunRays')?.classList.remove('opacity-0');
        }
      } else {
        let tl = gsap.timeline();
        if (theme === 'light') {
          pathRef.current.setAttribute('d', SunPath);
          tl.to('#sunRays', {
            opacity: 0,
            scale: 0,
            duration: 0.5,
            transformOrigin: 'center',
          }).to(
            pathRef.current,
            {
              morphSVG: MoonPath,
              duration: 0.5,
              ease: 'expo.in',
            },
            0, // start at same time as rays fade out
          );
        } else {
          pathRef.current.setAttribute('d', MoonPath);
          tl.to(pathRef.current, {
            morphSVG: SunPath,
            duration: 0.5,
            ease: 'expo.in',
          }).to('#sunRays', {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            transformOrigin: 'center',
          });
        }
      }
    }
  }, [theme]);

  return (
    <button
      title="Toggle dark mode"
      aria-label="toggle dark mode"
      className="flex cursor-pointer"
      onClick={toggleTheme}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 100 100"
        stroke="var(--icon-color)"
        strokeWidth={5}
        strokeLinecap="round"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '40px',
          height: '40px',
        }}
      >
        <g id="sunRays" className="opacity-0">
          {Array.from({length: 8}).map((_, i) => {
            const angle = i * 45 * (Math.PI / 180); // 8 rays, every 45 degrees
            const r1 = 28; // start radius (just outside sun)
            const r2 = 32; // end radius
            const cx = 50,
              cy = 50;
            const x1 = cx + r1 * Math.cos(angle);
            const y1 = cy + r1 * Math.sin(angle);
            const x2 = cx + r2 * Math.cos(angle);
            const y2 = cy + r2 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                style={{
                  transition: 'all 300ms ease',
                }}
                stroke={'var(--icon-color)'}
                strokeWidth={5}
                strokeLinecap="round"
              />
            );
          })}
        </g>
        <path
          ref={pathRef}
          fill={isHovered ? 'var(--icon-color)' : 'var(--bg-color)'}
          style={{
            transition: `transform 300ms ease-in-out`,
            transform:
              theme === 'light' && isHovered ? 'rotate(10deg)' : 'rotate(0deg)',
            transformOrigin: 'center',
          }}
        />
      </svg>
    </button>
  );
};

export default ThemeButton;
