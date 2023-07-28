import { FC } from 'react';
import './styles/ChatBotSearch.css';
import { useTranslation } from 'react-i18next';

interface ChatBotSearch {
  isClicked: (value: boolean) => void;
  onMicroClick: (value: boolean) => void;
}

const ChatBotSearch: FC<ChatBotSearch> = ({ onMicroClick, isClicked }) => {
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
            isClicked(true);
          }}
          className='microBtn'
          type='button'
        ></button>
        {/* <button disabled className='submitBtn' type='submit'></button> */}
      </div>
    </form>
  );
};

export default ChatBotSearch;
