import {Link} from 'react-router';
import HomeButton from '../svg/Home-Btn.svg';
import {
  faAddressCard,
  faAt,
  faChartBar,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';
import NavbarLink from './navbarLink';

export default function Navbar() {
  return (
    <nav
      className=" flex items-center justify-around w-full
                  h-[8vw] min-w-[270px] max-w-[800px]
                  min-h-[50px] max-h-[50px]
                  m-[0_10px_0_10px] rounded-[50px] z-2
                  bg-(--effect-color)
                "
    >
      <NavbarLink
        to="/projects"
        icon={faTasks}
        text="Verkefni"
        ariaLabel="Verkefnin"
      />
      <NavbarLink
        to="/skills"
        icon={faChartBar}
        text="Kunnátta"
        ariaLabel="Hvað ég kann"
      />
      <Link
        className="w-[8vw] h-[8vw] min-w-[50px] max-w-20 min-h-[50px] max-h-20 ease-in-out duration-300 hover:scale-125 group relative flex"
        to="/"
      >
        <img src={HomeButton} alt="Heim" />
      </Link>
      <NavbarLink
        to="/contact"
        icon={faAt}
        text="Hafa_samband"
        ariaLabel="Hafa samband"
      />
      <NavbarLink
        to="/about"
        icon={faAddressCard}
        text="Um_mig"
        ariaLabel="Um-_mig"
      />
    </nav>
  );
}
