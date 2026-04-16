import React, {useEffect} from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props {
  className?: string;
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function About({className, scrollerRef}: Props) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const textRef = React.useRef<HTMLDivElement>(null);

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
      className={`flex flex-col items-center justify-center w-full h-screen ${className}`}
      ref={contentRef}
    >
      <h1
        className="opacity-0 font-bold text-4xl text-(--text-highlight-color) mb-[25px]"
        ref={titleRef}
      >
        Um mig
      </h1>
      <div
        className="opacity-0 bg-(--container-bg-color) rounded-2xl p-4 mb-[25px] max-w-[800px]"
        ref={textRef}
      >
        <p>
          Ég vann sem “full stack” forritari frá 2021 til 2025 hjá
          nýsköpunarfyrirtækinu Driftline ehf. Var þar í lykilhlutverki sem kom
          að hönnun og þróun á ýmsum kerfum, þar á meðal:
        </p>
        <ul className="list-disc list-inside my-1">
          <li>Gagnagrunnur (Firestore)</li>
          <li>Bakendi (node js/Firebase)</li>
          <li>Farsímaforrit (React Native-IOS/Android)</li>
          <li>Vefforrit (Next.js)</li>
        </ul>
        <p>Metnaðarfullur, vandvirkur og með auga fyrir smáatriðum.</p>
        <p>Önnur áhugamál eru hlaup🏃‍♂️, líkamsrækt🏋️ og fjallgöngur⛰️.</p>
      </div>
    </div>
  );
}
