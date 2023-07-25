import doggy from '../assets/dog.svg';
import kitty from '../assets/cat.svg';
import './styles/AssistantPopup.css';

const AssistantPopup = ({ isOpen, onClose }:{
  isOpen: boolean
  onClose: any
}) => {

  function handleChooseAssistant () {

  }

  return (
    <div className= {`popup ${isOpen ? 'popup_visible' : ''} `}> 
      <div className="popup__container">
        <div className="popup__container-info">
          <h2 className="popup__name">Выбери своего помощника</h2>
          <button 
            id="closeButton"
            type ="button" 
            aria-label="close"
            className="popup__close-button"
            onClick={onClose}>
          </button>
        </div>
        <div className="popup__changeAssistant">
          <button 
            type ="button" 
            aria-label="changeAssistantButton"
            className="popup__AssistantButton"
            onClick={handleChooseAssistant} >
              <img className="header__logo" src={doggy} alt="изображение собаки"/>
          </button>
          <button 
            type ="button"
            aria-label="changeAssistantButton"
            className="popup__AssistantButton"
            onClick={handleChooseAssistant} >
              <img className="header__logo" src={kitty} alt="изображение кота"/>
          </button>
        </div>
      </div>
</div>
  )
};

export default AssistantPopup;
