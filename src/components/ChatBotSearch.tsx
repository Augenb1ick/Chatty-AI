import { FC } from 'react';
import './styles/ChatBotSearch.css';
import { useTranslation } from 'react-i18next';

interface ChatBotSearch {
  isClicked: (value: boolean) => void;
}

const ChatBotSearch: FC<ChatBotSearch> = ({ isClicked }) => {
  const { t } = useTranslation();
  const handleSearchClick = () => {
    isClicked(true);
  };

  return (
    <form className='inputArea'>
      <input
        onClick={handleSearchClick}
        className='chatInput'
        placeholder={t('__Спросить ассистента...__')}
      ></input>
      <div className='chatBtns'>
        <button
          onClick={handleSearchClick}
          className='microBtn'
          type='button'
        ></button>
        <button
          onClick={handleSearchClick}
          className='submitBtn'
          type='submit'
        ></button>
      </div>
    </form>
  );
};

export default ChatBotSearch;
