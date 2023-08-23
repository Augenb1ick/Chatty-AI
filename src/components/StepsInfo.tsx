import './styles/StepsInfo.css';
import { useTranslation } from 'react-i18next';

const StepsInfo = () => {
  const { t } = useTranslation();

  return (
    <div className='stepsInfo'>
      <div className='stepsInfo__MainDescription'>{t('__3Steps__')}</div>
      <div className='stepsInfo__points'>
        <p className='stepsInfo__description'>{t('__TellMeOne__')}</p>
        <p className='stepsInfo__description'>{t('__TellMeTwo__')}</p>
        <p className='stepsInfo__description'>{t('__Make__')}</p>
      </div>
    </div>
  );
};

export default StepsInfo;
