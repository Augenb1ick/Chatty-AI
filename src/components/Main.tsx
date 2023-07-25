import { FC } from 'react';
import './styles/Main.css';
import assistantMain from '../images/assistant+ellipse.png';
import ChatBotSearch from './ChatBotSearch';

interface Main {
  onSeacrhClick: (value: boolean) => void;
}

const Main: FC<Main> = ({ onSeacrhClick }) => {
  return (
    <div className='main'>
      <img className='main__img' src={assistantMain} />
      <h1 className='main__title'>
        Твой верный помощник по уходу за животными
      </h1>
      <div className='main__search-container'>
        <ChatBotSearch isClicked={onSeacrhClick} />
      </div>
      <button className='main__button'>УЗНАЙ БОЛЬШЕ ОБО МНЕ</button>
      <button className='main__down-button'></button>
    </div>
  );
};

export default Main;
