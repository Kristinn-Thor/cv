import React from 'react';

interface Props {
  size?: number | string;
  color?: string;
  stroke?: number | string;
  className?: string;
}

const DownGesture: React.FC<Props> = ({
  size = 20,
  color = 'var(--icon-color)',
  stroke = 5,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M52.2803 75.0557C51.3011 76.0493 49.6989 76.0493 48.7197 75.0557L15.4092 41.2549C13.852 39.6748 14.9711 37.0001 17.1895 37L83.8105 37C86.0289 37.0001 87.148 39.6748 85.5908 41.2549L52.2803 75.0557Z"
      stroke={color}
      strokeWidth={stroke}
    />
  </svg>
);

export default DownGesture;
