import React from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { useChat } from '../../contexts/ChatContext';

const Chat: React.FC = () => {
  const { currentChat } = useChat();
  
  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      {currentChat && (
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="font-semibold text-gray-900 dark:text-white truncate">
            {currentChat.title}
          </h2>
        </div>
      )}
      
      {/* Messages */}
      <MessageList />
      
      {/* Input */}
      <ChatInput />
    </div>
  );
};

export default Chat;