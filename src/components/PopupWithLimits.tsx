import { FC } from 'react';
import usePopupClose from '../hooks/usePopupClose';
import PopupWithForm from './PopupWithForm';
import { PopupWithLimitsProps } from '../models/componentsInterfaces';
import { handleAssistantAva } from '../utills/assistantUtills';

import './styles/PopupWithLimits.css';

const PopupWithLimits: FC<PopupWithLimitsProps> = ({
  isOpen,
  onClose,
  popupButtonText,
  popupText,
  activeProfile,
}) => {
  usePopupClose(isOpen, onClose);

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
