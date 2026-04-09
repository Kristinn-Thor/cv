import React from 'react';
import {Link} from 'react-router';

interface Props {
  to?: string; // some/path
  color?: string;
}

const GoBackButton: React.FC<Props> = ({to, color}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const animationDuration = 200; // ms
  return (
    <Link to={to || '/'} className="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke={color || 'var(--icon-color)'}
        strokeLinecap="round"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '26px',
          height: '26px',
        }}
      >
        <line
          style={{
            transition: `transform ${animationDuration}ms ease-in-out`,
            transform: isHovered ? 'translateX(3px)' : 'translateX(9px)',
          }}
          x1="20"
          y1="12"
          x2="3"
          y2="12"
        />
        <g
          style={{
            transition: `transform ${animationDuration}ms ease-in-out`,
            transform: isHovered ? 'translateX(2px)' : 'translateX(8px)',
          }}
        >
          <line x1="8" y1="19" x2="1" y2="12" />
          <line x1="8" y1="5" x2="1" y2="12" />
        </g>
      </svg>
    </Link>
  );
};

export default GoBackButton;
