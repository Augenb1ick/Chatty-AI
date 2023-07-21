import React, {useState, useEffect} from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {

  const [finalText, setFinalText] = useState('');

  

  // подключили хук
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening) {
        setFinalText(transcript);
      }
  },[transcript, listening, finalText])

  // если браузер не поддерживает распознование речи, выдаст такой спан
  if (!browserSupportsSpeechRecognition) {
    return <span>Ваш браузер не поддерживает распознавание речи</span>;
  }

  // пример использования в риал-тайм 
  return (
    <>
      <div>
        <h1>{!isMicrophoneAvailable && 'Нужно разрешить использования микрофона'}</h1>
        <p>Задайте вопрос голосом</p>
        {listening ? 'Идет запись: 🎙' : ''}
        <br />
        <button onClick={()=> {SpeechRecognition.startListening()}}>Запись</button>
        <button onClick={()=> {SpeechRecognition.stopListening()}}>Остановить</button>
        <button onClick={resetTranscript}>Сбросить</button>
        <p>{transcript && `Ваш вопрос: ${transcript}`}</p>
      </div>
      <Chatbot textFromVoice={finalText} />
    </>
  );
};

export default App;
