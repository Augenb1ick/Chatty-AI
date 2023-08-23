import { FC, useState, useEffect, useRef } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

import { getSearchData } from '../utills/googleSearchApi';
import { Message } from '../models/dataTypes';
import { useTranslation } from 'react-i18next';
import { useAssistantName } from '../utills/assistantUtills';
import { initOpenAiPromt, apiKey } from '../utills/constants';
import { handleScroll } from '../utills/handleScroll';
import { ChatBotProps } from '../models/componentsInterfaces';

import ChatHistory from './ChatHistory';
import FAQ from './FAQ';

import './styles/Chatbot.css';
import './styles/ChatBotSearch.css';

const Chatbot: FC<ChatBotProps> = ({
  isMicroOn,
  isFaqOpened,
  activeProfile,
  microIsTurnedOff,
  isSafari,
  currentLanguage,
  popupRecognitionOpen,
}) => {
  const { t } = useTranslation();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMicrophoneAvailable, setIsMicrophoneAvailable] = useState(true);
  const lastMessageRoleRef = useRef<string | null>(null);

  const assistantName = useAssistantName(activeProfile);

  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      role: 'system',
      content: 'Тебя зовут' + assistantName + initOpenAiPromt,
    },
  ]);

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

  useEffect(() => {
    handleScroll();
  });

  const startListening = () => {
    if (!browserSupportsSpeechRecognition) {
      popupRecognitionOpen(true);
    } else {
      if (isSafari) {
        SpeechRecognition.startListening({
          continuous: true,
          language: `${currentLanguage === 'ru' ? 'ru-RU' : 'en-US'}`,
        });
      }
      SpeechRecognition.startListening({
        language: `${currentLanguage === 'ru' ? 'ru-RU' : 'en-US'}`,
      });
    }
  };

  useEffect(() => {
    if (isMicroOn) {
      startListening();
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
      model: 'gpt-3.5-turbo',
      messages: chatHistory,
      temperature: 0,
      max_tokens: 2000,
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
            {isSafari && (
              <button className='stop-audio-btn'>
                {t('__Stop recording__')}
              </button>
            )}
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
              loading ? t('__Generating__') : transcript ? transcript : prompt
            }
            placeholder={t('__Спросить ассистента...__')}
            onChange={handleInputChange}
            disabled={loading}
          ></input>
          <button
            onClick={() => {
              if (isMicrophoneAvailable) {
                startListening();
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
