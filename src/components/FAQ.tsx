import { FC, useState } from 'react';
import './styles/FAQ.css';

const FAQ: FC = () => {
  const [faqIsOpened, setFaqIsOpened] = useState(false);

  const handleOpenToggle = () => {
    setFaqIsOpened(!faqIsOpened);
  };

  return (
    <>
      <div className={`FAQ ${!faqIsOpened && 'FAQ-closed'}`}>
        <div className='FAQ__content'>
          <div className='FAQ__column'>
            <h2 className='FAQ__heading'>Примеры вопросов</h2>
            <p className='FAQ__text'>
              Какие упражнения и игры будут хорошими для здоровья и развития
              моего питомца?
            </p>
            <p className='FAQ__text'>
              Как проводить ежедневный уход за шерстью и когтями моего питомца?
            </p>
            <p className='FAQ__text'>
              Какие прививки необходимо делать моему питомцу и в каком возрасте?
            </p>
          </div>
          <div className='FAQ__column'>
            <h2 className='FAQ__heading'>Ограничения</h2>
            <p className='FAQ__text'>
              Не использовать для проведения диагностики или самолечения
              питомца.
            </p>
            <p className='FAQ__text'>
              Избегать вопросов о лекарствах, их дозировке и назначении.
            </p>
            <p className='FAQ__text'>
              В случае неотложных ситуаций обратиться к ветеринарному
              специалисту.
            </p>
          </div>
          <button
            onClick={handleOpenToggle}
            className='FAQ__close-btn'
          ></button>
        </div>
      </div>
      <button
        onClick={handleOpenToggle}
        className={`FAQ__open-btn ${!faqIsOpened && 'FAQ__open-btn_hidden'}`}
      ></button>
    </>
  );
};

export default FAQ;
