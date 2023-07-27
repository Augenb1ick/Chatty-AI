import { FC } from 'react';
import { Message } from '../models/Message';
import assistantCat from '../assets/cat.svg';
import assistantDog from '../assets/dog.svg';
import assistantBird from '../assets/bird.svg';
import './styles/ChatHistory.css';

interface ChatHistoryProps {
  chatHistory: Message[];
  activeProfile: number;
}

const ChatHistory: FC<ChatHistoryProps> = ({ chatHistory, activeProfile }) => {
  const handleAssistantAva = (value: number) => {
    const avatars: { [key: number]: string } = {
      0: assistantDog,
      1: assistantCat,
      2: assistantBird,
    };

    return avatars[value] || assistantDog;
  };
  const userChatMessage = (message: Message, index: number) => (
    <div key={index} className='chat-message_user-container'>
      <div className='chat-message chat-message__user'>{message.content}</div>
    </div>
  );

  const assistantChatMessage = (message: Message, index: number) => (
    <div key={index} className='chat-message_assistant-container'>
      <img className='ava' src={handleAssistantAva(activeProfile)} />
      <div className='chat-message chat-message__assistant'>
        {message.content}
      </div>
    </div>
  );

  return (
    <div className='dialogHistory'>
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
