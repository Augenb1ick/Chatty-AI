import { FC } from 'react';
import logo from '../assets/logo.svg';

import './styles/Footer.css';

const Footer: FC = () => {
  return (
    <div className="footer">
      <img className="footer__logo" src={logo} alt="логотип"/>
      <ul className="footer__info">
        <li><p className="footer__text footer__text_contacts">Здесь будет текст</p></li>
        <li><p className="footer__text footer__text_contacts">Здесь будет текст</p></li>
      </ul>
      <p className="footer__text footer__text_copyright">&copy; 2023 ООО PAWsistant — Сервис для владельцев домашних питомцев</p>
    </div>
  )
};

export default Footer;
