import IconCircle from '~/components/iconCircle';
import {useEffect} from 'react';
import gsap from 'gsap';

import gsapLogo from '../svg/logo-man.svg';
import reactLogo from '../svg/react-brands.svg';
import cssLogo from '../svg/css3-brands.svg';
import jsLogo from '../svg/js-square-brands.svg';
import htmlLogo from '../svg/html5-brands.svg';
import gitLogo from '../svg/git-brands.svg';
import javaLogo from '../svg/Vector-java.svg';
import npmLogo from '../svg/npm-brands.svg';

export default function Skills() {
  useEffect(() => {
    gsap.to('.SkilsTitle, .SkilsText, .SkilsIconContainer', {
      opacity: 1,
      duration: 1,
      stagger: 0.1,
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center w-full h-screen z-0">
      <div className="Mask" style={{opacity: 1}} />
      <div className="flex flex-col items-center overflow-y-auto px-[10%] py-[100px]">
        <h1 className="SkilsTitle font-bold text-4xl text-(--text-highlight-color) mb-[25px] opacity-0">
          Tæknistakkur
        </h1>

        <div className="max-w-xl">
          <p className="SkilsText bg-(--container-bg-color) rounded-2xl p-4 mb-5 opacity-0">
            <span>Ótæmandi listi af tólum sem ég hef unnið með:</span>
            <br />
            HTML - CSS - JavaScript - React - node.js - express.js - GraphQL -
            SQL
          </p>
          <div className="SkilsIconContainer flex flex-wrap justify-center bg-(--container-bg-color) rounded-2xl p-4 opacity-0">
            {iconResources.map((icon) => (
              <IconCircle
                key={icon.text}
                from={0}
                to={360}
                duration={1}
                logoSource={icon.src}
                logoScale={icon.scale}
                logoX={icon.x}
                logoY={icon.y}
                logoText={icon.text}
                circleColor={icon.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const iconResources = [
  {
    src: jsLogo,
    color: 'var(--javascript-color)',
    text: 'JavaScript',
    scale: '75',
    x: '12',
    y: '12',
  },
  {
    src: htmlLogo,
    color: 'var(--html-color)',
    text: 'HTML',
    scale: '85',
    x: '7',
    y: '13',
  },
  {
    src: cssLogo,
    color: 'var(--css-color)',
    text: 'CSS',
    scale: '80',
    x: '10',
    y: '13',
  },
  {
    src: gsapLogo,
    color: 'var(--gsap-color)',
    text: 'GSAP',
    scale: '90',
    x: '-5',
    y: '5',
  },
  {
    src: reactLogo,
    color: 'var(--react-color)',
    text: 'React',
    scale: '90',
    x: '5',
    y: '5',
  },
  {
    src: gitLogo,
    color: 'var(--git-color)',
    text: 'git',
    scale: '90',
    x: '5',
    y: '5',
  },
  {
    src: javaLogo,
    color: 'var(--java-color)',
    text: 'Java',
    scale: '80',
    x: '10',
    y: '5',
  },
  {
    src: npmLogo,
    color: 'var(--npm-color)',
    text: 'NPM',
    scale: '80',
    x: '10',
    y: '10',
  },
];
