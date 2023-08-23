import { Message } from './dataTypes';

export interface ChatBotProps {
  isMicroOn: boolean;
  isFaqOpened: boolean;
  activeProfile: number;
  microIsTurnedOff: (value: boolean) => void;
  isSafari: boolean;
  currentLanguage: string;
  popupRecognitionOpen: (value: boolean) => void;
}

export interface ChatBotSearchProps {
  isClicked: (value: boolean) => void;
  onMicroClick: (value: boolean) => void;
}

export interface FAQProps {
  mainFaqOpen: boolean;
}

export interface HeaderProps {
  handleChangeAssistant: () => void;
  handleLogoClick: () => void;
  activeProfile: number;
  globalLanguage: (value: string) => void;
}

export interface ChatHistoryProps {
  chatHistory: Message[];
  activeProfile: number;
}

export interface MainProps {
  onMicroClick: (value: boolean) => void;
  isClicked: (value: boolean) => void;
  isFaqOpened: (value: boolean) => void;
  activeProfile: number;
}

export interface PopupWithAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: number;
  onSelectedProfile: (i: number) => void;
}

export interface PopupWithFormProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
}

export interface PopupWithLimitsProps {
  isOpen: boolean;
  onClose: () => void;
  popupText: string;
  popupButtonText: string;
  activeProfile: number;
}
