import { FC, useState, useEffect, useRef } from 'react';
import { getSearchData } from '../utills/googleSearchApi';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import './styles/Chatbot.css';
import './styles/ChatBotSearch.css';
import { Message } from '../models/Message';
import ChatHistory from './ChatHistory';
import { useTranslation } from 'react-i18next';
import FAQ from './FAQ';

interface ChatBot {
  isMicroOn: boolean;
  isFaqOpened: boolean;
  activeProfile: number;
  microIsTurnedOff: (value: boolean) => void;
}

const Chatbot: FC<ChatBot> = ({
  isMicroOn,
  isFaqOpened,
  activeProfile,
  microIsTurnedOff,
}) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const { t } = useTranslation();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [isSafari, setIsSafari] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMicrophoneAvailable, setIsMicrophoneAvailable] =
    useState<boolean>(true);

  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      role: 'system',
      content: `Тебя зовут ${getAssistantName(
        activeProfile
      )}, Ты должен отвечать только как эксперт по вопросам домашних животных, если тебе зададут вопрос на другие темы, говори, что ты эксперт по домашним животным и можешь дать ответ только по это тематике`,
    },
  ]);
  const lastMessageRoleRef = useRef<string | null>(null);

  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
      setIsSafari(true);
      console.log('Вход выполнен с браузера Safari');
    }
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsMicrophoneAvailable(true);
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      setIsMicrophoneAvailable(false);
    }
  };

  useEffect(() => {
    checkMicrophonePermission();
  }, []);

  function getAssistantName(value: number) {
    switch (value) {
      case 0:
        return 'Оливер';
      case 1:
        return 'Винсет';
      case 2:
        return 'Густав';
      default:
        return 'Оливер';
    }
  }

  useEffect(() => {
    if (isMicroOn) {
      if (isSafari) {
        SpeechRecognition.startListening({ continuous: true });
      }
      SpeechRecognition.startListening();
    }
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
      SpeechRecognition.stopListening();
      postToGpt();
    }
  }, [chatHistory, lastMessageRoleRef]);

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
      console.error('Ошибка при получении данных их поисковой выдачи', error);
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
    setPrompt('');
    resetTranscript();
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
        {listening ? (
          <div onClick={SpeechRecognition.stopListening} className='bigMicro'>
            {' '}
            {isSafari && <button> Нажми сюда </button>}
          </div>
        ) : null}
        <ChatHistory activeProfile={activeProfile} chatHistory={chatHistory} />
        <form
          className={`inputArea inputArea-Inchat ${loading ? 'gradient' : ''} `}
          onSubmit={handleSubmit}
        >
          <input
            autoFocus
            className='chatInput chatInput-inChat'
            value={
              loading ? 'Генерирую ответ...' : transcript ? transcript : prompt
            }
            placeholder={t('__Спросить ассистента...__')}
            onChange={handleInputChange}
            disabled={loading}
          ></input>
          <button
            onClick={() => {
              if (isMicrophoneAvailable) {
                if (isSafari) {
                  SpeechRecognition.startListening({ continuous: true });
                }
                SpeechRecognition.startListening();
              } else {
                microIsTurnedOff(true);
              }
            }}
            className='microBtn'
            type='button'
            disabled={loading}
          ></button>
        </form>
        <button
          onClick={handleSubmit}
          className='submitBtn'
          disabled={loading}
          type='submit'
        ></button>
      </div>
    </div>
  );
};

export default Chatbot;
