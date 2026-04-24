import React, {useEffect} from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import Bullet from '~/components/Bullet';
import IconCircle from '~/components/iconCircle';
import htmlLogo from '../svg/html5-brands.svg';
import cssLogo from '../svg/css3-brands.svg';
import jsLogo from '../svg/js-square-brands.svg';
import tsLogo from '../svg/TypeScript.svg';
import pythonLogo from '../svg/Python.svg';
import javaLogo from '../svg/Vector-java.svg';
import cSharpLogo from '../svg/Csharp.svg';
import reactLogo from '../svg/react-brands.svg';
import reactRouterLogo from '../svg/ReactRouter.svg';
import nextJsLogo from '../svg/NextJs.svg';
import tailwindLogo from '../svg/Tailwind.svg';
import gsapLogo from '../svg/logo-man.svg';
import nodeLogo from '../svg/Node.svg';
import expressJsLogo from '../svg/Express.svg';
import posgresLogo from '../svg/Postgres.svg';
import firestoreLogo from '../svg/Firestore.svg';
import firebaseLogo from '../svg/Firebase.svg';
import googleCloudLogo from '../svg/Gcloud.svg';
import graphQLLogo from '../svg/GraphQl.svg';
import sql from '../svg/SQL.svg';

import gitLogo from '../svg/git-brands.svg';
import npmLogo from '../svg/npm-brands.svg';

interface Props {
  className?: string;
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function Skills({className, scrollerRef}: Props) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);

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
      scrollerRef?.current
    ) {
      const subContentRefs = [titleRef.current, textRef.current];
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
  }, [contentRef, titleRef, textRef, scrollerRef]);

  return (
    <div
      className={`flex flex-col items-center justify-center pt-[100px] pb-[200px] w-full min-h-screen ${className}`}
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
          <p>HTML, CSS, JavaScript, TypeScript, Python, Java, C#</p>
          <div className="flex flex-wrap space-x-3 mt-1">
            {languageIcons.map((icon) => (
              <IconCircle
                key={icon.text}
                logoSource={icon.src}
                logoSize="50"
                circleRadius={40}
                circleColor={icon.color}
                useScrollTrigger
                scrollerRef={scrollerRef}
              />
            ))}
          </div>
          <span className="inline-flex items-center mt-6">
            <Bullet />
            <p className="ml-2 font-medium">Framendatól</p>
          </span>
          <p>React, React Router, Next.js, Tailwind CSS, GSAP</p>
          <div className="flex flex-wrap space-x-3 mt-1">
            {frontEndToolIcons.map((icon) => (
              <IconCircle
                key={icon.text}
                logoSource={icon.src}
                circleColor={icon.color}
                useScrollTrigger
                scrollerRef={scrollerRef}
              />
            ))}
          </div>
          <span className="inline-flex items-center mt-6">
            <Bullet />
            <p className="ml-2 font-medium">Bakendatól</p>
          </span>
          <p>Node.js, Express.js</p>
          <div className="flex flex-wrap space-x-3 mt-1">
            {backEndToolIcons.map((icon) => (
              <IconCircle
                key={icon.text}
                logoSource={icon.src}
                circleColor={icon.color}
                useScrollTrigger
                scrollerRef={scrollerRef}
              />
            ))}
          </div>
          <span className="inline-flex items-center mt-6">
            <Bullet />
            <p className="ml-2 font-medium">Gagnagrunnar</p>
          </span>
          <p>PostgreSQL, Firestore</p>
          <div className="flex flex-wrap space-x-3 mt-1">
            {databaseIcons.map((icon) => (
              <IconCircle
                key={icon.text}
                logoSource={icon.src}
                circleColor={icon.color}
                useScrollTrigger
                scrollerRef={scrollerRef}
              />
            ))}
          </div>
          <span className="inline-flex items-center mt-6">
            <Bullet />
            <p className="ml-2 font-medium">Skýjaþjónustur</p>
          </span>
          <p>Firebase, Google Cloud</p>
          <div className="flex flex-wrap space-x-3 mt-1">
            {cloudIcons.map((icon) => (
              <IconCircle
                key={icon.text}
                logoSource={icon.src}
                circleColor={icon.color}
                useScrollTrigger
                scrollerRef={scrollerRef}
              />
            ))}
          </div>
          <span className="inline-flex items-center mt-6">
            <Bullet />
            <p className="ml-2 font-medium">Fyrirspurnatungumál/API</p>
          </span>
          <p>GraphQL, SQL</p>
          <div className="flex flex-wrap space-x-3 mt-1">
            {queryLanguageIcons.map((icon) => (
              <IconCircle
                key={icon.text}
                logoSource={icon.src}
                circleColor={icon.color}
                useScrollTrigger
                scrollerRef={scrollerRef}
              />
            ))}
          </div>
          <span className="inline-flex items-center mt-6">
            <Bullet />
            <p className="ml-2 font-medium">Annað</p>
          </span>
          <p>Git, NPM</p>
          <div className="flex flex-wrap space-x-3 mt-1">
            {otherIcons.map((icon) => (
              <IconCircle
                key={icon.text}
                logoSource={icon.src}
                circleColor={icon.color}
                useScrollTrigger
                scrollerRef={scrollerRef}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type IconInfo = {
  src: string;
  color: string;
  text: string;
};
const languageIcons: IconInfo[] = [
  {src: htmlLogo, color: 'var(--html-color)', text: 'HTML'},
  {src: cssLogo, color: 'var(--css-color)', text: 'CSS'},
  {src: jsLogo, color: 'var(--javascript-color)', text: 'JavaScript'},
  {src: tsLogo, color: 'var(--typescript-color)', text: 'TypeScript'},
  {src: pythonLogo, color: 'var(--python-color)', text: 'Python'},
  {src: javaLogo, color: 'var(--java-color)', text: 'Java'},
  {src: cSharpLogo, color: 'var(--cSharp-color)', text: 'C#'},
];

const frontEndToolIcons: IconInfo[] = [
  {src: reactLogo, color: 'var(--react-color)', text: 'React'},
  {
    src: reactRouterLogo,
    color: 'var(--react-router-color)',
    text: 'React Router',
  },
  {src: nextJsLogo, color: 'var(--next-js-color)', text: 'Next.js'},
  {src: tailwindLogo, color: 'var(--tailwind-color)', text: 'Tailwind CSS'},
  {src: gsapLogo, color: 'var(--gsap-color)', text: 'GSAP'},
];

const backEndToolIcons: IconInfo[] = [
  {src: nodeLogo, color: 'var(--node-color)', text: 'Node.js'},
  {src: expressJsLogo, color: 'var(--express-color)', text: 'Express.js'},
];

const databaseIcons: IconInfo[] = [
  {src: posgresLogo, color: 'var(--postgres-color)', text: 'PostgreSQL'},
  {src: firestoreLogo, color: 'var(--firestore-color)', text: 'Firestore'},
];

const cloudIcons: IconInfo[] = [
  {src: firebaseLogo, color: 'var(--firebase-color)', text: 'Firebase'},
  {
    src: googleCloudLogo,
    color: 'var(--google-cloud-color)',
    text: 'Google Cloud',
  },
];

const queryLanguageIcons: IconInfo[] = [
  {src: graphQLLogo, color: 'var(--graph-ql-color)', text: 'GraphQL'},
  {src: sql, color: 'var(--sql-color)', text: 'SQL'},
];

const otherIcons: IconInfo[] = [
  {
    src: gitLogo,
    color: 'var(--git-color)',
    text: 'Git',
  },
  {
    src: npmLogo,
    color: 'var(--npm-color)',
    text: 'NPM',
  },
];
