import { FC, useState } from 'react';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import Main from './components/Main';
import StepsInfo from './components/StepsInfo';
import AssistantPopup from './components/AssistantPopup';
import './components/styles/App.css';
import Footer from './components/Footer';

const App: FC = () => {
  //const [text, setText] = useState('');
  const [isOpenAssistantPopup, setIsOpenAssistantPopup] = useState(false);
  const [activeProfile, setActiveProfile] = useState(0);

  const onSelectedProfile = (index: any) => {
    setActiveProfile(index);
  };

  function handleChangeAssistant() {
    setIsOpenAssistantPopup(true);
  }

  const closePopups = () => {
    setIsOpenAssistantPopup(false);
  };

  const [isClicked, setIsClicked] = useState(false);

  const handleRerender = (value: boolean) => {
    setIsClicked(value);
  };

  return (
    <div className='App'>
      <Header
        activeProfile={activeProfile}
        handleChangeAssistant={handleChangeAssistant}
        handleLogoClick={() => {
          setIsClicked(false);
        }}
      />
      {isClicked ? <Chatbot /> : <Main onSeacrhClick={handleRerender} />}
      {!isClicked ? <StepsInfo /> : null}
      {!isClicked ? <Footer /> : null}
      <AssistantPopup
        activeProfile={activeProfile}
        onSelectedProfile={onSelectedProfile}
        isOpen={isOpenAssistantPopup}
        onClose={closePopups}
      />
    </div>
  );
};

export default App;
