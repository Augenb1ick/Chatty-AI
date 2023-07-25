import { FC } from 'react';
import { Message } from '../models/Message';
import userAva from '../images/user-ava.png';
import assistantAva from '../images/assistant-ava.png';
import './styles/ChatHistory.css';

interface ChatHistoryProps {
  chatHistory: Message[];
}

const ChatHistory: FC<ChatHistoryProps> = ({ chatHistory }) => {
  const userChatMessage = (message: Message, index: number) => (
    <div key={index} className='chat-message_user-container'>
      <div className='chat-message chat-message__user'>{message.content}</div>
      <img className='ava' src={userAva} />
    </div>
  );

  const assistantChatMessage = (message: Message, index: number) => (
    <div key={index} className='chat-message_assistant-container'>
      <img className='ava' src={assistantAva} />
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
