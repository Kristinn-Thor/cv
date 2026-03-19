import React, {useState} from 'react';
import {sendMessage, type AiRequest, type ChatHistory} from './functions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp, faHourglass} from '@fortawesome/free-solid-svg-icons';

const AiAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: AiRequest = {
      prompt: input,
      chat_history: chatHistory,
    };

    setIsLoading(true);
    const response = await sendMessage(userMessage);
    setIsLoading(false);

    if (response.success) {
      setMessage(response.content || '');
      setChatHistory(response.history);
      setInput('');
    } else {
      setInput('');
      setMessage(
        response.message ||
          'An error occurred while communicating with the AI Assistant.',
      );
    }
  };

  const testLoadingState = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMessage('This is a test response after loading.');
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div
        className={`flex rounded-2xl p-4 ${isLoading ? 'RotatingBorderEffect' : 'bg-(--overlay-color)'} `}
        style={{
          border: '2px solid transparent',
        }}
      >
        <input
          className="flex-1 border-none focus:outline-none"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className={`bg-(--effect-color) w-10 h-10 ml-4 rounded-full ${isLoading ? '' : 'cursor-pointer'}`}
          onClick={handleSendMessage}
          disabled={isLoading}
        >
          <FontAwesomeIcon
            icon={isLoading ? faHourglass : faArrowUp}
            size="sm"
          />
        </button>
      </div>
      {message && (
        <div className="mt-10">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;
