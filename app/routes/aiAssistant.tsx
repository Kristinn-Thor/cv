import {Link} from 'react-router';
import type {Route} from './+types/contact';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import AiAssistant from '~/components/aiAssistant';

export function meta({}: Route.MetaArgs) {
  return [
    {title: 'Kristinn - Cirriculum Vitae'},
    {name: 'description', content: 'Welcome to my homepage!'},
  ];
}

export default function AIAssistant() {
  return (
    <div className="relative w-full h-screen px-4">
      <div className="absolute top-10 left-10">
        <Link to="/projects" className="flex items-center">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-[1.5em] transition-opacity ease-in-out duration-300 group-hover:opacity-0"
            style={{color: 'var(--icon-color)'}}
          />
          <p className="ml-2">Til baka</p>
        </Link>
      </div>
      <section className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mt-20">AI Assistant</h1>
        <p className="mt-4">
          Gervigreindartól byggt á Claude Code {'->'}
          <a
            href="https://github.com/Kristinn-Thor/claude-code-typescript"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-(--text-highlight-color)"
          >
            sjá GitHub repo
          </a>
          <br />
          Ath: Gervigreindarmódelið er ókeypis útgáfa frá Open Router og gæti
          því tekið smá tíma að svara og hefur þak á "tokens".
        </p>
      </section>
      <section className="mt-50">
        <AiAssistant />
      </section>
    </div>
  );
}
