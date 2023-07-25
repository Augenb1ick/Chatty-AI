//import { useState } from 'react';
//import { FC } from 'react';
import './styles/Header.css';
import logo from '../assets/logo.svg';
import arrowUp from '../assets/arrow-up.svg';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Header = ( {handleChangeAssistant, handleLogoClick} :any) => {
  const { t } = useTranslation();

  function handleChangeLanguage () {
    if (localStorage.getItem('i18nextLng') === 'en') {
      localStorage.removeItem('en')
      localStorage.setItem('i18nextLng', 'ru')
      } else {
        localStorage.removeItem('ru')
        localStorage.setItem('i18nextLng', 'en')
      }
  }
  
  return (
    <div className="header">
      <Link to ="/#">
        <img onClick={handleLogoClick} className="header__logo" src={logo} alt="логотип"/>
      </Link>
      <div className="header__navBar">
        {/*<Link to='/reminders' className="header__navBar-reminders">{reminders}</Link>*/}
        <button className="header__button-language" onClick={handleChangeLanguage}>{t('__language__')}
          <img className="header__button-arrow" src={arrowUp} alt="изображение стрелки"/>
        </button>
        <button className="header__button-assistant" onClick={handleChangeAssistant}></button>
      </div>
    </div>
  )
};

export default Header;
