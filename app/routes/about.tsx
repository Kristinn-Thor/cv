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
      duration: 1,
      stagger: 0.1,
    });
  }, []);
  return (
    <div className="relative flex flex-col items-center w-full h-screen z-0">
      <div className="Mask" style={{opacity: 1}} />
      <div className="flex flex-col items-center overflow-y-auto px-[10%] py-[100px]">
        <h1 className="AboutTitle opacity-0 font-bold text-4xl text-(--text-highlight-color) mb-[25px]">
          Um mig
        </h1>
        <div className="AboutText opacity-0 bg-(--container-bg-color) rounded-2xl p-4 mb-[25px] max-w-[800px]">
          <p>
            Ég vann sem “full stack” forritari frá 2021 til 2025 hjá
            nýsköpunarfyrirtækinu Driftline ehf. Var þar í lykilhlutverki sem
            kom að hönnun og þróun á ýmsum kerfum, þar á meðal:
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
    </div>
  );
}
