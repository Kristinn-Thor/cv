import {useEffect} from 'react';
import type {Route} from './+types/projects';
import gsap from 'gsap';
import {Link} from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    {title: 'Kristinn - Cirriculum Vitae'},
    {name: 'description', content: 'Welcome to my homepage!'},
  ];
}

export default function Projects() {
  useEffect(() => {
    gsap.to('.AboutHeader', {
      opacity: '1',
      duration: 2,
      stagger: 0.3,
    });
  }, []);

  return (
    <div className="relative overflow-hidden flex flex-col px-[10%] pt-[100px] pb-[120px] w-full h-screen z-0">
      <div className="Mask" style={{opacity: 1}} />
      <h1 className="AboutHeader opacity-0 font-bold text-4xl text-(--text-highlight-color) mb-[25px]">
        Verkefni
      </h1>
      <ul className="space-y-4">
        {projectList.map((project, index) => (
          <li
            key={index}
            className="w-max hover:bg-(--effect-color) rounded-lg p-1 transition-colors duration-300"
          >
            <Link
              to={project.link}
              className="text-(--text-highlight-color)"
              rel="noopener noreferrer"
            >
              <div className="flex">
                <p className="font-bold">{project.title}</p>
                <p className="mx-1">-</p>
                <p>{project.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const projectList: {title: string; description: string; link: string}[] = [
  {
    title: 'Milla',
    description: 'Einfaldur milluleikur útfærður í React',
    link: '/games',
  },
  {
    title: 'AI Assistant',
    description: 'Gervigreindartól byggt á Claude Code',
    link: '/ai-assistant',
  },
];
