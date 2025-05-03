import React, { createContext, useContext, useState } from 'react';
import { Chat, Message } from '../types';
import { mockChats } from '../data/mockData';

interface ChatContextType {
  chats: Chat[];
  currentChat: Chat | null;
  setCurrentChat: (chat: Chat | null) => void;
  addChat: () => void;
  updateChatTitle: (id: string, newTitle: string) => void;
  deleteChat: (id: string) => void;
  addMessage: (content: string, sender: 'user' | 'ai') => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [currentChat, setCurrentChat] = useState<Chat | null>(mockChats[0] || null);

  const addChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [
        {
          id: Date.now().toString(),
          content: 'Hello! How can I assist you today?',
          sender: 'ai',
          timestamp: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setChats(prevChats => [newChat, ...prevChats]);
    setCurrentChat(newChat);
  };

  const updateChatTitle = (id: string, newTitle: string) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === id
          ? { ...chat, title: newTitle, updatedAt: new Date() }
          : chat
      )
    );

    if (currentChat?.id === id) {
      setCurrentChat(prev => prev ? { ...prev, title: newTitle, updatedAt: new Date() } : null);
    }
  };

  const deleteChat = (id: string) => {
    setChats(prevChats => prevChats.filter(chat => chat.id !== id));
    
    if (currentChat?.id === id) {
      const remainingChats = chats.filter(chat => chat.id !== id);
      setCurrentChat(remainingChats.length > 0 ? remainingChats[0] : null);
    }
  };

  const addMessage = (content: string, sender: 'user' | 'ai') => {
    if (!currentChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date()
    };

    // Update both states
    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, newMessage],
      updatedAt: new Date()
    };

    setCurrentChat(updatedChat);
    
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === currentChat.id ? updatedChat : chat
      )
    );

    // Simulate AI response if user sent a message
    if (sender === 'user') {
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: getAIResponse(),
          sender: 'ai',
          timestamp: new Date()
        };

        const updatedWithAI = {
          ...updatedChat,
          messages: [...updatedChat.messages, aiResponse],
          updatedAt: new Date()
        };

        setCurrentChat(updatedWithAI);
        
        setChats(prevChats =>
          prevChats.map(chat =>
            chat.id === currentChat.id ? updatedWithAI : chat
          )
        );
      }, 1000);
    }
  };

  // Simple AI response generator for demo
  const getAIResponse = () => {
    const responses = [
      "That's an interesting point. Could you tell me more about it?",
      "I understand what you're saying. Here's what I think...",
      "Thanks for sharing that. I've processed your input and have some thoughts to share.",
      "I've analyzed your message and here's my response based on the information provided.",
      "That's a great question. Based on my knowledge, I can provide the following insights...",
      "I appreciate your query. Let me think about that for a moment...",
      "I've considered your input carefully. Here's what I believe would be helpful to know...",
      "That's something I can help with. Based on the information available to me...",
      "I've processed your request and can offer the following assistance...",
      "Your question touches on an interesting topic. Here's what I know about it..."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        setCurrentChat,
        addChat,
        updateChatTitle,
        deleteChat,
        addMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};