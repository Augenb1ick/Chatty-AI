import { FC } from 'react';
import './styles/Main.css';
import ChatBotSearch from './ChatBotSearch';
import { useTranslation } from 'react-i18next';
import { MainProps } from '../models/componentsInterfaces';
import { handleAssistantAva } from '../utills/assistantUtills';
import { handleMainScroll } from '../utills/handleScroll';

const Main: FC<MainProps> = ({
  onMicroClick,
  isClicked,
  isFaqOpened,
  activeProfile,
}) => {
  const { t } = useTranslation();

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
      <button onClick={handleMainScroll} className='main__down-button'></button>
    </div>
  );
};

export default Main;
