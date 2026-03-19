import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';

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
}) => {
  const [deg, setDeg] = useState(from); // Animation starts from this number
  const obj = useRef({deg: 0});
  useEffect(() => {
    let tween = gsap.to(obj.current, {
      deg: to,
      duration,
      ease: 'power4.inOut',
      onUpdate: () => {
        setDeg(obj.current.deg);
      },
    });
    return function cleanup() {
      // When component unmounts we stop the animation(stop trying to update the state)
      tween.kill();
    };
  }, [from, to, duration]);

  return (
    <div className="flex flex-col justify-center items-center p-1">
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
