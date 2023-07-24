import { FC, useState, useEffect, useRef } from 'react';
import { getSearchData } from '../utills/googleSearchApi';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import './styles/Chatbot.css';
import userAva from '../images/Ellipse 10.svg';
import assistantAva from '../images/Ellipse 8.svg';
type Message = {
  role: string;
  content: string;
};

const Chatbot: FC = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      role: 'system',
      content:
        'Вы - Капибарыч, основная специализация - экперт по вопросам домашних животных',
    },
  ]);
  const lastMessageRoleRef = useRef<string | null>(null);

  useEffect(() => {
    if (transcript && listening === false) {
      handleVoiceRecognition();
    }
  }, [transcript, listening]);

  useEffect(() => {
    if (chatHistory.length > 0) {
      const lastMessage = chatHistory[chatHistory.length - 1];
      lastMessageRoleRef.current = lastMessage.role;
    }
  }, [chatHistory]);

  useEffect(() => {
    if (chatHistory.length > 1 && lastMessageRoleRef.current !== 'assistant') {
      postToGpt();
    }
  }, [chatHistory, lastMessageRoleRef]);

  const startListening = () => {
    SpeechRecognition.startListening();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleVoiceRecognition = async () => {
    setPrompt(transcript);
    setLoading(true);

    try {
      const enrichedData = await getSearchData(transcript);
      setChatHistory((prevMessages) => [
        ...prevMessages,
        { role: 'user', content: transcript },
        { role: 'system', content: enrichedData },
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Ошибка при получении обогащенных данных:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() !== '') {
      const enrichedData = await getSearchData(prompt);
      setChatHistory((prevMessages) => [
        ...prevMessages,
        { role: 'user', content: prompt },
        { role: 'system', content: enrichedData },
      ]);

      setPrompt('');
    }
  };

  async function postToGpt() {
    setLoading(true);
    const APIBody = {
      model: 'gpt-3.5-turbo-0613',
      messages: chatHistory,
      temperature: 0,
      max_tokens: 500,
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
      setChatHistory((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: res.content },
      ]);
      setPrompt('');
      resetTranscript();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const userChatMessage = (message: Message, index: number) => (
    <div key={index} className='chat-message_user-container'>
      <div className='chat-message'>{message.content}</div>
      <img className='ava' src={userAva} />
    </div>
  );

  const assistantChatMessage = (message: Message, index: number) => (
    <div key={index} className='chat-message_assistant-container'>
      <img className='ava' src={assistantAva} />
      <div className='chat-message'>{message.content}</div>
    </div>
  );

  return (
    <div className='chat'>
      {listening ? <div className='bigMicro'> </div> : null}
      <div className='dialogHistory'>
        {chatHistory.map((message, index) => {
          if (message.role === 'user') {
            return userChatMessage(message, index);
          }
          if (message.role === 'assistant') {
            return assistantChatMessage(message, index);
          } else {
            return null;
          }
        })}
      </div>
      <form
        className={`inputArea ${loading ? 'gradient' : ''} `}
        onSubmit={handleSubmit}
      >
        <input
          className='chatInput'
          value={
            loading ? 'Генерирую ответ...' : transcript ? transcript : prompt
          }
          placeholder='Спросить ассистента'
          onChange={handleInputChange}
          disabled={loading}
        ></input>
        <div className='chatBtns'>
          <button
            onClick={() => {
              startListening();
            }}
            className='microBtn'
            type='button'
          ></button>
          <button
            className='submitBtn'
            disabled={loading}
            type='submit'
          ></button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
