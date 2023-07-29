import './styles/StepsInfo.css';
import { useTranslation } from 'react-i18next';

const StepsInfo = () => {
  const { t } = useTranslation();

  return (
    <div className='stepsInfo'>
      <div className='stepsInfo__MainDescription'>{t('__3Steps__')}</div>
      <div className='stepsInfo__points'>
        {/* <ul className='stepsInfo__points-steps'>
          <li className='stepsInfo__points-step'>
            <div className='stepsInfo__ellipse'>1</div> */}
        <p className='stepsInfo__description'>{t('__TellMeOne__')}</p>
        {/* </li>
          <li className='stepsInfo__points-step'>
            <div className='stepsInfo__ellipse'>2</div> */}
        <p className='stepsInfo__description'>{t('__TellMeTwo__')}</p>
        {/* </li>
          <li className='stepsInfo__points-step'>
            <div className='stepsInfo__ellipse'>3</div> */}
        <p className='stepsInfo__description'>{t('__Make__')}</p>
        {/* </li>
        </ul> */}
      </div>
    </div>
  );
};

export default StepsInfo;
