import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import doggy from '../images/dog-not-selected.svg';
import kitty from '../images/cat-not-selected.svg';
import parrot from '../images/bird-not-selected.svg';
import activeDog from '../images/dog-selected.svg';
import activeCat from '../images/cat-selected.svg';
import activeBird from '../images/bird-selected.svg';
import './styles/PopupWithAssistant.css';
import usePopupClose from '../hooks/usePopupClose';
import PopupWithForm from './PopupWithForm';

type profileData = {
  image: string;
  activeImage: string;
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
      activeImage: activeDog,
      name: t('__Oliver__'),
      active: true,
    },
    {
      image: kitty,
      activeImage: activeCat,
      name: t('__Vincent__'),
      active: false,
    },
    {
      image: parrot,
      activeImage: activeBird,
      name: t('__Gustav__'),
      active: false,
    },
  ];

  const profileImage = profileData.map((tab: profileData, i: number) => {
    return (
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
    );
  });

  usePopupClose(isOpen, onClose);

  return (
    <PopupWithForm
      title={t('__Choose your assistant__')}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='popup__changeAssistant'>{profileImage}</div>
    </PopupWithForm>
  );
};

export default PopupWithAssistant;
