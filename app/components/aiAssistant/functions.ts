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
    console.log('Sending message to AI Assistant:', message);
    const response = await fetch(
      'https://ai-assistant-m0zp.onrender.com/assistant',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      },
    );

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
    console.log('Received response from AI Assistant:', data);
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
