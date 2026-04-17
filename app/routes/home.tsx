import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import About from '~/content/about';
import Skills from '~/content/skills';
import Projects from '~/content/projects';
import Contact from '~/content/contact';
import Welcome from '~/content/welcome';

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.fromTo(
      '.Mask',
      {x: '700', y: '-700'},
      {x: '0', y: '0', opacity: 1, duration: 1},
    );

    const sections = gsap.utils.toArray<HTMLElement>('.Panel');
    if (scrollContainerRef.current && sections.length > 0) {
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          scroller: scrollContainerRef.current,
          start: 'bottom bottom',
          snap: {snapTo: 1, duration: 0.5, delay: 0, ease: 'power1.out'},
          markers: false,
        });
      });
    }
  }, []);

  return (
    <div className="relative w-full z-0">
      <div className="Mask" />
      <div
        className="ScrollContainer w-full overflow-y-auto px-2"
        ref={scrollContainerRef}
        style={{maxHeight: '100vh', minHeight: '100vh'}}
      >
        <Welcome className="Panel" />
        <About className="Panel" scrollerRef={scrollContainerRef} />
        <Skills className="Panel" scrollerRef={scrollContainerRef} />
        <Projects className="Panel" scrollerRef={scrollContainerRef} />
        <Contact className="Panel" scrollerRef={scrollContainerRef} />
      </div>
    </div>
  );
}
