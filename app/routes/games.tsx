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
  // TODO: Útfæra leið til þess að skruna niður að verkefnahlutanum á forsíðunni þegar farið er til baka
  return (
    <div className="relative w-full h-screen Page opacity-0">
      <div className="absolute top-5 left-4">
        <GoBackButton to="/" />
      </div>
      <TicTackToe lightOn={true} />
    </div>
  );
}
