import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

type Props = {
  logoSource: string;
  circleColor: string;
  logoSize?: string;
  circleRadius?: number;
  circleWidth?: number;
  logoText?: string;
  from?: number;
  to?: number;
  duration?: number;
  delay?: number;
  useScrollTrigger?: boolean;
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
};

const IconCircle: React.FC<Props> = ({
  logoSource,
  logoSize = '50',
  circleColor,
  circleRadius,
  circleWidth = 5,
  logoText = '',
  from = 0,
  to = 360,
  duration = 1.5,
  delay = 0,
  scrollerRef,
  useScrollTrigger = false,
}) => {
  const [deg, setDeg] = useState(from); // Animation starts from this number
  const iconRef = useRef<HTMLDivElement>(null);
  const degRef = useRef({deg: from});

  // Center of the circle
  const cx = 50;
  const cy = 50;
  // Parse logoSize to number (remove px if present)
  const size = typeof logoSize === 'string' ? parseFloat(logoSize) : 40;
  const r = circleRadius || size - size / 5;

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
    <div className={`flex flex-col justify-center items-center`} ref={iconRef}>
      <svg
        viewBox="0 0 100 100"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
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
      {logoText && <p className="text-xl font-bold">{logoText}</p>}
    </div>
  );
};

export default IconCircle;
