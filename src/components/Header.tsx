import { FC, useState } from 'react';
import './styles/Header.css';
import logo from '../images/logo.svg';
import { useTranslation } from 'react-i18next';
import doggy from '../images/dog.svg';
import kitty from '../images/cat.svg';
import parrot from '../images/bird.svg';

interface HeaderProps {
  handleChangeAssistant: () => void;
  handleLogoClick: () => void;
  activeProfile: number;
  globalLanguage: (value: string) => void;
}

type ImageData = {
  content: string;
};

const imageData: ImageData[] = [
  { content: doggy },
  { content: kitty },
  { content: parrot },
];

const Header: FC<HeaderProps> = ({
  handleChangeAssistant,
  handleLogoClick,
  activeProfile,
  globalLanguage,
}) => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState('ru');

  const avatar: JSX.Element[] = imageData
    .filter((_tab: ImageData, i: number) => i === activeProfile)
    .map((tab: ImageData, i: number) => {
      return (
        <button
          className='header__button-assistant'
          key={i}
          onClick={handleChangeAssistant}
        >
          <img
            className='header__profile-image'
            src={tab.content}
            alt='изображение собаки????'
          />
        </button>
      );
    });

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setCurrentLang(language);
    globalLanguage(language);
    /*if (localStorage.getItem('i18nextLng') === 'en') {
      localStorage.removeItem('en')
      localStorage.setItem('i18nextLng', 'ru')
      } else {
        localStorage.removeItem('ru')
        localStorage.setItem('i18nextLng', 'en')
      }*/
  };

  return (
    <div className='header'>
      <img
        onClick={handleLogoClick}
        className='header__logo'
        src={logo}
        alt='логотип'
      />
      <div className='header__navlang'>
        <button
          data-lang='ru'
          className={`header__button-language ${
            currentLang === 'ru' ? 'header__button-language_active' : ''
          }`}
          onClick={() => changeLanguage('ru')}
        >
          RU
        </button>
        <div className='separator'>|</div>
        <button
          data-lang='en'
          className={`header__button-language ${
            currentLang === 'en' ? 'header__button-language_active' : ''
          }`}
          onClick={() => changeLanguage('en')}
        >
          EN
        </button>
      </div>
      {avatar}
    </div>
  );
};

export default Header;
