import React from 'react';
import { Plus } from 'lucide-react';
import ChatItem from './ChatItem';
import { useChat } from '../../contexts/ChatContext';

const ChatList: React.FC = () => {
  const { chats, addChat } = useChat();

  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <button
          onClick={addChat}
          className="w-full py-2 px-4 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors
            flex items-center justify-center gap-2 font-medium
            dark:bg-orange-600 dark:hover:bg-orange-700"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>
      </div>
      
      <div className="overflow-y-auto flex-grow px-3 pt-2 pb-20">
        {chats.length > 0 ? (
          chats.map(chat => (
            <ChatItem key={chat.id} chat={chat} />
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-4">
            No conversations yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;