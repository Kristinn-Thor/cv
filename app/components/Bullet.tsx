import React from 'react';

interface Props {
  size?: number | string;
  className?: string;
}

const Bullet: React.FC<Props> = ({size = 15, className}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g id="Bullet">
      <g id="Group">
        <path
          id="Polygon 3"
          d="M4 25L25 21.5359V28.4641L4 25Z"
          fill="var(--icon-color)"
        />
        <path
          id="Polygon 4"
          d="M46 25L25 28.4641V21.5359L46 25Z"
          fill="var(--icon-color)"
        />
        <path
          id="Polygon 6"
          d="M24.5 34.75L19.7369 25H29.2631L24.5 34.75Z"
          fill="var(--icon-color)"
        />
        <path
          id="Polygon 5"
          d="M24.5 15.25L29.2631 25H19.7369L24.5 15.25Z"
          fill="var(--icon-color)"
        />
        <path
          id="Polygon 2"
          opacity="0.9"
          d="M24.5 49L18.0048 25H30.9952L24.5 49Z"
          fill="var(--icon-color)"
        />
        <path
          id="Polygon 1"
          opacity="0.9"
          d="M24.5 1L30.9952 25H18.0048L24.5 1Z"
          fill="var(--icon-color)"
        />
      </g>
    </g>
  </svg>
);

export default Bullet;
