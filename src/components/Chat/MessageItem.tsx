import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../../types';
import { formatDate } from '../../utils';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isAI = message.sender === 'ai';
  
  return (
    <div 
      className={`flex items-start gap-3 py-4 px-4 animate-fadeIn ${
        isAI ? '' : 'bg-gray-50 dark:bg-gray-800/50'
      }`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center 
        ${isAI 
          ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400' 
          : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
        }`}
      >
        {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>
      
      {/* Message content */}
      <div className="flex-1 space-y-1">
        <div className="flex items-center">
          <h4 className="font-medium text-sm text-gray-900 dark:text-white">
            {isAI ? 'GenIALogue' : 'You'}
          </h4>
          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
            {formatDate(message.timestamp)}
          </span>
        </div>
        
        <div className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;