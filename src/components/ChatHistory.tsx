import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { ChatHistoryProps } from '../models/componentsInterfaces';

import './styles/ChatHistory.css';
import {
  handleAssistantAva,
  useAssistantName,
} from '../utills/assistantUtills';

const ChatHistory: FC<ChatHistoryProps> = ({ chatHistory, activeProfile }) => {
  const { t } = useTranslation();

  const assistantName = useAssistantName(activeProfile);

  return (
    <div className='dialogHistory'>
      <div className='chat-message_assistant-container'>
        <div className='assistant-imgAndName-contaner'>
          <img className='ava' src={handleAssistantAva(activeProfile)} />
          <p className='assistant-name'>{assistantName}</p>
        </div>
        <div className='chat-message chat-message__assistant'>
          {t('__Welcome message__')}
        </div>
      </div>
      {chatHistory.map((message, index) => {
        if (message.role === 'user') {
          return (
            <div key={index} className='chat-message_user-container'>
              <div className='chat-message chat-message__user'>
                {message.content}
              </div>
            </div>
          );
        }
        if (message.role === 'assistant') {
          return (
            <div key={index} className='chat-message_assistant-container'>
              <div className='assistant-imgAndName-contaner'>
                <img className='ava' src={handleAssistantAva(activeProfile)} />
                <p className='assistant-name'>{assistantName}</p>
              </div>
              <div className='chat-message chat-message__assistant'>
                {message.content}
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default ChatHistory;
