import {Outlet} from 'react-router';
import type {Route} from './+types/navLayout';
import Navbar from '../components/navbar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAdjust} from '@fortawesome/free-solid-svg-icons';

export function meta({}: Route.MetaArgs) {
  return [
    {title: 'Kristinn - Cirriculum Vitae'},
    {name: 'description', content: 'Welcome to my homepage!'},
  ];
}

export default function NavLayout() {
  return (
    <div className="relative overflow-hidden w-full h-screen">
      <button
        title="Toggle dark mode"
        className="absolute top-4 right-4 cursor-pointer transition-transform ease-in-out duration-300 hover:scale-150 z-10"
        onClick={() => console.log('toggle dark mode')}
        aria-label="toggle dark mode"
      >
        <FontAwesomeIcon
          icon={faAdjust}
          style={{color: 'var(--icon-color)'}}
        ></FontAwesomeIcon>
      </button>
      <Outlet />
      <footer className="fixed bottom-0 left-0 flex justify-center w-full h-[12%] min-h-[90px] bg-[linear-gradient(rgba(13,22,38,0)_0%,rgba(13,22,38,1)_50%)]">
        <Navbar />
      </footer>
    </div>
  );
}
