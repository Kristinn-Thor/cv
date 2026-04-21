import React, {useEffect} from 'react';
import {Link} from 'react-router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const projectList: {
  title: string;
  description: string;
  link: string;
}[] = [
  {
    title: 'Milla',
    description: 'Einfaldur milluleikur útfærður í React',
    link: '/games',
  },
  {
    title: 'Myndaalbúm',
    description: 'Einföld myndasíða skrifuð í html, css og js',
    link: 'https://kristinn-thor.github.io/lazy-loading-img/',
  },
  {
    title: 'AI Assistant',
    description: 'Gervigreindartól byggt á Claude Code',
    link: '/ai-assistant',
  },
];

interface Props {
  className?: string;
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function Projects({className, scrollerRef}: Props) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const listContainerRef = React.useRef<HTMLUListElement>(null);
  const listItemRefs = React.useRef(
    projectList.map(() => React.createRef<HTMLLIElement>()),
  ).current;

  const handleEnterAnimation = (
    refs: (HTMLHeadingElement | HTMLUListElement | HTMLLIElement | null)[],
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
    refs: (HTMLHeadingElement | HTMLUListElement | HTMLLIElement | null)[],
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
      listItemRefs.every((ref) => ref.current) &&
      listContainerRef.current &&
      scrollerRef?.current
    ) {
      const subContentRefs = [
        titleRef.current,
        listContainerRef.current,
        ...listItemRefs.map((ref) => ref.current),
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
  }, [contentRef, titleRef, listItemRefs, listContainerRef, scrollerRef]);

  return (
    <div
      id="Projects"
      className={`flex flex-col items-center justify-center w-full min-h-screen ${className}`}
      ref={contentRef}
    >
      <h1
        className="opacity-0 font-bold text-4xl text-(--text-highlight-color) mb-[25px]"
        ref={titleRef}
      >
        Verkefni
      </h1>
      <ul
        className="opacity-0 space-y-4 bg-(--container-bg-color) rounded-2xl p-4"
        ref={listContainerRef}
      >
        {projectList.map((project, index) => (
          <li
            key={index}
            className="opacity-0 rounded-lg p-1 transition-colors duration-300 hover:bg-(--container-bg-color)"
            ref={listItemRefs[index]}
          >
            <Link
              to={project.link}
              className="text-(--text-highlight-color)"
              rel="noopener noreferrer"
            >
              <p>
                <span className="font-bold">{project.title}</span>
                <span className="mx-1">-</span>
                <span>{project.description}</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
