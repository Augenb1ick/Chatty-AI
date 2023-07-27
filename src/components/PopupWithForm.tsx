import './styles/PopupWithForm.css';
import usePopupClose from '../hooks/usePopupClose';
import { FC } from 'react';

interface PopupWithFormProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
}

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
