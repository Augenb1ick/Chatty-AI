import assistantCat from '../images/cat.svg';
import assistantDog from '../images/dog.svg';
import assistantBird from '../images/bird.svg';
import doggy from '../images/dog-not-selected.svg';
import kitty from '../images/cat-not-selected.svg';
import parrot from '../images/bird-not-selected.svg';
import activeDog from '../images/dog-selected.svg';
import activeCat from '../images/cat-selected.svg';
import activeBird from '../images/bird-selected.svg';
import { useTranslation } from 'react-i18next';
import { profileData } from '../models/dataTypes';

export const useAssistantName = (value: number) => {
  const { t } = useTranslation();
  const names: { [key: number]: string } = {
    0: t('__Oliver__'),
    1: t('__Vincent__'),
    2: t('__Gustav__'),
  };

  return names[value] || t('__Oliver__');
};

export const handleAssistantAva = (value: number) => {
  const avatars: { [key: number]: string } = {
    0: assistantDog,
    1: assistantCat,
    2: assistantBird,
  };

  return avatars[value] || assistantDog;
};

export const useAssistantData = (): profileData[] => {
  const { t } = useTranslation();
  return [
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
};
