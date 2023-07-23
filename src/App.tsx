import { FC, useState } from 'react';
import VoiceToText from './components/VoiceToText';
import Chatbot from './components/Chatbot';

const App: FC = () => {
  const [text, setText] = useState('');

  return (
    <>
      <VoiceToText transriptedText={setText} />
      <Chatbot textFromVoice={text} />
    </>
  );
};

export default App;
