import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import './styles/ForWho.css';
import firstImg from '../images/Inbox Archive.svg';
import secondImg from '../images/Globus.svg';
import thirdImg from '../images/Paw.svg';
import fourthImg from '../images/Bone.svg';
import fifthImg from '../images/Jar Of Pills 2.svg';
import sixthImg from '../images/cat-linear.svg';

const ForWho: FC = () => {
  const { t } = useTranslation();

  return (
    <div className='ForWho'>
      <h2 className='ForWho__heading'>{t('__ForWHo-heading__')}</h2>
      <div className='ForWho__info-container'>
        <div className='ForWho__column'>
          <div className='ForWho__line'>
            <img
              className='ForWho__img'
              src={firstImg}
              alt='изображение архива'
            />
            <p className='ForWho__text'>{t('__ForWHo-text-1__')}</p>
          </div>
          <div className='ForWho__line'>
            <img
              className='ForWho__img'
              src={secondImg}
              alt='изображение глобуса'
            />
            <p className='ForWho__text'>{t('__ForWHo-text-2__')}</p>
          </div>
          <div className='ForWho__line'>
            <img
              className='ForWho__img'
              src={thirdImg}
              alt='изображение лапки'
            />
            <p className='ForWho__text'>{t('__ForWHo-text-3__')}</p>
          </div>
        </div>
        <div className='ForWho__column'>
          <div className='ForWho__line'>
            <img
              className='ForWho__img'
              src={fourthImg}
              alt='изображение косточки'
            />
            <p className='ForWho__text'>{t('__ForWHo-text-4__')}</p>
          </div>
          <div className='ForWho__line'>
            <img
              className='ForWho__img'
              src={fifthImg}
              alt='изображение таблеток'
            />
            <p className='ForWho__text'>{t('__ForWHo-text-5__')}</p>
          </div>
          <div className='ForWho__line'>
            <img
              className='ForWho__img'
              src={sixthImg}
              alt='изображение кота'
            />
            <p className='ForWho__text'>{t('__ForWHo-text-6__')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForWho;
