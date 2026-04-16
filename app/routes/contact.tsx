import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';
import {useEffect} from 'react';
import gsap from 'gsap';

export default function Contact() {
  useEffect(() => {
    gsap.fromTo(
      '.ContactTitle, .ContactEmail, .ContactPhone',
      {
        opacity: '0',
      },
      {
        opacity: '1',
        duration: 1,
        stagger: 0.1,
      },
    );
  }, []);
  return (
    <div className="relative overflow-hidden w-full h-screen z-0">
      <div className="Mask" style={{opacity: 1}} />
      <div className="mt-[100px] ml-[10%]">
        <h1 className="ContactTitle font-bold text-4xl text-(--text-highlight-color) mb-[25px]">
          Vertu í bandi
        </h1>
        <ul>
          <li className="ContactEmail  text-2xl">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="mr-2"
              style={{color: 'var(--icon-color)'}}
            />
            kristinn713@gmail.com
          </li>
          <li className="ContactPhone text-2xl mt-4">
            <FontAwesomeIcon
              icon={faPhone}
              className="mr-2"
              style={{color: 'var(--icon-color)'}}
            />
            691-3314
          </li>
        </ul>
      </div>
    </div>
  );
}
