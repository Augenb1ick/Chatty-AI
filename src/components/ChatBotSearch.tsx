import { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { ChatBotSearchProps } from '../models/componentsInterfaces';

import './styles/ChatBotSearch.css';

const ChatBotSearch: FC<ChatBotSearchProps> = ({ onMicroClick, isClicked }) => {
  const { t } = useTranslation();

  return (
    <form className='inputArea'>
      <input
        className='chatInput'
        placeholder={t('__Спросить ассистента...__')}
        onClick={() => {
          isClicked(true);
        }}
      ></input>
      <div className='chatBtns'>
        <button
          onClick={() => {
            onMicroClick(true);
          }}
          className='microBtn'
          type='button'
        ></button>
      </div>
    </form>
  );
};

export default ChatBotSearch;
