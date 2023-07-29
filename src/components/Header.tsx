import { FC, useState } from 'react';
import './styles/Header.css';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import doggy from '../images/dog.svg';
import kitty from '../images/cat.svg';
import parrot from '../images/bird.svg';

interface HeaderProps {
  handleChangeAssistant: () => void;
  handleLogoClick: () => void;
  activeProfile: number;
}

const Header: FC<HeaderProps> = ({
  handleChangeAssistant,
  handleLogoClick,
  activeProfile,
}) => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState('false');

  type ImageData = {
    content: string;
  };

  const imageData: ImageData[] = [
    { content: doggy },
    { content: kitty },
    { content: parrot },
  ];

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
    setCurrentLang(language)
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
      <Link className='header__link' to='/#'>
        <img
          onClick={handleLogoClick}
          className='header__logo'
          src={logo}
          alt='логотип'
        />
      </Link>
      <div className='header__navlang'>
        <button
          data-lang='ru'
          className={`header__button-language ${
            currentLang === 'ru' ? 'header__button-language_active' : ''
            }`
          }
          onClick={() => changeLanguage('ru')}
        >
          RU
        </button>
        <div className="separator">|</div>
        <button
          data-lang='en'
          className={`header__button-language ${
            currentLang === 'en' ? 'header__button-language_active' : ''
            }`
          }
          onClick={() => changeLanguage('en')}
        >
          EN
        </button>
        {avatar}
      </div>
    </div>
  );
};

export default Header;
