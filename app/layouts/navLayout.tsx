import {Outlet} from 'react-router';
import type {Route} from './+types/navLayout';
import Navbar from '../components/navbar';
import ThemeButton from '~/components/themeButton';

export function meta({}: Route.MetaArgs) {
  return [
    {title: 'Cirriculum Vitae | Kristinn'},
    {name: 'description', content: 'Welcome to my homepage!'},
  ];
}

export default function NavLayout() {
  return (
    <div className="relative overflow-hidden w-full h-screen">
      <div className="absolute top-4 right-4 z-10 min-[450px]:right-7">
        <ThemeButton />
      </div>
      <Outlet />
      {/* <footer
        className="fixed bottom-0 left-0 flex justify-center w-full h-[12%] min-h-[90px]"
        style={{
          background: `linear-gradient(hsla(var(--bg-hsl), 0) 0%, hsla(var(--bg-hsl), 1) 50%)`,
        }}
      >
        <Navbar />
      </footer> */}
    </div>
  );
}
