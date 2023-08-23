import { FC, useEffect } from 'react';
import { PopupWithFormProps } from '../models/componentsInterfaces';

import usePopupClose from '../hooks/usePopupClose';

import './styles/PopupWithForm.css';

const PopupWithForm: FC<PopupWithFormProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup ${isOpen ? 'popup_visible' : ''} `}>
      <div className='popup__container'>
        <div className='popup__container-info'>
          <h2 className='popup__name'>{title}</h2>
          <button
            id='closeButton'
            type='button'
            aria-label='close'
            className='popup__close-button'
            onClick={onClose}
          ></button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PopupWithForm;
