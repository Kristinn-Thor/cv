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
import Bullet from '~/components/Bullet';

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
      duration: back ? 1.5 : 0.5,
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
        <div
          className="bg-(--container-bg-color) rounded-2xl p-4 mb-5 opacity-0"
          ref={textRef}
        >
          <p>Ótæmandi listi af tólum sem ég hef unnið með:</p>
          <span className="inline-flex items-center mt-6">
            <Bullet />
            <p className="ml-2 font-medium">Tungumál</p>
          </span>
          <p>HTML, CSS, JavaScript, TypeScript, Python, Java, C#, SQL</p>
          <span className="inline-flex items-center mt-6">
            <Bullet />
            <p className="ml-2 font-medium">Framendatól</p>
          </span>
          <p>React, React Router, Next.js, Tailwind CSS, GSAP</p>
          <span className="inline-flex items-center mt-6">
            <Bullet />
            <p className="ml-2 font-medium">Bakendatól</p>
          </span>
          <p>Node.js, Express.js</p>
          <span className="inline-flex items-center mt-6">
            <Bullet />
            <p className="ml-2 font-medium">Gagnagrunnar</p>
          </span>
          <p>PostgreSQL, Firestore</p>
          <span className="inline-flex items-center mt-6">
            <Bullet />
            <p className="ml-2 font-medium">Skýjaþjónustur</p>
          </span>
          <p>Firebase, Google Cloud</p>
          <span className="inline-flex items-center mt-6">
            <Bullet />
            <p className="ml-2 font-medium">Fyrirspurnatungumál</p>
          </span>
          <p>GraphQL</p>
        </div>
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
              logoSize="50"
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
    src: htmlLogo,
    color: 'var(--html-color)',
    text: 'HTML',
  },
  {
    src: cssLogo,
    color: 'var(--css-color)',
    text: 'CSS',
  },
  {
    src: jsLogo,
    color: 'var(--javascript-color)',
    text: 'JavaScript',
  },
  {
    src: javaLogo,
    color: 'var(--java-color)',
    text: 'Java',
  },
  {
    src: gsapLogo,
    color: 'var(--gsap-color)',
    text: 'GSAP',
  },
  {
    src: reactLogo,
    color: 'var(--react-color)',
    text: 'React',
  },
  {
    src: gitLogo,
    color: 'var(--git-color)',
    text: 'git',
  },
  {
    src: npmLogo,
    color: 'var(--npm-color)',
    text: 'NPM',
  },
];
