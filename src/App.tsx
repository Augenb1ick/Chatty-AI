import React from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const App: React.FC = () => {
  // подключили хук
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // если браузер не поддерживает распознование речи, выдаст такой спан
  if (!browserSupportsSpeechRecognition) {
    return <span>Ваш браузер не поддерживает распознавание речи</span>;
  }
  // так можно сохранять результат отработки распознования
  if (!listening) {
    console.log(transcript);
  }

  // пример использования в риал-тайм
  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

export default App;
