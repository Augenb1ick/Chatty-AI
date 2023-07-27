import { FC } from 'react';
import logo from '../assets/logo.svg';
import { useTranslation } from 'react-i18next';
import './styles/Footer.css';

const Footer: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="footer">
      <img className="footer__logo" src={logo} alt="логотип"/>
      <ul className="footer__info">
        <li><p className="footer__text footer__text_contacts">Здесь будет текст</p></li>
        <li><p className="footer__text footer__text_contacts">Здесь будет текст</p></li>
      </ul>
      <p className="footer__text footer__text_copyright">&copy; {t("__Сервис для...__")}</p>
    </div>
  )
};

export default Footer;
