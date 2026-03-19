import IconCircle from '~/components/iconCircle';
import type {Route} from './+types/skills';
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

export function meta({}: Route.MetaArgs) {
  return [
    {title: 'Kristinn - Cirriculum Vitae'},
    {name: 'description', content: 'Welcome to my homepage!'},
  ];
}

export default function Skills() {
  useEffect(() => {
    gsap.to('.SkilsTitle, .SkilsText, .SkilsIconContainer', {
      opacity: 1,
      duration: 2.5,
      stagger: 0.3,
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center px-[10%] pt-[100px] pb-[120px] overflow-hidden w-full h-screen z-0">
      <div className="Mask" style={{opacity: 1}} />
      <h1 className="SkilsTitle font-bold text-4xl text-(--text-highlight-color) mb-[25px] opacity-0">
        Tæknikunnátta
      </h1>

      <div className="max-w-xl">
        <p className="SkilsText bg-(--container-bg-color) rounded-2xl p-4 mb-5 opacity-0">
          <span>Helstu tæki og tól sem ég unnið með eru eftirfarandi:</span>
          <br />
          HTML - CSS - JavaScript - React - node.js - express.js - GraphQL - SQL
        </p>
        <div className="SkilsIconContainer flex flex-wrap justify-center bg-(--container-bg-color) rounded-2xl p-4 opacity-0">
          {iconResources.map((icon) => (
            <IconCircle
              from={0}
              to={360}
              duration={2}
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
