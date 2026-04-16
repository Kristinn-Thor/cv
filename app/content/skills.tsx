import React, {useEffect} from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import IconCircle from '~/components/iconCircle';
import gsapLogo from '../svg/logo-man.svg';
import reactLogo from '../svg/react-brands.svg';
import cssLogo from '../svg/css3-brands.svg';
import jsLogo from '../svg/js-square-brands.svg';
import htmlLogo from '../svg/html5-brands.svg';
import gitLogo from '../svg/git-brands.svg';
import javaLogo from '../svg/Vector-java.svg';
import npmLogo from '../svg/npm-brands.svg';

interface Props {
  className?: string;
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function Skills({className, scrollerRef}: Props) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);
  const iconContainerRef = React.useRef<HTMLDivElement>(null);

  const handleEnterAnimation = (
    refs: (HTMLHeadingElement | HTMLDivElement | null)[],
    back: boolean,
  ) => {
    gsap.to(refs, {
      opacity: 1,
      duration: back ? 2 : 0.5,
      ease: 'power4.in',
      stagger: 0.1,
    });
  };

  const handleLeaveAnimation = (
    refs: (HTMLHeadingElement | HTMLDivElement | null)[],
  ) => {
    gsap.to(refs, {
      opacity: 0,
      duration: 0.2,
      ease: 'power4.out',
    });
  };

  useEffect(() => {
    if (
      contentRef.current &&
      titleRef.current &&
      textRef.current &&
      iconContainerRef.current &&
      scrollerRef?.current
    ) {
      const subContentRefs = [
        titleRef.current,
        textRef.current,
        iconContainerRef.current,
      ];
      const st = ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top center',
        scroller: scrollerRef.current,
        onEnter: () => handleEnterAnimation(subContentRefs, false),
        onLeave: () => handleLeaveAnimation(subContentRefs),
        onEnterBack: () => handleEnterAnimation(subContentRefs, true),
        onLeaveBack: () => handleLeaveAnimation(subContentRefs),
      });
      return () => st.kill();
    }
  }, [contentRef, titleRef, textRef, iconContainerRef, scrollerRef]);

  return (
    <div
      className={`flex flex-col items-center justify-center py-[100px] w-full min-h-screen ${className}`}
      ref={contentRef}
    >
      <h1
        className="font-bold text-4xl text-(--text-highlight-color) mb-[25px] opacity-0"
        ref={titleRef}
      >
        Tæknistakkur
      </h1>

      <div className="max-w-xl">
        <p
          className="bg-(--container-bg-color) rounded-2xl p-4 mb-5 opacity-0"
          ref={textRef}
        >
          <span>Ótæmandi listi af tólum sem ég hef unnið með:</span>
          <br />
          HTML - CSS - JavaScript - React - node.js - express.js - GraphQL - SQL
        </p>
        <div
          className="flex flex-wrap justify-center bg-(--container-bg-color) rounded-2xl p-4 opacity-0"
          ref={iconContainerRef}
        >
          {iconResources.map((icon) => (
            <IconCircle
              key={icon.text}
              from={0}
              to={360}
              duration={1.5}
              logoSource={icon.src}
              logoScale={icon.scale}
              logoX={icon.x}
              logoY={icon.y}
              logoText={icon.text}
              circleColor={icon.color}
              useScrollTrigger
              scrollerRef={scrollerRef}
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
