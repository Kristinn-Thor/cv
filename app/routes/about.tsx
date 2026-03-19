import {useEffect} from 'react';
import type {Route} from './+types/about';
import gsap from 'gsap';

export function meta({}: Route.MetaArgs) {
  return [
    {title: 'Kristinn - Cirriculum Vitae'},
    {name: 'description', content: 'Welcome to my homepage!'},
  ];
}

export default function About() {
  useEffect(() => {
    gsap.to('.AboutTitle, .AboutText', {
      opacity: '1',
      duration: 2,
      stagger: 0.3,
    });
  }, []);
  return (
    <div className="relative flex justify-center items-center overflow-hidden w-full h-screen z-0">
      <div className="Mask" style={{opacity: 1}} />
      <div className="flex flex-col items-center p-10">
        <h1 className="AboutTitle opacity-0 font-bold text-4xl text-(--text-highlight-color) mb-[25px]">
          Um mig
        </h1>
        <div className="AboutText opacity-0 bg-[rgba(196,196,196,0.05)] rounded-2xl p-4 mb-[25px] max-w-[800px]">
          <p>
            Aðal áhugasvið er vefhönnun og notendaviðmót. Með það markmið að
            bæta notendaupplifun og gera hönnun skalanlega.
          </p>
          <p>Metnaðarfullur, vandvirkur og með auga fyrir smáatriðum.</p>
          <p>Önnur áhugamál eru hlaup🏃‍♂️, líkamsrækt🏋️ og fjallgöngur⛰️.</p>
        </div>
      </div>
    </div>
  );
}
