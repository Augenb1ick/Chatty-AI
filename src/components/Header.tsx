import { FC } from 'react';
import './styles/Header.css';
import logo from '../images/logo.svg';
import arrowUp from '../images/arrow-up.svg';
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
    //const lang = e.target.dataset.lang;
    //console.log(lang)
    i18n.changeLanguage(language);
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
      <Link to='/#'>
        <img
          onClick={handleLogoClick}
          className='header__logo'
          src={logo}
          alt='логотип'
        />
      </Link>
      <div className='header__navBar'>
        {/*<Link to='/reminders' className="header__navBar-reminders">{reminders}</Link>*/}
        <button
          data-lang='en'
          className='header__button-language'
          onClick={() => changeLanguage('en')}
        >
          EN
          <img
            className='header__button-arrow'
            src={arrowUp}
            alt='изображение стрелки'
          />
        </button>
        <button
          data-lang='ru'
          className='header__button-language'
          onClick={() => changeLanguage('ru')}
        >
          RU
          <img
            className='header__button-arrow'
            src={arrowUp}
            alt='изображение стрелки'
          />
        </button>
        {avatar}
      </div>
    </div>
  );
};

export default Header;
