import React, { useState, useRef, useEffect } from 'react';
import { Edit2, Trash2, Check, X } from 'lucide-react';
import { Chat } from '../../types';
import { useChat } from '../../contexts/ChatContext';
import { truncateText } from '../../utils';

interface ChatItemProps {
  chat: Chat;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
  const { currentChat, setCurrentChat, updateChatTitle, deleteChat } = useChat();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(chat.title);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const isActive = currentChat?.id === chat.id;
  
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSelectChat = () => {
    if (!isEditing) {
      setCurrentChat(chat);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditTitle(chat.title);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteChat(chat.id);
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      updateChatTitle(chat.id, editTitle.trim());
    } else {
      setEditTitle(chat.title); // Reset to original if empty
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(chat.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  // Get the last message for preview
  const lastMessage = chat.messages[chat.messages.length - 1];
  const previewText = lastMessage ? truncateText(lastMessage.content, 30) : '';

  return (
    <div
      onClick={handleSelectChat}
      className={`p-3 rounded-lg transition-all duration-200 mb-2 cursor-pointer select-none group
        ${isActive
          ? 'bg-orange-500/10 dark:bg-orange-500/20'
          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }
        ${isEditing ? 'bg-gray-100 dark:bg-gray-800' : ''}
      `}
    >
      {isEditing ? (
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow py-1 px-2 rounded border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-1 focus:ring-orange-500 dark:focus:ring-orange-400"
            autoFocus
          />
          <button
            onClick={handleSaveEdit}
            className="p-1 text-green-600 dark:text-green-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            aria-label="Save edit"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancelEdit}
            className="p-1 text-red-600 dark:text-red-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            aria-label="Cancel edit"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <h3 className={`font-medium truncate ${isActive ? 'text-orange-600 dark:text-orange-400' : 'text-gray-900 dark:text-gray-100'}`}>
              {chat.title}
            </h3>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleEdit}
                className="p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                aria-label="Edit chat title"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                aria-label="Delete chat"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
            {previewText}
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatItem;