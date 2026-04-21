import React, {useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {useToast} from '~/components/toastContext';
gsap.registerPlugin(ScrollTrigger);

interface Props {
  className?: string;
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function Contact({className, scrollerRef}: Props) {
  const {showToast} = useToast();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const containerRef = React.useRef<HTMLUListElement>(null);
  const emailRef = React.useRef<HTMLLIElement>(null);
  const phoneRef = React.useRef<HTMLLIElement>(null);

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
      containerRef.current &&
      emailRef.current &&
      phoneRef.current &&
      scrollerRef?.current
    ) {
      const subContentRefs = [
        titleRef.current,
        containerRef.current,
        emailRef.current,
        phoneRef.current,
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
  }, [contentRef, titleRef, containerRef, emailRef, phoneRef, scrollerRef]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success', 3);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full min-h-screen ${className}`}
      ref={contentRef}
    >
      <h1
        className="opacity-0 font-bold text-4xl text-(--text-highlight-color) mb-[25px]"
        ref={titleRef}
      >
        Vertu í bandi
      </h1>
      <ul
        className="opacity-0 bg-(--container-bg-color) rounded-2xl p-4"
        ref={containerRef}
      >
        <li className="opacity-0 text-2xl" ref={emailRef}>
          <FontAwesomeIcon
            icon={faEnvelope}
            className="mr-2"
            style={{color: 'var(--icon-color)'}}
          />
          <button
            onClick={() => copyToClipboard('kristinn713@gmail.com')}
            className="cursor-pointer"
          >
            kristinn713@gmail.com
          </button>
        </li>
        <li className="opacity-0 text-2xl mt-4" ref={phoneRef}>
          <FontAwesomeIcon
            icon={faPhone}
            className="mr-2"
            style={{color: 'var(--icon-color)'}}
          />
          <button
            onClick={() => copyToClipboard('691-3314')}
            className="cursor-pointer"
          >
            691-3314
          </button>
        </li>
      </ul>
    </div>
  );
}
