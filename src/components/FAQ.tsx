import { FC, useEffect, useState } from 'react';
import './styles/FAQ.css';
import { useTranslation } from 'react-i18next';

interface FAQ {
  mainFaqOpen: boolean;
}

const FAQ: FC<FAQ> = ({ mainFaqOpen }) => {
  const { t } = useTranslation();
  const [faqIsOpened, setFaqIsOpened] = useState(false);

  useEffect(() => {
    mainFaqOpen && setFaqIsOpened(true);
  }, [mainFaqOpen]);

  const handleOpenToggle = () => {
    setFaqIsOpened(!faqIsOpened);
  };

  return (
    <>
      <div className={`FAQ ${!faqIsOpened && 'FAQ-closed'}`}>
        <div className='FAQ__content'>
          <div className='FAQ__column'>
            <h2 className='FAQ__heading'>{t('__FAQ-examples-heading__')}</h2>
            <p className='FAQ__text'>{t('__FAQ-examples-1__')}</p>
            <p className='FAQ__text'>{t('__FAQ-examples-2__')}</p>
            <p className='FAQ__text'>{t('__FAQ-examples-3__')}</p>
          </div>
          <div className='FAQ__column'>
            <h2 className='FAQ__heading'>
              {t('__FAQ-restrictions-heading__')}
            </h2>
            <p className='FAQ__text'>{t('__FAQ-restrictions-1__')}</p>
            <p className='FAQ__text'>{t('__FAQ-restrictions-2__')}</p>
            <p className='FAQ__text'>{t('__FAQ-restrictions-3__')}</p>
          </div>
          <button
            onClick={handleOpenToggle}
            className='FAQ__close-btn'
          ></button>
        </div>
      </div>
      <button
        onClick={handleOpenToggle}
        className={`FAQ__open-btn ${faqIsOpened && 'FAQ__open-btn_hidden'}`}
      ></button>
    </>
  );
};

export default FAQ;
