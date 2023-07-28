import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import doggy from '../images/dog.svg';
import kitty from '../images/cat.svg';
import parrot from '../images/bird.svg';
import './styles/PopupWithAssistant.css';
import usePopupClose from '../hooks/usePopupClose';
import PopupWithForm from './PopupWithForm';

type profileData = {
  image: string;
  name: string;
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
  const { t } = useTranslation();
  const profileData: profileData[] = [
    {
      image: doggy,
      name: t('__Oliver__'),
      active: true,
    },
    {
      image: kitty,
      name: t('__Vincent__'),
      active: false,
    },
    {
      image: parrot,
      name: t('__Gustav__'),
      active: false,
    },
  ];

  const profileImage = profileData.map((tab: profileData, i: number) => {
    return (
      <div className='popup__Assistant-container'>
        <button
          type='button'
          aria-label='changeAssistantButton'
          className={`popup__AssistantButton ${
            i === activeProfile ? 'popup__AssistantButton_active' : ''
          }`}
          key={i}
          onClick={() => onSelectedProfile(i)}
        >
          <img
            className='popup__AssistantButton-image'
            src={tab.image}
            alt='изображение животного'
          />
        </button>
        <p className='popup__Assistant-name'>{tab.name}</p>
      </div>
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
