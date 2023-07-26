import doggy from '../assets/dog.svg';
import kitty from '../assets/cat.svg';
import parrot from '../assets/bird.svg';
import './styles/AssistantPopup.css';

const AssistantPopup = ({ isOpen, onClose, activeProfile, onSelectedProfile }:{
  isOpen: boolean
  onClose: any
  activeProfile: any
  onSelectedProfile: any
}) => {


  const profileData: any = [
    {
      image: doggy,
      active: true,
    },
    {
      image: kitty,
      active: false,
    },
    {
      image: parrot,
      active: false,
    },
  ]

  const profileImage = profileData.map((tab:any, i:any) => {
    return (
      <button 
        type ="button" 
        aria-label="changeAssistantButton"
        className={`popup__AssistantButton ${i === activeProfile ? 'popup__AssistantButton_active' : ''}`}
        key={i}
        onClick={() => onSelectedProfile(i)} >
          <img className="header__logo" src={tab.image} alt="изображение собаки????"/>
      </button>  
    );
  });

  

  console.log('activeProfile', activeProfile)

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
          {profileImage}
        </div>
      </div>
</div>
  )
};

export default AssistantPopup;
