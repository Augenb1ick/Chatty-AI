import { FC } from 'react';
import './styles/Main.css';
import ChatBotSearch from './ChatBotSearch';
import assistantCat from '../assets/cat.svg';
import assistantDog from '../assets/dog.svg';
import assistantBird from '../assets/bird.svg';

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
      <h1 className='main__title'>
        Твой верный помощник по уходу за животными
      </h1>
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
        УЗНАЙ БОЛЬШЕ ОБО МНЕ
      </button>
      <button onClick={handleScroll} className='main__down-button'></button>
    </div>
  );
};

export default Main;
