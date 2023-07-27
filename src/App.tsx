import { FC, useState } from 'react';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import Main from './components/Main';
import StepsInfo from './components/StepsInfo';
import PopupWithAssistant from './components/PopupWithAssistant';
import PopupWithLimits from './components/PopupWithLimits';
import './components/styles/App.css';
import Footer from './components/Footer';

const App: FC = () => {
  //const [text, setText] = useState('');
  const [isOpenAssistantPopup, setIsOpenAssistantPopup] = useState(false);
  const [isOpenPopupWithLimits, setIsOpenPopupWithLimits] = useState(false);
  const [activeProfile, setActiveProfile] = useState(0);

  const onSelectedProfile = (index:any) => {
    setActiveProfile(index);
  };

  function handleChangeAssistant() {
    setIsOpenAssistantPopup(true);
  }

  const closePopups = () => {
    setIsOpenAssistantPopup(false);
    setIsOpenPopupWithLimits(false);
  };

  const [isClicked, setIsClicked] = useState(false);

  const handleRerender = (value: boolean) => {
    setIsClicked(value);
  };

  function clickForButton() {
    setIsOpenPopupWithLimits(true);
  }


  return (
    <div className="App">
      <Header 
        activeProfile={activeProfile}
        handleChangeAssistant={handleChangeAssistant} 
        handleLogoClick={() => {setIsClicked(false)}}
        clickForButton={clickForButton}
      />
      
      {!isClicked ? <StepsInfo /> : null}
      {isClicked ? <Chatbot /> : <Main onSeacrhClick={handleRerender} />}
      {!isClicked ? <Footer /> : null}
      <PopupWithAssistant 
        activeProfile={activeProfile} 
        onSelectedProfile={onSelectedProfile}
        isOpen={isOpenAssistantPopup} 
        onClose={closePopups} 
      />
      <PopupWithLimits 
        isOpen={isOpenPopupWithLimits} 
        onClose={closePopups}
        textButton={"ПОВТОРИТЬ"} 
      />
    </div>
  );
};

export default App;
