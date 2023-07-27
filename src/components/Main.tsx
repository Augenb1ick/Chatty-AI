import { FC } from 'react';
import './styles/Main.css';
import ChatBotSearch from './ChatBotSearch';
import { useTranslation } from 'react-i18next';
import assistantCat from '../images/cat-main.png';
import assistantDog from '../images/dog-main.png';
import assistantBird from '../images/bird-main.png';

interface Main {
  onMicroClick: (value: boolean) => void;
  isClicked: (value: boolean) => void;
  isFaqOpened: (value: boolean) => void;
  activeProfile: number;
}

const Main: FC<Main> = ({
  onMicroClick,
  isClicked,
  isFaqOpened,
  activeProfile,
}) => {
  const { t } = useTranslation();
  const handleScroll = () => {
    window.scroll({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  const handleAssistantAva = (value: number) => {
    if (value === 0) {
      return assistantDog;
    }
    if (value === 1) {
      return assistantCat;
    }
    if (value === 2) {
      return assistantBird;
    } else return assistantDog;
  };

  return (
    <div className='main'>
      <img className='main__img' src={handleAssistantAva(activeProfile)} />
      <h1 className='main__title'>{t('__Твой верный ...__')}</h1>
      <div className='main__search-container'>
        <ChatBotSearch onMicroClick={onMicroClick} isClicked={isClicked} />
      </div>
      <button
        onClick={() => {
          isClicked(true);
          isFaqOpened(true);
        }}
        className='main__button'
      >
        {t('__Узнай больше...__')}
      </button>
      <button onClick={handleScroll} className='main__down-button'></button>
    </div>
  );
};

export default Main;
