const API_URL = 'https://ai-assistant-m0zp.onrender.com/assistant';
const PING_URL = 'https://ai-assistant-m0zp.onrender.com/';

export type ChatHistory = {
  role: 'user' | 'assistant';
  content: string;
};

export type AiRequest = {
  prompt: string;
  chat_history?: ChatHistory[];
};

type AiResponse = {
  success: boolean;
  content?: string;
  history: ChatHistory[];
  message?: string;
};

export const sendMessage = async (message: AiRequest): Promise<AiResponse> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      console.error(
        'Error response from AI Assistant:',
        response.status,
        response.statusText,
      );
      return {
        success: false,
        history: [],
        message:
          'Sorry, there was an error communicating with the AI Assistant.',
      };
    }
    const data: AiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error communicating with AI Assistant:', error);
    return {
      success: false,
      history: [],
      message: 'Sorry, there was an error processing your request.',
    };
  }
};

export const pingServer = async (): Promise<boolean> => {
  try {
    const response = await fetch(PING_URL);
    return response.ok;
  } catch (error) {
    console.error('Error pinging AI Assistant server:', error);
    return false;
  }
};
