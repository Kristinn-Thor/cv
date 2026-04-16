import {useEffect} from 'react';
import gsap from 'gsap';

interface Props {
  className?: string;
}

export default function Welcome({className}: Props) {
  useEffect(() => {
    gsap.to('.HomeTitle, .HomeText', {
      opacity: 1,
      duration: 3,
      stagger: 0.3,
    });
  }, []);

  return (
    <div className={`w-full h-screen ${className}`}>
      <section
        className="flex items-center
                   w-full h-full
                   max-[1000px]:flex-col max-[1000px]:justify-center"
      >
        <h1
          className="HomeTitle
                     font-bold text-7xl text-(--text-highlight-color) text-start
                     w-[50%] tracking-wide ml-[10%] mr-7
                     max-[1000px]:w-[85%] max-[1000px]:m-5 max-[550px]:text-5xl
                     opacity-0
                    "
        >
          Velkomin
        </h1>
        <h3
          className="HomeText 
                       text-2xl font-semibold
                       w-[50%] mr-[10%]
                       max-[1000px]:w-[85%] max-[1000px]:m-5
                       opacity-0"
        >
          Hæ, ég heiti Kristinn og er forritari.
        </h3>
      </section>
    </div>
  );
}
