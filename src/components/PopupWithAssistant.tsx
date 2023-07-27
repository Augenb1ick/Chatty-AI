import { FC } from 'react';
import doggy from '../images/dog.svg';
import kitty from '../images/cat.svg';
import parrot from '../images/bird.svg';
import './styles/PopupWithAssistant.css';
import usePopupClose from '../hooks/usePopupClose';
import PopupWithForm from './PopupWithForm';

type profileData = {
  image: string;
  active: boolean;
};

interface PopupWithAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: number;
  onSelectedProfile: (i: number) => void;
}

const PopupWithAssistant: FC<PopupWithAssistantProps> = ({
  isOpen,
  onClose,
  activeProfile,
  onSelectedProfile,
}) => {
  const profileData: profileData[] = [
    {
      image: doggy,
      active: true,
    },
    {
      image: kitty,
      active: false,
    },
    {
      image: parrot,
      active: false,
    },
  ];

  const profileImage = profileData.map((tab: profileData, i: number) => {
    return (
      <button
        type='button'
        aria-label='changeAssistantButton'
        className={`popup__AssistantButton ${
          i === activeProfile ? 'popup__AssistantButton_active' : ''
        }`}
        key={i}
        onClick={() => onSelectedProfile(i)}
      >
        <img src={tab.image} alt='изображение животного' />
      </button>
    );
  });

  usePopupClose(isOpen, onClose);

  return (
    <PopupWithForm
      title={'Выбери своего помощника'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='popup__changeAssistant'>{profileImage}</div>
    </PopupWithForm>
  );
};

export default PopupWithAssistant;
