import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

import usePopupClose from '../hooks/usePopupClose';
import PopupWithForm from './PopupWithForm';

import { profileData } from '../models/dataTypes';
import { PopupWithAssistantProps } from '../models/componentsInterfaces';

import './styles/PopupWithAssistant.css';
import { useAssistantData } from '../utills/assistantUtills';

const PopupWithAssistant: FC<PopupWithAssistantProps> = memo(
  ({ isOpen, onClose, activeProfile, onSelectedProfile }) => {
    const { t } = useTranslation();

    const profileData = useAssistantData();

    usePopupClose(isOpen, onClose);

    return (
      <PopupWithForm
        title={t('__Choose your assistant__')}
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className='popup__changeAssistant'>
          {profileData.map((tab: profileData, i: number) => (
            <div className='popup__Assistant-container' key={i}>
              <button
                type='button'
                aria-label='changeAssistantButton'
                className={`popup__AssistantButton ${
                  i === activeProfile ? 'popup__AssistantButton_active' : ''
                }`}
                onClick={() => onSelectedProfile(i)}
              >
                <img
                  className='popup__AssistantButton-image'
                  src={i === activeProfile ? tab.activeImage : tab.image}
                  alt='изображение животного'
                />
              </button>
              <p className='popup__Assistant-name'>{tab.name}</p>
            </div>
          ))}
        </div>
      </PopupWithForm>
    );
  }
);

export default PopupWithAssistant;
