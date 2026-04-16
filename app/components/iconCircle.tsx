import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

type Props = {
  logoSource: string;
  logoScale: string;
  logoX: string;
  logoY: string;
  logoText: string;
  circleColor: string;
  from: number;
  to: number;
  duration: number;
  delay?: number;
  useScrollTrigger?: boolean;
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
};

const IconCircle: React.FC<Props> = ({
  logoSource,
  logoScale,
  logoX,
  logoY,
  logoText,
  circleColor,
  from,
  to,
  duration,
  delay = 0,
  scrollerRef,
  useScrollTrigger = false,
}) => {
  const [deg, setDeg] = useState(from); // Animation starts from this number
  const iconRef = useRef<HTMLDivElement>(null);
  const degRef = useRef({deg: from});
  useEffect(() => {
    let tween = gsap.to(degRef.current, {
      deg: to,
      duration,
      ease: 'power4.inOut',
      delay,
      paused: true,
      onUpdate: () => {
        setDeg(degRef.current.deg);
      },
    });
    if (useScrollTrigger && scrollerRef?.current && iconRef.current) {
      ScrollTrigger.create({
        trigger: iconRef.current,
        start: 'top bottom',
        scroller: scrollerRef?.current,
        onEnter: () => tween.play(),
      });
    } else {
      tween.play();
    }

    return function cleanup() {
      // When component unmounts we stop the animation(stop trying to update the state)
      tween.kill();
    };
  }, [from, to, duration, delay, scrollerRef, useScrollTrigger]);

  return (
    <div
      className="flex flex-col justify-center items-center p-1"
      ref={iconRef}
    >
      <svg viewBox="-35 0 170 100" className="w-30 h-22">
        <circle
          cx="50"
          cy="50"
          r="57"
          stroke={circleColor}
          strokeWidth="10"
          strokeDasharray={`${deg} 360`}
          strokeLinecap="round"
          fill="none"
        />
        <image
          id="logo"
          x={logoX}
          y={logoY}
          width={logoScale}
          height={logoScale}
          href={`${logoSource}`}
        />
        <animate>xlink:href='logo'</animate>
      </svg>
      <p className="text-xl font-bold">{logoText}</p>
    </div>
  );
};

export default IconCircle;
