import { FC, useState } from 'react';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import Main from './components/Main';
import StepsInfo from './components/StepsInfo';
import AssistantPopup from './components/AssistantPopup';
import Footer from './components/Footer';
import './components/styles/App.css';

const App: FC = () => {
  //const [text, setText] = useState('');
  const [isOpenAssistantPopup, setIsOpenAssistantPopup] = useState(false);
  const [activeProfile, setActiveProfile] = useState(0);

  const onSelectedProfile = (index:any) => {
    setActiveProfile(index);
  };

  function handleChangeAssistant () {
    setIsOpenAssistantPopup(true)
  }

  const closePopups = () => {
    setIsOpenAssistantPopup(false);
  };

  return (
    <div className="App">
      <Header activeProfile={activeProfile} handleChangeAssistant={handleChangeAssistant} />
      <Main />
      <StepsInfo />
      <Chatbot />
      <AssistantPopup 
        activeProfile={activeProfile} 
        onSelectedProfile={onSelectedProfile}
        isOpen={isOpenAssistantPopup} 
        onClose={closePopups} 
      />
      <Footer />
    </div>
  ); 
};

export default App;
