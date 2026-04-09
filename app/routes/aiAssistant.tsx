import {useEffect} from 'react';
import gsap from 'gsap';

import AiAssistant from '~/components/aiAssistant';
import GoBackButton from '~/components/goBackButton';
import InfoWindow from '~/components/infoWindow';

export default function AIAssistant() {
  useEffect(() => {
    gsap.to('.Page', {
      opacity: '1',
      duration: 2,
    });
  }, []);

  return (
    <div className="relative flex flex-col w-full h-screen max-h-screen px-4 Page opacity-0">
      <div className="absolute top-5 left-4 z-20">
        <GoBackButton to="/projects" />
      </div>
      <InfoWindow>
        <h1 className="text-4xl font-bold">AI Assistant</h1>
        <p className="mt-4">
          Gervigreindartól byggt á Claude Code.
          <br />
          <span>
            <a
              href="https://github.com/Kristinn-Thor/claude-code-typescript"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-(--text-highlight-color)"
            >
              GitHub repo
            </a>
          </span>
          <br />
          <br />
          <span className="text-sm italic">
            Ath: Gervigreindarmódelið er ókeypis útgáfa frá Open Router og gæti
            því tekið smá tíma að svara, auk þess að hafa takmörk á fjölda
            "tokens".
          </span>
        </p>
      </InfoWindow>
      <div className="flex flex-1 min-h-0 justify-center items-center z-0">
        <AiAssistant />
      </div>
    </div>
  );
}
