import React, {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

import type {ChatHistory} from './apiFunctions';
import Markdown from 'react-markdown';

interface RenderChatProps {
  message: string;
  chatHistory?: ChatHistory[];
}

export const RenderChat: React.FC<RenderChatProps> = ({
  message,
  chatHistory,
}) => {
  const animatedDivRef = useRef<HTMLDivElement>(null);
  const prevHeightRef = useRef<number>(0);

  useEffect(() => {
    const tl = gsap.timeline();
    const el = animatedDivRef.current;
    if (!el) return;
    const newHeight = el.scrollHeight;
    tl.fromTo(
      el,
      {height: prevHeightRef.current},
      {
        height: newHeight,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          el.style.height = '';
        },
      },
    ).to(el, {
      scrollTo: {y: 'max'},
      duration: 0.5,
      ease: 'power2.out',
    });
    prevHeightRef.current = newHeight;
  }, [message, chatHistory]);

  if (message === '' || !chatHistory || chatHistory.length === 0) return null;
  return (
    <div
      ref={animatedDivRef}
      className="relative min-h-0 overflow-y-auto scrollbar-hide mt-10"
    >
      <div className="sticky top-0 left-0 h-14 w-full bg-[linear-gradient(rgba(13,22,38,1)_0%,rgba(13,22,38,0)_100%)]" />
      {chatHistory.slice(0, chatHistory.length - 1).map((entry, index) => (
        <div
          key={index}
          className={`flex items-center ${
            entry.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`mb-4 p-3 rounded-xl ${
              entry.role === 'user' ? 'bg-(--container-bg-color)' : ''
            }`}
          >
            <Markdown>{entry.content}</Markdown>
          </div>
        </div>
      ))}
      <div className="p-3">
        <Markdown>{message}</Markdown>
      </div>
      <div className="sticky bottom-0 left-0 h-14 w-full bg-[linear-gradient(rgba(13,22,38,0)_0%,rgba(13,22,38,1)_100%)]" />
    </div>
  );
};
