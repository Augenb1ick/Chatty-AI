import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import './styles/ForWho.css';
import { forWhoData } from '../utills/constants';

const ForWho: FC = () => {
  const { t } = useTranslation();

  return (
    <div className='ForWho'>
      <h2 className='ForWho__heading'>{t('__ForWHo-heading__')}</h2>
      <div className='ForWho__info-container'>
        <div className='ForWho__column'>
          {forWhoData.slice(0, forWhoData.length / 2).map((image, index) => (
            <div className='ForWho__line' key={index}>
              <img className='ForWho__img' src={image.src} alt={image.alt} />
              <p className='ForWho__text'>{t(image.textKey)}</p>
            </div>
          ))}
        </div>
        <div className='ForWho__column'>
          {forWhoData.slice(forWhoData.length / 2).map((image, index) => (
            <div className='ForWho__line' key={index}>
              <img className='ForWho__img' src={image.src} alt={image.alt} />
              <p className='ForWho__text'>{t(image.textKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForWho;
