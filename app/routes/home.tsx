import {useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

import About from '~/content/about';
import Skills from '~/content/skills';
import Projects from '~/content/projects';
import Contact from '~/content/contact';
import Welcome from '~/content/welcome';
import DownGesture from '~/components/downGesture';

export default function Home() {
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showDownGesture, setShowDownGesture] = useState<boolean>(false);

  const trackScrollProgress = () => {
    if (scrollContainerRef.current) {
      const {scrollTop, scrollHeight, clientHeight} =
        scrollContainerRef.current;
      const totalScrollableHeight = scrollHeight - clientHeight;
      const progress =
        totalScrollableHeight > 0 ? scrollTop / totalScrollableHeight : 0;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      '.Mask',
      {x: '700', y: '-700'},
      {x: '0', y: '0', opacity: 1, duration: 1},
    );

    // Toggle down gesture visibility
    const gestureInterval = setInterval(() => {
      setShowDownGesture((prev) => {
        return !prev;
      });
    }, 3000); // Check every 3 seconds

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

    const scrollTo = location.state?.scrollTo as string | undefined;
    const alreadyScrolled = sessionStorage.getItem('scrolledToProjects');
    if (scrollTo === 'Projects' && !alreadyScrolled) {
      if (scrollContainerRef.current) {
        gsap.to(scrollContainerRef.current, {
          scrollTo: `#${scrollTo}`,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            sessionStorage.setItem('scrolledToProjects', 'true');
          },
        });
      }
    }
    return () => {
      sessionStorage.removeItem('scrolledToProjects');
      clearInterval(gestureInterval);
    };
  }, [location.state]);

  return (
    <div className="relative w-full z-0">
      <div className="Mask" />
      <div
        className="ScrollContainer w-full overflow-y-auto px-2"
        ref={scrollContainerRef}
        style={{maxHeight: '100vh', minHeight: '100vh'}}
        onScroll={trackScrollProgress}
      >
        <DownGesture
          size={50}
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce transition-opacity duration-800 ${showDownGesture && scrollProgress <= 0.05 ? 'opacity-100' : 'opacity-0'}`}
        />
        <Welcome className="Panel" />
        <About className="Panel" scrollerRef={scrollContainerRef} />
        <Skills className="Panel" scrollerRef={scrollContainerRef} />
        <Projects className="Panel" scrollerRef={scrollContainerRef} />
        <Contact className="Panel" scrollerRef={scrollContainerRef} />
      </div>
    </div>
  );
}
