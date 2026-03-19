import type {IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router';

type Props = {
  to: string;
  icon: IconDefinition;
  text: string;
  ariaLabel?: string;
};

const NavbarLink: React.FC<Props> = ({to, icon, text, ariaLabel}) => (
  <Link className="group relative flex" to={to} aria-label={ariaLabel}>
    <p
      className="text-(--icon-color)
                      absolute
                      flex
                      items-center
                      justify-center
                      w-full
                      h-full
                      opacity-0
                      transition-opacity
                      ease-in-out
                      duration-300
                      max-[500px]:text-[0.8rem]
                      group-hover:opacity-100
                    "
    >
      {text}
    </p>
    <FontAwesomeIcon
      icon={icon}
      className="text-[1.5em] transition-opacity ease-in-out duration-300 group-hover:opacity-0"
      style={{color: 'var(--icon-color)'}}
    />
  </Link>
);

export default NavbarLink;
