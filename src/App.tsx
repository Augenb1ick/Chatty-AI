import { FC, useState } from 'react';
import VoiceToText from './components/VoiceToText';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import Main from './components/Main';
import StepsInfo from './components/StepsInfo';
import AssistantPopup from './components/AssistantPopup';
import './components/styles/App.css';

const App: FC = () => {
  const [text, setText] = useState('');
  const [isOpenAssistantPopup, setIsOpenAssistantPopup] = useState(false);

  function handleChangeAssistant () {
    setIsOpenAssistantPopup(true)
  }

  const closePopups = () => {
    setIsOpenAssistantPopup(false);
  };

  return (
    <div className="App">
      <Header handleChangeAssistant={handleChangeAssistant}/>
      <Main />
      <StepsInfo />
      <VoiceToText transriptedText={setText} />
      <Chatbot textFromVoice={text} />
      <AssistantPopup isOpen={isOpenAssistantPopup} onClose={closePopups}/>
    </div>
  );
};

export default App;
