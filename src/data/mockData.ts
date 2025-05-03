import { Chat, Message } from '../types';

const createMessage = (
  id: string,
  content: string,
  sender: 'user' | 'ai',
  timestamp: Date
): Message => ({
  id,
  content,
  sender,
  timestamp,
});

const createChat = (
  id: string,
  title: string,
  messages: Message[],
  createdAt: Date,
  updatedAt: Date
): Chat => ({
  id,
  title,
  messages,
  createdAt,
  updatedAt,
});

// Sample conversation 1
const chat1Messages: Message[] = [
  createMessage(
    '1',
    'Hello! How can I help you today?',
    'ai',
    new Date('2025-06-01T10:00:00')
  ),
  createMessage(
    '2',
    'I need help with my project. Can you explain how to use React hooks?',
    'user',
    new Date('2025-06-01T10:01:00')
  ),
  createMessage(
    '3',
    "React Hooks are functions that let you \"hook into\" React state and lifecycle features from function components. They were introduced in React 16.8 as a way to use state and other React features without writing a class component. The most common hooks are useState, useEffect, useContext, useReducer, useCallback, useMemo, and useRef. Would you like me to explain any of these in more detail?",
    'ai',
    new Date('2025-06-01T10:02:00')
  ),
];

// Sample conversation 2
const chat2Messages: Message[] = [
  createMessage(
    '4',
    'Good morning! What can I do for you?',
    'ai',
    new Date('2025-06-02T09:00:00')
  ),
  createMessage(
    '5',
    'I want to learn about AI. What are the latest developments?',
    'user',
    new Date('2025-06-02T09:01:00')
  ),
  createMessage(
    '6',
    "The AI field is advancing rapidly! Recent developments include multimodal models that can process both text and images, more efficient training methods, better reasoning capabilities, and improved alignment with human values. Large language models continue to evolve with capabilities for longer context windows and more specialized knowledge. Would you like to explore any particular aspect of AI development in more detail?",
    'ai',
    new Date('2025-06-02T09:02:00')
  ),
];

// Sample conversation 3
const chat3Messages: Message[] = [
  createMessage(
    '7',
    'Welcome to GenIALogue! How may I assist you today?',
    'ai',
    new Date('2025-06-03T14:00:00')
  ),
  createMessage(
    '8',
    'Can you write a short poem about technology?',
    'user',
    new Date('2025-06-03T14:01:00')
  ),
  createMessage(
    '9',
    "Digital dreams in silicon minds,\nConnections forged where future binds.\nPixels dance on glowing screens,\nWhispering of what tomorrow means.\n\nCode becomes the modern art,\nTech and human, never apart.\nIn this brave new world we roam,\nMaking every device our home.",
    'ai',
    new Date('2025-06-03T14:02:00')
  ),
];

export const mockChats: Chat[] = [
  createChat(
    '1',
    'React Hooks Explanation',
    chat1Messages,
    new Date('2025-06-01T10:00:00'),
    new Date('2025-06-01T10:02:00')
  ),
  createChat(
    '2',
    'AI Developments',
    chat2Messages,
    new Date('2025-06-02T09:00:00'),
    new Date('2025-06-02T09:02:00')
  ),
  createChat(
    '3',
    'Technology Poem',
    chat3Messages,
    new Date('2025-06-03T14:00:00'),
    new Date('2025-06-03T14:02:00')
  ),
];