import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

type Props = {
  logoSource: string;
  logoSize: string;
  logoText: string;
  from: number;
  to: number;
  duration: number;
  circleColor: string;
  circleRadius?: number;
  circleWidth?: number;
  delay?: number;
  useScrollTrigger?: boolean;
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
};

const IconCircle: React.FC<Props> = ({
  logoSource,
  logoSize,
  logoText,
  from,
  to,
  duration,
  circleColor,
  circleRadius,
  circleWidth = 5,
  delay = 0,
  scrollerRef,
  useScrollTrigger = false,
}) => {
  const [deg, setDeg] = useState(from); // Animation starts from this number
  const iconRef = useRef<HTMLDivElement>(null);
  const degRef = useRef({deg: from});

  const r = circleRadius || 40;
  // Center of the circle
  const cx = 50;
  const cy = 50;
  // Parse logoSize to number (remove px if present)
  const size = typeof logoSize === 'string' ? parseFloat(logoSize) : r;
  // Center image
  const x = cx - size / 2;
  const y = cy - size / 2;

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
      <svg viewBox="0 0 100 100" className="w-22 h-22">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={circleColor}
          strokeWidth={circleWidth}
          strokeDasharray={`${deg} 360`}
          strokeLinecap="round"
          fill="none"
        />
        <image
          id="logo"
          x={x}
          y={y}
          width={size}
          height={size}
          href={`${logoSource}`}
        />
        <animate>xlink:href='logo'</animate>
      </svg>
      <p className="text-xl font-bold">{logoText}</p>
    </div>
  );
};

export default IconCircle;
