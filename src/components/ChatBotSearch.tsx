import { FC } from 'react';
import './styles/ChatBotSearch.css';

interface ChatBotSearch {
  isClicked: (value: boolean) => void;
}

const ChatBotSearch: FC<ChatBotSearch> = ({ isClicked }) => {
  const handleSearchClick = () => {
    isClicked(true);
  };

  return (
    <form className='inputArea'>
      <input
        onClick={handleSearchClick}
        className='chatInput'
        placeholder='Спросить ассистента'
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
