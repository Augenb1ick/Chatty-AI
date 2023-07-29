import { FC } from 'react';
import logo from '../images/logo.svg';
import { useTranslation } from 'react-i18next';
import './styles/Footer.css';

const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <div className='footer'>
      <img className='footer__logo' src={logo} alt='логотип' />
      <div className='footer__info-container'>
        <p className='footer__text_copyright'>
          &copy; {t('__Сервис для...__')}
        </p>
        <a
          href='https://github.com/Augenb1ick/Chatty-AI'
          className='footer__text_contacts'
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Footer;
