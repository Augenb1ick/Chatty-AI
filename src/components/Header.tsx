//import { useState } from 'react';
//import { FC } from 'react';
import './styles/Header.css';
import logo from '../assets/logo.svg';
import arrowUp from '../assets/arrow-up.svg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import doggy from '../assets/dog.svg';
import kitty from '../assets/cat.svg';
import parrot from '../assets/bird.svg';

const Header = ( {handleChangeAssistant, handleLogoClick, activeProfile, clickForButton} :any) => {
  const { i18n } = useTranslation();

  const imageData: any = [
    { content: doggy },
    { content: kitty },
    { content: parrot },
  ];

  const avatar = imageData
    .filter((_tab: any, i: any) => i === activeProfile)
    .map((tab: any, i: any) => {
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

    const changeLanguage = (language:any) => {
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
  }

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
          data-lang="en"
          className="header__button-language"
          onClick={()=>changeLanguage("en")}
        >
          EN
          <img className="header__button-arrow" src={arrowUp} alt="изображение стрелки"/>
        </button>
        <button
          data-lang="ru"
          className="header__button-language"
          onClick={()=>changeLanguage("ru")}
        >
          RU
          <img className="header__button-arrow" src={arrowUp} alt="изображение стрелки"/>
        </button>
        <button
          data-lang="en"
          className="header__button-language"
          onClick={clickForButton}
        >
          Кнопка
        </button>
        {avatar}
      </div>
    </div>
  );
};

export default Header;
