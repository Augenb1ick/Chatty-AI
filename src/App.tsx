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
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening) {
        setFinalText(transcript);
        console.log(finalText)
      }
  },[transcript, listening, finalText])

  // если браузер не поддерживает распознование речи, выдаст такой спан
  if (!browserSupportsSpeechRecognition) {
    return <span>Ваш браузер не поддерживает распознавание речи</span>;
  }
  // так можно сохранять результат отработки распознования
  
  
  
  


  // пример использования в риал-тайм
  return (
    <>
      <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div>
      <Chatbot textFromVoice={finalText} />
    </>
  );
};

export default App;
