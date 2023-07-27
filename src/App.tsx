import { FC, useState, useEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import Main from './components/Main';
import StepsInfo from './components/StepsInfo';
import PopupWithAssistant from './components/PopupWithAssistant';
import PopupWithLimits from './components/PopupWithLimits';
import './components/styles/App.css';
import Footer from './components/Footer';

const App: FC = () => {
  const { t } = useTranslation();
  const [isOpenAssistantPopup, setIsOpenAssistantPopup] = useState(false);
  const [isOpenPopupWithLimits, setIsOpenPopupWithLimits] = useState(false);
  const [activeProfile, setActiveProfile] = useState(0);
  const [popupText, setPopupText] = useState('');
  const [popupButtonText, setPopupButtonText] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [isMicroClicked, setIsMicroClicked] = useState(false);
  const [isFaqOpened, setIsFaqOpened] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const { isMicrophoneAvailable } = useSpeechRecognition();

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  useEffect(() => {
    !isOnline && handlePopupInternetOpen();
  }, [isOnline]);

  const onSelectedProfile = (index: number) => {
    setActiveProfile(index);
  };

  function handleChangeAssistant() {
    setIsOpenAssistantPopup(true);
  }

  const closePopups = () => {
    setIsOpenAssistantPopup(false);
    setIsOpenPopupWithLimits(false);
  };

  const handleRerender = (value: boolean) => {
    setIsClicked(value);
    setIsFaqOpened(false);
  };

  const handlePopupMicroOpen = (value: boolean) => {
    setPopupText(t('__Извините, ваш микрофон...__'));
    setPopupButtonText(t('__ПОВТОРИТЬ__'));
    setIsOpenPopupWithLimits(value);
  };

  const handlePopupInternetOpen = () => {
    setPopupText(t('__Извините, ваш интернет...__'));
    setPopupButtonText(t('__ПОПРОБОВАТЬ ПОЗЖЕ__'));
    setIsOpenPopupWithLimits(true);
  };

  const handleMicroClick = (value: boolean) => {
    if (!isMicrophoneAvailable) {
      setIsMicroClicked(value);
      return;
    }
    handlePopupMicroOpen(value);
  };

  const handleFaqOpen = (value: boolean) => {
    setIsMicroClicked(false);
    setIsFaqOpened(value);
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
      {isClicked ? (
        <Chatbot
          activeProfile={activeProfile}
          isMicroOn={isMicroClicked}
          isFaqOpened={isFaqOpened}
          microIsTurnedOff={handlePopupMicroOpen}
        />
      ) : (
        <Main
          onMicroClick={handleMicroClick}
          isClicked={handleRerender}
          isFaqOpened={handleFaqOpen}
          activeProfile={activeProfile}
        />
      )}
      {!isClicked ? <StepsInfo /> : null}
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
        textButton={'ПОВТОРИТЬ'}
        popupText={popupText}
        popupButtonText={popupButtonText}
        activeProfile={activeProfile}
      />
    </div>
  );
};

export default App;
