import { FC } from 'react';
import './styles/ChatBotSearch.css';

interface ChatBotSearch {
  isClicked: (value: boolean) => void;
  onMicroClick: (value: boolean) => void;
}

const ChatBotSearch: FC<ChatBotSearch> = ({ onMicroClick, isClicked }) => {
  return (
    <form className='inputArea'>
      <input
        className='chatInput'
        placeholder='Задайте ваш вопрос'
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
        <button disabled className='submitBtn' type='submit'></button>
      </div>
    </form>
  );
};

export default ChatBotSearch;
