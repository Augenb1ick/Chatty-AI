import './styles/StepsInfo.css';
//import arrow from '../assets/arrow-big.svg';

const description = {
  main: '3 простых шага, чтобы ваш питомец стал счастливее',
  one: `Расскажите мне о вашем питомце`,
  two: 'Расскажите о проблеме или задайте интересующий вас вопрос',
  three: 'Сделайте своего питомца счастливие',
}

const StepsInfo = () => {
  return (
  <div className="stepsInfo">
    {/*<img className="stepsInfo__arrow" src={arrow}/>*/}
    <div className="stepsInfo__MainDescription">{description.main}</div>
    <div className="stepsInfo__points">
    {/*<img className="stepsInfo__curve-line" src={curveLine}/>*/}
      <ul className="stepsInfo__points-steps">
      
        <li className="stepsInfo__points-step">
          <div className="stepsInfo__ellipse">1</div>
          <p className="stepsInfo__description">{description.one}</p>
        </li>
        <li className="stepsInfo__points-step">
          <div className="stepsInfo__ellipse">2</div>
          <p className="stepsInfo__description">{description.two}</p>
        </li>
        <li className="stepsInfo__points-step">
          <div className="stepsInfo__ellipse">3</div>
          <p className="stepsInfo__description">{description.three}</p>
        </li>
      </ul>
    </div>
  </div>
  );
};

export default StepsInfo;
