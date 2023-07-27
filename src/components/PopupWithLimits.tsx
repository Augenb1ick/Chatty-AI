import usePopupClose from "../hooks/usePopupClose"
import PopupWithForm from './PopupWithForm';
import { useTranslation } from 'react-i18next';
import './styles/PopupWithLimits.css';
import bigDoggy from '../assets/bigDog.svg';
import bigKitty from '../assets/bigCat.svg';
import bigBirdie from '../assets/bigBird.svg';


/*interface popupImage {
  [image: string]: any
}*/

const PopupWithLimits = ({ isOpen, onClose, textButton }: {
  isOpen: boolean
  onClose: any
  /*answer: string*/
  textButton: string
}) => {
  const { t } = useTranslation();


  /*const popupImage: popupImage[] = [
    {image: bigDoggy},
    {image: bigKitty},
    {image: bigBirdie}
  ]*/

  /*const petImage = popupImage.map((tab:any) => {
    return (
      <img className="popup__image" src={tab.popupImage} alt= "изображение животного" />
    );
  });*/


  usePopupClose(isOpen, onClose)

  function handleClick () {

  }
  
  return (
    <PopupWithForm title={''} isOpen={isOpen} onClose={onClose} >
      <>
      <div className="popup__content">
        <p className='popup__answer'>{t("__Извините, ваш голос...__")}</p>
        <button onClick={handleClick} className='popup__button'>{textButton}</button>
      </div>
      <div className="popup__image">
        <img  src={bigDoggy} alt= "изображение животного" />
      </div>
      </>
    </PopupWithForm >
  )
};

export default PopupWithLimits;
