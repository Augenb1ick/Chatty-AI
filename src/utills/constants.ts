import firstImg from '../images/Inbox Archive.svg';
import secondImg from '../images/Globus.svg';
import thirdImg from '../images/Paw.svg';
import fourthImg from '../images/Bone.svg';
import fifthImg from '../images/Jar Of Pills 2.svg';
import sixthImg from '../images/cat-linear.svg';

export const initOpenAiPromt =
  'Ты должен отвечать только как эксперт по вопросам домашних животных, если тебе зададут вопрос на другие темы, говори, что ты эксперт по домашним животным и можешь дать ответ только по это тематике';

export const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const forWhoData = [
  {
    src: firstImg,
    alt: 'изображение архива',
    textKey: '__ForWHo-text-1__',
  },
  {
    src: secondImg,
    alt: 'изображение глобуса',
    textKey: '__ForWHo-text-2__',
  },
  {
    src: thirdImg,
    alt: 'изображение лапки',
    textKey: '__ForWHo-text-3__',
  },
  {
    src: fourthImg,
    alt: 'изображение косточки',
    textKey: '__ForWHo-text-4__',
  },
  {
    src: fifthImg,
    alt: 'изображение таблеток',
    textKey: '__ForWHo-text-5__',
  },
  {
    src: sixthImg,
    alt: 'изображение кота',
    textKey: '__ForWHo-text-6__',
  },
];
