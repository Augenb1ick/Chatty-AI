import doggy from '../assets/dog.svg';
//import doggyA from '../assets/dog avatar-active.svg';
import kitty from '../assets/cat.svg';
import parrot from '../assets/bird.svg';
import './styles/PopupWithAssistant.css';
import usePopupClose from "../hooks/usePopupClose"
import PopupWithForm from './PopupWithForm';

interface profileData {
  [image: string]: any
  active: boolean
}

const PopupWithAssistant = ({ isOpen, onClose, activeProfile, onSelectedProfile }:{
  isOpen: boolean
  onClose: any
  activeProfile: any
  onSelectedProfile: any
}) => {

  const profileData: profileData[] = [
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
          <img src={tab.image} alt= "изображение животного"/>
      </button>  
    );
  });

  usePopupClose(isOpen, onClose)
  
  return (
    <PopupWithForm title={'Выбери своего помощника'} isOpen={isOpen} onClose={onClose} >
      <div className="popup__changeAssistant">
        {profileImage}
      </div>
    </PopupWithForm >
  )
};

export default PopupWithAssistant;
