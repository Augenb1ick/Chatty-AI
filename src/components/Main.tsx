import { FC } from 'react';
import './styles/Main.css';
import assistantMain from '../images/assistant+ellipse.png';
import ChatBotSearch from './ChatBotSearch';
import { useTranslation } from 'react-i18next';

interface Main {
  onSeacrhClick: (value: boolean) => void;
}

const Main: FC<Main> = ({ onSeacrhClick }) => {

  const { t } = useTranslation();

  const handleScroll = () => {
    window.scroll({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }
  return (
    <div className='main'>
      <img className='main__img' src={assistantMain} />
      <h1 className='main__title'>
        {t('__Твой верный ...__')}
      </h1>
      <div className='main__search-container'>
        <ChatBotSearch isClicked={onSeacrhClick} />
      </div>
      <button onClick={() => {onSeacrhClick(true)}} className='main__button'>{t('__Узнай больше...__')}</button>
      <button onClick={handleScroll} className='main__down-button'></button>
    </div>
  );
};

export default Main;
