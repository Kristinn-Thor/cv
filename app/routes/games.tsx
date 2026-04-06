import {useEffect} from 'react';
import gsap from 'gsap';

import TicTackToe from '~/components/ticTacToe';
import GoBackButton from '~/components/goBackButton';

export default function Games() {
  useEffect(() => {
    gsap.to('.Page', {
      opacity: '1',
      duration: 2,
    });
  }, []);

  return (
    <div className="relative w-full h-screen Page opacity-0">
      <div className="absolute top-5 left-4">
        <GoBackButton to="/projects" color="var(--theme-color-green)" />
      </div>
      <TicTackToe lightOn={true} />
    </div>
  );
}
