import { FC, useState, useEffect } from 'react';
import { getSearchData } from '../utills/googleSearchApi';

type ChatbotProps = {
  textFromVoice: string;
};

type Message = {
  role: string;
  content: string;
};

const Chatbot: FC<ChatbotProps> = ({ textFromVoice }) => {
  const [prompt, setPrompt] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { role: 'system', content: 'Вы - помощник по вопросам домашних животных' },
  ]);
  const [pageLoaded, setPageLoaded] = useState(false);

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  useEffect(() => {
    if (textFromVoice && pageLoaded) {
      getSearchData(textFromVoice).then((data) => {
        setChatHistory((prevMessages) => [
          ...prevMessages,
          { role: 'user', content: textFromVoice },
          { role: 'system', content: data },
        ]);
      });
    }
  }, [textFromVoice, pageLoaded]);

  useEffect(() => {
    if (pageLoaded) {
      postToGpt();
    } else {
      setPageLoaded(true);
    }
  }, [chatHistory, pageLoaded]);

  async function postToGpt() {
    setLoading(true);
    const APIBody = {
      model: 'gpt-3.5-turbo-0613',
      messages: chatHistory,
      temperature: 0,
      max_tokens: 1000,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + apiKey,
          },
          body: JSON.stringify(APIBody),
        }
      );

      const data = await response.json();
      const res = data.choices[0].message;
      setApiResponse(res.content);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setChatHistory((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: prompt },
    ]);
    setPrompt('');
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={prompt}
            placeholder='Спросить ассистента'
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button disabled={loading || prompt.length === 0} type='submit'>
            Отправить
          </button>
          <br />
          {loading ? 'Генерирую ответ.' : ''}
        </form>
      </div>
      {apiResponse && (
        <div>
          <p>Ответ: {apiResponse}</p>
        </div>
      )}
    </>
  );
};

export default Chatbot;
