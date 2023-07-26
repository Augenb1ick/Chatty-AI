import { FC, useState, useEffect, useRef } from 'react';
import { getSearchData } from '../utills/googleSearchApi';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import './styles/Chatbot.css';
import './styles/ChatBotSearch.css';
import { Message } from '../models/Message';
import ChatHistory from './ChatHistory';
import FAQ from './FAQ';

interface ChatBot {
  isMicroOn: boolean;
  isFaqOpened: boolean;
  activeProfile: number;
}

const Chatbot: FC<ChatBot> = ({ isMicroOn, isFaqOpened, activeProfile }) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      role: 'system',
      content:
        'Тебя зовут Капибарыч, твоя основная специализация - экперт по вопросам домашних животных',
    },
    {
      role: 'assistant',
      content:
        'Добро пожаловать в мир заботы и любви к вашим домашним питомцам! Я ваш голосовой помощник, готовый помочь вам обеспечить оптимальный уход и здоровье для ваших маленьких друзей. Я создан, чтобы стать вашим верным компаньоном во всех вопросах, связанных с уходом за ваших любимцев. Здесь вы найдете полезные советы, надежные рекомендации и проверенные способы обеспечить вашим питомцам счастливую и здоровую жизнь.',
    },
  ]);
  const lastMessageRoleRef = useRef<string | null>(null);

  useEffect(() => {
    isMicroOn && startListening();
  }, [isMicroOn]);

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

  return (
    <div className='chat-container'>
      <div className='chat'>
        <FAQ mainFaqOpen={isFaqOpened} />
        {listening ? <div className='bigMicro'> </div> : null}
        <ChatHistory activeProfile={activeProfile} chatHistory={chatHistory} />
        <form
          className={`inputArea ${loading ? 'gradient' : ''} `}
          onSubmit={handleSubmit}
        >
          <input
            autoFocus
            className='chatInput'
            value={
              loading ? 'Генерирую ответ...' : transcript ? transcript : prompt
            }
            placeholder='Задайте ваш вопрос'
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
    </div>
  );
};

export default Chatbot;
