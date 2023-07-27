import { FC } from 'react';
import logo from '../assets/logo.svg';
import { useTranslation } from 'react-i18next';
import './styles/Footer.css';

const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <div className='footer'>
      <img className='footer__logo' src={logo} alt='логотип' />
      <a
        href='https://github.com/Augenb1ick/Chatty-AI'
        className='footer__text footer__text_contacts'
      >
        GitHub
      </a>
      <p className='footer__text_copyright'>&copy; {t('__Сервис для...__')}</p>
    </div>
  );
};

export default Footer;
