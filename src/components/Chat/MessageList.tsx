import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import { useChat } from '../../contexts/ChatContext';

const MessageList: React.FC = () => {
  const { currentChat } = useChat();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentChat?.messages]);

  if (!currentChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-gray-500 dark:text-gray-400">
        <p className="text-center max-w-md">
          Select a chat from the sidebar or start a new conversation.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        {currentChat.messages.map(message => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default MessageList;