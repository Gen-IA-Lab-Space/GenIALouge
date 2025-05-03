import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { addMessage, currentChat } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSending || !currentChat) return;
    
    setIsSending(true);
    addMessage(message.trim(), 'user');
    setMessage('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    // Allow time for the animation to complete
    setTimeout(() => {
      setIsSending(false);
    }, 500);
  };

  // Handle Ctrl+Enter or Cmd+Enter to submit
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  if (!currentChat) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-3xl mx-auto">
        <div className="relative flex items-end bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 focus-within:border-orange-500 dark:focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-500 dark:focus-within:ring-orange-600 transition-all overflow-hidden">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-grow py-3 px-4 bg-transparent border-none focus:outline-none resize-none max-h-[200px] min-h-[56px] text-gray-900 dark:text-white"
            disabled={isSending || !currentChat}
          />
          <button
            type="submit"
            className={`flex-shrink-0 p-3 mr-1 mb-1 rounded-md text-white transition-all
              ${message.trim() && !isSending
                ? 'bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700'
                : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-70'
              }`}
            disabled={!message.trim() || isSending}
            aria-label="Send message"
          >
            <Send className={`w-5 h-5 ${isSending ? 'animate-pulse' : ''}`} />
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
          Press Ctrl+Enter to send
        </div>
      </div>
    </form>
  );
};

export default ChatInput;