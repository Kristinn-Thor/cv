import {Link} from 'react-router';
import type {Route} from './+types/contact';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import TicTackToe from '~/components/ticTacToe';

export function meta({}: Route.MetaArgs) {
  return [
    {title: 'Kristinn - Cirriculum Vitae'},
    {name: 'description', content: 'Welcome to my homepage!'},
  ];
}

export default function Games() {
  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-10 left-10">
        <Link to="/projects" className="flex items-center">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-[1.5em] transition-opacity ease-in-out duration-300 group-hover:opacity-0"
            style={{color: 'var(--icon-color)'}}
          />
          <p className="ml-2">Til baka</p>
        </Link>
      </div>

      <TicTackToe lightOn={true} />
    </div>
  );
}
