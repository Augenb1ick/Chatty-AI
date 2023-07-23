import { FC } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

type PropsType = {
  transriptedText: (value: string) => void;
};

const VoiceToText: FC<PropsType> = ({ transriptedText }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    transriptedText(transcript);
    handleReset();
  };

  const handleReset = () => {
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Ваш браузер не поддерживает распознавание речи</span>;
  }

  return (
    <>
      <div>
        <h1>
          {!isMicrophoneAvailable && 'Нужно разрешить использование микрофона'}
        </h1>
        <p>Задайте вопрос голосом</p>
        {listening && <span>Идет запись: 🎙</span>}
        <br />
        {!listening ? (
          <button onClick={startListening}>Запись</button>
        ) : (
          <button onClick={stopListening}>Отправить</button>
        )}
        <button onClick={handleReset}>Сбросить</button>
        <p>{transcript && `Ваш вопрос: ${transcript}`}</p>
      </div>
    </>
  );
};

export default VoiceToText;
