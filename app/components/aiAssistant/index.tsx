import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp, faHourglass} from '@fortawesome/free-solid-svg-icons';

import {
  pingServer,
  sendMessage,
  type AiRequest,
  type ChatHistory,
} from './apiFunctions';
import {RenderChat} from './renderFunctions';

type ServerStatus = {
  available: boolean;
  message: string;
  responseError: boolean;
};

const AiAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<ServerStatus>({
    available: true,
    message: '',
    responseError: false,
  });

  useEffect(() => {
    const checkServer = async () => {
      setIsLoading(true);
      setServerStatus({
        available: false,
        message: 'Spinning up the AI Assistant server...',
        responseError: false,
      });
      const isServerUp = await pingServer();
      setIsLoading(false);
      if (!isServerUp) {
        setServerStatus({
          available: false,
          message:
            'Sorry, the AI Assistant server is currently unavailable. Please try again later.',
          responseError: false,
        });
      } else {
        setServerStatus({available: true, message: '', responseError: false});
      }
    };
    checkServer();
  }, []);

  const handleSendMessage = async () => {
    setServerStatus((prev) => ({...prev, responseError: false}));
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
      setServerStatus((prev) => ({
        ...prev,
        responseError: true,
        message:
          response.message + '. Please try again.' ||
          'An error occurred while communicating with the AI Assistant. Please try again.',
      }));
    }
  };

  const checkIfButtonShouldBeDisabled = () => {
    return isLoading || input.trim() === '' || !serverStatus.available;
  };

  return (
    <div className="flex flex-col justify-center max-w-2xl w-full h-full">
      <RenderChat message={message} chatHistory={chatHistory} />
      <div className="flex-none">
        <div className="flex justify-center items-center h-16">
          {!serverStatus.available && (
            <p
              className={`text-sm ${isLoading ? 'animate-pulse' : ''} ${!serverStatus.available && !isLoading ? 'text-orange-400' : ''}`}
            >
              {serverStatus.message}
            </p>
          )}
        </div>
        <div
          className={`flex rounded-2xl p-4 mb-4 ${isLoading ? 'RotatingBorderEffect' : 'bg-(--input-bg-color)'}`}
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
            disabled={isLoading || !serverStatus.available}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isLoading && serverStatus.available) {
                handleSendMessage();
              }
            }}
          />
          <button
            className={`bg-(--nav-color-dm) w-10 h-10 ml-4 rounded-full ${checkIfButtonShouldBeDisabled() ? '' : 'cursor-pointer'}`}
            onClick={handleSendMessage}
            disabled={checkIfButtonShouldBeDisabled()}
            title={isLoading ? undefined : 'Send message'}
          >
            <FontAwesomeIcon
              icon={isLoading ? faHourglass : faArrowUp}
              style={{
                width: '0.9rem',
                height: '0.9rem',
              }}
              color={input.trim() ? 'inherit' : 'gray'}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
