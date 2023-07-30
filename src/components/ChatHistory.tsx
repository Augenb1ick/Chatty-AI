import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Message } from '../models/Message';
import assistantCat from '../images/cat.svg';
import assistantDog from '../images/dog.svg';
import assistantBird from '../images/bird.svg';
import './styles/ChatHistory.css';

interface ChatHistoryProps {
  chatHistory: Message[];
  activeProfile: number;
}

const ChatHistory: FC<ChatHistoryProps> = ({ chatHistory, activeProfile }) => {
  const { t } = useTranslation();
  const handleAssistantAva = (value: number) => {
    const avatars: { [key: number]: string } = {
      0: assistantDog,
      1: assistantCat,
      2: assistantBird,
    };

    return avatars[value] || assistantDog;
  };

  const handleAssistantName = (value: number) => {
    const names: { [key: number]: string } = {
      0: t('__Oliver__'),
      1: t('__Vincent__'),
      2: t('__Gustav__'),
    };

    return names[value] || t('__Oliver__');
  };

  const userChatMessage = (message: Message, index: number) => (
    <div key={index} className='chat-message_user-container'>
      <div className='chat-message chat-message__user'>{message.content}</div>
    </div>
  );

  const assistantChatMessage = (message: Message, index: number) => (
    <div key={index} className='chat-message_assistant-container'>
      <div className='assistant-imgAndName-contaner'>
        <img className='ava' src={handleAssistantAva(activeProfile)} />
        <p className='assistant-name'>{handleAssistantName(activeProfile)}</p>
      </div>
      <div className='chat-message chat-message__assistant'>
        {message.content}
      </div>
    </div>
  );

  return (
    <div className='dialogHistory'>
      <div className='chat-message_assistant-container'>
        <div className='assistant-imgAndName-contaner'>
          <img className='ava' src={handleAssistantAva(activeProfile)} />
          <p className='assistant-name'>{handleAssistantName(activeProfile)}</p>
        </div>
        <div className='chat-message chat-message__assistant'>
          {t('__Welcome message__')}
        </div>
      </div>
      {chatHistory.map((message, index) => {
        if (message.role === 'user') {
          return userChatMessage(message, index);
        }
        if (message.role === 'assistant') {
          return assistantChatMessage(message, index);
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default ChatHistory;
