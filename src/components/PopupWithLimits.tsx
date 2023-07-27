import usePopupClose from '../hooks/usePopupClose';
import PopupWithForm from './PopupWithForm';
import './styles/PopupWithLimits.css';
import assistantCat from '../assets/bigCat.svg';
import assistantDog from '../assets/bigDog.svg';
import assistantBird from '../assets/bigBird.svg';
import { FC } from 'react';

interface PopupWithLimitsProps {
  isOpen: boolean;
  onClose: () => void;
  textButton: string;
  popupText: string;
  popupButtonText: string;
  activeProfile: number;
}

const PopupWithLimits: FC<PopupWithLimitsProps> = ({
  isOpen,
  onClose,
  popupButtonText,
  popupText,
  activeProfile,
}) => {
  usePopupClose(isOpen, onClose);

  const handleAssistantAva = (value: number) => {
    const avatars: { [key: number]: string } = {
      0: assistantDog,
      1: assistantCat,
      2: assistantBird,
    };

    return avatars[value] || assistantDog;
  };

  return (
    <PopupWithForm title={''} isOpen={isOpen} onClose={onClose}>
      <>
        <div className='popup__content'>
          <p className='popup__answer'>{popupText}</p>
          <button onClick={onClose} className='popup__button'>
            {popupButtonText}
          </button>
        </div>
        <div className='popup__image'>
          <img
            src={handleAssistantAva(activeProfile)}
            alt='изображение животного'
          />
        </div>
      </>
    </PopupWithForm>
  );
};

export default PopupWithLimits;
