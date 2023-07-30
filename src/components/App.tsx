import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Chatbot from './Chatbot';
import Main from './Main';
import StepsInfo from './StepsInfo';
import PopupWithAssistant from './PopupWithAssistant';
import PopupWithLimits from './PopupWithLimits';
import './styles/App.css';
import Footer from './Footer';

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
  const [isSafari, setIsSafari] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isMicrophoneAvailable, setIsMicrophoneAvailable] =
    useState<boolean>(true);

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

  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
      setIsSafari(true);
      console.log('Вход выполнен с браузера Safari');
    }
  }, []);

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

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsMicrophoneAvailable(true);
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      setIsMicrophoneAvailable(false);
    }
  };

  useEffect(() => {
    checkMicrophonePermission();
  }, []);

  const handleMicroClick = (value: boolean) => {
    if (isMicrophoneAvailable) {
      setIsMicroClicked(value);
      handleRerender(value);
      return;
    } else {
      handlePopupMicroOpen(value);
      return;
    }
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
          setIsMicroClicked(false);
        }}
      />
      {isClicked ? (
        <Chatbot
          activeProfile={activeProfile}
          isMicroOn={isMicroClicked}
          isFaqOpened={isFaqOpened}
          microIsTurnedOff={handlePopupMicroOpen}
          isSafari={isSafari}
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
        popupText={popupText}
        popupButtonText={popupButtonText}
        activeProfile={activeProfile}
      />
    </div>
  );
};

export default App;
