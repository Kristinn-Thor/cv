import {useEffect} from 'react';
import gsap from 'gsap';
import {Link} from 'react-router';

export default function Projects() {
  useEffect(() => {
    const classesToAnimate = [
      '.AboutHeader',
      ...projectList.map((p) => `.${p.className}`),
    ].join(', ');
    gsap.to(classesToAnimate, {
      opacity: '1',
      duration: 1,
      stagger: 0.1,
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
            className={`${project.className} opacity-0 rounded-lg p-1 transition-colors duration-300 hover:bg-(--effect-color)`}
          >
            <Link
              to={project.link}
              className="text-(--text-highlight-color)"
              rel="noopener noreferrer"
            >
              <p className="">
                <span className="font-bold">{project.title}</span>
                <span className="mx-1">-</span>
                <span>{project.description}</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const projectList: {
  title: string;
  description: string;
  link: string;
  className: string;
}[] = [
  {
    title: 'Milla',
    description: 'Einfaldur milluleikur útfærður í React',
    link: '/games',
    className: 'ProjectListItem1',
  },
  {
    title: 'Myndaalbúm',
    description: 'Einföld myndasíða skrifuð í html, css og js',
    link: 'https://kristinn-thor.github.io/lazy-loading-img/',
    className: 'ProjectListItem2',
  },
  {
    title: 'AI Assistant',
    description: 'Gervigreindartól byggt á Claude Code',
    link: '/ai-assistant',
    className: 'ProjectListItem3',
  },
];
